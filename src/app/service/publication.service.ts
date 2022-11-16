import { Lecturer } from 'src/app/model/lecturer';
import { TreeNode } from './../model/tree-node';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { rootCertificates } from 'tls';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private lecturers: Lecturer[] = [];
  private lecturersTree: TreeNode = new TreeNode("");

  public lecturerList: Observable<Lecturer[]>;
  private lecturerListSubject: BehaviorSubject<any>;
  public lecturerTree: Observable<TreeNode>;
  private lecturerTreeSubject: BehaviorSubject<any>;


  constructor(private httpClient: HttpClient) {

    this.lecturerListSubject = new BehaviorSubject<Lecturer[]>(this.lecturers);
    this.lecturerList = this.lecturerListSubject.asObservable();

    this.lecturerTreeSubject = new BehaviorSubject<TreeNode>(this.lecturersTree);
    this.lecturerTree = this.lecturerTreeSubject.asObservable();

    const headers = new HttpHeaders({
      Accept: 'text/json',
    });

    this.httpClient.get<any>('assets/publications-stats.json', { headers })
      .subscribe(result => {
        result.forEach((record: { id: string; year: number; pubs: number; name: string; department: string; faculty: string; university: string; }) => {

          const existingLecturer = this.lecturers.filter(publication => publication.id === record.id);
          if (existingLecturer.length > 0) {
            // add to existing object
            existingLecturer[0].addPublication(record.year, record.pubs);
          } else {
            // add new lecturer
            this.lecturers.push(new Lecturer(
              record.id,
              record.name,
              record.year,
              record.pubs,
              record.department,
              record.faculty,
              record.university
            ));
          }
        });

        this.lecturerListSubject.next(this.lecturers);
        this.createDataTree();
        this.lecturerTreeSubject.next(this.lecturersTree);

      }
      );


  }


  createDataTree() {

    // collect layers
    const universities = new Map<string, string>();
    const faculties = new Map<string, string>();
    const departments = new Map<string, string>();

    this.lecturers.forEach(lecturer => {
      universities.set(lecturer.university, "");
      faculties.set(lecturer.faculty, lecturer.university);
      departments.set(lecturer.department, lecturer.faculty);
    });

    // create tree out of gathered data

    universities.forEach((uniValue, uniKey) => {
      var rootNode = new TreeNode(uniKey);
      this.lecturersTree.addChild(rootNode);

      faculties.forEach((facuValue, facuKey) => {
          if (facuValue == uniKey) {
            var facuNode = new TreeNode(facuKey);
            rootNode.addChild(facuNode);

            departments.forEach((depValue, depKey) => {
              if (depValue == facuKey) {
                var depNode = new TreeNode(depKey);
                facuNode.addChild(depNode);

                this.lecturers
                  .filter(function(lecturer: Lecturer) {
                    return lecturer.department == depKey;
                  })
                  .forEach(lecturer => {
                    depNode.addChild(lecturer);
                  });
              }
            });
          }
        });
    });

  }


}

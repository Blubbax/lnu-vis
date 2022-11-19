import { LecturerAggregation } from 'src/app/model/lecturer-aggregation';
import { TreeNode } from './../model/tree-node';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { PublicationRecord } from '../model/publication-record';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private lecturers: LecturerAggregation[] = [];
  private lecturersTree: TreeNode = new TreeNode("", "", null);

  public lecturerList: Observable<LecturerAggregation[]>;
  private lecturerListSubject: BehaviorSubject<any>;
  public lecturerTree: Observable<TreeNode>;
  private lecturerTreeSubject: BehaviorSubject<any>;

  public sunburstSelection: Observable<TreeNode>;
  private sunburstSelectionSubject: BehaviorSubject<any>;

  private rawData: PublicationRecord[] = [];

  constructor(private httpClient: HttpClient) {

    this.lecturerListSubject = new BehaviorSubject<LecturerAggregation[]>(this.lecturers);
    this.lecturerList = this.lecturerListSubject.asObservable();

    this.lecturerTreeSubject = new BehaviorSubject<TreeNode>(this.lecturersTree);
    this.lecturerTree = this.lecturerTreeSubject.asObservable();

    this.sunburstSelectionSubject = new BehaviorSubject<TreeNode>(this.lecturersTree);
    this.sunburstSelection = this.sunburstSelectionSubject.asObservable();

    const headers = new HttpHeaders({
      Accept: 'text/json',
    });

    this.httpClient.get<any>('assets/publications-stats.json', { headers })
      .subscribe(result => {
        result.forEach((record: { id: string; year: number; pubs: number; name: string; department: string; faculty: string; university: string; }) => {

          this.rawData.push(new PublicationRecord(
            record.id,
            record.name,
            record.pubs,
            record.year,
            record.department,
            record.faculty,
            record.university
          ));

          const existingLecturer = this.lecturers.filter(publication => publication.id === record.id);
          if (existingLecturer.length > 0) {
            // add to existing object
            existingLecturer[0].addPublication(record.year, record.pubs);
          } else {
            // add new lecturer
            this.lecturers.push(new LecturerAggregation(
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
        this.sunburstSelectionSubject.next(this.lecturersTree);

      }
      );


  }


  createDataTree() {

    // collect layers
    const universities = new Map<string, string>();
    const faculties = new Map<string, string>();
    const departments = new Map<string, string>();
    const lecturers = new Map<string, string>();

    this.rawData.forEach(lecturer => {
      universities.set(lecturer.university, "");
      faculties.set(lecturer.faculty, lecturer.university);
      departments.set(lecturer.department, lecturer.faculty);
      lecturers.set(lecturer.name, lecturer.department);
    });

    // create tree out of gathered data

    universities.forEach((uniValue, uniKey) => {
      var rootNode = new TreeNode(uniKey, "university", null);
      this.lecturersTree = rootNode;

      faculties.forEach((facuValue, facuKey) => {
        if (facuValue == uniKey) {
          var facuNode = new TreeNode(facuKey, "faculty", rootNode);
          rootNode.addChild(facuNode);

          departments.forEach((depValue, depKey) => {
            if (depValue == facuKey) {
              var depNode = new TreeNode(depKey, "department", facuNode);
              facuNode.addChild(depNode);

              lecturers.forEach((lectValue, lectKey) => {
                if (lectValue == depKey) {
                  var lectNode = new TreeNode(lectKey, "lecturer", depNode);
                  depNode.addChild(lectNode);

                  this.rawData
                    .filter(function (publications: PublicationRecord) {
                      return publications.name == lectKey;
                    })
                    .forEach(publications => {
                      lectNode.addChild(publications);
                      publications.setParent(lectNode);
                    });
                }
              });


            }
          });
        }
      });
    });

    this.lecturersTree.updatePubs();
    console.log(this.lecturersTree);
  }


  setSunburstSelection(selection: TreeNode | PublicationRecord | null) {
    this.sunburstSelectionSubject.next(selection);
  }

  getTreeAsFlatList(selection: TreeNode | PublicationRecord): PublicationRecord[] {
    var list: PublicationRecord[] = [];
    if (selection instanceof PublicationRecord) {
      list.push(selection);
    } else {
      selection.children.forEach(child => {
        list = list.concat(this.getTreeAsFlatList(child));
      });
    }
    return list;
  }

  recordsAsAggregations(records: PublicationRecord[]): LecturerAggregation[] {
    const ids = records.map(record => record.id);
    return this.lecturers.filter(d => ids.includes(d.id));
  }

}

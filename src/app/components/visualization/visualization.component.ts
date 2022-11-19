import { PublicationService } from './../../service/publication.service';
import { Component, OnInit } from '@angular/core';
import { Lecturer } from 'src/app/model/lecturer';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss']
})
export class VisualizationComponent implements OnInit {

  public lecturers : Lecturer[] = [];

  constructor(private publicationService: PublicationService) {
    // this.publicationService.lecturerList.subscribe(lecturers => {
    //   // console.log(lecturers);
    //   this.lecturers = lecturers;
    // });
    this.publicationService.sunburstSelection.subscribe(data => {
      this.lecturers = this.publicationService.getTreeAsFlatList(data);
      console.log(this.lecturers);
    });
  }

  ngOnInit(): void {
  }

}

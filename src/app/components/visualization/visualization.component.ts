import { LecturerAggregation } from 'src/app/model/lecturer-aggregation';
import { PublicationRecord } from './../../model/publication-record';
import { PublicationService } from './../../service/publication.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss']
})
export class VisualizationComponent implements OnInit {

  public lecturers : PublicationRecord[] = [];
  public lecturersAggregated : LecturerAggregation[] = [];


  constructor(private publicationService: PublicationService) {
    // this.publicationService.lecturerList.subscribe(lecturers => {
    //   // console.log(lecturers);
    //   this.lecturers = lecturers;
    // });
    this.publicationService.sunburstSelection.subscribe(data => {
      this.lecturers = this.publicationService.getTreeAsFlatList(data);
      this.lecturersAggregated = this.publicationService.recordsAsAggregations(this.lecturers)
      console.log(this.lecturersAggregated);
    });
  }

  ngOnInit(): void {
  }

}

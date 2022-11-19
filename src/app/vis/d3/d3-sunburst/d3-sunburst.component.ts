import { PublicationRecord } from './../../../model/publication-record';
import { PublicationService } from './../../../service/publication.service';
import { TreeNode } from './../../../model/tree-node';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

declare function drawSunburst(data: any): void;


@Component({
  selector: 'app-d3-sunburst',
  templateUrl: './d3-sunburst.component.html',
  styleUrls: ['./d3-sunburst.component.scss']
})
export class D3SunburstComponent implements OnInit {

  private data: TreeNode = new TreeNode("", "", null);
  selectedElement: TreeNode | PublicationRecord | null = null;

  currentName: string = "";
  currentPublications: number = 0;

  constructor(private publicationService: PublicationService) {
  }

  ngOnInit() {
    this.publicationService.lecturerTree.subscribe(data => {
      this.data = data;
      this.selectedElement = data;
      this.updateCenterData();

      const eventConnectionPoint = document.getElementById('sunburst');
      eventConnectionPoint?.addEventListener('sunburst-selection', (e: any) => {
        this.selectedElement = e.detail;
        this.publicationService.setSunburstSelection(this.selectedElement);
        this.updateCenterData();
      });

      drawSunburst(this.data);
    })
  }

  updateCenterData() {
    if (this.selectedElement instanceof TreeNode) {
      this.currentName = this.selectedElement.nameShort;
      this.currentPublications = this.selectedElement.totalChildPubs;
    } else if (this.selectedElement instanceof PublicationRecord) {
      this.currentName = this.selectedElement.year.toString();
      this.currentPublications = this.selectedElement.publications;
    } else {
      this.currentName = "";
      this.currentPublications = 0;
    }
  }

}

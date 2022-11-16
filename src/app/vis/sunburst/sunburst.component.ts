import { PublicationService } from './../../service/publication.service';
import { Component, OnInit } from '@angular/core';

declare const Plotly : any;

@Component({
  selector: 'app-sunburst',
  templateUrl: './sunburst.component.html',
  styleUrls: ['./sunburst.component.scss']
})
export class SunburstComponent implements OnInit {

  private data: any[] = [];

  constructor(private publicationService: PublicationService) {
    publicationService.lecturerList.subscribe(lecturers => {
      this.data = lecturers;
      this.drawPlot();
    });
  }

  ngOnInit(): void {
  }

  drawPlot() {

    var ids: string[] = [];
    var labels: string[] = [];
    var parents: string[] = [];

    const universities = new Map<string, string>();
    const faculties = new Map<string, string>();
    const departments = new Map<string, string>();

    this.data.forEach(element => {
      universities.set(element["university"], "");
      faculties.set(element["faculty"], element["university"]);
      departments.set(element["department"], element["faculty"]);
    });


    universities.forEach((value, key) => {
      ids.push(key);
      labels.push(key);
      parents.push(value);
    });

    faculties.forEach((value, key) => {
      ids.push(key);
      labels.push(key);
      parents.push(value);
    });

    departments.forEach((value, key) => {
      ids.push(key);
      labels.push(key);
      parents.push(value);
    });

    // console.log(ids);
    // console.log(labels);
    // console.log(parents);


    this.data.forEach(element => {
      ids.push(element.id);
      labels.push(element.name);
      parents.push(element.department);
    });



    var data = [{
      type: "sunburst",
      // type: "treemap",
      ids: ids,
      labels: labels,
      parents: parents,
      // outsidetextfont: { size: 20, color: "#377eb8" },
      // // leaf: {opacity: 0.4},
      // marker: { line: { width: 2 } },
      pathbar: {
        edgeshape: ">",
        side: "top"
      }
    }];

    var layout = {
      margin: { l: 0, r: 0, b: 0, t: 0 },
      sunburstcolorway: ["#636efa", "#ef553b", "#00cc96"],
    };


    Plotly.newPlot('sunburst', data, layout);


    (document.getElementById('sunburst') as any).on('plotly_restyle', this.eventReaction.bind(this));
    (document.getElementById('sunburst') as any).on('plotly_doubleclick', this.eventReaction.bind(this));
   // (document.getElementById('sunburst') as any).on('plotly_hover', this.eventReaction.bind(this));
    (document.getElementById('sunburst') as any).on('plotly_selected', this.eventReaction.bind(this));
    (document.getElementById('sunburst') as any).on('plotly_deselect', this.eventReaction.bind(this));
    (document.getElementById('sunburst') as any).on('plotly_legendclick', this.eventReaction.bind(this));
    (document.getElementById('sunburst') as any).on('plotly_legenddoubleclick', this.eventReaction.bind(this));
    (document.getElementById('sunburst') as any).on('plotly_sunburstclick', this.eventReaction.bind(this));
    (document.getElementById('sunburst') as any).on('plotly_treemapclick', this.eventReaction.bind(this));



  }

  eventReaction(event: any) {
    console.log(event);
  }

}

import { Lecturer } from 'src/app/model/lecturer';
import { PublicationService } from './../../../service/publication.service';
import { TreeNode } from './../../../model/tree-node';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-sunburst',
  templateUrl: './d3-sunburst.component.html',
  styleUrls: ['./d3-sunburst.component.scss']
})
export class D3SunburstComponent implements OnInit {

  private dataTree: (TreeNode | Lecturer) = new TreeNode("");
  private figure = d3.select("figure#sunburst");

  private width = 800;
  private radius = this.width / 6;

  constructor(private publicationService: PublicationService) {
    publicationService.lecturerTree.subscribe(data => {
      this.dataTree = data;
      console.log("Fetched tree");
      console.log(data);
      console.log(this.dataTree);
      this.getSvg();
      this.drawPlot();
    });
  }

  ngOnInit(): void {
  }

  private getSvg(): void {
    this.figure = d3.select("figure#sunburst");

    const svg = this.figure
      .append("svg")
      .attr("viewBox", [0, 0, this.width, this.width])
      .style("font", "10px sans-serif");

    const g = svg.append("g")
      .attr("transform", `translate(${this.width / 2},${this.width / 2})`);

    const root = this.partition();
    // console.log(root);
    // root.each(d => d.current = d);
    root.each((d: { data: any }) => {

      const path = g.append("g")
        .selectAll("path")
        .data(root.descendants().slice(1))
        .join("path")
        .attr("fill-opacity", d => d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0 ? (d.children ? 0.6 : 0.4) : 0)
        .attr("pointer-events", d => d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0 ? "auto" : "none")
        .attr("d", (d) => {
          return d3.arc()
            .startAngle(d.x0)
            .endAngle(d.x1)
            .padAngle(Math.min((d.x1 - d.x0) / 2, 0.005))
            .padRadius(this.radius * 1.5)
            .innerRadius(d.y0 * this.radius)
            .outerRadius(Math.max(d.y0 * this.radius, d.y1 * this.radius - 1))
        } );

      // path.append("title")
      //   // .text(`${d.ancestors().map(d.data.name).reverse().join("/")}\n${d3.format(d.value)}`);
      //   .text("TEst");

      const label = g.append("g")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .style("user-select", "none")
        .selectAll("text")
        .data(root.descendants().slice(1))
        .join("text")
          .attr("dy", "0.35em")
          .attr("fill-opacity", d => +this.labelVisible(d))
          .attr("transform", d => this.labelTransform(d))
          .text(d.data.name);


    });




  }

  drawPlot() {

  }

  partition() {
    const root = d3.hierarchy(this.dataTree)
    //.sum(d => d.totalPubs)
    //.sort((a, b) => b.totalPubs - a.totalPubs);
    return d3.partition()
      .size([2 * Math.PI, root.height + 1])
      (root);
  }

  arcVisible(d: { y1: number; y0: number; x1: number; x0: number; }) {
    return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
  }

  labelVisible(d: { y1: number; y0: number; x1: number; x0: number; }) {
    return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
  }

  labelTransform(d: { x0: any; x1: any; y0: any; y1: any; }) {
    const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
    const y = (d.y0 + d.y1) / 2 * this.radius;
    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
  }

  arc(d: any) {
    return d3.arc()
      .startAngle(d.x0)
      .endAngle(d.x1)
      .padAngle(Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(this.radius * 1.5)
      .innerRadius(d.y0 * this.radius)
      .outerRadius(Math.max(d.y0 * this.radius, d.y1 * this.radius - 1))
  }




}

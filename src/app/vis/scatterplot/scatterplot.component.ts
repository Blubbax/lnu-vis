import { Component, OnInit, Input } from '@angular/core';

declare const Plotly : any;

@Component({
  selector: 'app-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.scss']
})
export class ScatterplotComponent implements OnInit {

  @Input() data : any[] = [];

  @Input() xAttribute : string = '';
  @Input() yAttribute : string = '';
  @Input() categoricalAttribute : string = '';
  @Input() title : string = '';

  private categories: Set<string|number> = new Set();
  private selectedCategories: Set<string|number> = new Set();

  private selectedObj: any;
  private cntTraces = 0;
  private attributeTraces = 0;


  constructor() { }

  ngOnInit(): void {
    this.drawPlot();

    // this.carService.selectedCar.subscribe(car => {

    //   this.selectedObj = car;
    //   console.log(car)
    //   if (car !== undefined) {
    //       this.setSelection();
    //   } else {
    //     this.removeSelection();
    //   }
    //   var timer = window.setTimeout(function(){ }, 20);
    // });
  }

  drawPlot() {

    var data = [];
    this.cntTraces = 0;

    if (this.categoricalAttribute == '') {
      var trace1 = {
        x: this.data.map(x => x[this.xAttribute]),
        y: this.data.map(x => x[this.yAttribute]),
        mode: 'markers',
        type: 'scatter',
        name: 'Data',
        marker: { size: 12 }
      };
      data.push(trace1);
      this.cntTraces += 1;
    } else {

      this.categories = new Set(this.data.map(car => car[this.categoricalAttribute]));
      this.categories.forEach(value => {

        this.selectedCategories.add(value);

        var dataValues = this.data.filter(car => {
          return car[this.categoricalAttribute] == value;
        });

        var trace = {
          x: dataValues.map(x => x[this.xAttribute]),
          y: dataValues.map(x => x[this.yAttribute]),
          mode: 'markers',
          type: 'scatter',
          name: value,
          marker: { size: 12 }
        };
        this.cntTraces += 1;
        data.push(trace);
      })

    }

    this.attributeTraces = this.cntTraces;


    var layout = {
      xaxis: {
        // range: this.carService.getRange(this.xAttribute),
        title: this.xAttribute,
        autorange: true
      },
      yaxis: {
        // range: this.carService.getRange(this.yAttribute),
        title: this.yAttribute,
        autorange: true
      },
      title: this.title,
      autoscale: true
    };

    var config = {responsive: true}

    Plotly.newPlot('scatterplot', data, layout, config);

    // this.carService.setScatterPlotSelection(this.data);

    if (this.selectedObj !== undefined) {
     // this.setSelection();
    }


    // (document.getElementById('scatterplot') as any).on('plotly_hover', this.onDataHovering.bind(this));
    // (document.getElementById('scatterplot') as any).on('plotly_selected', this.onDataBrushing.bind(this));
    // (document.getElementById('scatterplot') as any).on('plotly_deselect', this.onDataBrushingReset.bind(this));
    // (document.getElementById('scatterplot') as any).on('plotly_legendclick', this.onLegendSelection.bind(this));
    // (document.getElementById('scatterplot') as any).on('plotly_legenddoubleclick', this.onLegendSelectionReset.bind(this));
  }

  // onDataBrushing(event:any) {

  //   var selection: Car[] = [];

  //   if (event == undefined) {
  //     this.carService.setScatterPlotSelection(this.data);
  //     return;
  //   }

  //   event.points.forEach((point: { x: string | number; y: string | number; }) => {
  //     this.data
  //       .filter(car => {
  //         if (car[this.xAttribute as keyof Car] == point.x && car[this.yAttribute as keyof Car] == point.y) {
  //           if (this.categoricalAttribute != "") {
  //             if (this.selectedCategories.has(car[this.categoricalAttribute as keyof Car])) {
  //               return true;
  //             }
  //           } else {
  //             return true;
  //           }
  //         }
  //         return false;
  //       })
  //       .forEach(car => {
  //         if (!selection.includes(car)) {
  //           selection.push(car);
  //         }
  //       });
  //   });

  //   this.carService.setScatterPlotSelection(selection);

  // }

  // onDataHovering(event:any) {
  //   var car = this.data
  //     .filter(car => car[this.xAttribute as keyof Car] == event.points[0].x && car[this.yAttribute as keyof Car] == event.points[0].y)[0];

  //   if (car != this.selectedObj)
  //     this.carService.selectCar(car);
  // }

  // onDataBrushingReset(event: any) {
  //   if (this.categoricalAttribute != "") {
  //     this.filterLegendSelection();
  //   } else {
  //     this.carService.setScatterPlotSelection(this.data);
  //   }
  // }

  // onLegendSelection(event: any) {

  //   var selectedIndex:number = event.curveNumber;
  //   var selectedCategory = Array.from(this.categories)[selectedIndex];

  //   if (this.selectedCategories.has(selectedCategory)) {
  //     this.selectedCategories.delete(selectedCategory);
  //   } else {
  //     this.selectedCategories.add(selectedCategory);
  //   }

  //   this.filterLegendSelection();
  // }

  // onLegendSelectionReset(event: any) {

  //   var selectedIndex:number = event.curveNumber;
  //   var selectedCategory = Array.from(this.categories)[selectedIndex];

  //   if (this.selectedCategories.has(selectedCategory)) {
  //     if (this.selectedCategories.size > 1) {
  //       // add just this one
  //       this.selectedCategories.clear();
  //       this.selectedCategories.add(selectedCategory);
  //     } else {
  //       this.categories.forEach(cat => this.selectedCategories.add(cat));
  //     }
  //   } else {
  //     // add all
  //     this.categories.forEach(cat => this.selectedCategories.add(cat));
  //   }

  //   this.filterLegendSelection();
  // }

  // filterLegendSelection() {

  //   var selection: Car[] = []

  //   this.data.forEach(car => {
  //     if (this.selectedCategories.has(car[this.categoricalAttribute as keyof Car])) {
  //       selection.push(car);
  //     }
  //   });

  //   this.carService.setScatterPlotSelection(selection);

  // }


  // changeXaxis(attrtibute: string) {
  //   this.xAttribute = attrtibute;
  //   this.drawPlot();
  // }

  // changeYaxis(attribute: string) {
  //   this.yAttribute = attribute;
  //   this.drawPlot();
  // }

  // changeCategoricalAxis(attribute: string) {
  //   this.categoricalAttribute = attribute;
  //   this.drawPlot();
  // }


  // setSelection() {

  //   this.removeSelection();

  //   if (this.selectedObj !== undefined) {
  //     var trace = {
  //       x: [this.selectedObj[this.xAttribute as keyof Car]],
  //       y: [this.selectedObj[this.yAttribute as keyof Car]],
  //       mode: 'markers',
  //       type: 'scatter',
  //       name: 'Selection',
  //       marker: { size: 20, color: 'red',
  //         line: {
  //           color: 'black',
  //           width: 2
  //         }
  //       }
  //     };

  //     this.cntTraces += 1;
  //     Plotly.addTraces('scatterplot'+this.viewId, [trace]);
  //   }
  // }

  // removeSelection() {
  //   console.log("before");
  //   console.log(this.cntTraces + "   " + this.attributeTraces);
  //   while (this.cntTraces > this.attributeTraces &&  this.cntTraces > 1) {
  //     this.cntTraces -= 1;
  //     Plotly.deleteTraces('scatterplot'+this.viewId, -1);
  //     console.log("remove selection")
  //   }
  //   console.log("after");
  //   console.log(this.cntTraces + "   " + this.attributeTraces);

  // }

}

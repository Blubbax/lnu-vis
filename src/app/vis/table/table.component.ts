import { Type } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() data: any[] = [];
  @Input() attributes: string[] = [];
  @Input() selectedAttributes: string[] = [];

  selectedObjects: [] = [];

  private currentSortAttribute: string = '';

  constructor() {

  }

  ngOnInit(): void {
  }

  getAttributeOfObj(obj: any, attribute: string): any {
    return obj[attribute];
  }

  selectObj(obj: any) {

  }

  sort(attribute: string) {
    if (this.currentSortAttribute == attribute) {
      this.data.reverse();
    } else {
      this.data.sort((objA, objB) => {
        if (objA[attribute] < objB[attribute]) {
          return -1;
        } else if (objA[attribute] > objB[attribute]) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    this.currentSortAttribute = attribute;
  }




}

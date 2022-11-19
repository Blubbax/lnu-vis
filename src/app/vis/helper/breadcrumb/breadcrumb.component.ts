import { Lecturer } from 'src/app/model/lecturer';
import { TreeNode } from './../../../model/tree-node';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() dataElement: TreeNode | Lecturer | null = null;
  breadcrumItems: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }



  ngOnChanges() {
    this.breadcrumItems = [];

    var currentElement = this.dataElement;
    while (currentElement != null) {
      this.breadcrumItems.push(currentElement.name);
      currentElement = currentElement.parent;
    }

    this.breadcrumItems.reverse();

  }



}

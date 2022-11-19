import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb-item',
  templateUrl: './breadcrumb-item.component.html',
  styleUrls: ['./breadcrumb-item.component.scss']
})
export class BreadcrumbItemComponent implements OnInit {

  @Input() text: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}

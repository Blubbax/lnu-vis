import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { VisualizationComponent } from './components/visualization/visualization.component';
import { TableComponent } from './vis/table/table.component';
import { AttributeSelectorComponent } from './vis/helper/attribute-selector/attribute-selector.component';
import { AttributePillComponent } from './vis/helper/attribute-pill/attribute-pill.component';
import { SunburstComponent } from './vis/sunburst/sunburst.component';
import { D3SunburstComponent } from './vis/d3/d3-sunburst/d3-sunburst.component';
import { BreadcrumbComponent } from './vis/helper/breadcrumb/breadcrumb.component';
import { BreadcrumbItemComponent } from './vis/helper/breadcrumb-item/breadcrumb-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    VisualizationComponent,
    TableComponent,
    AttributeSelectorComponent,
    AttributePillComponent,
    SunburstComponent,
    D3SunburstComponent,
    BreadcrumbComponent,
    BreadcrumbItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { VisualizationComponent } from './components/visualization/visualization.component';
import { TableComponent } from './vis/table/table.component';
import { AttributeSelectorComponent } from './vis/helper/attribute-selector/attribute-selector.component';
import { AttributePillComponent } from './vis/helper/attribute-pill/attribute-pill.component';
import { SunburstComponent } from './vis/sunburst/sunburst.component';
import { ViolinComponent } from './vis/violin/violin.component';
import { ScatterplotComponent } from './vis/scatterplot/scatterplot.component';
import { D3SunburstComponent } from './vis/d3/d3-sunburst/d3-sunburst.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    VisualizationComponent,
    TableComponent,
    AttributeSelectorComponent,
    AttributePillComponent,
    SunburstComponent,
    ViolinComponent,
    ScatterplotComponent,
    D3SunburstComponent
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

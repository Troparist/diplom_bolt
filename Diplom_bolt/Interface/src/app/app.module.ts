import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GOSTComponent } from './gost/gost.component';
import { Gost21558970Component } from './gost21558970/gost21558970.component';
import { Gost1559070Component } from './gost1559070/gost1559070.component';
import { Gost1559170Component } from './gost1559170/gost1559170.component';
import { Gost7798Component } from './gost7798/gost7798.component';
import { Gost7811Component } from './gost7811/gost7811.component';

@NgModule({
  declarations: [
    AppComponent,
    GOSTComponent,
    Gost21558970Component,
    Gost1559070Component,
    Gost1559170Component,
    Gost7798Component,
    Gost7811Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GOSTComponent } from './gost/gost.component';
import { Gost21558970Component } from './gost21558970/gost21558970.component';

const routes: Routes = [
  { path: 'gost', component: GOSTComponent },
  { path: 'gost21558970', component: Gost21558970Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

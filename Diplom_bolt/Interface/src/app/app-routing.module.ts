import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GOSTComponent } from './gost/gost.component';
import { Gost21558970Component } from './gost21558970/gost21558970.component';
import { Gost1559070Component } from './gost1559070/gost1559070.component';
import { Gost1559170Component } from './gost1559170/gost1559170.component';
import { Gost7798Component } from './gost7798/gost7798.component';
import { Gost7811Component } from './gost7811/gost7811.component';

const routes: Routes = [
  { path: 'gost', component: GOSTComponent },
  { path: 'gost-215589-70', component: Gost21558970Component },
  { path: 'gost-15590-70', component: Gost1559070Component },
  { path: 'gost-15591-70', component: Gost1559170Component },
  { path: 'gost-7798', component: Gost7798Component },
  { path: 'gost-7811', component: Gost7811Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

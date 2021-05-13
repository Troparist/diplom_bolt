import { Component, Type } from '@angular/core';
import { GostsService } from './services/gosts.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Interface';
  gosts: any[];
  gost: any;
  diameters: any[];
  lenghts: any[];
  data: any[];
  param_d: string;
  param_d1: string;
  param_S: string;
  param_k: string;
  param_e: string;
  param_dw: string;
  param_d3: string;
  param_d4: string;
  param_l2: string;
  param_h: string;
  param_l: string;
  param_l1: string;
  param_b: string;
  TypeGosts: any[];
  selectedDiameter: any;
  constructor(private gostsService: GostsService){

  }

  async ngOnInit(){
    //await this.getGosts();
    await this.getDiameters();
  }

  async getGosts(){
    try{
      let gosts = this.gostsService.getAllGosts()
      this.gosts =  await gosts;
    }
    catch(err){
      console.error(err);
    }
  }

  async getDiameters(){
    try{
      let diameters = this.gostsService.getDiameters()
      this.diameters =  await diameters;
      console.log(this.diameters);
    }
    catch(err){
      console.error(err);
    }
  }

  onChangeD(diameter) {
    console.log(diameter);
    this.getLenghts(diameter);
  }

  async getLenghts(d){
    try{
      let lenghts = this.gostsService.getLenghts(d);
      this.lenghts =  await lenghts;
      console.log(this.lenghts);
    }
    catch(err){
      console.error(err);
    }
  }

  onChangeL(lenght) {
    console.log(lenght);
    this.getData(this.selectedDiameter, lenght)
  }

  async getData(d, l){
    try{
      let data = this.gostsService.getData(d, l);
      this.data =  await data;
      this.param_d = this.data[0][0].d;
      this.param_d1 = this.data[0][0].d1;
      this.param_S = this.data[0][0].S;
      this.param_k = this.data[0][0].k;
      this.param_e = this.data[0][0].e;
      this.param_dw = this.data[0][0].dw;
      this.param_d3 = this.data[0][0].d3;
      this.param_d4 = this.data[0][0].d4;
      this.param_l2 = this.data[0][0].l2;
      this.param_h = this.data[0][0].h;
      this.param_l = this.data[1][0].l;
      this.param_l1 = this.data[1][0].l1;
      this.param_b = this.data[1][0].b;
      console.log(this.data);
    }
    catch(err){
      console.error(err);
    }
  }

  async getTypeGOSTS(gost){
    this.gost = gost;
    try{
      let TypeGosts = this.gostsService.getGostParams(gost.GOST,gost.ID)
      this.TypeGosts =  await TypeGosts;
    }
    catch(err){
      console.error(err);
    }
  }

  insertFile() {
    var properties = {
      // "PartNumber": "",
      // "PartName": this.gost.GOST + " " + TypeGost.NUMBER,
      // "Description": ""

      "PartNumber": "",
      "PartName": "Bolt 2 15589-70 2000",
      "Description": ""
    }
    // window.location.href = "fusion360://command=insert&file=" + encodeURIComponent(this.gost.MODEL_URL) +
    //   "&properties=" + encodeURIComponent(JSON.stringify(properties)) +
    //   "&privateInfo=" + encodeURIComponent(this.setString(TypeGost)) +
    //   "&id=" + encodeURIComponent(this.gost.GOST + " " + TypeGost.NUMBER); 

    window.location.href = "fusion360://command=insert&file=" + encodeURIComponent("http://127.0.0.1:4200/assets/bolt_2_15589-70_th.f3d") +
      "&properties=" + encodeURIComponent(JSON.stringify(properties)) +
      "&privateInfo=" + encodeURIComponent(this.setString()) +
      "&id=" + encodeURIComponent(Date.now().toString()); 
  }

  setString() {
    var str = JSON.stringify({
      //"GOST": "ПРАВРПАП",
      "d" : this.param_d,
      "d1" : this.param_d1,
      "S" : this.param_S,
      "k" : this.param_k,
      "e" : this.param_e,
      "dw" : this.param_dw,
      "d3" : this.param_d3,
      "d4" : this.param_d4,
      "l2" : this.param_l2,
      "h" : this.param_h,
      "l" : this.param_l,
      "l1" : this.param_l1,
      "b" : this.param_b
    });
    return str;
  }
}

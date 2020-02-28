import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product-public',
  templateUrl: './product-public.component.html',
  styleUrls: ['./product-public.component.css']
})
export class ProductPublicComponent implements OnInit {

  make3D:string[];
  noOfItems:number;

  constructor(
    public _apiService:ApiService,
    public _router:Router
  ) { }

  ngOnInit() {
    if(this._apiService.loggedIn()){
      this._router.navigate(['/dashboard']);
    }
    else{
      this.make3D = [];
      this.noOfItems = 9;
    }
  }

  changeStyle($event,index){
    this.make3D[index] = $event.type == 'mouseover' ? 'make3D animate' : 'make3D';
    if($event.type == 'mouseout'){
      this.make3D = [];
    }
  }

  createRange(number){
    let items: number[] = [];
    for(let i = 0; i < number; i++){
       items.push(i);
       this.make3D.push("make3D");
    }
    return items;
  }
}

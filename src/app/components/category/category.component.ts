import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() categories: any;
  @Input() id: number;
  @Input() type: any;

  firstCategory: any;
  secondCategory: any;
  initCategories: any;
  restCategories: any;
  showAll: boolean = false;
  randomString: string;
  show: boolean = false;

  constructor(
    public _sanitizer: DomSanitizer,
    public _common: CommonService
  ) {
    this.randomString = '';
  }

  ngOnInit() {
    if (this.categories) {
      if (this.categories.length > 0) {
        this.firstCategory = this.categories[0];
        if (this.categories.length > 1) {
          this.secondCategory = this.categories[1];
          if (this.categories.length > 2) {
            this.randomString = this._common.randomString();
            this.restCategories = this.categories.slice(2);
            /*if(this.restCategories.length>3){
              this.restCategories=this.categories.slice(0,3);
            }*/
          }
        }
      }
    }


    /*if(this.categories.length>2){
      this.initCategories = this.categories.slice(0,3);
      if(this.categories.length>3){
        this.restCategories = this.categories.slice(3,this.categories.length);
      }
      console.log("id: ", this.id);
      console.log("init:", this.initCategories);
      console.log("rest: ",this.restCategories);
    }
    else{
      this.initCategories = this.categories;
    }
    this.randomString = this._common.randomString();*/
  }

  safeStyle(style) {
    return this._sanitizer.bypassSecurityTrustStyle(style);
  }

}

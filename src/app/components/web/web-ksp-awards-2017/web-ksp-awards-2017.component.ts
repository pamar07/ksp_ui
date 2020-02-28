import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-web-ksp-awards-2017',
  templateUrl: './web-ksp-awards-2017.component.html',
  styleUrls: ['./web-ksp-awards-2017.component.css']
})
export class WebKspAwards2017Component implements OnInit {

  categories:any;
  singleRunner:any;
  doubleRunner:any;

  constructor(public _apiService:ApiService) {}

  ngOnInit() {
    window.scrollTo(0,0);

    // this._apiService.getCategorywiseWinnerList().subscribe(ret=>{
    //   let $ret = ret.ret;
    //   if($ret.code == 1){
    //     this.winner_list = $ret.data;
    //   }
    // },err=>{
    // });

    this._apiService.getAwardWinnerRunnerUPList().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        let j = -1;
        this.singleRunner = [];
        for(let i=0; i<$ret.data.length; i++){
          if($ret.data[i].category_id!=8 && $ret.data[i].category_id!=11){
            this.singleRunner[++j] = $ret.data[i];
          }
        }
        this.doubleRunner = $ret.data.filter(item => (item.category_id==8 || item.category_id==11));
        this.categories = this.singleRunner.concat(this.doubleRunner);

      }
    },err=>{
    });
  }

}

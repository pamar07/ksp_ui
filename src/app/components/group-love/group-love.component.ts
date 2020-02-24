import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-group-love',
  templateUrl: './group-love.component.html',
  styleUrls: ['./group-love.component.css']
})
export class GroupLoveComponent implements OnInit {

  @Input() loveData:any;
  @Input() entityType:any;
  @Input() entityId:any;
  @Input() loveCount:number;

  isLoved:boolean = false;
  loveHoverText:string;

  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _router:Router,
  ) { }

  ngOnInit() {
    if(this.loveData.length>0){
      this.isLoved = true;
      this.loveHoverText = 'You already love this post';
    }
    else{
      this.loveHoverText = 'Let us know if you love this post';
    }
  }

  doLove(){
    if(this._apiService.loggedIn()){
      this._apiService.doLove(this.entityType,this.entityId).subscribe(ret=>{
        let $ret = ret.ret;
        console.log("TYPE ",this.entityType);
        console.log("ID ",this.entityId);
        console.log($ret);
        if($ret.code == 1){
          this.isLoved = !this.isLoved;
          if(this.isLoved){
            this.loveCount++;
            this.loveHoverText = 'You already love this post';
          }
          else{
            this.loveCount--;
            this.loveHoverText = 'Let us know if you love this post';
          }
        }
      },err=>{
      });
    }
    else{
      this._router.navigate(['/pre-login-register']);
    }
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-comments-like',
  templateUrl: './comments-like.component.html',
  styleUrls: ['./comments-like.component.css']
})
export class CommentsLikeComponent implements OnInit {

  @Input() isLoved:any;
  @Input() entityType:any;
  @Input() commentId:any;
  @Input() entityId:any;
  @Input() loveCount:number;
  @Input() isBlack:boolean;
  @Input() isSmall:boolean;
  @Input() permaLink:any;

  loveHoverText:string;

  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _router:Router,
    public _route:ActivatedRoute,
    public _sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      if(this.isLoved){
        this.loveHoverText = 'You already love this comment';
      }
      else{
        this.loveHoverText = 'Let us know if you love this comment';
      }
    });
  }

  doLove(){
    if(this._apiService.loggedIn()){
      this._apiService.doLoveComment(this.entityType,this.commentId).subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          this.isLoved = !this.isLoved;
          if(this.isLoved){
            this.loveCount++;
            this.loveHoverText = 'You already love this comment';
          }
          else{
            this.loveCount--;
            this.loveHoverText = 'Let us know if you love this comment';
          }
        }
        else{
        }
      },err=>{
      });
    }
    else{
      this._commonService.setNavigationUrl(this.entityType,this.entityId,this.permaLink);
    }
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';


@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  @Input() bookmarkData:any;
  @Input() entityType:any;
  @Input() entityId:any;
  @Input() bookmarkCount:number;
  @Input() className:string;
  @Input() classTooltip:string;
  @Input() noBackground:boolean;
  @Input() noCount:boolean;
  @Input() isSmall:boolean;
  @Input() permaLink:any = '';

  @Output() update = new EventEmitter();

  isBookmarked:boolean = false;
  bookmarkHoverText:string;

  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _router:Router,
  ) { }

  ngOnInit() {
    if(this.bookmarkData.length>0){
      this.isBookmarked = true;
      this.bookmarkHoverText = 'You already bookmarked';
    }
    else{
      this.bookmarkHoverText = 'Click here to bookmark';
    }
  }

  doBookmark(){
    if(this._apiService.loggedIn()){

      this._apiService.doBookmark(this.entityType,this.entityId).subscribe(ret=>{
        let $ret = ret.ret;

        if($ret.code == 1){
          this.isBookmarked = !this.isBookmarked;
          if(this.isBookmarked){
            this.bookmarkCount++;
            this.bookmarkHoverText = 'You already bookmarked';
          }
          else{
            this.bookmarkCount--;
            this.bookmarkHoverText = 'Click here to bookmark';
          }
          this.update.emit({'status':this.isBookmarked});
        }
      },err=>{
      });
    }
    else{
      this._commonService.setNavigationUrl(this.entityType,this.entityId,this.permaLink);
      // this._router.navigate(['/pre-login-register']);
    }
  }

}

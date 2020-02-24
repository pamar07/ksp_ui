import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-mobile-contributor',
  templateUrl: './mobile-contributor.component.html',
  styleUrls: ['./mobile-contributor.component.css']
})
export class MobileContributorComponent implements OnInit {

  members:any;

  constructor(
    public _apiService:ApiService,
    public _sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this._apiService.getContributors().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.members = $ret.data;
        try{
          for(let i=0; i<this.members.length; i++){
            this.members[i].desc = this.members[i].desc.split("<a ").join("<a style='color:#34495E;!important; text-decoration:none;'");
            this.members[i].desc = this.safeHtml(this.members[i].desc);
          }
        }
        catch(e){}
      }else{
        this.members = [];
      }
    },err=>{
    });
  }

  safeUrl(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

}

import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-web-team',
  templateUrl: './web-team.component.html',
  styleUrls: ['./web-team.component.css']
})
export class WebTeamComponent implements OnInit {

  members:any;

  constructor(
    public _apiService:ApiService,
    public _sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this._apiService.getTeamMembers().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.members = $ret.data;
        try{
          for(let i=0; i<this.members.length; i++){
            this.members[i].desc = this.members[i].desc.split("<a ").join("<a style='color:#fff;!important; text-decoration:underline;'");
            this.members[i].desc = this.safeHtml(this.members[i].desc);
          }
        }
        catch(e){}
        this.members = this.uniqueMembers(this.members);
        this.members = this.members.filter(item => (item.name != "KSP Team" && item.name != "KSP Promotions"));
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

  uniqueMembers(arr) {
  	let hashTable = {};
  	return arr.filter(function (el) {
  		let key = JSON.stringify(el.name);
  		let match = Boolean(hashTable[key]);
  		return (match ? false : hashTable[key] = true);
  	});
  }

}

import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-web-custom-result',
  templateUrl: './web-custom-result.component.html',
  styleUrls: ['./web-custom-result.component.css']
})
export class WebCustomResultComponent implements OnInit {

  articles:any;
  tvs:any;
  radios:any;
  events:any;
  camps:any;
  loading:boolean = true;

  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _sanitizer: DomSanitizer,
    public _route: ActivatedRoute,
    private router:Router
  ) {
    this.articles = [];
    this.tvs = [];
    this.radios = [];
    this.events = [];
    this.camps = [];
  }

  ngOnInit() {
    this.articles = [];
    this.tvs = [];
    this.radios = [];
    this.events = [];
    this.camps = [];
    
    /* Get category id from the url.*/
    this._route.params.subscribe(params => {
      let id = params['id'];
      let type = params['type'];

      if(id && type) {
        let data = {'type' :type, 'id': id};
        this._apiService.fetchCustomResults(data).subscribe(resp=>{
          let $ret = resp.ret;
          if($ret.code == 1) {
            this.loading = false;
            if($ret.data.articles) {
              this.articles  = $ret.data.articles.filter(function(item){ return item.post_type == 'post'});
              this.tvs       = $ret.data.articles.filter(function(item){ return item.post_type == 'videos'});
              this.radios    = $ret.data.articles.filter(function(item){ return item.post_type == 'ksp-radio'});
            }

            if($ret.data.events){
              this.events    = $ret.data.events.filter(function(item){ return item.isSummerEvent == 0});
              this.camps     = $ret.data.events.filter(function(item){ return item.isSummerEvents == 1});  
            }
            
          } else {
            this.router.navigateByUrl('/home');    
          }
        }); 
      } else {
        this.router.navigateByUrl('/home');
      }
    });
  }

  safeUrl(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  
  stopPropagation(e){
    e.stopPropagation();
  }

}

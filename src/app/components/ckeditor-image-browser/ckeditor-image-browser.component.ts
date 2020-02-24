import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ckeditor-image-browser',
  templateUrl: './ckeditor-image-browser.component.html',
  styleUrls: ['./ckeditor-image-browser.component.css']
})
export class CkeditorImageBrowserComponent implements OnInit {

  images:any;

  constructor(
    public _apiService:ApiService
  ) { }

  ngOnInit() {
    this._apiService.filebrowserBrowseUrl().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.images = $ret.data;
      }else{
        this.images = [];
      }
    },err=>{
    });
  }

  insertImage(path){
    //console.log(path);
    var CkEditorImageBrowser = {ckFunctionNum:1};
    window.opener.CKEDITOR.tools.callFunction(CkEditorImageBrowser.ckFunctionNum, path);
  	window.close();
  }

}

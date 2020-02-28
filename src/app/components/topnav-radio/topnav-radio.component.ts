import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-topnav-radio',
  templateUrl: './topnav-radio.component.html',
  styleUrls: ['./topnav-radio.component.css']
})
export class TopnavRadioComponent implements OnInit {


  currentPath:any;
  currentTab:any;
  lists:any;

  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _router:Router,
    public _activatedRoute:ActivatedRoute,
    public _sanitizer: DomSanitizer
  ) {
    this.currentPath = '';
  }

  ngOnInit() {
    this.loadRadio();
  }

  loadRadio(){
    this.currentPath = this.safeUrl('https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/346066943');
    this._apiService.getPlaylistRadio().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1) {
        this.lists = $ret.data;
        this.currentTab = 0;
        for(let i=0; i<$ret.data.length; i++){
          this._apiService.getPlaylistTracks(this.lists[i].id).subscribe(retTracks=>{
            let $retTracks = retTracks.ret;
            if($retTracks.code == 1) {
              this.lists[i].tracks = $retTracks.data.clips;
              this.lists[i].tracks.playing = false;
              if(i==0){
                try{
                  var re = /visual=true/;
                  this.currentPath = this.safeUrl(this.lists[i].tracks[0].path.replace(re,''));
                }
                catch(e){
                  this.currentPath = this.safeUrl('https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/346066943');
                }
              }
            }
          },err=>{

          });
        }
      }
    },err=>{
    });

  }

  openTab(index){
    this.currentTab = index;
  }

  stopPropagation(e){
    e.stopPropagation();
  }

  safeUrl(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  setRadio(id,url,title){
    for(let i=0; i<this.lists.length; i++){
      for(let j=0; j<this.lists[i].tracks.length; j++){
        if(this.lists[i].tracks[j].id == id){
          this.lists[i].tracks[j].playing = !this.lists[i].tracks[j].playing;
          if(this.lists[i].tracks[j].playing){
            this._commonService.setCurrentRadioPath(url,title);
          }
          else{
            this._commonService.radioPlaying = false;
          }
        }
        else{
          this.lists[i].tracks[j].playing = false;
        }
      }
    }
  }
}

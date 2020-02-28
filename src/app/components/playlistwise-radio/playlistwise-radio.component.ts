import { Component, OnInit,Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-playlistwise-radio',
  templateUrl: './playlistwise-radio.component.html',
  styleUrls: ['./playlistwise-radio.component.css']
})
export class PlaylistwiseRadioComponent implements OnInit {

  id:number;
  playlist:any;
  playlist_name:string;

  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _route: ActivatedRoute,
    public _router:Router,
    public _sanitizer: DomSanitizer
  ) {  }

  ngOnInit() {
    this._route
      .params
      .subscribe(params => {
        this.id = params['id'] || 0;
        this._apiService.getPlaylistTracks(this.id).subscribe(retTracks=>{
          let $retTracks = retTracks.ret;
          if($retTracks.code == 1) {
            this.playlist = $retTracks.data.clips;
            this.playlist_name = $retTracks.data.name;
            for(let i=0; i<this.playlist.length; i++){
              this.playlist[i].playing = false;
            }
          }
        },err=>{

        });
      });
  }

  setRadio(id,url,title){
    for(let i=0; i<this.playlist.length; i++){
      if(this.playlist[i].id == id){
        this.playlist[i].playing = !this.playlist[i].playing;
        if(this.playlist[i].playing){
          this._commonService.setCurrentRadioPath(url,title);
        }
        else{
          this._commonService.radioPlaying = false;
        }
      }
      else{
        this.playlist[i].playing = false;
      }
    }
  }

  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-soundcloud',
  templateUrl: './soundcloud.component.html',
  styleUrls: ['./soundcloud.component.css']
})
export class SoundcloudComponent implements OnInit {

  @Input() path:any;
  @Input() id:number;

  constructor(
    public _sanitizer: DomSanitizer,
    public _common: CommonService
  ) { }

  ngOnInit() {
    this.path = this.safeUrl(this.path);
  }

  safeUrl(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-app-promo',
  templateUrl: './ksp-app-promo.component.html',
  styleUrls: ['./ksp-app-promo.component.css']
})
export class kspAppPromoComponent implements OnInit {
	constructor(){
    if(/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      window.location.href = 'https://tinyurl.com/yaeuuqjq';
    } else {
      window.location.href ='https://play.google.com/store/apps/details?id=ksp.xelpmoc.project#utm_source=referral&utm_medium=ksp_mobile_site&utm_campaign=ksp_android_banner&utm_content=bottom_banner';
    }
  }
  ngOnInit() {}
}

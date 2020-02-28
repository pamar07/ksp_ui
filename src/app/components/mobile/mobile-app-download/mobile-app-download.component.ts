import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {MdDialog, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-mobile-app-download',
  templateUrl: './mobile-app-download.component.html',
  styleUrls: ['./mobile-app-download.component.css']
})
export class MobileAppDownloadComponent implements OnInit {



  appForm: FormGroup;
  mobPattern = new RegExp(/^[1-9][0-9]{4,12}$/);
  
  constructor(
  	private form:FormBuilder,
    public _apiService:ApiService,
    public dialog:MdDialog,
  ) { }

  ngOnInit() {
  	this.appForm = this.form.group({
      'mobile': [null, [Validators.required, Validators.pattern(this.mobPattern)]],
    });
  }

  submitAppForm(data){
  	this._apiService.notifyAppUser({mobile: data.mobile}).subscribe(ret=>{
      let $ret=ret.ret;
      if($ret.code == 1){
        let dialogRef = this.dialog.open(MobileAppDialog,{data:'Thank you <br /> We will notify you as IOS app is live.'});
      }
    },
    err => {
    });
  }

}

@Component({
 selector: 'dialog-messages',
 templateUrl: './dialog-messages.html',
})
export class MobileAppDialog {
 constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
}

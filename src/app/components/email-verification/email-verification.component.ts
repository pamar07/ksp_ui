import { Component, OnInit,Inject, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import {MdDialog, MD_DIALOG_DATA} from '@angular/material';



@Component({
  selector: 'email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css'],
})
export class emailVerification implements OnInit {
  	
  	token:any;
  	msgType:any;
  	msg:any;
  	constructor(
  		public _apiService:ApiService,
    	public _route: ActivatedRoute,
    	public _router:Router,
      public dialog:MdDialog,
   	) { }
  	ngOnInit() {
  		this._route.params.subscribe(params => {
      	this.token = params['token'] || 0;
      	this._apiService.verifyUser(this.token).subscribe(ret=>{
      		let $ret = ret.ret;
      		if($ret.code == 1){
      			this._apiService.storeUserData($ret.data.data.api_token, $ret.data.data);

            let dialogRef = this.dialog.open(VerificationDialog,{data:$ret.data.msg});
            dialogRef.afterClosed().subscribe(result => {
                this._router.navigate(['/dashboard']);
            });
      		} else {
        		this.msgType = 0;
        		
            let dialogRef = this.dialog.open(VerificationDialog,{data:$ret.data.msg});
            dialogRef.afterClosed().subscribe(result => {
              this._router.navigate(['/home']);
            });
      		}
          
  	    },err=>{
  	    });
    	});
  	}
}

@Component({
 selector: 'dialog-messages',
 templateUrl: './dialog-messages.html',
})
export class VerificationDialog {
 constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
}
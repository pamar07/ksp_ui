import { Component, OnInit, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
//import { FlashMessagesService } from 'angular2-flash-messages';
import {MdDialog, MD_DIALOG_DATA } from '@angular/material';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-create-new-social-post',
  templateUrl: './create-new-social-post.component.html',
  styleUrls: ['./create-new-social-post.component.css']
})
export class CreateNewSocialPostComponent implements OnInit {

  previewMode:boolean = false;
  post_title:any;
  post_content:any;
  id:any;
  event_pic_editor:any;
  uploadUrl:any;

  @ViewChild('ckeditor') ckeditor: any;
  constructor(
    public _apiService:ApiService,
    public _sanitizer: DomSanitizer,
    public _route: ActivatedRoute,
    public _router:Router,
    //public _flashMessagesService: FlashMessagesService,
    public dialog:MdDialog
  ) {
    this.post_title = '';
    this.post_content ='';
  }

  ngOnInit() {
    this._apiService.loadToken();
    //let upload_url = environment.upload_url + "?api_token=" + this._apiService.authToken;
    let upload_url = this._apiService.upload_url + "?api_token=" + this._apiService.authToken;
    this.uploadUrl = upload_url;

    this._route
      .params
      .subscribe(params => {
        this.id = params['id'] || 0;
      });
  }

  submitPost(){
    let dialogRef = this.dialog.open(CreatePostConfirmDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        this._apiService.createSocialPost(this.id,this.post_title,this.post_content).subscribe(ret=>{
          let $ret = ret.ret;
          console.log($ret);
          if($ret.code == 1){
            this._router.navigate(['/social-individual/'+this.id]);
          }
        },err=>{
        });
      }
    });
  }

  validateForm(){
    if(this.post_title.toString().trim()!=''){
      if(this.post_content != ''){
        this.previewMode = true;
      }
      else{
        let dialogRef = this.dialog.open(CreatePostDialog,{data:'Please add some content..'});
      }
    }
    else{
      let dialogRef = this.dialog.open(CreatePostDialog,{data:'Please add a title for the post..'});
    }
  }

  post = new FormGroup({
       post_title: new FormControl()
    });

  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  fileChangeEditor(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      if(file.size<=(1024*1024*5)){
        if(file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/png'){
          this._apiService.uploadEventPicture(file).subscribe(ret=>{
            let $ret = ret.ret;
            if($ret.code == 1){
              try
              {
                  let link = this.ckeditor.instance.document.createElement("img");
                  link.setAttribute("alt", "Image");
                  link.setAttribute("src", $ret.data[0]);

                  this.ckeditor.instance.insertElement(link);
              }
              catch(error)
              {
                  console.log((<Error>error).message);
              }
            } else {
              alert('Some network error occur, Please try after sometime.'); 
            }
          },err=>{
          });
        }
        else{
          alert('Please upload .jpg or .jpeg or .png type file only.');
        }
      }
      else{
        alert('File size should not be more than 5 Mb.');
      }
    }
  }
  
  openImageExplorer(event) {
    $('#event_pic_editor').trigger('click');
  }

}


@Component({
 selector: 'dialog-messages',
 templateUrl: './dialog-messages.html',
})
export class CreatePostDialog {
 constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
}



@Component({
 selector: 'dialog-messages-confirm',
 templateUrl: './dialog-messages-confirm.html',
})
export class CreatePostConfirmDialog {
 constructor() { }
}

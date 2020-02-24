import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { ApiService } from '../../../services/api.service';
import { environment } from '../../../../environments/environment';
import {MdDialog, MD_DIALOG_DATA} from '@angular/material';
import {} from '@types/googlemaps';

//declare var editorObj: any;
declare var $ :any;
declare var LatLngObj: any;

@Component({
  selector: 'app-mobile-summer-event-submit',
  templateUrl: './mobile-summer-event-submit.component.html',
  styleUrls: ['./mobile-summer-event-submit.component.css'],
  providers: [DatePipe],
})
export class MobileSummerEventSubmitComponent implements OnInit {

  cityList:any;
  categoryList:any;
  ageGroups:any;
  event_title:string;
  event_pic:any;
  start_date:any;
  start_time:any;
  end_date:any;
  end_time:any;
  participate_date:any;
  venue_name:string;
  venue_address:string;
  venue_city:string;
  venue_state:string;
  event_slot:any;
  google_map:string;
  event_cost:string;
  event_email:string;
  event_website:string;
  event_fb_link:string;
  event_contact_name:string;
  event_contact:string;
  image_path:string;
  img_extsn:string;
  content:any;
  fileUploadMessage:string;
  event_lat:any;
  event_lng:any;
  event_tags:any;
  tags:any;
  uploadUrl:any;
  isSummerEvent:any;

  hideEvent_lat:boolean = true;
  hideEvent_lng:boolean = true;


  constructor(
    public _apiService:ApiService,
    public _pipe: DatePipe,
    public dialog:MdDialog,
    public _router:Router
  ) {
    this.start_date = new Date();
    this.end_date = new Date();
    this.participate_date = "";
    this.event_title = "";
    this.event_slot = "";
    this.venue_name = "";
    this.venue_city = "";
    this.google_map = "";
    this.event_lat = "";
    this.event_lng = "";
    this.content = "";
    this.tags = [];
    this.isSummerEvent = 1;
   }

  ngOnInit() {
    this._apiService.loadToken();
    //let upload_url = environment.upload_url + "?api_token=" + this._apiService.authToken;
    let upload_url = this._apiService.upload_url + "?api_token=" + this._apiService.authToken;
    this.uploadUrl = upload_url;

    this._apiService.getCities().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.cityList = $ret.data;
      }else{
        this.cityList = [];
      }
    },err=>{
    });

    this._apiService.showEventInterests().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.categoryList = $ret.data;
        for(let i=0; i<this.categoryList.length; i++){
          this.categoryList[i].checked = false;
        }
      }else{
        this.categoryList = [];
      }
    },err=>{
    });

    this._apiService.getAgeGroups().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.ageGroups = $ret.data;
        this.ageGroups.splice(-1,1);
        for(let i=0; i<this.ageGroups.length; i++){
          this.ageGroups[i].checked = false;
        }
      }else{
        this.ageGroups = [];
      }
    },err=>{

    });
  }

  onStartDateChange(evt){
    this.start_date = evt.dateObj;
  }

  onEndDateChange(evt){
    this.end_date = evt.dateObj;
  }

  validate(){
    let formatted_start_date = '';
    let formatted_end_date = '';
    let formatted_participate_date = '';
    try{
      formatted_start_date = this._pipe.transform(new Date(this.start_date), 'yyyy-MM-dd HH:mm:ss');
      formatted_end_date = this._pipe.transform(new Date(this.end_date), 'yyyy-MM-dd HH:mm:ss');
      formatted_participate_date = this._pipe.transform(new Date(this.participate_date), 'yyyy-MM-dd HH:mm:ss');
    }
    catch(e){
      //let dialogRef = this.dialog.open(MobileSummerEventSubmitDialog,{data:'Invalid Date Format...'});
    }

    let checkedAgeGroups = '';
    for(let i=0; i < this.ageGroups.length; i++){
      if(this.ageGroups[i].checked == true){
        checkedAgeGroups = checkedAgeGroups + "," + this.ageGroups[i].id;
      }
    }
    checkedAgeGroups = checkedAgeGroups.slice(1);

    let checkedCategories = '';
    for(let i=0; i < this.categoryList.length; i++){
      if(this.categoryList[i].checked == true){
        checkedCategories = checkedCategories + "," + this.categoryList[i].id;
      }
    }
    checkedCategories = checkedCategories.slice(1);

    this.event_lat = (document.getElementById('event_lat') as HTMLInputElement).value;
    this.event_lng = (document.getElementById('event_lng') as HTMLInputElement).value;

    if(this.event_title.toString().trim()==""){
      let dialogRef = this.dialog.open(MobileSummerEventSubmitDialog,{data:'Please provide the event title...'});
    }
    else if(formatted_start_date.toString().trim()=="")
    {
      let dialogRef = this.dialog.open(MobileSummerEventSubmitDialog,{data:'Please provide the event start date and time...'});
    }
    else if(formatted_end_date.toString().trim()==""){
      let dialogRef = this.dialog.open(MobileSummerEventSubmitDialog,{data:'Please provide the event end date and time...'});
    }
    /*else if(this.event_slot.toString().trim() == ''){
      let dialogRef = this.dialog.open(MobileSummerEventSubmitDialog,{data:'Please provide the event slot...'});
    }
    else if(formatted_participate_date.toString().trim()==""){
      let dialogRef = this.dialog.open(MobileSummerEventSubmitDialog,{data:'Please provide the event participation date and time...'});
    }*/
    else if(this.venue_name.toString().trim()==""){
      let dialogRef = this.dialog.open(MobileSummerEventSubmitDialog,{data:'Please provide the event venue name...'});
    }
    else if(this.venue_city.toString().trim()==""){
      let dialogRef = this.dialog.open(MobileSummerEventSubmitDialog,{data:'Please provide the event venue city...'});
    }
    else if(this.google_map.toString().trim()==""){
      let dialogRef = this.dialog.open(MobileSummerEventSubmitDialog,{data:'Please provide the event venue address...'});
    }
    else if(this.event_lat.toString().trim()=="" || this.event_lng.toString().trim()==""){
      let dialogRef = this.dialog.open(MobileSummerEventSubmitDialog,{data:'Please fetch the latitude and longitude by clicking on the Fetch Location button...'});
    }
    else if(this.content.toString().trim()==""){
      let dialogRef = this.dialog.open(MobileSummerEventSubmitDialog,{data:'Please provide the event content...'});
    }
    else if(checkedAgeGroups == ''){
      let dialogRef = this.dialog.open(MobileSummerEventSubmitDialog,{data:'Please select atleast one age group based on this event...'});
    }
    else if(checkedCategories == ''){
      let dialogRef = this.dialog.open(MobileSummerEventSubmitDialog,{data:'Please select atleast one interest category based on this event...'});
    }
    else{
      this.submitEvent();
    }
  }

  submitEvent(){
    let formatted_start_date = this._pipe.transform(new Date(this.start_date), 'yyyy-MM-dd HH:mm:ss');
    let formatted_end_date = this._pipe.transform(new Date(this.end_date), 'yyyy-MM-dd HH:mm:ss');
    //let formatted_participate_date = this._pipe.transform(new Date(this.participate_date), 'yyyy-MM-dd HH:mm:ss');
    let user = JSON.parse(localStorage.getItem('user'));
    let checkedAgeGroups = '';
    for(let i=0; i < this.ageGroups.length; i++){
      if(this.ageGroups[i].checked == true){
        checkedAgeGroups = checkedAgeGroups + "," + this.ageGroups[i].id;
      }
    }
    checkedAgeGroups = checkedAgeGroups.slice(1);

    let checkedCategories = '';
    for(let i=0; i < this.categoryList.length; i++){
      if(this.categoryList[i].checked == true){
        checkedCategories = checkedCategories + "," + this.categoryList[i].id;
      }
    }
    checkedCategories = checkedCategories.slice(1);

    this.event_lat = (document.getElementById('event_lat') as HTMLInputElement).value;
    this.event_lng = (document.getElementById('event_lng') as HTMLInputElement).value;


    /*for(let i=0; i<this.event_tags.length; i++){
      this.tags[i] = this.event_tags[i].value;
    }*/

    this.event_slot = "All";
    this.event_contact_name = this._apiService.getAuthUser().name;

    let event = {
      'title':this.event_title,
      'start_date':formatted_start_date,
      'end_date':formatted_end_date,
      'participate_end':formatted_end_date,
      //'event_venue':this.venue_address,
      'event_venue':this.google_map,
      'venue_name':this.venue_name,
      'venue_city':this.venue_city,
      'venue_state':this.venue_state,
      'google_map_address':'{' + this.event_lat + ',' + this.event_lng + '}',
      'event_cost':this.event_cost,
      'facebook_link':this.event_fb_link,
      'website':this.event_website,
      'email':this.event_email,
      'contact_number':this.event_contact,
      'image':this.image_path,
      'creator_id':user.id,
      'contact_name':this.event_contact_name,
      'contact_phone':user.phone,
      'content':this.content,
      'cities':this.venue_city,
      'category_id':checkedCategories,
      'age_ids':checkedAgeGroups,
      'slot':this.event_slot,
      'location':this.venue_city,
      'img_extsn':this.img_extsn,
      'isSummerEvent':this.isSummerEvent
      //'tag':this.tags
    }
    //console.log(event);
    this._apiService.submitEvent(event).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        let dialogRef = this.dialog.open(MobileSummerEventSubmitDialog,{data:'Your event has been submitted successfully.<br/>Events will be shown publicly after moderation.'});
        dialogRef.afterClosed().subscribe(result => {
            this._router.navigate(['/event-all']);
        });
      }else{
      }
    },err=>{
    });
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      this.fileUploadMessage = "";
      if(file.size<=(1024*1024*5)){
        if(file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/png'){
          this.fileUploadMessage = "Please wait while uploading file ...";
          this._apiService.uploadEventPicture(file).subscribe(ret=>{
            let $ret = ret.ret;
            if($ret.code == 1){
              this.image_path = $ret.data[0];
              this.img_extsn = '.' + (this.image_path.substring(this.image_path.lastIndexOf('.')+1, this.image_path.length) || this.image_path);
              this.fileUploadMessage = "File Uploaded: " + file.name;
            }else{
            }
          },err=>{
          });
        }
        else{
          let dialogRef = this.dialog.open(MobileSummerEventSubmitDialog,{data:'Please upload .jpg or .jpeg or .png type file only...'});
        }
      }
      else{
        let dialogRef = this.dialog.open(MobileSummerEventSubmitDialog,{data:'File size should not be more than 1 Mb...'});
      }
    }
  }

  checkAllCategories(){

  }

  getLatitudeLongitude() {
    if(!this.google_map){
      let dialogRef = this.dialog.open(MobileSummerEventSubmitDialog,{data:'Please provide a valid address'});
    }
    else if(this.google_map.toString().trim()==""){
      let dialogRef = this.dialog.open(MobileSummerEventSubmitDialog,{data:'Please provide a valid address'});
    }
    else{
      var geocoder = new google.maps.Geocoder();
      if(geocoder) {
        geocoder.geocode({
            'address': this.google_map,
          }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                  this.event_lat = results[0].geometry.location.lat();
                  this.event_lng = results[0].geometry.location.lng();
                  (document.getElementById('event_lat') as HTMLInputElement).value = this.event_lat;
                  (document.getElementById('event_lng') as HTMLInputElement).value = this.event_lng;
                  document.getElementById('event_lat').classList.remove("hide");
                  document.getElementById('event_lng').classList.remove("hide");
                }
                else{
                }
          });
      }
    }
  }

  setState(){
    for(let i=0; i<this.cityList.length; i++){
      if(this.cityList[i].city == this.venue_city){
        if(this.cityList[i].state!=null){
          this.venue_state = this.cityList[i].state;
        }
        else{
          this.venue_state = '';
        }
        break;
      }
    }
  }

  /*setLatitudeLongitude(latlng) {
      console.log(latlng.lat());
      this.event_lat = latlng.lat();
      this.event_lng = latlng.lng();
      this.hideEvent_lat = this.hideEvent_lng = false;
      //let dialogRef = this.dialog.open(MobileSummerEventSubmitDialog,{data:'Unable to fetch the location! <br/> Please ensure that you have entered a valid address.'});
      //this.hideEvent_lat = this.hideEvent_lng = true;

  }*/

}

@Component({
 selector: 'dialog-messages',
 templateUrl: './dialog-messages.html',
})
export class MobileSummerEventSubmitDialog {
 constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
}

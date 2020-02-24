import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import {MdDialog, MD_DIALOG_DATA} from '@angular/material';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';
//import { FlashMessagesService } from 'angular2-flash-messages';

declare var $:any;

@Component({
  selector: 'app-web-user-profile',
  templateUrl: './web-user-profile.component.html',
  styleUrls: ['./web-user-profile.component.css'],
  providers: [DatePipe]
})
export class WebUserProfileComponent implements OnInit {

  user_profile_details:any;
  tmp_user_profile_details:any;
  child_details:any;
  tmp_child_details:any;
  current_child_edit:number;

  cityList:any;

  bookList = [];
  selectedBook = [];

  cuisineList = [];
  selectedCuisine = [];

  placeList = [];
  selectedPlace = [];

  hobbyList = [];
  selectedHobby = [];

  dowithchildList = [];
  selectedDowithchild = [];

  parentingList = [];
  selectedParenting = [];

  technologyList = [];
  selectedTechnology = [];

  destressList = [];
  selectedDestress = [];

  child_bookList = [];
  child_selectedBook = [];

  child_cuisineList = [];
  child_selectedCuisine = [];

  child_hobbyList = [];
  child_selectedHobby = [];

  child_tvList = [];
  child_selectedTv = [];

  child_playList = [];
  child_selectedPlay = [];

  child_appList = [];
  child_selectedApp = [];

  child_colorList = [];
  child_selectedColor = [];
  child_dataTypes = [];

  dropdownSettings = {};

  onboardChild_name:string;
  onboardChild_dob:any;
  onboardChild_gender:string;
  onboardChild_relation:string;
  onboardChild_school:string;

  showSaveTellus:boolean = false;
  showSaveChildfav:boolean = false;
  showSaveUserfav:boolean = false;

  selectedColor:any;

  password:string;
  confirm_password:string;

  tmp:any;

  showProfilePopup:boolean;
  showChildPopup:boolean;
  showOnboardPopup:boolean;
  profileProgress:number;

  dateDue:any;
  planingAgegroupCheck: boolean;
  expectingAgegroupCheck: boolean;

  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _pipe: DatePipe,
    //public _flashMessagesService: FlashMessagesService,
    public dialog:MdDialog
  ) {
    this.profileProgress = 0;
  }

  ngOnInit() {
    this.showProfilePopup = false;
    this.showChildPopup = false;
    this.showOnboardPopup = false;
    this.planingAgegroupCheck = false;
    this.expectingAgegroupCheck = false;

    this.onboardChild_name='';
    this.onboardChild_gender='';
    this.onboardChild_relation='';
    this.onboardChild_dob=new Date();
    this.dateDue = new Date();

    this.dropdownSettings = {
          singleSelection: false,
          text:"Select Here",
          selectAllText:'Select All',
          unSelectAllText:'UnSelect All',
          enableSearchFilter: false,
          classes:"",
          badgeShowLimit: 1
    };

    this._apiService.getUserProfileDetails().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.user_profile_details = $ret.data.user;
        this.child_details = $ret.data.children;

        /* Check Familly status and prompt for data accordingly. */
        if(this.user_profile_details.family_status  < 3) {
          if(this.user_profile_details.family_status == 1) {
            let date = new Date();
            let planedDate = new Date(this.user_profile_details.babyplan);
            if(planedDate < date) {
              this.planingAgegroupCheck = true;
            }
          } else if(this.user_profile_details.family_status == 2) {
            this.showOnboardPopup = true;
            let date = new Date();
            let dueDate = new Date(this.user_profile_details.babydue);
            if(dueDate < date) {
              this.expectingAgegroupCheck = true;
            }
          }
        }

        this.getUserFavourites();
        this.getChildFavourites();
      }
    },err=>{
    });

    this._apiService.getUserProfileDetails().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.tmp_user_profile_details = $ret.data.user;
        this.tmp_child_details = $ret.data.children;
        this.tmp = $ret.data.children;
        // console.log(this.tmp_child_details);
      }
    },err=>{
    });

    this._apiService.getCities().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.cityList = $ret.data;
        
      }
    },err=>{
    });

  }

  getUserFavourites(){
    this.bookList = [];
    this.selectedBook = [];
    this.cuisineList = [];
    this.selectedCuisine = [];
    this.placeList = [];
    this.selectedPlace = [];
    this.hobbyList = [];
    this.selectedHobby = [];
    this.dowithchildList = [];
    this.selectedDowithchild = [];
    this.parentingList = [];
    this.selectedParenting = [];
    this.technologyList = [];
    this.selectedTechnology = [];
    this.destressList = [];
    this.selectedDestress = [];

    this._apiService.getUserFavourites().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        let favourites = $ret.data;
        let no = 0;
        let select_no = 0;
        for(let i=0; i<favourites.length; i++){
            if(favourites[i].type=="book"){
                this.bookList.push(
                  {
                    "id": ++no,
                    "itemName": favourites[i].itemName,
                    "itemId": favourites[i].id,
                    "selected": favourites[i].selected
                  }
                );
                if(favourites[i].selected == 1){
                  this.selectedBook.push(
                    {
                      "id": no,
                      "itemName": favourites[i].itemName,
                      "itemId": favourites[i].id,
                      "selected": favourites[i].selected
                    }
                  );
                }
            }
            else if(favourites[i].type=="cuisine"){
                this.cuisineList.push(
                  {
                    "id": ++no,
                    "itemName": favourites[i].itemName,
                    "itemId": favourites[i].id,
                    "selected": favourites[i].selected
                  }
                );
                if(favourites[i].selected == 1){
                  this.selectedCuisine.push(
                    {
                      "id": no,
                      "itemName": favourites[i].itemName,
                      "itemId": favourites[i].id,
                      "selected": favourites[i].selected
                    }
                  );
                }
            }
            else if(favourites[i].type=="places"){
                this.placeList.push(
                  {
                    "id": ++no,
                    "itemName": favourites[i].itemName,
                    "itemId": favourites[i].id,
                    "selected": favourites[i].selected
                  }
                );
                if(favourites[i].selected == 1){
                  this.selectedPlace.push(
                    {
                      "id": no,
                      "itemName": favourites[i].itemName,
                      "itemId": favourites[i].id,
                      "selected": favourites[i].selected
                    }
                  );
                }
            }
            else if(favourites[i].type=="hobbies"){
                this.hobbyList.push(
                  {
                    "id": ++no,
                    "itemName": favourites[i].itemName,
                    "itemId": favourites[i].id,
                    "selected": favourites[i].selected
                  }
                );
                if(favourites[i].selected == 1){
                  this.selectedHobby.push(
                    {
                      "id": no,
                      "itemName": favourites[i].itemName,
                      "itemId": favourites[i].id,
                      "selected": favourites[i].selected
                    }
                  );
                }
            }
            else if(favourites[i].type=="dowithchild"){
                this.dowithchildList.push(
                  {
                    "id": ++no,
                    "itemName": favourites[i].itemName,
                    "itemId": favourites[i].id,
                    "selected": favourites[i].selected
                  }
                );
                if(favourites[i].selected == 1){
                  this.selectedDowithchild.push(
                    {
                      "id": no,
                      "itemName": favourites[i].itemName,
                      "itemId": favourites[i].id,
                      "selected": favourites[i].selected
                    }
                  );
                }
            }
            else if(favourites[i].type=="parenting"){
                this.parentingList.push(
                  {
                    "id": ++no,
                    "itemName": favourites[i].itemName,
                    "itemId": favourites[i].id,
                    "selected": favourites[i].selected
                  }
                );
                if(favourites[i].selected == 1){
                  this.selectedParenting.push(
                    {
                      "id": no,
                      "itemName": favourites[i].itemName,
                      "itemId": favourites[i].id,
                      "selected": favourites[i].selected
                    }
                  );
                }
            }
            else if(favourites[i].type=="technology"){
                this.technologyList.push(
                  {
                    "id": ++no,
                    "itemName": favourites[i].itemName,
                    "itemId": favourites[i].id,
                    "selected": favourites[i].selected
                  }
                );
                if(favourites[i].selected == 1){
                  this.selectedTechnology.push(
                    {
                      "id": no,
                      "itemName": favourites[i].itemName,
                      "itemId": favourites[i].id,
                      "selected": favourites[i].selected
                    }
                  );
                }
            }
            else if(favourites[i].type=="destress"){
                this.destressList.push(
                  {
                    "id": ++no,
                    "itemName": favourites[i].itemName,
                    "itemId": favourites[i].id,
                    "selected": favourites[i].selected
                  }
                );
                if(favourites[i].selected == 1){
                  this.selectedDestress.push(
                    {
                      "id": no,
                      "itemName": favourites[i].itemName,
                      "itemId": favourites[i].id,
                      "selected": favourites[i].selected
                    }
                  );
                }
            }
        }
        this.countProgressVal();
      }
    },err=>{
    });
  }

  getChildFavourites(){
    this._apiService.getChildFavourites().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        //console.log("data",$ret.data )
        this.child_dataTypes = $ret.data.type;
        //console.log("types",this.child_dataTypes )
        let noOfChild = $ret.data.child.length;
        let firstChildData = $ret.data.child[0].fav;
        let childData = $ret.data.child;
        //fetch all books,
        this.child_bookList = firstChildData.filter(item=>item.type == 'book');
        //console.log("all books",this.child_bookList );
        //all cuisines
        this.child_cuisineList = firstChildData.filter(item=>item.type == 'cuisine');
        //console.log("all cuisine",this.child_cuisineList );
        //all color
        // this.child_colorList = firstChildData.filter(item=>item.type == 'color');
        //console.log("all color",this.child_colorList )
        //all color
        this.child_hobbyList = firstChildData.filter(item=>item.type == 'hobby');
        //console.log("all hobby",this.child_hobbyList )
        this.child_tvList = firstChildData.filter(item=>item.type == 'tv');
        this.child_playList = firstChildData.filter(item=>item.type == 'playtime');
        this.child_appList = firstChildData.filter(item=>item.type == 'app');

        //console.log("child", this.child_details);
        for(let i = 0; i < noOfChild; i++){
          let curretChildId = this.child_details[i].id;
          let currentChildFav = childData.filter(item=>item.child_id == curretChildId);
          //console.log("currentChildFav", currentChildFav);
          this.child_details[i].favourites=
          {
            'book':currentChildFav[0].fav.filter(item=>(item.type == 'book' && item.selected == 1)),
            'cuisine':currentChildFav[0].fav.filter(item=>(item.type == 'cuisine' && item.selected == 1)),
            'hobby':currentChildFav[0].fav.filter(item=>(item.type == 'hobby' && item.selected == 1)),
            'tv':currentChildFav[0].fav.filter(item=>(item.type == 'tv' && item.selected == 1)),
            'playtime':currentChildFav[0].fav.filter(item=>(item.type == 'playtime' && item.selected == 1)),
            'app':currentChildFav[0].fav.filter(item=>(item.type == 'app' && item.selected == 1)),
            // 'color':currentChildFav[0].fav.filter(item=>(item.type == 'color')),
          }
          //console.log("currentChildFavBook", this.child_details[i].favourites);
        }
        this.countProgressVal();
      }
    });
  }

  updateUserProfileDetails(){
    this.showProfilePopup = false;
    this.tmp_user_profile_details.dateofbirth = this._pipe.transform(new Date(this.tmp_user_profile_details.dateofbirth), 'yyyy-MM-dd');
    this._apiService.updateUserProfileDetails(this.tmp_user_profile_details).subscribe(ret=>{
      let $ret = ret.ret;
      // console.log(ret);
      if($ret.code == 1){
        this._apiService.getUserProfileDetails().subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.user_profile_details = $ret.data.user;
            this.countProgressVal();
            //this.child_details = $ret.data.children;
            //let tmp_user_details = this._apiService.getAuthUser();
            //tmp_user_details.image_path = this.tmp_user_profile_details.image_path;
            //console.log(tmp_user_details);
            //localStorage.setItem('user',tmp_user_details);
          }
        },err=>{
        });
      }
      else{
        try{
          let dialogRef = this.dialog.open(UserProfileDialog,{data:$ret.data});
        }
        catch(e){}
      }
    },err=>{
    });
  }

  userProfilePicChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      this._apiService.uploadPhoto(file).subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          this.tmp_user_profile_details.image_path = $ret.data[0];
          // console.log(this.tmp_user_profile_details.image_path);
        }
      },err=>{
      });
    }
  }

  updateAboutYourself(){
    // this._apiService.updateAboutYourself(this.tmp_user_profile_details.about_yourself).subscribe(ret=>{
    //   let $ret = ret.ret;
    //   if($ret.code == 1){
    //     this.user_profile_details.about_yourself = this.tmp_user_profile_details.about_yourself;
    //     this.showSaveTellus = !this.showSaveTellus;
    //   }
    // },err=>{
    // });
    // console.log(this.tmp_user_profile_details);
    this._apiService.updateUserProfileDetails(this.tmp_user_profile_details).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this._apiService.getUserProfileDetails().subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.user_profile_details = $ret.data.user;
            this.showSaveTellus = !this.showSaveTellus;
            this.countProgressVal();
          }
        },err=>{
        });
      }
    },err=>{
    });
  }

  updateChildDetails(){
    this.showChildPopup = false;
    this.tmp_child_details[this.current_child_edit].dateofbirth = this._pipe.transform(new Date(this.tmp_child_details[this.current_child_edit].dateofbirth), 'yyyy-MM-dd');
    this._apiService.updateChildDetails(this.tmp_child_details[this.current_child_edit].id, this.tmp_child_details[this.current_child_edit]).subscribe(ret=>{
      let $ret = ret.ret;
      // console.log(ret);
      if($ret.code == 1){
        this._apiService.getUserProfileDetails().subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.user_profile_details = $ret.data.user;
            this.child_details = $ret.data.children;

            this.getChildFavourites();
          }
        },err=>{
        });
      }
      else{
        try{
          let dialogRef = this.dialog.open(UserProfileDialog,{data:$ret.data});
        }
        catch(e){}
      }
    },err=>{
    });
  }

  childPicChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      this._apiService.uploadPhoto(file).subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          this.tmp_child_details[this.current_child_edit].img_path = $ret.data[0];
          // console.log(this.tmp_child_details[this.current_child_edit].img_path);
        }
      },err=>{
      });
    }
  }

  updateUserFavourites(){
    let fav = [];
    for(let i=0; i<this.selectedBook.length; i++){
      fav.push(this.selectedBook[i].itemId);
    }
    for(let i=0; i<this.selectedCuisine.length; i++){
      fav.push(this.selectedCuisine[i].itemId);
    }
    for(let i=0; i<this.selectedPlace.length; i++){
      fav.push(this.selectedPlace[i].itemId);
    }
    for(let i=0; i<this.selectedHobby.length; i++){
      fav.push(this.selectedHobby[i].itemId);
    }
    for(let i=0; i<this.selectedDowithchild.length; i++){
      fav.push(this.selectedDowithchild[i].itemId);
    }
    for(let i=0; i<this.selectedParenting.length; i++){
      fav.push(this.selectedParenting[i].itemId);
    }
    for(let i=0; i<this.selectedTechnology.length; i++){
      fav.push(this.selectedTechnology[i].itemId);
    }
    for(let i=0; i<this.selectedDestress.length; i++){
      fav.push(this.selectedDestress[i].itemId);
    }
    this._apiService.updateUserFavourites(fav).subscribe(ret=>{
      let $ret = ret.ret;
      if(ret.err.code == 0){
        this.showSaveUserfav = !this.showSaveUserfav;
        this.getUserFavourites();
      }
    },err=>{
    });
  }

  updateChildFavourites(id,child_id){
    let fav = [];
    //console.log("New Books: ",this.child_details[id].favourites.book);
    //console.log("New Cuisines: ",this.child_details[id].favourites.cuisine);

    for(let i=0; i<this.child_details[id].favourites.book.length; i++){
      fav.push(this.child_details[id].favourites.book[i].id);
    }
    for(let i=0; i<this.child_details[id].favourites.cuisine.length; i++){
      fav.push(this.child_details[id].favourites.cuisine[i].id);
    }
    for(let i=0; i<this.child_details[id].favourites.hobby.length; i++){
      fav.push(this.child_details[id].favourites.hobby[i].id);
    }
    for(let i=0; i<this.child_details[id].favourites.tv.length; i++){
      fav.push(this.child_details[id].favourites.tv[i].id);
    }
    for(let i=0; i<this.child_details[id].favourites.playtime.length; i++){
      fav.push(this.child_details[id].favourites.playtime[i].id);
    }
    for(let i=0; i<this.child_details[id].favourites.app.length; i++){
      fav.push(this.child_details[id].favourites.app[i].id);
    }
    // for(let i=0; i<this.child_details[id].favourites.color.length; i++){
    //   //console.log(this.child_details[id].favourites.color[i].checked);
    //   if(this.child_details[id].favourites.color[i].checked == true){
    //     fav.push(this.child_details[id].favourites.color[i].id);
    //   }
    // }
    //console.log(fav);
    this._apiService.updateChildFavourites(child_id, fav).subscribe(ret=>{
      let $ret = ret.ret;
      //console.log(ret);
      if(ret.err.code == 0){
        this.showSaveChildfav = !this.showSaveChildfav;
        this.getChildFavourites();
        //this._flashMessagesService.show('Child Favourites Updated...', { cssClass: 'success-message',timeout: 2000 });
      }
    },err=>{
    });
  }

  onboardChild(){
    this.showOnboardPopup = false;
    if(this.onboardChild_name.toString().trim() == ""){
      let dialogRef = this.dialog.open(UserProfileDialog,{data:'Name cannot be blank'});
    }
    else if(this.onboardChild_gender.toString().trim() == ""){
      let dialogRef = this.dialog.open(UserProfileDialog,{data:'Please select a gender'});
    }
    else if(this.onboardChild_dob == null || this.onboardChild_dob == ""){
      let dialogRef = this.dialog.open(UserProfileDialog,{data:'Please select a date of birth'});
    }
    else{
      let onboard_child_detail = {
        'name': this.onboardChild_name,
        'dateofbirth': this.onboardChild_dob,
        'gender': this.onboardChild_gender,
        'relation': this.onboardChild_relation,
        'school': this.onboardChild_school
      }
      // console.log(onboard_child_detail);
      this._apiService.onboardChild(onboard_child_detail).subscribe(ret=>{
        let $ret = ret.ret;
        //console.log(ret);
        if($ret.code == 1){
          this._apiService.getUserProfileDetails().subscribe(ret=>{
            let $ret = ret.ret;
            if($ret.code == 1){
              this.child_details = $ret.data.children;
              this.getChildFavourites();
              let dialogRef = this.dialog.open(UserProfileDialog,{data:'Congratulations!!!<br/>You have onboarded ' + this.getFirstName(this.onboardChild_name)});
            }
          },err=>{
          });

          this._apiService.getUserProfileDetails().subscribe(ret=>{
            let $ret = ret.ret;
            if($ret.code == 1){
              this.tmp_child_details = $ret.data.children;
              // console.log(this.tmp_child_details);
            }
          },err=>{
          });
        }
      },err=>{
      });
    }
  }

  updateFavColor(child_id,color_id){
    if(this.child_details[child_id].favourites.color[color_id].checked==true){
      this.child_details[child_id].favourites.color[color_id].checked = false;
    }
    else{
      this.child_details[child_id].favourites.color[color_id].checked = true;
    }
  }

  updatePassword(){
    if(this.password == this.confirm_password){
      if(this.password == ""){
        let dialogRef = this.dialog.open(UserProfileDialog,{data:'Password cannot be blank'});
      }
      else{
        this._apiService.updatePassword(this.password).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            //console.log($ret.data);
            let dialogRef = this.dialog.open(UserProfileDialog,{data:'Password changed successfully'});
          }
        },err=>{
        });
      }
    }
    else{
      let dialogRef = this.dialog.open(UserProfileDialog,{data:'Password and Confirm Password are not matching'});
    }
  }


  onItemSelect(item:any){
      //console.log(item);
  }
  OnItemDeSelect(item:any){
      //console.log(item);
  }
  onSelectAll(items: any){
      //console.log(items);
  }
  onDeSelectAll(items: any){
      //console.log(items);
  }

  getFirstName(name){
    let firstName = name.split(' ');
    return firstName[0];
  }

  countProgressVal(){
    this.profileProgress = 20; /*registered:20%*/
    if(this.user_profile_details){
      if(this.user_profile_details.occupation != null && this.user_profile_details.occupation != ""){
        this.profileProgress = this.profileProgress + 5;
      }
      if(this.user_profile_details.timeline_tag != null && this.user_profile_details.timeline_tag != ""){
        this.profileProgress = this.profileProgress + 5;
      }
      if(this.child_details){
        if(this.child_details.length > 0){
          this.profileProgress = this.profileProgress + 20;
        }
      }
      if(this.child_details){
        let countMax = [];
        for(let i=0; i<this.child_details.length; i++){
          if(this.child_details[i].favourites){
            countMax[i] = 0;
            if(this.child_details[i].favourites.book.length>0){countMax[i]++;}
            if(this.child_details[i].favourites.cuisine.length>0){countMax[i]++;}
            if(this.child_details[i].favourites.hobby.length>0){countMax[i]++;}
            if(this.child_details[i].favourites.tv.length>0){countMax[i]++;}
            if(this.child_details[i].favourites.playtime.length>0){countMax[i]++;}
            if(this.child_details[i].favourites.app.length>0){countMax[i]++;}
          }
        }
        if(Math.max.apply(null, countMax) > 0){
          this.profileProgress = this.profileProgress + ((25 / 6) * Math.max.apply(null, countMax));
        }
      }
      let count = 0;
      if(this.selectedBook.length>0){count++;}
      if(this.selectedCuisine.length>0){count++;}
      if(this.selectedPlace.length>0){count++;}
      if(this.selectedHobby.length>0){count++;}
      if(this.selectedDowithchild.length>0){count++;}
      if(this.selectedParenting.length>0){count++;}
      if(this.selectedTechnology.length>0){count++;}
      if(this.selectedDestress.length>0){count++;}
      if(count>0){
        this.profileProgress = this.profileProgress + ((25 / 8) * count);
      }
    }
  }

  roundOffNumber(value) {
    return Number(Math.round(value));
  }

  onDateChange(evt,type){
    if(type == 1){ /*for user dob*/
      this.tmp_user_profile_details.dateofbirth = evt.dateObj;
    }
    else if(type == 2){ /*for child dob*/
      this.tmp_child_details[this.current_child_edit].dateofbirth = evt.dateObj;
    }
    else if(type == 4){ /* for baby expecting */
      this.dateDue = evt.dateObj;
    }
    else{ /*for onboard_child dob*/
      this.onboardChild_dob = evt.dateObj;
    }
 }

 setDateFormat(date){
   if(date!=null && date!='0000-00-00'){
     try{
       date = date + 'T00:00:00+05:30';
       let newDate = new Date(date);
       return newDate;
     }
     catch(e){
       return new Date();
     }
   }
   else{
     return new Date();
   }
 }

  updateAgeGroup() {
    let data = {
      babydue :this.dateDue
    };
    this._apiService.updateUserChildExpectingDetails(data).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.user_profile_details.babydue = this.dateDue;
        this.planingAgegroupCheck = false;
      }
    },err=>{
    });
 }

}

@Component({
 selector: 'dialog-messages',
 templateUrl: './dialog-messages.html',
})
export class UserProfileDialog {
 constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
}

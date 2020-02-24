import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import {MdDialog, MD_DIALOG_DATA} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';
//import { FlashMessagesService } from 'angular2-flash-messages';

declare var $:any;


@Component({
  selector: 'app-mobile-user-profile',
  templateUrl: './mobile-user-profile.component.html',
  styleUrls: ['./mobile-user-profile.component.css'],
  providers: [DatePipe]
})
export class MobileUserProfileComponent implements OnInit {

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

  celebrityList = [];
  selectedCelebrity = [];

  child_bookList = [];
  child_selectedBook = [];

  child_cuisineList = [];
  child_selectedCuisine = [];

  child_hobbyList = [];
  child_selectedHobby = [];

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

  showMoreDetail:boolean;
  childTabSelected:number;

  constructor(
    public _apiService:ApiService,
    public _commonService:CommonService,
    public _pipe: DatePipe,
    public _sanitizer: DomSanitizer,
    //public _flashMessagesService: FlashMessagesService,
    public dialog:MdDialog
  ) { }

  ngOnInit() {
    this.onboardChild_gender='';
    this.onboardChild_relation='';
    this.onboardChild_school='';
    this.onboardChild_dob=new Date();
    this.showMoreDetail = true;
    this.childTabSelected = 0;

    this.dropdownSettings = {
          singleSelection: false,
          text:"Select Here",
          selectAllText:'Select All',
          unSelectAllText:'UnSelect All',
          enableSearchFilter: true,
          classes:"",
          badgeShowLimit: 1
    };

    this._apiService.getUserProfileDetails().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.user_profile_details = $ret.data.user;
        this.child_details = $ret.data.children;

        this.getUserFavourites();
        this.getChildFavourites();
        /*for(let i=0; i<this.child_colorList.length; i++){
          this.selectedColor[i]={
            "id":this.child_colorList
          }
        }*/
      }
    },err=>{
    });

    this._apiService.getUserProfileDetails().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.tmp_user_profile_details = $ret.data.user;
        this.tmp_child_details = $ret.data.children;
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
    this.celebrityList = [];
    this.selectedCelebrity = [];

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
            else if(favourites[i].type=="hoobies"){
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
            else if(favourites[i].type=="celebrity"){
                this.celebrityList.push(
                  {
                    "id": ++no,
                    "itemName": favourites[i].itemName,
                    "itemId": favourites[i].id,
                    "selected": favourites[i].selected
                  }
                );
                if(favourites[i].selected == 1){
                  this.selectedCelebrity.push(
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
        this.child_colorList = firstChildData.filter(item=>item.type == 'color');
        //console.log("all color",this.child_colorList )
        //all color
        this.child_hobbyList = firstChildData.filter(item=>item.type == 'hobby');
        //console.log("all hobby",this.child_hobbyList )

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
            'color':currentChildFav[0].fav.filter(item=>(item.type == 'color')),
          }
          //console.log("currentChildFavBook", this.child_details[i].favourites);
        }


      }
    });
  }

  updateUserProfileDetails(){
    this.tmp_user_profile_details.dateofbirth = this._pipe.transform(new Date(this.tmp_user_profile_details.dateofbirth), 'yyyy-MM-dd');
    this._apiService.updateUserProfileDetails(this.tmp_user_profile_details).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this._apiService.getUserProfileDetails().subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.user_profile_details = $ret.data.user;
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
          let dialogRef = this.dialog.open(MobileUserProfileDialog,{data:$ret.data});
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
          console.log(this.tmp_user_profile_details.image_path);
        }
      },err=>{
      });
    }
  }

  updateAboutYourself(){
    this._apiService.updateAboutYourself(this.tmp_user_profile_details.about_yourself).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.user_profile_details.about_yourself = this.tmp_user_profile_details.about_yourself;
        this.showSaveTellus = !this.showSaveTellus;
      }
    },err=>{
    });
  }

  updateChildDetails(){
    this.tmp_child_details[this.current_child_edit].dateofbirth = this._pipe.transform(new Date(this.tmp_child_details[this.current_child_edit].dateofbirth), 'yyyy-MM-dd');
    this._apiService.updateChildDetails(this.tmp_child_details[this.current_child_edit].id, this.tmp_child_details[this.current_child_edit]).subscribe(ret=>{
      let $ret = ret.ret;
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
          let dialogRef = this.dialog.open(MobileUserProfileDialog,{data:$ret.data});
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
          console.log(this.tmp_child_details[this.current_child_edit].img_path);
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
    for(let i=0; i<this.selectedCelebrity.length; i++){
      fav.push(this.selectedCelebrity[i].itemId);
    }
    this._apiService.updateUserFavourites(fav).subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
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
    for(let i=0; i<this.child_details[id].favourites.color.length; i++){
      //console.log(this.child_details[id].favourites.color[i].checked);
      if(this.child_details[id].favourites.color[i].checked == true){
        fav.push(this.child_details[id].favourites.color[i].id);
      }
    }
    //console.log(fav);
    this._apiService.updateChildFavourites(child_id, fav).subscribe(ret=>{
      let $ret = ret.ret;
      //console.log(ret);
      if($ret.code == 1){
        this.showSaveChildfav = !this.showSaveChildfav;
        this.getChildFavourites();
        //this._flashMessagesService.show('Child Favourites Updated...', { cssClass: 'success-message',timeout: 2000 });
      }
    },err=>{
    });
  }

  onboardChild(){
    let onboard_child_detail = {
      'name': this.onboardChild_name,
      'dateofbirth': this.onboardChild_dob,
      'gender': this.onboardChild_gender,
      'relation': this.onboardChild_relation,
      'school': this.onboardChild_school
    }
    this._apiService.onboardChild(onboard_child_detail).subscribe(ret=>{
      let $ret = ret.ret;
      //console.log(ret);
      if($ret.code == 1){
        this._apiService.getUserProfileDetails().subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.child_details = $ret.data.children;
            this.getChildFavourites();
          }
        },err=>{
        });

        this._apiService.getUserProfileDetails().subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            this.tmp_child_details = $ret.data.children;
          }
        },err=>{
        });
      }
    },err=>{
    });
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
        let dialogRef = this.dialog.open(MobileUserProfileDialog,{data:'Password cannot be blank'});
      }
      else{
        this._apiService.updatePassword(this.password).subscribe(ret=>{
          let $ret = ret.ret;
          if($ret.code == 1){
            //console.log($ret.data);
            let dialogRef = this.dialog.open(MobileUserProfileDialog,{data:'Password changed successfully'});
          }
        },err=>{
        });
      }
    }
    else{
      let dialogRef = this.dialog.open(MobileUserProfileDialog,{data:'Password and Confirm Password are not matching'});
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

  safeUrl(url) {
    return this._sanitizer.bypassSecurityTrustUrl(url);
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

}

@Component({
 selector: 'dialog-messages',
 templateUrl: './dialog-messages.html',
})
export class MobileUserProfileDialog {
 constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
}

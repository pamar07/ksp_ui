import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl ,FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {MdDialog, MD_DIALOG_DATA} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';
import { ValidateService } from '../../../services/validate.service';

let now = new Date();
declare var datepickerObj: any;
declare var google: any;

@Component({
  selector: 'app-web-registration',
  templateUrl: './web-registration.component.html',
  styleUrls: ['./web-registration.component.css'],
  providers: [DatePipe]
})
export class WebRegistrationComponent implements OnInit {

  regForm: FormGroup;
  stepTwoForm: FormGroup;
  mobPattern = new RegExp(/^[1-9][0-9]{4,12}$/);

  cityList:any     = [];
  children:any     = [];
  noOfChilldren   = [1];
  interestList:any     = [];
  selectedIntArray:any = [];
  stepTwo:boolean      = false;
  isInterested:boolean = true;
  currentYear:any;
  currentDate:any;
  source:any;
  isFormSubmitted:boolean = false;
  type:any;
  navigation: any = '';
  constructor(
    private route:ActivatedRoute,
    public api:ApiService,
    private form:FormBuilder,
    private _router:Router,
    public dialog:MdDialog,
    public _commonService:CommonService,
    public _pipe: DatePipe
  ) { }

  ngOnInit() {
    this.navigation = this._commonService.navUrl;
    if(this.api.loggedIn()){
      this._router.navigate(['/dashboard']);
    
    } else {
      window.scrollTo(0,0);
      this.regForm = this.form.group({
        'name' : [null, Validators.required],
        'email': [null, [Validators.required, Validators.email], this.emailExist.bind(this)],
        'phone': [null, [Validators.required, Validators.pattern(this.mobPattern)], this.phoneExist.bind(this)],
        'city': ["", Validators.required],
        'cityOther': [null, []],
        'password': ['', [Validators.required, Validators.minLength(6)]],
        'mealPlan': [true],
        'newsLetter': [true]
      });

      this.stepTwoForm = this.form.group({
        'parentalStatus' : ['1', Validators.required],
        'babyplan': [null, Validators.required],
        'babydue': [null],
        'relation' :['1'],
        'noOfChild' :['1'],
        'relationship' :[''],
        'childName' : this.form.array([new FormControl(null)]),
        'childDob' : this.form.array([new FormControl(null)]),
        'childGender' : this.form.array([new FormControl('1')]),
        'childSchool' : this.form.array([new FormControl(null)])
      });

      /* Get cities */
      this.api.getCities().subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          this.cityList = $ret.data;
        }
      },err=>{
      }); 

    }
    
    /* Get Interest list. */ 
    this.api.getInterestList().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        let tmp_interestList = $ret.data.CategoriesList;
        this.interestList = this.uniqueInterests(tmp_interestList);
      
      } else {
        this.interestList = [];
      }
    },err=>{
    });

    this.currentDate = new Date();
    this.currentYear = this.currentDate.getFullYear();
    this.source = this.route.snapshot.params.c ? this.route.snapshot.params.c : '';
  }

  /*Check for Email in the server.*/
  emailExist(control: FormControl) {
    if(!control.hasError('email')) {
      const data = {field: 'email', val: control.value};
      const q = new Promise((resolve, reject) => {
        setTimeout(() => {
          this.api.checkUserData(data).subscribe(ret=>{
            let $ret = ret.ret;
            if($ret.code == 1){
              resolve({'emailExist': true});
            } else {
              resolve(null);
            }
          },err => {
            resolve(null);
          });

        }, 100);
      });
      return q;
    } else {
      return null;
    }
  }

  /*Check for Phone in the server.*/
  phoneExist(control: FormControl) {
    if(!control.hasError('phone')) {
      const data = {field: 'phone', val: control.value};
      const q = new Promise((resolve, reject) => {
        setTimeout(() => {
          this.api.checkUserData(data).subscribe(ret=>{
            let $ret = ret.ret;
            if($ret.code == 1){
              resolve({'phoneExist': true});
            } else {
              resolve(null);
            }
          },err => {
            resolve(null);
          });

        }, 100);
      });
      return q;
    } else {
      return null;
    }
  }

  /* Check for other city. */ 
  checkCity() {
    if(this.regForm.controls.city.value == 'National') {
      this.regForm.get('cityOther').setValidators([Validators.required]);
    } else {
      this.regForm.get('cityOther').setValidators([]);
    }
    this.regForm.controls.cityOther.updateValueAndValidity();
  }

  /* Save User Details. */
  registerUser(regData) {
    /* checking for meal and news letter subscription */ 
    if(regData.mealPlan && regData.newsLetter){
      this.type = 3;
    } else if(!regData.mealPlan && regData.newsLetter) {
      this.type =2;
    } else if(regData.mealPlan && !regData.newsLetter) {
      this.type = 1;
    } else{
      this.type =0;
    } 

    let userInfo = {
      'name' : regData.name,
      'email' : regData.email,
      'city': regData.city,
      'otherCity': regData.otherCity,
      'password': regData.password,
      'type' : this.type,
      'source': this.source
    };

    this.isFormSubmitted = true;
    this.api.registerUserNew(userInfo).subscribe(ret=>{
      this.isFormSubmitted = false;
      let $ret = ret.ret;
      if($ret.code == 1){
        this.api.storeUserData($ret.data.api_token, $ret.data);
        this.showStep2Form(); 
        console.log(this.source);
        /* Download the meal plan pdf */ 
        if(this.source == 'mealplan-banner-download'){
          window.open('/assets/mag_1.pdf', '_blank');
        }
      } else{
        let dialogRef = this.dialog.open(RegistrationDialog,{data:'We are facing some problem.<br/>Please try again.'});
      }
    },err=>{
      this.isFormSubmitted = false;
    }); 
  }

  /* Show step 2 form*/
  showStep2Form(){
    localStorage.setItem('footerVisible', 'hide');
    this.stepTwo = true; 
  } 

  /* Set date for the fields. */
  onDateChange(evt,field){
    this.stepTwoForm.patchValue({[field] : this._pipe.transform(new Date(evt.dateObj), 'yyyy-MM-dd')});
  }

  /* Set date for the kids fields. */
  onDateChangeChild(evt,index){
    const dobArr = <FormArray> this.stepTwoForm.get('childDob');
    dobArr.controls[index].setValue(this._pipe.transform(new Date(evt.dateObj), 'yyyy-MM-dd'));
  } 

  /* Set validations when parental status changes*/ 
  changeParentalStatus(val) {
    if(val == 1) {
      this.stepTwoForm.get('babyplan').setValidators([Validators.required]);
      this.stepTwoForm.get('babydue').setValidators([]);

      for(let i = 0; i < this.noOfChilldren.length; i++) {
        (<FormArray>this.stepTwoForm.get('childName')).at(i).clearValidators();
        (<FormArray>this.stepTwoForm.get('childDob')).at(i).clearValidators();
        (<FormArray>this.stepTwoForm.get('childGender')).at(i).clearValidators();
        (<FormArray>this.stepTwoForm.get('childSchool')).at(i).clearValidators();
      }
    
    } else if(val == 2) {
      this.stepTwoForm.get('babyplan').setValidators([]);
      this.stepTwoForm.get('babydue').setValidators([Validators.required]);

      for(let i = 0; i < this.noOfChilldren.length; i++) {
        (<FormArray>this.stepTwoForm.get('childName')).at(i).clearValidators();
        (<FormArray>this.stepTwoForm.get('childDob')).at(i).clearValidators();
        (<FormArray>this.stepTwoForm.get('childGender')).at(i).clearValidators();
        (<FormArray>this.stepTwoForm.get('childSchool')).at(i).clearValidators();
      }
    
    } else {
      this.stepTwoForm.get('babyplan').setValidators([]);
      this.stepTwoForm.get('babydue').setValidators([]);  

      for(let i = 0; i < this.noOfChilldren.length; i++) {
        (<FormArray>this.stepTwoForm.get('childName')).at(i).setValidators([Validators.required]);
        (<FormArray>this.stepTwoForm.get('childDob')).at(i).setValidators([Validators.required]);
        (<FormArray>this.stepTwoForm.get('childGender')).at(i).setValidators([Validators.required]);
        (<FormArray>this.stepTwoForm.get('childSchool')).at(i).setValidators([Validators.required]);
      }
    }

    this.stepTwoForm.controls.babyplan.updateValueAndValidity(); 
    this.stepTwoForm.controls.babydue.updateValueAndValidity(); 
    for(let i = 0; i < this.noOfChilldren.length; i++) {
      (<FormArray>this.stepTwoForm.get('childName')).at(i).updateValueAndValidity();
      (<FormArray>this.stepTwoForm.get('childDob')).at(i).updateValueAndValidity();
      (<FormArray>this.stepTwoForm.get('childGender')).at(i).updateValueAndValidity();
      (<FormArray>this.stepTwoForm.get('childSchool')).at(i).updateValueAndValidity();
    }
  }

  /* Set validations when relation status changes*/ 
  selectRelationship(val) {
    if(val == 3) {
      this.stepTwoForm.get('relationship').setValidators([Validators.required]);
    } else if(val == 2) {
      this.stepTwoForm.get('relationship').setValidators([]);
    }
    this.stepTwoForm.controls.relationship.updateValueAndValidity(); 
  }

  /* Get date*/
  getDate(val) {
    return new Date(val);
  } 

  /* Add Validations for kids. */ 
  filterChanged(val) {
    let currentChildNo = this.noOfChilldren.length;
    if(val > currentChildNo) {
      for(let i = 0; i < val-currentChildNo; i++) {
        (<FormArray>this.stepTwoForm.get('childName')).push(new FormControl(null, Validators.required));
        (<FormArray>this.stepTwoForm.get('childDob')).push(new FormControl(null, Validators.required));
        (<FormArray>this.stepTwoForm.get('childGender')).push(new FormControl('1', Validators.required));
        (<FormArray>this.stepTwoForm.get('childSchool')).push(new FormControl(null, Validators.required));
        this.noOfChilldren.push(currentChildNo + i);
      }  
    }else{
      for(let i = currentChildNo -1; i > val-1; i--) {
        (<FormArray>this.stepTwoForm.get('childName')).removeAt(i);
        (<FormArray>this.stepTwoForm.get('childDob')).removeAt(i);
        (<FormArray>this.stepTwoForm.get('childGender')).removeAt(i);
        (<FormArray>this.stepTwoForm.get('childSchool')).removeAt(i);
        this.noOfChilldren.pop();
      } 
    }
  }

  /* Select Interests */ 
  interestSelected(val){
    if(this.selectedIntArray.indexOf(val.id) != -1 ) {
      this.selectedIntArray.splice(this.selectedIntArray.indexOf(val.id), 1);
    } else {
      this.selectedIntArray.push(val.id);
    }
  }

  /* checking for similar interest */
  uniqueInterests(arr) {
    let hashTable = {};
    return arr.filter(function (el) {
      let key = JSON.stringify(el.name);
      let match = Boolean(hashTable[key]);
      return (match ? false : hashTable[key] = true);
    });
  }

  /* Save user details. */
  saveUserDetails(data){
    if(this.selectedIntArray.length) {
      let userInfo = data;
      userInfo.interest = this.selectedIntArray;
      console.log(this.navigation);
      this.api.saveUserDetails(userInfo).subscribe(ret=>{
        let $ret = ret.ret;
        if($ret.code == 1){
          if(this._commonService.navUrl) {
            this._router.navigate([this._commonService.navUrl]);
          } else {
            this._router.navigate(['/dashboard']);
          }
        } else{
          let dialogRef = this.dialog.open(RegistrationDialog,{data:'We are facing some problem.<br/>Please try again.'});
        }
      },err=>{
      });
    }
  }

  /* Skip to website */
  skipToWebsite() {
    if(this._commonService.navUrl != '') {
      this._router.navigate([this._commonService.navUrl]);
    } else {
      this._router.navigate(['/dashboard']);
    }
  } 
}

@Component({
 selector: 'dialog-messages',
 templateUrl: './dialog-messages.html',
})
export class RegistrationDialog {
 constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
}
 
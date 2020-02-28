import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CommonService} from '../../../services/common.service';
import {WebKspMembershipDialog} from '../../web/web-ksp-code-membership-form/web-ksp-code-membership-form.component';
import {MdDialog} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mobile-ksp-awards-2019',
  templateUrl: './mobile-ksp-awards-2019.component.html',
  styleUrls: ['./mobile-ksp-awards-2019.component.css']
})
export class MobileKspAwards2019Component implements OnInit {
  categories: any = [];
  votedCategories: any = [];
  nomination: Boolean = false;
  registerForm: FormGroup;
  submitted = false;
  companies: any = [];
  searchItems: any = [];
  listCompany: Boolean = false;
  nomimateMore: Boolean = false;
  searchItems1: any = [];
  selectedItem: any;
  arr: any = [];
  comapnyId: any;
  cName: any;
  catId: any  ;
  thankYou: Boolean = false ;
  cat: any;
  more: Boolean = false;
  showNomination: Boolean = false;
  categoriesDetails: any;
  index: any;
  imageSrc: any;
  categoriesRelatedCompany: any = [];
  user_id: any;
  guest_id: any;
  kspVotingIsActive: Boolean;
  kspVotingIsActivePopUp: Boolean = false;
  constructor(public _apiService: ApiService, private formBuilder: FormBuilder,  public _commonService: CommonService, private _router: Router,) {}

  ngOnInit() {
    this._apiService.getStatusForVote({id: 2019}).subscribe( resp => {
      if (resp.ret.code === 1) {
        if (resp.ret.isVoteActive === 1) {
          this.kspVotingIsActive = true;
          this._apiService.getCategoryForVote({'guest_id': this.guest_id}).subscribe( ret => {
            this.categories = ret['ret'].data;
          });
        } else {
          this.kspVotingIsActive = false;
          this._apiService.getAwardCategory('4').subscribe(ret => {
            this.categories = ret['ret'].data;
            this.searchItems1 = this.categories;
          });
          this._apiService.getRegisterdCompany().subscribe(ret => {
            this.companies = ret['ret'].data;
            this.searchItems = this.companies;
          });
        }
      }
    });
    if (this._apiService.loggedIn()) {
      this.user_id = localStorage.getItem('token');
    }
    if (localStorage.getItem('guest_id')) {
      this.guest_id = localStorage.getItem('guest_id');
    } else {
      this.guest_id = this.makeId();
      localStorage.setItem('guest_id', this.guest_id);
    }
    window.scrollTo(0, 0);
    this.registerForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      companyName: ['', Validators.required],
      contactPersion: [''],
      description: ['', [Validators.required]]
    });
    // this._apiService.getCategorywiseWinnerList().subscribe(ret=>{
    //   let $ret = ret.ret;
    //   if($ret.code == 1){
    //     this.winner_list = $ret.data;
    //   }
    // },err=>{
    // });
  }
  makeId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 15; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return 'guest' + text;
  }
  nominationBrand() {
    console.log(this.index);
    this.showNomination = false;
    this.nomination = true;
    this.registerForm.controls['categoryName'].setValue(
      this.categories[this.index].category
    );
    console.log(this.registerForm.value);
    this.catId = this.categories[this.index].id;
  }
  closeNominationBrand() {
    this.nomination = false;
    this.nomimateMore = false;
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    // if (this.arr.length > 0) {
    //   let a = [] ;
    //   for (let i = 0; i < this.arr.length ; i++) {
    //       a.push(this.arr[i].id);
    //   }
    //   const data = {
    //     category_id: this.catId,
    //     company_id: this.comapnyId ? this.comapnyId : '0',
    //     companyName: this.cName ? this.cName : this.registerForm['_value'].companyName,
    //     contactPerson: this.registerForm['_value'].contactPersion,
    //     reasonOfNomination: this.registerForm['_value'].description,
    //   };
    //   const uploadData = new FormData();
    //   uploadData.append('logo', this.imageSrc, this.imageSrc.name);
    //   uploadData.append('data', JSON.stringify(data));
    //   this._apiService.nominationSubmit(uploadData).subscribe(ret => {
    //         if (ret['ret'].code === 1) {
    //            this.thankYou = true;
    //            this.cat = this.registerForm['_value'].categoryName;
    //            this.nomination = false;
    //         }
    //       }, err => {
    //       });
    // } else {
    const data = {
      category_id: this.catId,
      company_id: this.comapnyId ? this.comapnyId : '0',
      companyName: this.cName ? this.cName : this.registerForm['_value'].companyName,
      contactPerson: this.registerForm['_value'].contactPersion,
      reasonOfNomination: this.registerForm['_value'].description,
      // logo: this.imageSrc.name
    };
    console.log(data);
    const uploadData = new FormData();
    uploadData.append('category_id', this.catId);
    uploadData.append('companyName', this.cName ? this.cName : this.registerForm['_value'].companyName);
    uploadData.append('contactPerson', this.registerForm['_value'].contactPersion);
    uploadData.append('reasonOfNomination', this.registerForm['_value'].description);
    uploadData.append('company_id', this.comapnyId ? this.comapnyId : '0');
    // uploadData.append('logo', this.imageSrc, this.imageSrc.name);
    this._apiService.nominationSubmit(data).subscribe(ret => {
      if (ret['ret'].code === 1) {
        const data1 = {
          category: this.catId
        };
        this._apiService.listAllBrandPerCategory(data1).subscribe(ret1 => {
          this.categoriesRelatedCompany = ret1['ret'].data;
        }, err => {
        });
        this.showNomination = true;
        this.cat = this.registerForm['_value'].categoryName;
        this.nomination = false;
        this.closeNominationBrand();
      }
    }, err => {
    });
    // }
  }
  filterCompany(val) {
    this.listCompany = true;
    this.searchItems = this.companies.filter((item) => {
      return (item.business_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
    });
    if (this.searchItems.length < 1) {
      this.listCompany = false;
    }
  }
  getCompany(companyName, companyId) {
    this.listCompany = false;
    this.registerForm.controls['companyName'].setValue(
      companyName
    );
    this.comapnyId = companyId;
    this.cName = companyName;
    console.log(this.registerForm.value);
  }
  nominateMoreCat() {
    if (this._apiService.loggedIn()) {
      this.nomimateMore = true;
      console.log(this.searchItems1);
    } else {
      this._commonService.setNavigationUrl('awards', null, 'KSPAwards2018');
    }

  }
  filterCategories(val) {
    this.searchItems1 = this.categories.filter((item) => {
      return (item.category.toLowerCase().indexOf(val.toLowerCase()) > -1);
    });
  }
  clicked(event, item) {
    item.active = !item.active;
    let i = this.arr.indexOf(item.category);
    console.log(i);
    if (i == -1) {
      this.arr.push({category: item.category, id: item.id});
    } else {
      this.arr.splice(i, 1);
    }
  }
  catSubmit() {
    let value = '';
    for (let i = 0; i < this.arr.length ; i++) {
      value = value + this.arr[i].category + ' , ';
    }
    this.registerForm.controls['categoryName'].setValue(
      value
    );
    console.log(this.registerForm['_value']);
    this.nomimateMore = false;
  }
  closeChooseCat() {
    this.nomimateMore = false;
  }
  closeThankyou() {
    this.thankYou = false;
    this.registerForm.reset();
    this.submitted = false;
    this.arr = [];
  }
  loadMore() {
    this.more = true;
  }

// For Nominations
// showNominationBrand(item, i) {
//   if (this._apiService.loggedIn()) {
//     this.catId = item.id;
//     this.showNomination = true;
//     console.log(item);
//     this.categoriesDetails = item;
//     this.index = i;
//     const data = {
//       category: item.id
//     };
//     this._apiService.listAllBrandPerCategory(data).subscribe(ret => {
//       this.categoriesRelatedCompany = ret['ret'].data;
//     }, err => {
//     });
//   } else {
//     this._commonService.setNavigationUrl('awards', null, 'KSPAwards2018');
//   }
// }

  // For Voting
  showNominationBrand(item) {
    if ( this.kspVotingIsActive ) {
      localStorage.setItem('category', JSON.stringify(item));
      this._router.navigate(['/ksp-voting-2018/' + item.id]);
    } else {
      this.kspVotingIsActivePopUp = true;
    }
  }
  closeNominationBrandUser() {
    this.showNomination = false;
  }
  closeVoting() {
    this.kspVotingIsActivePopUp = false;
  }
  upload(image) {
    console.log(image);
  }
  importFile(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = ( event: any) => {
        this.imageSrc = event.target.result;
        console.log(this.imageSrc);
        this.registerForm.controls['companyLogo'].setValue(
          this.imageSrc
        );
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  likeClick(item) {
    const data = {
      company_id: item.id
    };
    this._apiService.likeBrand(data).subscribe(ret => {
      const data1 = {
        category: this.catId
      };
      this._apiService.listAllBrandPerCategory(data1).subscribe(ret1 => {
        this.categoriesRelatedCompany = ret1['ret'].data;
      }, err => {
      });
    }, err => {
    });
  }
}

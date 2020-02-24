import { Component, OnInit , ViewChild} from '@angular/core';

import { ApiService } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import {MdDialog} from '@angular/material';
import {WebKspMembershipDialog} from '../web-ksp-code-membership-form/web-ksp-code-membership-form.component';
import {Files} from 'angular-ssr';
import index = Files.index;

@Component({
  selector: 'app-web-ksp-awards-2019',
  templateUrl: './web-ksp-awards-2019.component.html',
  styleUrls: ['./web-ksp-awards-2019.component.css']
})

export class WebKspAwards2019Component implements OnInit {
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
  showSelectMore: any;
  user_id: any;
  guest_id: any;
  kspVotingIsActive: Boolean;
  kspVotingIsActivePopUp: Boolean = false;
  id: any;
  awardMenu: any;
  awardsDetails: any;
  token: any;
  searchTerm: any;
  filterItems: any = [];
  votingFlag: any;
  constructor(public _apiService: ApiService, private formBuilder: FormBuilder,
    private router: Router,  public _commonService: CommonService, private _router: Router,
    public dialog: MdDialog, public activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // this._apiService.getIpAddress().subscribe(data => {
    //   console.log(data);
    // });
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'] || 0;
      // console.log(params);
      this.getVotingStatus(this.id);
      if (params['token']) {
        this.token = params['token'];
        // console.log(this.token);
        localStorage.setItem('token', this.token);
        this.getUserDetails();
      }
      this._apiService.getAwardCategory(this.id).subscribe( ret => {
        this.categories = ret['ret'].data;
        this.filterItems = this.categories;
      });
        this._apiService.getAwardMenu().subscribe(ret => {
          const $ret = ret.ret;
          this.awardMenu = $ret.data;
          const index = this.awardMenu.findIndex(status => status.id == this.id);
          this.awardsDetails = this.awardMenu[index];
          // console.log(this.awardsDetails);
          this._apiService.intentCaptureCommon(this.id, 'awards', 'view', '').subscribe(ret => {
            // console.log(ret);
          }, err => {
          });
        },
          err => {
          });
    });
    // this._apiService.getStatusForVote().subscribe( resp => {
    //   if (resp.ret.code === 1) {
    //     if (resp.ret.isVoteActive === 1) {
    //       this.kspVotingIsActive = true;
    //       this._apiService.getCategoryForVote({'guest_id': this.guest_id}).subscribe( ret => {
    //         this.categories = ret['ret'].data;
    //       });
    //     } else {
    //       this.kspVotingIsActive = false;
    //       this._apiService.getAwardCategory().subscribe(ret => {
    //         this.categories = ret['ret'].data;
    //         this.searchItems1 = this.categories;
    //       }, err => {
    //       });
    //       this._apiService.getRegisterdCompany().subscribe(ret => {
    //         this.companies = ret['ret'].data;
    //         this.searchItems = this.companies;
    //       }, err => {
    //       });
    //     }
    //   }
    // });
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

  }
  getUserDetails() {
    this._apiService.getUserDetails().subscribe(response => {
      const $ret = response.ret;
      // console.log($ret.data);
      if ($ret.code === 1) {
        this._apiService.storeUserData($ret.data.api_token, $ret.data);
      }
    }, err => {
    });
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
    // console.log(this.index);
    this.showNomination = false;
    this.nomination = true;
    this.registerForm.controls['categoryName'].setValue(
      this.filterItems[this.index].category
    );
    // console.log(this.registerForm.value);
    this.catId = this.filterItems[this.index].id;
    this._apiService.intentCaptureCommon(this.catId, 'awards', 'click', 'nomination').subscribe(ret => {
      // console.log(ret);
    }, err => {
    });
  }
  closeNominationBrand() {
    this.nomination = false;
    this.nomimateMore = false;
    this.submitted = false;
    this.showSelectMore = '0';
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
      id: this.id,
      // logo: this.imageSrc.name
    };
    // console.log('data', data);
    const uploadData = new FormData();
    uploadData.append('category_id', this.catId);
    uploadData.append('id', this.id);
    uploadData.append('companyName', this.cName ? this.cName : this.registerForm['_value'].companyName);
    uploadData.append('contactPerson', this.registerForm['_value'].contactPersion);
    uploadData.append('reasonOfNomination', this.registerForm['_value'].description);
    uploadData.append('company_id', this.comapnyId ? this.comapnyId : '0');
    // uploadData.append('logo', this.registerForm.value.companyLogo, this.registerForm.value.name);
    // console.log(uploadData);
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
    // console.log(this.registerForm.value);
  }
  nominateMoreCat() {
    if (this._apiService.loggedIn()) {
      this.nomimateMore = true;
      // console.log(this.searchItems1);
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
    const i = this.arr.indexOf(item.category);
    // console.log(i);
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
    // console.log(this.registerForm['_value']);
    this.nomimateMore = false;
    this.nomination = true;
    this.showSelectMore = '1';
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
  closeVoting() {
    this.kspVotingIsActivePopUp = false;
  }
  loadMore() {
    this.more = true;
  }
// For Nominations
showNominationBrand(item, i) {
  if (this._apiService.loggedIn()) {
    this.catId = item.id;
    this.showNomination = true;
    // console.log(item);
    this.categoriesDetails = item;
    this.index = i;
    const data = {
      category: item.id
    };
    this._apiService.listAllBrandPerCategory(data).subscribe(ret => {
      this.categoriesRelatedCompany = ret['ret'].data;
    }, err => {
    });
  } else {
    this._commonService.setNavigationUrl('awards', null, 'KSPAwards2019');
  }
}

  // For Voting
  submitVote(item) {
    this._router.navigate(['/vote-submit/' + item.id]);
    // if ( this.kspVotingIsActive ) {
    //   localStorage.setItem('category', JSON.stringify(item));
    //   this._router.navigate(['/vote-submit/' + item.id]);
    // } else {
    //   this.kspVotingIsActivePopUp = true;
    // }
  }
  closeNominationBrandUser() {
    this.showNomination = false;
  }
  upload(image) {
    // console.log(image);
  }
  importFile(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      const reader = new FileReader();
      this.registerForm.patchValue({
        companyLogo: file
      });
      this.registerForm.get('companyLogo').updateValueAndValidity();
      reader.onload = () => {
        this.imageSrc = reader.result;
        // console.log(this.imageSrc);
      };
      reader.readAsDataURL(file);
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
  filterItems1() {
    this.filterItems = this.categories.filter(item =>  item.category.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1);
  }
  checkVoteSubmitted(cat_id) {
    const data = {
      guest_id: this.guest_id,
      category_id: cat_id,
      survey_id: 2019
    };
    this._apiService.checkVoteSubmitted(data).subscribe( ret => {
      const resp = ret.ret;
      // console.log(resp);
      if (resp.code === 1) {
        if (resp.data === 1) {
          this.filterItems.forEach(element => {
            if (element.id === cat_id) {
              element.isVoted = true;
            }
          });
        }
      }
    }, err => {
    });
  }
  getVotingStatus(id) {
    this._apiService.getStatusForVote({id: id}).subscribe( resp => {
      if (resp.ret.code === 1) {
        // console.log(resp.ret.flag);
        this.votingFlag = resp.ret.flag;
      }
    });
  }
}

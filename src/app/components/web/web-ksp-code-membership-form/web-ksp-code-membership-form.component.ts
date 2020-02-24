import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MD_DIALOG_DATA } from '@angular/material';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';
import { ValidateService } from '../../../services/validate.service';

@Component({
  selector: 'app-web-ksp-code-membership-form',
  templateUrl: './web-ksp-code-membership-form.component.html',
  styleUrls: ['./web-ksp-code-membership-form.component.css'],
  providers: [DatePipe]
})
export class WebKspCodeMembershipFormComponent implements OnInit {

  mother_name: any;
  mother_dob: any;
  mother_mobile: any;
  mother_email: any;
  father_name: any;
  father_dob: any;
  father_mobile: any;
  father_email: any;
  entity_id: any;
  entity_type: any;
  building_name: any;
  block_no: any;
  road: any;
  landmark: any;
  area: any;
  pincode: any;
  id: any;
  child_info: any;
  child1_name: any;
  child1_gender: any;
  child1_dob: any;
  child2_name: any;
  child2_gender: any;
  child2_dob: any;
  child3_name: any;
  child3_gender: any;
  child3_dob: any;
  child4_name: any;
  child4_gender: any;
  child4_dob: any;
  child_count: number;
  name: any;
  price: any;
  plan: any;
  shop: any;
  promo_code: any;
  payment_mode: any;
  pickup_time: any;
  pickup_contact: any;
  purpose: any;
  redirectUrl: any;
  accept: boolean;
  loading: boolean;

  constructor(
    public _apiService: ApiService,
    public _commonService: CommonService,
    public _validateService: ValidateService,
    public _router: Router,
    public _route: ActivatedRoute,
    public dialog: MdDialog,
    public _pipe: DatePipe
  ) {
    this.child1_gender = 'Male';
    this.child2_gender = 'Male';
    this.child3_gender = 'Male';
    this.child4_gender = 'Male';
    this.mother_dob = this._pipe.transform(new Date(), 'yyyy-MM-dd');
    this.father_dob = this._pipe.transform(new Date(), 'yyyy-MM-dd');
    this.child1_dob = this._pipe.transform(new Date(), 'yyyy-MM-dd');
    this.child2_dob = this._pipe.transform(new Date(), 'yyyy-MM-dd');
    this.child3_dob = this._pipe.transform(new Date(), 'yyyy-MM-dd');
    this.child4_dob = this._pipe.transform(new Date(), 'yyyy-MM-dd');
    this.child_count = 1;
    this.payment_mode = 'Do a Bank transfer';
    this.pickup_time = '10 am - 1 pm';
    this.accept = false;
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this._route.params.subscribe(params => {
      this.name = params['name'];
      this.price = params['price'];
      this.id = params['id'];

    })
  }

  onMotherDOBChange(evt) {
    this.mother_dob = this._pipe.transform(new Date(evt.dateObj), 'yyyy-MM-dd');
  }

  onFatherDOBChange(evt) {
    this.father_dob = this._pipe.transform(new Date(evt.dateObj), 'yyyy-MM-dd');
  }

  onChildDOBChange(evt, id) {
    if (id == 1) {
      this.child1_dob = this._pipe.transform(new Date(evt.dateObj), 'yyyy-MM-dd');
    }
    else if (id == 2) {
      this.child2_dob = this._pipe.transform(new Date(evt.dateObj), 'yyyy-MM-dd');
    }
    else if (id == 3) {
      this.child3_dob = this._pipe.transform(new Date(evt.dateObj), 'yyyy-MM-dd');
    }
    else {
      this.child4_dob = this._pipe.transform(new Date(evt.dateObj), 'yyyy-MM-dd');
    }
  }

  addChild() {
    this.child_count = this.child_count + 1;
  }

  removeChild() {
    this.child_count = this.child_count - 1;
  }



  submit1() {
    const flag = this.validateForm();
    if (flag) {
      this.loading = true;
      const child_name = [];
      const child_gender = [];
      const child_dob = [];
      if (this.child_count < 2) {
        child_dob.push(this.child1_dob);
      }
      else if (this.child_count < 3) {
        child_dob.push(this.child1_dob);
        child_dob.push(this.child2_dob);
      }
      else if (this.child_count < 4) {
        child_dob.push(this.child1_dob);
        child_dob.push(this.child2_dob);
        child_dob.push(this.child3_dob);
      }
      else {
        child_dob.push(this.child1_dob);
        child_dob.push(this.child2_dob);
        child_dob.push(this.child3_dob);
        child_dob.push(this.child4_dob);
      }
      let member_info;
      member_info = {
        'mother_name': this.mother_name,
        'mother_birth': this.mother_dob,
        'mother_phone': this.mother_mobile,
        'mother_email': this.mother_email,
        'building': this.building_name,
        'block': this.block_no,
        'road': this.road,
        'landmark': this.landmark,
        'area': this.area,
        'pincode': this.pincode,
        'birth': child_dob,
        'duration': this.plan,
        'promo_code': this.promo_code,
        'info': this.payment_mode,
        'pickup_time': this.pickup_time,
        'pickup_contact': this.pickup_contact
      };
      //console.log(member_info);
      this._apiService.kspCodeMember(member_info).subscribe(ret => {
        const $ret = ret.ret;
        if ($ret.code == 1) {
          if (this.payment_mode == 'Online Payment via Credit/Debit Card and Net Banking') {
            let purpose;
            let amount;
            if (this.plan == 'Festive Fun Box for Rs.999') {
              amount = 999;
              purpose = 'festive-fun-box-membership';

            } else if (this.plan == '3 months for Rs.1000') {
              amount = 1000;
              purpose = 'ksp-code-3-month-membership';

            } else if (this.plan == '6 months for Rs.1800') {
              amount = 1800;
              purpose = 'ksp-code-6-month-membership';

            } else if (this.plan == 'Skill Builder Box for Rs.1200') {
              amount = 1200;
              purpose = 'skill_builder_box';

            } else if (this.plan == 'Play To Learn Box for Rs.999') {
              amount = 999;
              purpose = 'play-box-kit';

            } else if (this.plan == 'Busy Box for Rs.999') {
              amount = 999;
              purpose = 'busy-box-kit';

            } else if (this.plan == 'Traveller Box for Rs.999') {
              amount = 999;
              purpose = 'traveller-box-kit';
            } else if (this.plan == 'Kindness Box for Rs.999') {
              amount = 999;
              purpose = 'kindness-box-kit';
            }
            else if (this.plan == 'Indoor Fun Box for Rs.999') {
              amount = 999;
              purpose = 'indoor-fun-box';
            }
            else if (this.plan == 'Boardgames Box for Rs.999') {
              amount = 999;
              purpose = 'boardgames-box-kit';
            } else {
              amount = 3000;
              purpose = 'ksp-code-annual-membership';
            }

            let instaMojo_info;
            instaMojo_info = {
              'purpose': purpose,
              'amount': amount,
              'phone': this.mother_mobile,
              'buyer_name': this.mother_name,
              'email': this.mother_email
            };
            //console.log(instaMojo_info);
            this._apiService.kspCodeInsta(instaMojo_info).subscribe(ret1 => {
              this.loading = false;
              const $ret1 = ret1.success;
              if ($ret1 == true) {
                let msg = 'We have received your order. Your box will be delivered within 15 working days from the date of recieved of payment.';
                if (this.plan === 'Skill Builder Box for Rs.1200' || this.plan === 'Festive Fun Box for Rs.999' || this.plan === 'Play To Learn Box for Rs.999' || this.plan === 'Busy Box for Rs.999' || this.plan == 'Traveller Box for Rs.999' || this.plan == 'Summer Playdate Box') {
                  msg = 'We have received your order. Your box will be delivered within 15 working days from the date of recieved of payment.';
                } else if (this.plan == 'Kindness Box for Rs.999' || this.plan == 'Boardgames Box for Rs.999') {
                  msg = 'We have received your order. Your box will be delivered within 15 working days from the date of recieved of payment.';
                }
                const dialogRef = this.dialog.open(WebKspMembershipDialog, { data: msg });
                dialogRef.afterClosed().subscribe(result => {
                  if (this.plan == 'Festive Fun Box for Rs.999') {
                    window.location.href = 'https://imjo.in/twcjF8';

                  } else if (this.plan == '3 months for Rs.1000') {
                    window.location.href = 'https://imjo.in/sWszPb';

                  } else if (this.plan == 'Skill Builder Box for Rs.1200') {
                    window.location.href = 'https://imjo.in/Sm39vW';

                  } else if (this.plan == 'Play To Learn Box for Rs.999') {
                    window.location.href = 'https://imjo.in/6R6SmQ';

                  } else if (this.plan == 'Busy Box for Rs.999') {
                    window.location.href = 'https://imjo.in/ugsS9V';

                  } else if (this.plan == '6 months for Rs.1800') {
                    window.location.href = 'https://www.instamojo.com/kspcode/ksp-code-6-month-membership/?data_name=' + this.mother_name + '&data_email=' + this.mother_email + '&data_phone=' + this.mother_mobile;

                  } else if (this.plan == 'Traveller Box for Rs.999') {
                    window.location.href = 'https://imjo.in/5xGGmY';
                  } else if (this.plan == 'Kindness Box for Rs.999') {
                    window.location.href = 'https://imjo.in/n65eqr';

                  } else if (this.plan == 'Boardgames Box for Rs.999') {
                    window.location.href = 'https://imjo.in/TVjXDC';


                  } else if (this.plan == 'Smart Preschoolers Box for Rs.1050') {
                    window.location.href = 'https://imjo.in/hQF8gM';
                  }
                  else if (this.plan == 'Indoor Fun Box') {
                    window.location.href = 'https://imjo.in/AETc3w';

                  }
                  else if (this.plan == 'Summer Playdate Box') {
                    window.location.href = 'https://imjo.in/HMyMVm';
                  }
                  else {
                    window.location.href = 'https://www.instamojo.com/kspcode/ksp-code-annual-membership/?data_name=' + this.mother_name + '&data_email=' + this.mother_email + '&data_phone=' + this.mother_mobile;
                  }
                });
              }
            }, err => {
              this.loading = false;
            });
          }
          else {
            const dialogRef = this.dialog.open(WebKspMembershipDialog, { data: 'We have received your order. Your box will be delivered within 15 working days from the date of recieved of payment.' });
            dialogRef.afterClosed().subscribe(result => {
              this._router.navigate(['/ksp-code']);
            });
          }
        } else {
          this.loading = false;
        }
      }, err => {
        this.loading = false;
      });
    }
  }
  submit() {
    this.entity_type = 'shop';
    const flag = this.validateForm();
    if (flag) {
      let member_info;
      member_info = {
        'name': this.mother_name,
        'mother_birth': this.mother_dob,
        'mobile_no': this.mother_mobile,
        'email': this.mother_email,
        'flat_name': this.building_name,
        'landmark': this.block_no,
        'area': this.road,
        'city': this.landmark,
        'state': this.area,
        'pincode': this.pincode,
        'entity_id': this.id,
        'entity_type': this.entity_type,
        'order_id': ''
      };
      if (localStorage.getItem('kspshop')) {
        this.shop = 'shop';
        this.purpose = 'kspShop' + this.id;
      } else {
        this.shop = 'code';
        this.purpose = 'kspCode' + this.id;
      }
      this.redirectUrl = this._apiService.getShareUrlPay() + 'payment-statusFinal';
      this._apiService.paymentInitiate(this.id, this.shop, this.price, this.redirectUrl, this.purpose).subscribe(ret => {
        console.log(ret);
        localStorage.setItem('bundle_id', this.id);
        member_info.order_id = ret['ret'].order_id;
        console.log('order-id-->>> ' + member_info.order_id);
        if (ret['ret'].code === 1) {
          this._apiService.saveUserItemDetails(member_info).subscribe(ret1 => {
            const $ret = ret1.ret;

            if ($ret.code == 1) {
              location.href = ret['ret'].long_url;
            } else {
              this.loading = false;
            }
          }, err => {
            this.loading = false;
          });
        } else {

        }
      });
    }
  }

  validateForm() {
    if (this.mother_name == null || (this.mother_name).toString().trim() == '') {
      const dialogRef = this.dialog.open(WebKspMembershipDialog, { data: 'Name cannot be empty!' });
      return false;
    }
    if (this.mother_mobile == null || (this.mother_mobile).toString().trim() == '') {
      const dialogRef = this.dialog.open(WebKspMembershipDialog, { data: 'Mobile No cannot be empty!' });
      return false;
    }
    if (!this._validateService.validateMobile(this.mother_mobile)) {
      const dialogRef = this.dialog.open(WebKspMembershipDialog, { data: 'Invalid Mobile No!' });
      return false;
    }
    if (this.mother_email == null || (this.mother_email).toString().trim() == '') {
      const dialogRef = this.dialog.open(WebKspMembershipDialog, { data: 'Email cannot be empty!' });
      return false;
    }

    if (this.building_name == null || (this.building_name).toString().trim() == '') {
      const dialogRef = this.dialog.open(WebKspMembershipDialog, { data: 'Building Name cannot be empty!' });
      return false;
    }
    if (this.block_no == null || (this.block_no).toString().trim() == '') {
      const dialogRef = this.dialog.open(WebKspMembershipDialog, { data: 'Landmark cannot be empty!' });
      return false;
    }
    if (this.road == null || (this.road).toString().trim() == '') {
      const dialogRef = this.dialog.open(WebKspMembershipDialog, { data: 'Area cannot be empty!' });
      return false;
    }
    if (this.landmark == null || (this.landmark).toString().trim() == '') {
      const dialogRef = this.dialog.open(WebKspMembershipDialog, { data: 'City cannot be empty!' });
      return false;
    }
    if (this.area == null || (this.area).toString().trim() == '') {
      const dialogRef = this.dialog.open(WebKspMembershipDialog, { data: 'State cannot be empty!' });
      return false;
    }
    if (this.pincode == null || (this.pincode).toString().trim() == '') {
      const dialogRef = this.dialog.open(WebKspMembershipDialog, { data: 'Pincode cannot be empty!' });
      return false;
    }
    if (this.accept == false) {
      const dialogRef = this.dialog.open(WebKspMembershipDialog, { data: 'Please accept Terms & Conditions and Privacy Policy of the website' });
      return false;
    }
    return true;
  }

}


@Component({
  selector: 'dialog-messages',
  templateUrl: './dialog-messages.html',
})
export class WebKspMembershipDialog {
  constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
}

import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxCarousel } from 'ngx-carousel';
// import "assets/award2017/js/jquery-2.1.0.min.js";
import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';
import { DOCUMENT } from '@angular/common';

declare var addThisObj: any;
declare var instaEmbedObj: any;
declare var twitterEmbedObj: any;
declare var $: any;

declare var Instamojo: any;

@Component({
  selector: 'app-web-summer-challenge',
  templateUrl: './web-summer-challenge.component.html',
  styleUrls: ['./web-summer-challenge.component.css'],
  providers: [DatePipe]
})
export class WebSummerChallenge implements OnInit {

  cityAgeCall: number = 0;
  selectedBundleId: number;
  selectedCity: any = [];
  selectedAge: any = [];
  currentTab: any = 1;
  challenges: any = [];
  userChallenges: any = [];
  userBundles: any = [];
  currentChallenge: any = false;
  recommendedArticles: any = [];
  disbaleAcceptButton: any = false;
  actualChallenges: any;
  challengeStatus: any;
  bookStatus: any;
  review: any;
  purpose: any;
  bndle: any;
  redirectUrl: any;
  ageGroups: any = {};
  itemToReview: any;
  showReviewButton: any = true;
  scroll: any = false;
  event_pic: any;
  event_video: any;
  child: any = [];
  imageErrorMessage: any;
  imageUploadMessage: any;
  image_path: any;
  paymentResponse: any;
  videoErrorMessage: any;
  videoUploadMessage: any;
  video_path: any;
  selectedChild: any;
  shareCount: number;
  bookData: any = {};
  items: any[];
  age_id: any;
  intent_type: any;
  chailangeDetails: any;
  selected: number = 0;
  selectedRow: Number;
  selectedRow1: Number;
  cnt: number = 0;
  email: string;
  mobNo: number;
  bundle: any = [];
  bundleDetails: any;
  match: Boolean = false;
  goToBundle: Boolean = false;

  // price to Print
  priceToPrint;

  @ViewChild('dataContainer') dataContainer: ElementRef;

  public carouselTile: NgxCarousel;
  public carouselTile1: NgxCarousel;
  constructor(
    public _api: ApiService,
    public _commonService: CommonService,
    public _sanitizer: DomSanitizer,
    public _pipe: DatePipe,
    public _router: Router,
    public _route: ActivatedRoute,
    @Inject(DOCUMENT) private document: any
  ) {
    this.shareCount = 0;
    this.carouselTile = {
      grid: { xs: 2, sm: 3, md: 3, lg: 4, all: 0 },
      slide: 1,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: true
      },
      load: 1,
      touch: true,
      easing: 'ease',
      loop: true
    };
    this.carouselTile1 = {
      grid: { xs: 2, sm: 2, md: 2, lg: 2, all: 0 },
      slide: 1,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: true
      },
      load: 1,
      touch: true,
      easing: 'ease',
      loop: true
    };
  }
  selectOption(id) {
    console.log(id);
    // const data = new FormData();
    //  data.append('age_range', id);
    //  console.log(data);
    const data = {
      age_range: id
    };
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].age === id) {
        this.age_id = this.items[i].id;
      }
    }
    this._api.getBundleByAgeId(this.age_id).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.data.length) {
        this.bundle = $ret.data;
      } else {
        this.bundle = [];
      }
    })
    this._api.getchallangeByAgeId(data).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        addThisObj.refresh();
        this.actualChallenges = $ret.data.challenges;
        // this.userChallenges = $ret.data.userChallenges;
        // console.log(this.userChallenges);
        this.filterChallenges(1);
        for (var i = 0; i < this.userChallenges.length; i++) {
          if (this.userChallenges[i].status == 1) {
            let todayDate = new Date();
            let challengeDate = new Date(this.userChallenges[i].date_claimed);
            let timeDiff = Math.abs(todayDate.getTime() - challengeDate.getTime());
            let diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));

            if (diffDays >= 1) {
              $('#pendingChallenge').modal('show');
            }
          }
        }
      } else {
        this.actualChallenges = [];
        this.challenges = [];
      }
    }, err => {
    });
  }
  ngOnInit() {
    Instamojo.configure({
      amount: 2000,
      handlers: {
        onOpen: this.onOpenHandler,
        onClose: this.onCloseHandler,
        onSuccess: this.onPaymentSuccessHandler,
        onFailure: this.onPaymentFailureHandler
      }
    });

    if (!this._api.loggedIn()) {
      setTimeout(() => {
        if (this.cnt == 0 && location.pathname == '/summer-funfactory') {
          $(document).mouseleave(function () {
            if (this.cnt == undefined) {
              $('#guestDetails').modal('show');
              this.cnt = 1;
            }
          });
        }
      }, 5000);
    }

    this.getAgeGroup();
    this.getUserDetails();
    this.getBundle();
    this._commonService.navUrl = '/summer-funfactory';
    this._api.getChallengesForSummer().subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        addThisObj.refresh();
        this.actualChallenges = $ret.data.challenges;
        this.userChallenges = $ret.data.userChallenges;
        // console.log(this.userChallenges);
        this.filterChallenges(1);
        for (var i = 0; i < this.userChallenges.length; i++) {
          if (this.userChallenges[i].status == 1) {
            let todayDate = new Date();
            let challengeDate = new Date(this.userChallenges[i].date_claimed);
            let timeDiff = Math.abs(todayDate.getTime() - challengeDate.getTime());
            let diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));

            if (diffDays >= 1) {
              $('#pendingChallenge').modal('show');
            }
          }
        }
      } else {
        this.actualChallenges = [];
        this.challenges = [];
      }
    }, err => {
    });

    this._api.getAgeGroups().subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        for (let i = 0; i < $ret.data.length; i++) {
          this.ageGroups[$ret.data[i].id] = $ret.data[i].age;
        }
      } else {
        this.ageGroups = [];
      }
    }, err => {
    });

    /*Calculate share count*/
    this._api.getShareCount(this._api.share_url + 'summer-funfactory').subscribe(ret_share => {
      this.shareCount = ret_share.shares;
    });

    // this._route.paramMap.subscribe(params => {
    //   console.log(params);

    // });

  }

  filterChallenges(tab) {
    this.currentTab = tab;
    this.challenges = Object.assign([], this.actualChallenges);
    this.challenges = this.challenges.filter(function (item) { return item.challenge_type == tab });
    this.currentChallenge = false;
    $('.ngxcarousel-items').css("transform", "translate3d(0, 0, 0)");

    if (this.scroll) {
      $('html, body').animate({
        scrollTop: $(".section-three").offset().top - 70
      }, 1000);
    }
    this.scroll = true;
  }
  toPlaystore() {
    window.location.href = 'https://www.kidsstoppress.com/v1/app';
  }

  showChallengeContent(challenge) {
    /* Scroll to content Div*/
    // $('html, body').animate({
    //   scrollTop: $("#challengeDetails").offset().top - 110
    // }, 1000);

    if (!this.chailangeDetails || this.chailangeDetails.id != challenge.id) {
      this.chailangeDetails = Object.assign({}, challenge);
      this.chailangeDetails.details = this._sanitizer.bypassSecurityTrustHtml(this.chailangeDetails.details);
      instaEmbedObj.load();
      twitterEmbedObj.load();

      this._api.getRecommendedArticlesForChallenge({ articles: this.chailangeDetails.related_content }).subscribe(ret => {
        console.log(ret['ret']);
        let $ret = ret.ret;
        if ($ret.code == 1) {
          this.recommendedArticles = $ret.data;
        } else {
          this.recommendedArticles = {};
        }
      }, err => {
      });
    }
  }

  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  moveToChallengeContent(challenge) {
    let chaId = challenge.id;
    let chaType = challenge.challenge_type;

    this.currentTab = chaType;
    this.challenges = Object.assign([], this.actualChallenges);
    this.challenges = this.challenges.filter(function (item) { return item.challenge_type == chaType });
    this.currentChallenge = false;
    $('.ngxcarousel-items').css("transform", "translate3d(0, 0, 0)");

    let chal = this.challenges.filter(function (item) { return item.id == chaId });
    this.showChallengeContent(chal[0]);
  }

  checkInUserChallenges(id) {
    return this.userChallenges.filter(function (item) { return item.challenge.id == id }).length;
  }

  acceptChallenge(challenge) {
    // alert('hello');
    if (this._api.loggedIn()) {
      $('#selectChallenge').modal('show');
      this.disbaleAcceptButton = true;
    } else {
      $('#userLogin').modal('show');
    }


  }

  openChangeMyChallengeStatus(status, id, index) {
    this.challengeStatus = { 'status': status, 'id': id, 'index': index };
    this.review = '';

    this.imageUploadMessage = "";
    this.imageErrorMessage = "";
    this.image_path = "";

    this.videoUploadMessage = "";
    this.videoErrorMessage = "";
    this.video_path = "";
  }

  changeMyChallengeStatus() {
    this.userChallenges[this.challengeStatus.index].status = this.challengeStatus.status;
    if (this.review != '') {
      this.userChallenges[this.challengeStatus.index].challenge.review = 1;
    }
    this._api.changeChallengeStatus({ 'status': this.challengeStatus.status, 'id': this.challengeStatus.id, 'review': this.review, 'image': this.image_path, 'video': this.video_path }).subscribe(ret => { });
  }

  startReadingBook(book, index) {
    // console.log(book);
    // console.log(index);
    if (!this.disbaleAcceptButton) {
      this.disbaleAcceptButton = true;
      this._api.startReadingBook({ book: book }).subscribe(ret => {
        this.disbaleAcceptButton = false;
        let $ret = ret.ret;
        if ($ret.code == 1) {
          this.chailangeDetails.books[index].user_book_id = $ret.data;
          this.chailangeDetails.books[index].user_book_status = 1;
        } else {

        }
      }, err => {
      });
    }
  }

  openChangeUserBookStatus(status, id, index) {
    this.bookStatus = { 'status': status, 'id': id, 'index': index };
    this.review = '';
    this.imageUploadMessage = "";
    this.imageErrorMessage = "";
    this.image_path = "";

    this.videoUploadMessage = "";
    this.videoErrorMessage = "";
    this.video_path = "";
  }

  changeUserBookStatus() {
    this.chailangeDetails.books[this.bookStatus.index].user_book_status = this.bookStatus.status;
    if (this.review != '') {
      this.chailangeDetails.books[this.bookStatus.index].review = 1;
    }
    this._api.changeUserBookStatus({ 'status': this.bookStatus.status, 'id': this.bookStatus.id, 'review': this.review, 'image': this.image_path, 'video': this.video_path }).subscribe(ret => { });
  }

  openReview(item, type, index) {
    this.itemToReview = item;
    this.itemToReview.type = type;
    this.itemToReview.index = index;
    this.review = '';
    this.imageUploadMessage = "";
    this.imageErrorMessage = "";

    this.videoUploadMessage = "";
    this.videoErrorMessage = "";
    this.video_path = "";
  }

  saveReview() {
    if (this.review && this.review != '') {
      let data = {};
      if (this.itemToReview.type == 'challenge') {
        data = {
          challenge_id: this.itemToReview.id,
          challenge_type: this.itemToReview.challenge_type,
          image: this.image_path,
          video: this.video_path
        };
        this.userChallenges[this.itemToReview.index].challenge.review = 1;
      } else if (this.itemToReview.type == 'book') {
        data = {
          challenge_id: this.itemToReview.challenge_id,
          challenge_type: 1,
          book_id: this.itemToReview.id,
          image: this.image_path,
          video: this.video_path
        };
        this.currentChallenge.books[this.itemToReview.index].review = 1;
      }
      data['review'] = this.review;
      this._api.addUserReview(data).subscribe(ret => { });
    }
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.imageUploadMessage = "";
      this.imageErrorMessage = "";

      if (file.size <= (1024 * 1024 * 5)) {
        if (file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/png') {
          this.imageUploadMessage = "Please wait while uploading file ...";
          this._api.uploadEventPicture(file).subscribe(ret => {
            let $ret = ret.ret;
            if ($ret.code == 1) {
              this.image_path = $ret.data[0];
              this.imageUploadMessage = "File Uploaded: " + file.name;
            } else {
            }
          }, err => {
          });
        }
        else {
          this.imageErrorMessage = 'Please upload .jpg or .jpeg or .png type file only.';
        }
      }
      else {
        this.imageErrorMessage = 'File size should not be more than 5 Mb.';
      }
    }
  }

  videoChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.videoUploadMessage = "";
      this.videoErrorMessage = "";

      if (file.size <= (1024 * 1024 * 50)) {
        if (file.type == 'video/mp4') {
          this.videoUploadMessage = "Please wait while uploading file ...";
          this._api.uploadEventPicture(file).subscribe(ret => {
            let $ret = ret.ret;
            if ($ret.code == 1) {
              this.video_path = $ret.data[0];
              this.videoUploadMessage = "File Uploaded: " + file.name;
            } else {
            }
          }, err => {
          });
        }
        else {
          this.videoErrorMessage = 'Please upload .mp4 type file only.';
        }
      }
      else {
        this.videoErrorMessage = 'File size should not be more than 50 Mb.';
      }
    }
  }

  gotoRegister() {
    this._router.navigate(['/signup', { c: 'challenge-submission' }]);
  }

  gotoLogin() {
    this._router.navigate(['/login']);
  }

  showBookDescription(book) {
    this.bookData = book;
  }

  challengePercent(item) {
    if (item.challenge_type != 1) {
      if (item.status == 2) {
        return '100%';
      } else {
        return '0%';
      }
    } else {
      let challengeBooks = this.challenges.filter(function (c) { return c.id == item.challenge_id });
      if (challengeBooks.length) {
        let totalBooks = challengeBooks[0].books.length;
        let userRead = challengeBooks[0].books.filter(function (c) { return c.user_book_status == 2 }).length;
        if (userRead) {
          let percent = (userRead / totalBooks) * 100;
          return percent + '%';
        } else {
          return '0%';
        }
      } else {
        return '0%';
      }
    }
  }
  getAgeGroup() {
    this._api.getAgeGroups().subscribe(ret => {
      console.log(ret['ret']);
      if (ret['ret'].code == 1) {
        this.items = ret['ret'].data;
        this.items = this.items.filter(function (item) {
          return (item.id > 29 && item.id < 34);
        })
      }
    }, err => {
    });
  }
  getChailangeDetails(details, index) {
    this.bundleDetails = '';
    this.chailangeDetails = details;
    // if (index === 1) {
    //   this.selectedRow = 3;
    // } else if (index === 0) {
    //   this.selectedRow = 2;
    // } else {
    //   this.selectedRow = index;
    // }
    this.selectedRow = null;
    this.selectedRow1 = index;
    console.log(this.userChallenges);
    console.log(details);
    const index1 = this.userChallenges.findIndex(item => item.challenge_id === details.id);
    console.log(index1);
    if (index1 !== -1) {
      this.match = false;

    } else {
      this.match = true;
    }
  }
  getUserDetails() {
    this._api.getUser().subscribe(ret => {
      this.child = ret['ret'].data.children;
      console.log(this.child);
    }, err => {
    });
  }
  selectChild(child) {
    this.selectedChild = child;
    const data = {
      challenge_id: this.chailangeDetails.id,
      child_id: child
    };

    this._api.acceptChallenge({ challenge: this.chailangeDetails }).subscribe(ret => {
      this.disbaleAcceptButton = false;
      let $ret = ret.ret;
      if ($ret.code == 1) {
        let cha = $ret.data;
        cha.challenge = this.chailangeDetails;
        this.userChallenges.push(cha);
      } else {
      }
    }, err => {
    });
    $('#selectChallenge').modal('hide');
    $('#greatchoice').modal('show');
  }
  getBundle() {
    console.log('bundle ljwer');
    const xyz = [];
    this._api.getbunddle().subscribe(ret => {
      this.bundle = ret['ret'].data;
      console.log(this.bundle);
      let prevId = 0;
      if (this._api.loggedIn()) {
        for (let i = 0; i < this.bundle.length; i++) {
          this._api.checkBundlePayment({ bundle_id: this.bundle[i].id }).subscribe(ret1 => {
            this.bundle[i].payment = ret1['ret'].data;
            if (this.bundle[i].payment == 1 && prevId !== this.bundle[i].id) {
              this.userBundles.push((this.bundle[i]));
              prevId = this.bundle[i].id;
            }
            // if (ret1['ret'].data === 1) {
            //   this.goToBundle = true;
            // } else {
            //   this.goToBundle = false;
            // }
          }, err => {
          });
        }
        console.log(this.bundle);
      }
    }, err => {
    });
  }
  getBundleDetails(bundle, index) {
    this.chailangeDetails = '';
    this.bundleDetails = bundle;
    this.selectedRow1 = null;
    this.selectedRow = index;
  }
  submitPaymentDet(bundleId, bndl, payment_link, price, title) {

    this.priceToPrint = price;

    if (this._api.loggedIn()) {
      this.bndle = 'bundle';
      this.purpose = 'ksp-Bundle - ' + bundleId + ' - ' + title;
      this.redirectUrl = 'https://kidsstoppress.com/v1/bundle-individual/' + bundleId;
      console.log(title);
      this._api.paymentInitiate(bundleId, this.bndle, price, this.redirectUrl, this.purpose).subscribe(ret => {
        localStorage.setItem('bundle_id', bundleId);
        if (ret['ret'].code === 1) {
          console.log(ret['ret'].long_url);
          location.href = ret['ret'].long_url;
        } else {

        }
      });
    } else {
      $('#userLogin').modal('show');
    }

  }


  submitGuestDet() {
    this.intent_type = "summerfunfactory";
    this._api.submitGuestDet(this.email, this.mobNo, this.intent_type).subscribe(ret => {
    })
  }
  onOpenHandler() {
    // alert('Payments Modal is Opened');
  }

  onCloseHandler() {
    // alert('Payments Modal is Closed');
  }

  onPaymentSuccessHandler(response) {
    // alert('Payment Success');
    // this.paymentResponse = response;
    // alert(JSON.stringify(this.paymentResponse));
    WebSummerChallenge.prototype.confirmSuccess(response.paymentId);
    console.log('Payment Success Response', response);
  }

  confirmSuccess(paymentId) {
    ApiService.prototype.submitPaymentDetConfirm(this.selectedBundleId, 1, paymentId);
  }
  onPaymentFailureHandler(response) {
    // alert('Payment Failure');
    console.log('Payment Failure Response', response);
  }

  // Instamojo.configure({
  //   handlers: {
  //     onOpen: onOpenHandler,
  //     onClose: onCloseHandler,
  //     onSuccess: onPaymentSuccessHandler,
  //     onFailure: onPaymentFailureHandler
  //   }
  // });

}

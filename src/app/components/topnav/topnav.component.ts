import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';
declare var $: any;


@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {


  mobileFilterUrls: string[];
  showMobileFilterIcon: boolean;

  user: any;
  surveyForm: FormGroup;

  showSubscribeThanks: boolean = false;
  showStoryThanks: boolean = false;
  thankText: any = "";
  storyThanksText: any = "";
  campLinkUrl: any = [];
  uploadUrl: any;
  event_pic: any;
  survey: any;
  surveythankText: any;
  awardMenu: any;

  @ViewChild('ckeditor') ckeditor: any;

  constructor(
    public _apiService: ApiService,
    public _commonService: CommonService,
    public _router: Router,
    private form: FormBuilder,
    public _activatedRoute: ActivatedRoute
  ) {
    this.showMobileFilterIcon = false;
    this.mobileFilterUrls = [
      "/home",
      "/dashboard",
      "/article-user",
      "/article-public",
      "/tv-all"
    ];

    /* Set footer variable to show/hide footer on page. */
    localStorage.setItem('footerVisible', 'show');
  }

  ngOnInit() {
    this.getAwardsMenu();
    this._router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      this.showMobileFilterIcon = false;
      this._commonService.showMobileFilter = false;
      if (this.mobileFilterUrls.some(x => x === this._router.url)) {
        this.showMobileFilterIcon = true;
      }

      if (this._apiService.loggedIn()) {
        let upload_url = this._apiService.upload_url + "?api_token=" + this._apiService.authToken;
        this.uploadUrl = upload_url;
      }
    });

    if (this._apiService.loggedIn()) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    this.surveyForm = this.form.group({
      'question_1': [null, [Validators.required]],
      'question_2': [null, [Validators.required]],
      'question_3': [null, [Validators.required]],
      'question_4': [null, [Validators.required]],
      'question_5': [null, [Validators.required]],
      'type': [null]
    });

    let upload_url = this._apiService.upload_url + "?api_token=" + this._apiService.authToken;
    this.uploadUrl = upload_url;

    /* Get survey Articles */
    this._apiService.getCampaignArticles().subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        localStorage.setItem('surveyArticles', $ret.data.articles);
      } else {
        localStorage.setItem('surveyArticles', '');
      }
    },
      err => {
      });

    setTimeout(function () {
      let takeSurvey = localStorage.getItem('takeSurvey') ? localStorage.getItem('takeSurvey') : 'yes';
      let date: any = Math.floor(Date.now() / 1000);
      let storedTime: any = localStorage.getItem('surveyTime') ? localStorage.getItem('surveyTime') : 0;

      if (takeSurvey == 'yes' && (!storedTime || ((date - parseInt(storedTime)) / 86400) > 1)) {
        $('#ksp-survey-confirm').modal('show');
        $('#SignupModal').modal('hide');
        localStorage.setItem('surveyTime', date);
      }
    }, 120000);
  }

  logoutUser() {
    if (this._apiService.logoutUserData()) {
      this._router.navigate(['']);
    }
  }

  search(text: string) {
    $('#sidenav-overlay').removeClass('dim');
    $('.mobile-search').addClass('hide');
    this._router.navigate(['/search-result/' + text]);
  }

  storeCurrentUrl() {
    this._commonService.urlBeforeLogin = this._router.url;
  }

  gotoRegister() {
    this._router.navigate(['/signup', { c: 'story-submission' }]);
  }

  gotoLogin() {
    this._router.navigate(['/login']);
  }

  gotoKSPcode() {
    this._apiService.anyPageview('/ksp-code', 'code', 'click').subscribe(ret => { });
    let flag: any = 1;
    localStorage.setItem('codePopup', flag);
    this._router.navigate(['/ksp-code']);
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      if (file.size <= (1024 * 1024 * 5)) {
        if (file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/png') {
          this._apiService.uploadEventPicture(file).subscribe(ret => {
            let $ret = ret.ret;
            if ($ret.code == 1) {
              try {
                let link = this.ckeditor.instance.document.createElement("img");
                link.setAttribute("alt", "Image");
                link.setAttribute("src", $ret.data[0]);

                this.ckeditor.instance.insertElement(link);
              }
              catch (error) {
                console.log((<Error>error).message);
              }
            } else {
              alert('Some network error occur, Please try after sometime.');
            }
          }, err => {
          });
        }
        else {
          alert('Please upload .jpg or .jpeg or .png type file only.');
        }
      }
      else {
        alert('File size should not be more than 5 Mb.');
      }
    }
  }

  openImageExplorer(event) {
    $('#event_pic').trigger('click');
  }

  openKSPSurvey(status) {
    if (status) {
      localStorage.setItem('takeSurvey', 'yes');
      let date: any = Math.floor(Date.now() / 1000);
      localStorage.setItem('surveyTime', date);

      let surveyType = localStorage.getItem('seenNestleAdd') ? 1 : 0;
      this.surveyForm.patchValue({ type: surveyType });
      this.survey = [
        {
          text: 'How did you find out about PediaSure?',
          id: 'question_1',
          options: [
            { value: 'TV_Ad', text: 'TV Ad' },
            { value: 'Digital_Ad_(Facebook/YouTube/Instagram)', text: 'Digital Ad (Facebook/YouTube/Instagram)' },
            { value: "Doctor's_recommendation", text: "Doctor's recommendation" },
            { value: 'Word_of_mouth/influencers', text: 'Word of mouth/influencers' }
          ]
        }, {
          text: 'What factors triggered purchase for PediaSure?',
          id: 'question_2',
          options: [
            { value: 'PediaSure_delivers_results_as_promised', text: 'PediaSure delivers results as promised' },
            { value: 'It_was_recommended_by_friends/family/doctors', text: 'It was recommended by friends/family/doctors' },
            { value: 'I_purchased_because_of_discount', text: 'I purchased because of discount' },
            { value: 'Because_I_saw_new_News_on_the_brand', text: 'Because I saw new News on the brand' }
          ]
        }, {
          text: 'How likely are you to purchase PediaSure in your next purchase?',
          id: 'question_3',
          options: [
            { value: 'I_will_continue_to_buy_PediaSure', text: 'I will continue to buy PediaSure' },
            { value: 'I_will_buy_PediaSure_along_with_other_brands', text: 'I will buy PediaSure along with other brands' },
            { value: 'I_will_buy_other_brands_and_not_Pediasure', text: 'I will buy other brands and not Pediasure' }
          ]
        }
        , {
          text: "Your primary concern with your child's growth?",
          id: 'question_4',
          options: [
            { value: 'Incomplete_nutrition', text: 'Incomplete nutrition' },
            { value: 'Fussy_eating', text: 'Fussy eating' },
            { value: 'Lack_of_play', text: 'Lack of play' },
            { value: 'Excessive_screen_time', text: 'Excessive screen time' }
          ]
        }, {
          text: 'What are the building blocks to your child growth?',
          id: 'question_5',
          options: [
            { value: 'Protein', text: 'Protein' },
            { value: 'Carbohydrates', text: 'Carbohydrates' },
            { value: 'Fats', text: 'Fats' }
          ]
        }
      ];
      $('#ksp-survey').modal('show');
    } else {
      localStorage.setItem('takeSurvey', 'no');
    }
  }

  submitSurvey(data) {
    this._apiService.submitSurvey(data).subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 1) {
        localStorage.setItem('takeSurvey', 'no');
        this.surveythankText = "Thanks, for taking the survey."
      } else {
        this.surveythankText = "Sorry, Some network error occurs, Please try after some time."
      }
    },
      err => {
      });
  }
  getAwardsMenu() {
    this._apiService.getAwardMenu().subscribe(ret => {
      const $ret = ret.ret;
      console.log($ret);
      this.awardMenu = $ret.data;
    },
      err => {
      });
  }
  goToAwards(menu) {
    console.log(menu);
    this._router.navigate(['/awards', menu.id]);
  }
}

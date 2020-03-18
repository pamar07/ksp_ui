import { Component, OnInit, Inject, AfterViewInit, AfterContentInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';

import { DomSanitizer } from '@angular/platform-browser';
import { MdDialog, MD_DIALOG_DATA } from '@angular/material';
import { Meta, Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ApiService } from '../../../services/api.service';
import { CommonService } from '../../../services/common.service';
import { SeoService } from '../../../services/seo.service';
// import jquery from 'jquery';
declare var addThisObj: any;
declare var instaEmbedObj: any;
declare var twitterEmbedObj: any;
declare var $: any;


@Component({
  selector: 'app-web-article-individual',
  templateUrl: './web-article-individual.component.html',
  styleUrls: ['./web-article-individual.component.css']
})
export class WebArticleIndividualComponent implements OnInit, AfterViewInit {

  seo: any;
  id: number;
  sub: any;
  article: any;
  relatedArticles: any;
  user_comment: any = "";
  user_comment_error: any;
  showAll: boolean = false;
  isBookmarked: boolean = false;
  bookmarkHoverText: string;
  ages: any;
  cities: any;
  getRecommended: any;
  relVideo: any;
  articleEnd: boolean = false;
  advertisement: number;
  shareCount: number;
  url: any;
  latestArticle: any;
  latestTv: any;
  latestRadio: any;
  recentArticles: any;
  events: any;
  relatedRadios: any;
  relatedTvs: any;

  promotions: any;
  promotionInsideContentTop: any;
  promotionInsideContentBottom: any;
  promotionsArticle: any;
  totalVoteCount: number;

  replyComment: any;
  user_comment_reply_error: any;
  user_comment_reply: any = "";
  showReply: any = [];
  youtubeVideo: any = '';

  mealPlan: boolean = true;
  subForm: FormGroup;
  subscribeThanaks: any;
  surveyArticles: any = 0;
  userFollowing: Number = 0;

  @ViewChild('dataContainer') dataContainer: ElementRef;
  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    var elem = document.getElementById("mealPlanScroller");
    var max = elem.offsetTop - 1100;
    var pos = (document.documentElement.scrollTop);
    if (max > 0 && pos >= max) {
      this.surveyArticles = localStorage.getItem('surveyArticles') ? localStorage.getItem('surveyArticles') : 0;
      if (this.surveyArticles) {
        let artilceArr = this.surveyArticles.split(',');
        if (artilceArr.indexOf(this.id) !== -1) {
          let takeSurvey = localStorage.getItem('takeSurvey') ? localStorage.getItem('takeSurvey') : 'yes';
          let date: any = Math.floor(Date.now() / 1000);
          let storedTime: any = localStorage.getItem('surveyTime') ? localStorage.getItem('surveyTime') : 0;

          if (takeSurvey == 'yes' && (!storedTime || ((date - parseInt(storedTime)) / 86400) > 1)) {
            $('#ksp-survey-confirm').modal('show');
            localStorage.setItem('surveyTime', date);
          }
        }
      }
    }
  }


  constructor(
    public _apiService: ApiService,
    public _commonService: CommonService,
    public _route: ActivatedRoute,
    public _router: Router,
    public _sanitizer: DomSanitizer,
    public dialog: MdDialog,
    public meta: Meta,
    public seoTitle: Title,
    public location: PlatformLocation,
    public _apiSeo: SeoService,
    private form: FormBuilder
  ) {
    this.shareCount = 0;
    this.mealPlan = true;
  }
  ngOnInit() {
    // modal email for meal plan
    this.subForm = this.form.group({
      'email': [null, [Validators.required, Validators.email]],
    });
    // modal email for meal plan

    this._route.params.subscribe(params => {
      this.id = params['id'] || 0;
      console.log('id--->>>>', this.id);
      /* Check for survey */
      this.surveyArticles = localStorage.getItem('surveyArticles') ? localStorage.getItem('surveyArticles') : 0;
      if (this.surveyArticles) {
        let artilceArr = this.surveyArticles.split(',');
        if (artilceArr.indexOf(this.id) !== -1) {
          localStorage.setItem('seenNestleAdd', 'yes');
        }
      }

      /* Seo Title and Meta data starts */
      this.seo = this._route.snapshot.data.seo.ret.code == 1 ? this._route.snapshot.data.seo.ret.data : {};
      // console.log(this.seo);
      this.seoTitle.setTitle(this.seo.title);
      this.meta.updateTag({ property: 'og:title', content: this.seo.title });
      this.meta.updateTag({ property: 'og:image:alt', content: this.seo.title });
      this.meta.updateTag({ property: 'og:url', content: this.seo.url });
      this.meta.updateTag({ property: 'og:type', content: 'article' });
      this.meta.updateTag({ name: 'description', content: this.seo.description });
      this.meta.updateTag({ property: 'og:description', content: this.seo.description });
      this.meta.updateTag({ property: 'og:image', content: this.seo.image });
      this.meta.updateTag({ property: 'og:image:width', content: '300' });
      this.meta.updateTag({ property: 'og:image:height', content: '200' });
      this.meta.updateTag({ property: 'og:updated_time', content: this.seo.updated_at });
      this.meta.updateTag({ name: 'twitter:title', content: this.seo.title });
      this.meta.updateTag({ name: 'twitter:url', content: this.seo.url });
      this.meta.updateTag({ name: 'twitter:description', content: this.seo.description });
      this.meta.updateTag({ name: 'twitter:image', content: this.seo.image });
      /* Seo Title and Meta data ends */
      this._apiService.getIndividualArticle(this.id, 12).subscribe(ret => {
        let $ret = ret.ret;
        if (!$ret.recent) {
          this._router.navigate(['/home']);
        }

        if ($ret.code == 1) {
          addThisObj.refresh();
          instaEmbedObj.load();
          twitterEmbedObj.load();
          this.getRelatedVideos();
          this.article = $ret.recent;
          // console.log(this.article);
          console.log(document.getElementById('btn-print-mealplan'));
          if (this.article.category) {
            for (let i = 0; i < this.article.category.length; i++) {
              if (this.article.category[i].id === 77) {
                localStorage.setItem('viewpool', '1');
              }
            }
          }
          let url = 'www.kidsstoppress.com/article-individual/' + this.article.perma_link + '/' + this.article.id;
          this._apiSeo.createLinkForCanonicalURL(url);

          // Check if a user follows the author
          this._apiService.followCheckAuthor({ "article_id": this.article.id }).subscribe(ret => {
            let $ret = ret.ret;
            if ($ret.code == 1) {
              this.userFollowing = $ret.status;
            }
          }, err => {
          });

          this._apiService.getRecommended(this.article.id).subscribe(ret => {
            let $ret = ret.ret;
            this.getRecommended = $ret.data;
          }, err => {
          });
          /* Add tags as keywords in meta data */
          if (this.article.tag.map(tag => tag.name).length > 0) {
            this.meta.updateTag({ name: 'keywords', content: this.article.tag.map(tag => tag.name) });
          }

          /*Calculate share count*/
          this._apiService.getShareCount(this._apiService.share_url + 'article-individual/' + this.article.id).subscribe(ret_share => {
            if (this.article.shares != null) {
              this.shareCount = ret_share.shares + this.article.shares;
            }
            else {
              this.shareCount = ret_share.shares;
            }
          });

          this.relatedArticles = $ret.related_articles;
          this.latestArticle = $ret.latest[0];
          this.recentArticles = $ret.latest.slice(1);
          try {
            this.article.content = this.article.content.split("sphinx.xelpmoc.in:8000/ksp").join("i2.wp.com/www.kidsstoppress.com");
            this.article.content = this.article.content.split("www.kidsstoppress.com/wp-content").join("i2.wp.com/www.kidsstoppress.com/wp-content");
            this.article.content = this.article.content.split("\r\n\r\n").join("<div style='margin-top:10px;'></div>");
            this.article.content = this.article.content.split("<a ").join("<a target=\"_blank\" class=\"checkLink\"");
            this.article.content = this.article.content.split("<a ").join("<a style='color:#ff007b!important;'");
            this.article.content = this.article.content.split("<img class=\"").join("<img class=\"img-responsive ");
            this.article.content = this.article.content.split("<img ").join("<img class=\"img-responsive\"");
            this.article.restricted_content = this.article.restricted_content.split("sphinx.xelpmoc.in:8000/ksp").join("i2.wp.com/www.kidsstoppress.com");
            this.article.restricted_content = this.article.restricted_content.split("www.kidsstoppress.com/wp-content").join("i2.wp.com/www.kidsstoppress.com/wp-content");
            this.article.restricted_content = this.article.restricted_content.split("\r\n\r\n").join("<div style='margin-top:10px;'></div>");
            this.article.restricted_content = this.article.restricted_content.split("<a ").join("<a target=\"_blank\" class=\"checkLink\"");
            this.article.restricted_content = this.article.restricted_content.split("<a ").join("<a style='color:#ff007b!important;'");
            this.article.restricted_content = this.article.restricted_content.split("<img class=\"").join("<img class=\"img-responsive ");
            this.article.restricted_content = this.article.restricted_content.split("<img ").join("<img class=\"img-responsive\"");
            this.article.restricted_content = this.article.restricted_content.split("height:768px; width:1024px").join("height:auto; width:100%");

            this.advertisement = 0;
            this.articleEnd = false;

            /* Article Content Pintrest board. */
            let text = this.article.content.split("{ksp-pin}");
            if (text.length > 1) {
              let url = text[1];
              this.article.content = this.article.content.replace("{ksp-pin}" + url + "{ksp-pin}", '<a data-pin-do="embedBoard" href="' + url + '"></a>');

              const fragment = document.createRange().createContextualFragment('<script type="text/javascript" async defer src="//assets.pinterest.com/js/pinit.js"></script>');
              this.dataContainer.nativeElement.appendChild(fragment);
            }

            /* Article restricted Content Pintrest board. */
            let text1 = this.article.restricted_content.split("{ksp-pin}");
            if (text1.length > 1) {
              let url = text1[1];
              this.article.restricted_content = this.article.restricted_content.replace("{ksp-pin}" + url + "{ksp-pin}", '<a data-pin-do="embedBoard" href="' + url + '"></a>');

              const fragment = document.createRange().createContextualFragment('<script type="text/javascript" async defer src="//assets.pinterest.com/js/pinit.js"></script>');
              this.dataContainer.nativeElement.appendChild(fragment);
            }
          } catch (e) { }

          this.article.content = this.safeHtml(this.article.content);
          console.log(document.getElementById('btn-print-mealplan'));
          this.article.restricted_content = this.safeHtml(this.article.restricted_content);
          if (this.article.bookmarked) {
            if (this.article.bookmarked.length > 0) {
              this.isBookmarked = true;
              this.bookmarkHoverText = 'You already bookmarked';
  
            } else {
              this.isBookmarked = false;
              this.bookmarkHoverText = 'Click here to bookmark';
            }
          }

          if (this._apiService.loggedIn()) {
            this._apiService.doRead(this.article.post_type, this.article.id).subscribe(ret1 => {
              let $ret1 = ret1.ret;
              if ($ret.code == 1) {
              }
            }, err => {
            });
          }

          this._apiService.pageviewCapture(this.article.id, this.article.post_type, '/article-individual/' + this.article.id).subscribe(ret2 => {

          });

          /* Get related videos and audio. */
          this._apiService.relatedAudioVideo(this.article.ages, this.article.cities, 9).subscribe(ret3 => {
            let $ret3 = ret3.ret.data;
            this.relatedRadios = $ret3.audioArray;
            for (let i = 0; i < this.relatedRadios.length; i++) {
              this.relatedRadios[i].path = this.safeUrl(this.relatedRadios[i].path);
            }
            this.relatedTvs = $ret3.videoArray;
          });

          /* Get Adds according to the Article */
          //  console.log($ret.recent.id);
          this._apiService.addsByArticleTag($ret.recent.id).subscribe(ret => {
            let $ret = ret.ret;
            if ($ret.code == 1) {
              let adevertisement = $ret.data.advertisement;
              let emailAdvertisement = $ret.data.emailAdvertisement;
              let shop = $ret.data.shop;
              let innerPromo = $ret.data;

              innerPromo = innerPromo.filter(item => (item.article_id != this.id));

              /*change the sequence of promo card: third party first then the inner promos*/
              let tmp = [];
              tmp.push.apply(tmp, adevertisement);
              tmp.push.apply(tmp, emailAdvertisement);
              tmp.push.apply(tmp, shop);
              tmp.push.apply(tmp, innerPromo);
              this.promotionsArticle = tmp;
              console.log(this.promotionsArticle);
            } else {
              this.promotionsArticle = [];
            }
          }, err => {
          });
          /* Get Adds according to the Article */
          /* Get Adds according to the Article */
          // console.log($ret.recent.id);
          this._apiService.addsByArticle($ret.recent.cities, $ret.recent.ages, $ret.recent.id).subscribe(ret => {
            let $ret = ret.ret;
            if ($ret.code == 1) {
              let adevertisement = $ret.data.advertisement;
              let emailAdvertisement = $ret.data.emailAdvertisement;
              let shop = $ret.data.shop;
              let innerPromo = $ret.data.data;
              this.promotionInsideContentBottom = $ret.data.innerAdds;

              innerPromo = innerPromo.filter(item => (item.article_id != this.id));

              /*change the sequence of promo card: third party first then the inner promos*/
              let tmp = [];
              tmp.push.apply(tmp, adevertisement);
              tmp.push.apply(tmp, emailAdvertisement);
              tmp.push.apply(tmp, shop);
              tmp.push.apply(tmp, innerPromo);
              this.promotions = tmp;

            } else {
              this.promotions = [];
            }
          }, err => {
          });
          /* Get Adds according to the Article */
        }
      }, err => {
      });

      this._apiService.getTv(1, 1).subscribe(ret => {
        let $ret = ret.ret;
        if ($ret.code == 1) {
          this.latestTv = $ret.data[0];
          this.latestTv.path = this.safeUrl(this.latestTv.path);
        } else {
          this.latestTv = [];
        }
      }, err => {
      });

      this._apiService.getRadio(1, 1).subscribe(ret => {
        let $ret = ret.ret;
        if ($ret.code == 1) {
          this.latestRadio = $ret.data[0];
          this.latestRadio.path = this.safeUrl(this.latestRadio.path);
        } else {
          this.latestRadio = [];
        }
      }, err => {
      });

      this._apiService.getEventsCityAndDatewise(6, 1).subscribe(ret => {
        let $ret = ret.ret;
        if ($ret.code == 1) {
          this.events = $ret.data;
        } else {
          this.events = [];
        }
      }, err => {
      });
    });

    /* Get latest video from the KSP Youtube channel */
    this._apiService.getYoutubeLatestVideo().subscribe(ret => {
      let $ret = ret.items;
      if ($ret.length) {
        this.youtubeVideo = this.safeUrl('https://www.youtube.com/embed/' + $ret[0].id.videoId);
      } else {
        this.youtubeVideo = '';
      }
    }, err => {
    });


  }

  doComment() {
    if (this._apiService.loggedIn()) {
      if (this.user_comment == "") {
        this.user_comment_error = 'You have not written any response. Please write some response.';
      } else {
        this.user_comment_error = '';
        this.user_comment = this.user_comment.split("<p>").join("<p style='margin:0px 0px 0px 0px;'>");
        this._apiService.doComment(this.article.post_type, this.article.id, this.user_comment).subscribe(ret => {
          let $ret = ret.ret;
          if ($ret.code == 1) {
            this.user_comment = "";
            $ret.data['commentReplies'] = [];
            this.article.comment_count++;
            this.article.comments.push($ret.data);
            (document.getElementById('responses') as HTMLDivElement).scrollIntoView();
          }
        }, err => {
        });
      }
    } else {
      this._commonService.setNavigationUrl(this.article.post_type, this.article.id, this.article.perma_link);
    }
  }


  getUserName() {
    let user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user).name;
    }
    else {
      return null;
    }
  }

  doBookmark(entityType, entityId) {
    if (this._apiService.loggedIn()) {
      this._apiService.doBookmark(entityType, entityId).subscribe(ret => {
        let $ret = ret.ret;
        if ($ret.code == 1) {
          this.isBookmarked = !this.isBookmarked;
          if (this.isBookmarked) {
            this.article.bookmark_count++;
            this.bookmarkHoverText = 'You already bookmarked';
          }
          else {
            this.article.bookmark_count--;
            this.bookmarkHoverText = 'Click here to bookmark';
          }
        }
      }, err => {
      });
    }
    else {
      this._commonService.setNavigationUrl(this.article.post_type, this.article.id, this.article.perma_link);
      // this._router.navigate(['/pre-login-register']);
    }
  }

  getRelatedVideos() {
    this._apiService.getRelatedVideo('article').subscribe(ret => {
      let $ret = ret.ret;
      if ($ret.code == 0) {
        this.relVideo = $ret.result[0];
        this.relVideo.video_path = this.relVideo.video_path.replace("watch?v=", "embed/");
        this.relVideo.video_path = this.safeUrl(this.relVideo.video_path);
      }
    })
  }

  getAdvertisement() {
    //console.log("getAdvertisement triggured",this.articleEnd);
    //console.log("advertisement 0",this.advertisement);
    if (!this.articleEnd) {
      this.advertisement = this.advertisement + 1;
    }
    //console.log("advertisement 1",this.advertisement);
  }

  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  safeStyle(style) {
    return this._sanitizer.bypassSecurityTrustStyle(style);
  }

  safeUrl(url) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);

  }

  setNavigationUrl() {
    this._commonService.navUrl = "/article-individual/" + this.article.id;
  }

  showReplyComment(id, index) {
    this.replyComment = id;
    this.user_comment_reply_error = '';
    var comment_id = 'comment_id_' + id;
    setTimeout(function () {
      $('html, body').animate({
        scrollTop: $("#" + comment_id).offset().top - 200
      }, 100);
    }, 10);
  }

  doCommentReply() {
    if (this._apiService.loggedIn()) {
      if (this.user_comment_reply == "") {
        this.user_comment_reply_error = 'You have not written any response. Please write some response.';
      } else {
        this.user_comment_reply_error = '';
        this.user_comment_reply = this.user_comment_reply.split("<p>").join("<p style='margin:0px 0px 0px 0px;'>");
        this._apiService.doComment(this.article.post_type, this.article.id, this.user_comment_reply, this.replyComment).subscribe(ret => {
          let $ret = ret.ret;
          if ($ret.code == 1) {
            this.user_comment_reply = "";
            this.article.comment_count++;
            let index = this.article.comments.findIndex(item => item.id == this.replyComment);
            this.article.comments[index].commentReplies.push($ret.data);
          }
        }, err => {
        });
      }
    } else {
      this._commonService.setNavigationUrl(this.article.post_type, this.article.id, this.article.perma_link);
    }
  }

  // for hiding the meal plan banner
  mealBanner() {
    this.mealPlan = false;
  }
  // for hiding the meal plan banner

  // capture emial id from meal plan banner
  mealPlanBannerForm(data) {
    $('#mealBannerModal').modal('hide');
    this._apiService.subscribeNewsletter(data.email, 1).subscribe(ret => {
      let $ret = ret.status;
      if ($ret == "Email id is already subscribed") {
        this.subscribeThanaks = 'Email id is already subscribed.';
        this._router.navigate(['/categorywise-article/20']);
        // $('#thanksSubscribe').modal('show');
      } else {
        this.subscribeThanaks = 'Thank you for subscribing.';
        this._router.navigate(['/categorywise-article/20']);
        // $('#thanksSubscribe').modal('show');
      }
      this.subForm.patchValue({ email: '' });
      this.subForm.controls['email'].setErrors(null);
    }, err => {
    });
  }
  // capture emial id from meal plan banner

  //Follow / Unfollow an auther -> in the backend 
  //toggle happens through status
  // status == 1=> followed, status==0 => unfollowed
  follow_author(status) {

    if (this._apiService.loggedIn()) {
      this._apiService.followAuthor({ "article_id": this.article.id }).subscribe(ret => {
        let $ret = ret.ret;
        if ($ret.code == 1) {
          this.userFollowing = $ret.status;
        }
      }, err => {
      });
    }
    else {
      this._router.navigate(['/login']);
      //this._commonService.setNavigationUrl('event',this.eventIndividual.id,this.eventIndividual.perma_link);
    }

  }
  /* end of follow author */
  mealplanPrint() {
    console.log(document.getElementById('btn-print-mealplan'));
    $('#btn-print-mealplan').click(function () {
      const divToPrint = document.getElementById('mealplan-table');
      const newWin = window.open('');
      newWin.document.write(divToPrint.outerHTML);
      newWin.print();
      newWin.close();
    });
  }
  ngAfterViewInit() {
    console.log(document.getElementById('btn-print-mealplan'));
  }
  test() {
    console.log('hello');
  }
}

@Component({
  selector: 'dialog-messages',
  templateUrl: './dialog-messages.html',
})
export class ArticleCommentDialog {
  constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
}

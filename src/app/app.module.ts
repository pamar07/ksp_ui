import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CKEditorModule } from 'ng2-ckeditor';
//import { DateTimePickerModule } from 'ng-pick-datetime';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { MdButtonModule, MdCheckboxModule, MdDialogModule, MdFormFieldModule, MdInputModule, MdDatepickerModule, MdTooltipModule, MdNativeDateModule } from '@angular/material';
//import { TagInputModule } from 'ng2-tag-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatepickerModule } from 'angular2-material-datepicker';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
//import { DatePickerModule } from 'angular-io-datepicker';
//import { NgSemanticModule } from 'ng-semantic/ng-semantic';
import { ReCaptchaModule } from 'angular2-recaptcha';

// import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import { ViewportModule } from 'angular2-viewport';
//import "froala-editor/js/froala_editor.pkgd.min.js";
//import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
//import { FlashMessagesModule } from 'angular2-flash-messages';
import { ResponsiveModule } from 'ng2-responsive';
import { NgxCarouselModule } from 'ngx-carousel';
import { OwlModule } from 'ngx-owl-carousel';
import 'hammerjs';
import * as $ from 'jquery';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Services
import { ApiService } from './services/api.service';
import { ValidateService } from './services/validate.service';
import { CommonService } from './services/common.service';
import { SeoService } from './services/seo.service';
import { GoogleAnalyticsEventsService } from "./services/google-analytics-events.service";
import { CategoryResolve } from "./resolvers/category-resolve.service";
import { SeoResolve } from "./resolvers/seo-resolve.service";

//Guards
import { AuthGuard } from './guards/auth.guard';
import { BrandAuthGuard } from './guards/brand-auth.guard';

//Pipe
import { KspPartnerPipe } from './pipes/ksp-partner.pipe';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { BottomnavComponent, SubscribeDialog } from './components/bottomnav/bottomnav.component';
import { TopnavSocialComponent, TopnavSocialSubscribeDialog } from './components/topnav-social/topnav-social.component';
import { TopnavnofilterComponent, TopnavSocialNofilterSubscribeDialog } from './components/topnavnofilter/topnavnofilter.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ArticlePublicComponent } from './components/article-public/article-public.component';
import { ArticleUserComponent } from './components/article-user/article-user.component';
import { SocialUserComponent } from './components/social-user/social-user.component';
import { SocialPublicComponent } from './components/social-public/social-public.component';
import { ProductPublicComponent } from './components/product-public/product-public.component';
import { ArticleIndividualComponent } from './components/article-individual/article-individual.component';
import { BundleIndividualComponent } from './components/bundle-individual/bundle-individual.component';
import { PaymentFinal } from './components/payment-final/payment-final.component';
import { GrowthContestComponent } from './components/growth-contest/growth-contest.component';
import { TvIndividualComponent } from './components/tv-individual/tv-individual.component';
import { RadioIndividualComponent } from './components/radio-individual/radio-individual.component';
import { TvAllComponent } from './components/tv-all/tv-all.component';
import { RadioAllComponent } from './components/radio-all/radio-all.component';
import { CategorywiseArticleComponent } from './components/categorywise-article/categorywise-article.component';
import { EventIndividualComponent } from './components/event-individual/event-individual.component';
import { CategoryComponent } from './components/category/category.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EventAllComponent } from './components/event-all/event-all.component';
import { CampAllComponent } from './components/camp-all/camp-all.component';
import { EventSubmitComponent } from './components/event-submit/event-submit.component';
import { KspCodeComponent } from './components/ksp-code/ksp-code.component';
import { SocialIndividualComponent } from './components/social-individual/social-individual.component';
import { SocialAllComponent } from './components/social-all/social-all.component';
import { LikecommentComponent } from './components/likecomment/likecomment.component';
import { RoundPicComponent } from './components/round-pic/round-pic.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { ArticleLatestComponent } from './components/article-latest/article-latest.component';
import { ArticleMostLovedComponent } from './components/article-most-loved/article-most-loved.component';
import { ArticleMostPopularComponent } from './components/article-most-popular/article-most-popular.component';
import { BookmarkListComponent } from './components/bookmark-list/bookmark-list.component';
import { CreateNewSocialPostComponent, CreatePostDialog, CreatePostConfirmDialog } from './components/create-new-social-post/create-new-social-post.component';
import { ArticleCarouselComponent } from './components/article-carousel/article-carousel.component';
import { GroupLoveComponent } from './components/group-love/group-love.component';
import { PostIndividualComponent } from './components/post-individual/post-individual.component';
import { CmsComponent } from './components/cms/cms.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { TestimonialAllComponent } from './components/testimonial-all/testimonial-all.component';
import { TestimonialCarouselComponent } from './components/testimonial-carousel/testimonial-carousel.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { CkeditorImageBrowserComponent } from './components/ckeditor-image-browser/ckeditor-image-browser.component';
import { TagComponent } from './components/tag/tag.component';
import { ArticleSubmitComponent, ArticleSubmitDialog } from './components/article-submit/article-submit.component';
import { PressComponent } from './components/press/press.component';
import { PreLoginRegisterComponent } from './components/pre-login-register/pre-login-register.component';
import { LoveListComponent } from './components/love-list/love-list.component';
import { DdDatetimeComponent } from './components/dd-datetime/dd-datetime.component';
import { CategorywiseTvComponent } from './components/categorywise-tv/categorywise-tv.component';
import { CategorywiseRadioComponent } from './components/categorywise-radio/categorywise-radio.component';
import { TeamComponent } from './components/team/team.component';
import { ContributorComponent } from './components/contributor/contributor.component';
import { AuthorwisePostsComponent } from './components/authorwise-posts/authorwise-posts.component';
import { MobileTopnavComponent } from './components/mobile-topnav/mobile-topnav.component';
import { SoundcloudComponent } from './components/soundcloud/soundcloud.component';
import { TopnavRadioComponent } from './components/topnav-radio/topnav-radio.component';
import { PlaylistwiseRadioComponent } from './components/playlistwise-radio/playlistwise-radio.component';

import { WebHomeComponent } from './components/web/web-home/web-home.component';
import { MobileHomeComponent } from './components/mobile/mobile-home/mobile-home.component';
import { MobileDashboardComponent, GroupJoinDialogMobile } from './components/mobile/mobile-dashboard/mobile-dashboard.component';
import { WebDashboardComponent, GroupJoinDialog } from './components/web/web-dashboard/web-dashboard.component';
import { WebRadioAllComponent } from './components/web/web-radio-all/web-radio-all.component';
import { MobileRadioAllComponent } from './components/mobile/mobile-radio-all/mobile-radio-all.component';
import { AdvertiseComponent } from './components/advertise/advertise.component';
import { WebArticleIndividualComponent, ArticleCommentDialog } from './components/web/web-article-individual/web-article-individual.component';
import { WebBundleIndividualComponent } from './components/web/web-bundle-individual/web-bundle-individual.component';
import { MobileArticleIndividualComponent, MobileArticleCommentDialog } from './components/mobile/mobile-article-individual/mobile-article-individual.component';
import { MobileBundleIndividualComponent} from './components/mobile/mobile-bundle-individual/mobile-bundle-individual.component';
import { WebEventAllComponent } from './components/web/web-event-all/web-event-all.component';
import { MobileEventAllComponent } from './components/mobile/mobile-event-all/mobile-event-all.component';
import { WebCampAllComponent } from './components/web/web-camp-all/web-camp-all.component';
import { MobileCampAllComponent } from './components/mobile/mobile-camp-all/mobile-camp-all.component';
import { WebEventIndividualComponent, ParticipateConfirmDialog, ParticipatedDialog } from './components/web/web-event-individual/web-event-individual.component';
import { MobileEventIndividualComponent, MobileParticipateConfirmDialog, MobileParticipatedDialog } from './components/mobile/mobile-event-individual/mobile-event-individual.component';
import { WebTvAllComponent } from './components/web/web-tv-all/web-tv-all.component';
import { MobileTvAllComponent } from './components/mobile/mobile-tv-all/mobile-tv-all.component';
import { WebTvIndividualComponent, TvDialog } from './components/web/web-tv-individual/web-tv-individual.component';
import { MobileTvIndividualComponent, MobileTvDialog } from './components/mobile/mobile-tv-individual/mobile-tv-individual.component';
import { WebRadioIndividualComponent, RadioDialog } from './components/web/web-radio-individual/web-radio-individual.component';
import { MobileRadioIndividualComponent, MobileRadioDialog } from './components/mobile/mobile-radio-individual/mobile-radio-individual.component';
import { WebSocialPublicComponent } from './components/web/web-social-public/web-social-public.component';
import { webPaymentFinal } from './components/web/web-paymentFinal/web-paymentFinal.component';
import { MobilePaymentFinal } from './components/mobile/mobile-paymentFinal/mobile-paymentFinal.component';
import { MobileSocialPublicComponent } from './components/mobile/mobile-social-public/mobile-social-public.component';
import { WebSocialUserComponent, SocialUserGroupJoinDialog } from './components/web/web-social-user/web-social-user.component';
import { MobileSocialUserComponent, GroupJoinSocialUserPageDialog } from './components/mobile/mobile-social-user/mobile-social-user.component';
import { WebSocialIndividualComponent, GroupJoinIndividualPageDialog, GroupLeaveIndividualPageDialog, PostAlterGroupIndividualPageDialog } from './components/web/web-social-individual/web-social-individual.component';
import { MobileSocialIndividualComponent, MobileGroupJoinIndividualPageDialog, MobileGroupLeaveIndividualPageDialog, MobilePostAlterGroupIndividualPageDialog } from './components/mobile/mobile-social-individual/mobile-social-individual.component';
import { WebArticlePublicComponent } from './components/web/web-article-public/web-article-public.component';
import { MobileArticlePublicComponent } from './components/mobile/mobile-article-public/mobile-article-public.component';
import { WebArticleUserComponent } from './components/web/web-article-user/web-article-user.component';
import { MobileArticleUserComponent } from './components/mobile/mobile-article-user/mobile-article-user.component';
import { WebCategorywiseArticleComponent } from './components/web/web-categorywise-article/web-categorywise-article.component';
import { MobileCategorywiseArticleComponent } from './components/mobile/mobile-categorywise-article/mobile-categorywise-article.component';
import { WebCategorywiseTvComponent } from './components/web/web-categorywise-tv/web-categorywise-tv.component';
import { MobileCategorywiseTvComponent } from './components/mobile/mobile-categorywise-tv/mobile-categorywise-tv.component';
import { WebCategorywiseRadioComponent } from './components/web/web-categorywise-radio/web-categorywise-radio.component';
import { MobileCategorywiseRadioComponent } from './components/mobile/mobile-categorywise-radio/mobile-categorywise-radio.component';
import { WebAuthorwisePostsComponent } from './components/web/web-authorwise-posts/web-authorwise-posts.component';
import { MobileAuthorwisePostsComponent } from './components/mobile/mobile-authorwise-posts/mobile-authorwise-posts.component';
import { WebLoginComponent, LoginDialog } from './components/web/web-login/web-login.component';
import { MobileLoginComponent, MobileLoginDialog } from './components/mobile/mobile-login/mobile-login.component';
import { WebTeamComponent } from './components/web/web-team/web-team.component';
import { MobileTeamComponent } from './components/mobile/mobile-team/mobile-team.component';
import { WebContributorComponent } from './components/web/web-contributor/web-contributor.component';
import { MobileContributorComponent } from './components/mobile/mobile-contributor/mobile-contributor.component';
import { WebKspCodeComponent } from './components/web/web-ksp-code/web-ksp-code.component';
import { MobileKspCodeComponent } from './components/mobile/mobile-ksp-code/mobile-ksp-code.component';
import { WebRegistrationComponent, RegistrationDialog } from './components/web/web-registration/web-registration.component';
import { MobileRegistrationComponent, MobileRegistrationDialog } from './components/mobile/mobile-registration/mobile-registration.component';
import { WebBookmarkListComponent } from './components/web/web-bookmark-list/web-bookmark-list.component';
import { MobileBookmarkListComponent } from './components/mobile/mobile-bookmark-list/mobile-bookmark-list.component';
import { WebLoveListComponent } from './components/web/web-love-list/web-love-list.component';
import { MobileLoveListComponent } from './components/mobile/mobile-love-list/mobile-love-list.component';
import { WebPostIndividualComponent, PostCommentDialog, PostAlterPostIndividualPageDialog } from './components/web/web-post-individual/web-post-individual.component';
import { MobilePostIndividualComponent, MobilePostCommentDialog, MobilePostAlterPostIndividualPageDialog } from './components/mobile/mobile-post-individual/mobile-post-individual.component';
import { WebSearchResultComponent } from './components/web/web-search-result/web-search-result.component';
import { MobileSearchResultComponent } from './components/mobile/mobile-search-result/mobile-search-result.component';
import { WebUserProfileComponent, UserProfileDialog } from './components/web/web-user-profile/web-user-profile.component';
import { MobileUserProfileComponent, MobileUserProfileDialog } from './components/mobile/mobile-user-profile/mobile-user-profile.component';
import { KspCodeMembershipFormComponent } from './components/ksp-code-membership-form/ksp-code-membership-form.component';
import { WebKspCodeMembershipFormComponent, WebKspMembershipDialog } from './components/web/web-ksp-code-membership-form/web-ksp-code-membership-form.component';
import { MobileKspCodeMembershipFormComponent, MobileKspMembershipDialog } from './components/mobile/mobile-ksp-code-membership-form/mobile-ksp-code-membership-form.component';
import { KspAwardsComponent } from './components/ksp-awards/ksp-awards.component';
import { WebKspAwardsComponent } from './components/web/web-ksp-awards/web-ksp-awards.component';
import { MobileKspAwardsComponent } from './components/mobile/mobile-ksp-awards/mobile-ksp-awards.component';
import { MobileInlineShareComponent } from './components/mobile-inline-share/mobile-inline-share.component';
import { WebInlineShareComponent } from './components/web-inline-share/web-inline-share.component';
import { WebEventSubmitComponent, WebEventSubmitDialog } from './components/web/web-event-submit/web-event-submit.component';
import { MobileEventSubmitComponent, MobileEventSubmitDialog } from './components/mobile/mobile-event-submit/mobile-event-submit.component';
import { KspSurveyComponent } from './components/ksp-survey/ksp-survey.component';
import { WebKspSurveyComponent, WebDialog } from './components/web/web-ksp-survey/web-ksp-survey.component';
import { KspAwards2017ResultComponent } from './components/ksp-awards-2017-result/ksp-awards-2017-result.component';
import { WebKspAwards2017ResultComponent } from './components/web/web-ksp-awards-2017-result/web-ksp-awards-2017-result.component';
import { MobileKspAwards2017ResultComponent } from './components/mobile/mobile-ksp-awards-2017-result/mobile-ksp-awards-2017-result.component';
import { MobileKspSurveyComponent, MobileDialog } from './components/mobile/mobile-ksp-survey/mobile-ksp-survey.component';
import { MobileKspAwards2017Component } from './components/mobile/mobile-ksp-awards-2017/mobile-ksp-awards-2017.component';
import { WebKspAwards2017Component } from './components/web/web-ksp-awards-2017/web-ksp-awards-2017.component';
import { KspAwards2017Component } from './components/ksp-awards-2017/ksp-awards-2017.component';
import { KspAwards2019Component } from './components/ksp-awards-2019/ksp-awards-2019.component';
import { KspAwards2017VotingEndedComponent } from './components/ksp-awards2017-voting-ended/ksp-awards2017-voting-ended.component';
import { WebArticleLatestComponent } from './components/web/web-article-latest/web-article-latest.component';
import { WebArticleMostLovedComponent } from './components/web/web-article-most-loved/web-article-most-loved.component';
import { WebArticleMostPopularComponent } from './components/web/web-article-most-popular/web-article-most-popular.component';
import { MobileArticleLatestComponent } from './components/mobile/mobile-article-latest/mobile-article-latest.component';
import { MobileArticleMostLovedComponent } from './components/mobile/mobile-article-most-loved/mobile-article-most-loved.component';
import { MobileArticleMostPopularComponent } from './components/mobile/mobile-article-most-popular/mobile-article-most-popular.component';
import { BrandRegistrationComponent } from './components/brand-registration/brand-registration.component';
import { WebBrandRegistrationComponent, WebBrandRegistrationDialog } from './components/web/web-brand-registration/web-brand-registration.component';
import { MobileBrandRegistrationComponent, MobileBrandRegistrationDialog } from './components/mobile/mobile-brand-registration/mobile-brand-registration.component';
import { SummerEventSubmitComponent } from './components/summer-event-submit/summer-event-submit.component';
import { WebSummerEventSubmitComponent, WebSummerEventSubmitDialog } from './components/web/web-summer-event-submit/web-summer-event-submit.component';
import { MobileSummerEventSubmitComponent, MobileSummerEventSubmitDialog } from './components/mobile/mobile-summer-event-submit/mobile-summer-event-submit.component';
import { BrandDashboardComponent } from './components/brand-dashboard/brand-dashboard.component';
import { WebBrandDashboardComponent, BrandDashboardDialog } from './components/web/web-brand-dashboard/web-brand-dashboard.component';
import { MobileBrandDashboardComponent, MobileBrandDashboardDialog } from './components/mobile/mobile-brand-dashboard/mobile-brand-dashboard.component';
import { GenericCarouselComponent } from './components/generic-carousel/generic-carousel.component';
import { ManageEventComponent } from './components/manage-event/manage-event.component';
import { SummerChallengeComponent } from './components/summer-challenge/summer-challenge.component';
import { WebSummerChallenge } from './components/web/web-summer-challenge/web-summer-challenge.component';
import { MobileSummerChallenge } from './components/mobile/mobile-summer-challenge/mobile-summer-challenge.component';
import { TopnotificationComponent } from './components/topnotification/topnotification.component';
import { CommentsLikeComponent } from './components/comments-like/comments-like.component';
import { SavedImageComponent } from './components/saved-images/saved-images.component';
import { CustomResultComponent } from './components/custom-result/custom-result.component';
import { WebCustomResultComponent } from './components/web/web-custom-result/web-custom-result.component';
import { MobileCustomResultComponent } from './components/mobile/mobile-custom-result/mobile-custom-result.component';
import { WebGrowthContestComponent } from './components/web/web-growth-contest/web-growth-contest.component';
import { MobileGrowthContestComponent } from './components/mobile/mobile-growth-contest/mobile-growth-contest.component';
import { emailVerification, VerificationDialog } from './components/email-verification/email-verification.component';
import { kspCodeActivityComponent } from './components/ksp-code-activity/ksp-code-activity.component';
import { MagazineComponent } from './components/magazine/magazine.component';
import { WebMagazineComponent } from './components/web/web-magazine/web-magazine.component';
import { MobileMagazineComponent } from './components/mobile/mobile-magazine/mobile-magazine.component';
import { WebMobileDownloadComponent, AppDialog } from './components/web/web-mobile-download/web-mobile-download.component';
import { MobileAppDownloadComponent, MobileAppDialog } from './components/mobile/mobile-app-download/mobile-app-download.component';
import { AppDownloadComponent } from './components/app-download/app-download.component';
import { KspCodePackageComponent } from './components/ksp-code-package/ksp-code-package.component';
import { kspAppPromoComponent } from './components/ksp-app-promo/ksp-app-promo.component';
import { EventactionsComponent } from './components/eventactions/eventactions.component';

import { WebKspAwards2019Component } from './components/web/web-ksp-awards-2019/web-ksp-awards-2019.component';
import { MobileKspAwards2019Component } from './components/mobile/mobile-ksp-awards-2019/mobile-ksp-awards-2019.component';
import { KspVoting2019Component } from './components/ksp-voting-2019/ksp-voting-2019.component';
import { WebKspVoting2019Component } from './components/web/web-ksp-voting-2019/web-ksp-voting-2019.component';
import { MobileKspVoting2019Component } from './components/mobile/mobile-ksp-voting-2019/mobile-ksp-voting-2019.component';
import { KspVoting2019ContentComponent } from './components/ksp-voting-2019-content/ksp-voting-2019-content.component';
import { KspVoting2019PopupComponent } from './components/ksp-voting-2019-popup/ksp-voting-2019-popup.component';
import { StayTunedAwards2018Component } from './components/stay-tuned-awards2018/stay-tuned-awards2018.component';
import { StayTunedAwards2018ContentComponent } from './components/stay-tuned-awards2018-content/stay-tuned-awards2018-content.component';
import { WebStayTunedAwards2018Component } from './components/web/web-stay-tuned-awards2018/web-stay-tuned-awards2018.component';
import { MobileStayTunedAwards2018Component } from './components/mobile/mobile-stay-tuned-awards2018/mobile-stay-tuned-awards2018.component';
import { AwardsResultsComponent } from './components/awards-result/awards-result.component';

// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopnavComponent,
    BottomnavComponent,
    TopnavSocialComponent,
    LoginComponent,
    LoginDialog,
    RegistrationComponent,
    DashboardComponent,
    ArticlePublicComponent,
    ArticleUserComponent,
    SocialUserComponent,
    SocialPublicComponent,
    ProductPublicComponent,
    ArticleIndividualComponent,
    BundleIndividualComponent,
    ArticleCommentDialog,
    GrowthContestComponent,
    WebGrowthContestComponent,
    MobileGrowthContestComponent,
    MobileArticleCommentDialog,
    TvIndividualComponent,
    TvDialog,
    RadioIndividualComponent,
    RadioDialog,
    webPaymentFinal,
    MobilePaymentFinal,
    PaymentFinal,
    TvAllComponent,
    RadioAllComponent,
    CategorywiseArticleComponent,
    EventIndividualComponent,
    ParticipateConfirmDialog,
    ParticipatedDialog,
    MobileParticipateConfirmDialog,
    MobileParticipatedDialog,
    CategoryComponent,
    UserProfileComponent,
    EventAllComponent,
    CampAllComponent,
    EventSubmitComponent,
    KspCodeComponent,
    SocialIndividualComponent,
    SocialAllComponent,
    LikecommentComponent,
    RoundPicComponent,
    BookmarkComponent,
    ArticleLatestComponent,
    ArticleMostLovedComponent,
    ArticleMostPopularComponent,
    BookmarkListComponent,
    RegistrationDialog,
    UserProfileDialog,
    GroupJoinDialog,
    GroupJoinDialogMobile,
    GroupJoinIndividualPageDialog,
    GroupLeaveIndividualPageDialog,
    MobileGroupJoinIndividualPageDialog,
    MobileGroupLeaveIndividualPageDialog,
    CreateNewSocialPostComponent,
    ArticleCarouselComponent,
    GroupLoveComponent,
    CreatePostDialog,
    CreatePostConfirmDialog,
    PostIndividualComponent,
    CmsComponent,
    SearchResultComponent,
    KspPartnerPipe,
    TestimonialAllComponent,
    TestimonialCarouselComponent,
    CapitalizePipe,
    PostCommentDialog,
    SubscribeDialog,
    CkeditorImageBrowserComponent,
    TagComponent,
    ArticleSubmitComponent,
    ArticleSubmitDialog,
    PressComponent,
    PreLoginRegisterComponent,
    LoveListComponent,
    TopnavnofilterComponent,
    DdDatetimeComponent,
    CategorywiseTvComponent,
    CategorywiseRadioComponent,
    TeamComponent,
    ContributorComponent,
    AuthorwisePostsComponent,
    MobileHomeComponent,
    MobileTopnavComponent,
    WebHomeComponent,
    SoundcloudComponent,
    TopnavRadioComponent,
    PlaylistwiseRadioComponent,
    MobileDashboardComponent,
    WebDashboardComponent,
    WebRadioAllComponent,
    MobileRadioAllComponent,
    AdvertiseComponent,
    MobileBundleIndividualComponent,
    MobileArticleIndividualComponent,
    WebArticleIndividualComponent,
    WebBundleIndividualComponent,
    WebEventAllComponent,
    MobileEventAllComponent,
    WebCampAllComponent,
    MobileCampAllComponent,
    MobileEventIndividualComponent,
    WebEventIndividualComponent,
    WebTvAllComponent,
    MobileTvAllComponent,
    MobileTvIndividualComponent,
    MobileTvDialog,
    WebTvIndividualComponent,
    WebRadioIndividualComponent,
    MobileRadioIndividualComponent,
    MobileRadioDialog,
    WebSocialPublicComponent,
    MobileSocialPublicComponent,
    WebSocialUserComponent,
    MobileSocialUserComponent,
    GroupJoinSocialUserPageDialog,
    WebSocialIndividualComponent,
    MobileSocialIndividualComponent,
    WebArticlePublicComponent,
    MobileArticlePublicComponent,
    WebArticleUserComponent,
    MobileArticleUserComponent,
    WebCategorywiseArticleComponent,
    MobileCategorywiseArticleComponent,
    WebCategorywiseTvComponent,
    WebCategorywiseRadioComponent,
    MobileCategorywiseTvComponent,
    MobileCategorywiseRadioComponent,
    WebAuthorwisePostsComponent,
    MobileAuthorwisePostsComponent,
    WebLoginComponent,
    MobileLoginComponent,
    MobileLoginDialog,
    WebTeamComponent,
    MobileTeamComponent,
    WebContributorComponent,
    MobileContributorComponent,
    WebKspCodeComponent,
    MobileKspCodeComponent,
    WebRegistrationComponent,
    MobileRegistrationComponent,
    MobileRegistrationDialog,
    WebBookmarkListComponent,
    MobileBookmarkListComponent,
    WebLoveListComponent,
    MobileLoveListComponent,
    WebPostIndividualComponent,
    MobilePostIndividualComponent,
    MobilePostCommentDialog,
    TopnavSocialSubscribeDialog,
    TopnavSocialNofilterSubscribeDialog,
    WebSearchResultComponent,
    MobileSearchResultComponent,
    WebUserProfileComponent,
    MobileUserProfileComponent,
    MobileUserProfileDialog,
    SocialUserGroupJoinDialog,
    KspCodeMembershipFormComponent,
    WebKspCodeMembershipFormComponent,
    MobileKspCodeMembershipFormComponent,
    WebKspMembershipDialog,
    MobileKspMembershipDialog,
    KspAwardsComponent,
    WebKspAwardsComponent,
    MobileKspAwardsComponent,
    MobileInlineShareComponent,
    WebInlineShareComponent,
    WebEventSubmitComponent,
    MobileEventSubmitComponent,
    WebEventSubmitDialog,
    MobileEventSubmitDialog,
    KspSurveyComponent,
    WebKspSurveyComponent,
    MobileKspSurveyComponent,
    MobileDialog,
    WebDialog,
    MobileKspAwards2017Component,
    WebKspAwards2017Component,
    KspAwards2017Component,
    KspAwards2017VotingEndedComponent,
    WebArticleLatestComponent,
    WebArticleMostLovedComponent,
    WebArticleMostPopularComponent,
    MobileArticleLatestComponent,
    MobileArticleMostLovedComponent,
    MobileArticleMostPopularComponent,
    BrandRegistrationComponent,
    WebBrandRegistrationComponent,
    MobileBrandRegistrationComponent,
    SummerEventSubmitComponent,
    WebSummerEventSubmitComponent,
    MobileSummerEventSubmitComponent,
    WebSummerEventSubmitDialog,
    MobileSummerEventSubmitDialog,
    WebBrandRegistrationDialog,
    MobileBrandRegistrationDialog,
    BrandDashboardComponent,
    WebBrandDashboardComponent,
    MobileBrandDashboardComponent,
    GenericCarouselComponent,
    KspAwards2017ResultComponent,
    WebKspAwards2017ResultComponent,
    MobileKspAwards2017ResultComponent,
    ManageEventComponent,
    BrandDashboardDialog,
    MobileBrandDashboardDialog,
    SummerChallengeComponent,
    WebSummerChallenge,
    MobileSummerChallenge,
    TopnotificationComponent,
    PostAlterGroupIndividualPageDialog,
    PostAlterPostIndividualPageDialog,
    MobilePostAlterGroupIndividualPageDialog,
    MobilePostAlterPostIndividualPageDialog,
    CommentsLikeComponent,
    SavedImageComponent,
    CustomResultComponent,
    WebCustomResultComponent,
    MobileCustomResultComponent,
    emailVerification,
    VerificationDialog,
    kspCodeActivityComponent,
    MagazineComponent,
    WebMagazineComponent,
    MobileMagazineComponent,
    WebMobileDownloadComponent,
    MobileAppDownloadComponent,
    AppDownloadComponent,
    AppDialog,
    MobileAppDialog,
    KspCodePackageComponent,
    kspAppPromoComponent,
    EventactionsComponent,
    KspAwards2019Component,
    WebKspAwards2019Component,
    MobileKspAwards2019Component,
    KspVoting2019Component,
    WebKspVoting2019Component,
    MobileKspVoting2019Component,
    KspVoting2019ContentComponent,
    KspVoting2019PopupComponent,
    StayTunedAwards2018Component,
    StayTunedAwards2018ContentComponent,
    WebStayTunedAwards2018Component,
    MobileStayTunedAwards2018Component,
    AwardsResultsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ksp' }),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    ResponsiveModule,
    CKEditorModule,
    //DateTimePickerModule,
    //FlashMessagesModule,
    AngularMultiSelectModule,
    MdButtonModule,
    MdCheckboxModule,
    MdDialogModule,
    MdFormFieldModule,
    MdInputModule,
    MdDatepickerModule,
    MdTooltipModule,
    //TagInputModule,
    BrowserAnimationsModule,
    DatepickerModule,
    //DatePickerModule,
    ReCaptchaModule,
    // NguiDatetimePickerModule,
    ViewportModule,
    NgxCarouselModule,
    MdNativeDateModule,
    OwlModule,
    // NgMultiSelectDropDownModule.forRoot(),
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.threeBounce,
      backdropBackgroundColour: 'rgba(255,255,255,0.5)',
      backdropBorderRadius: '10px',
      primaryColour: '#ff479f',
      secondaryColour: '#ff218b',
      tertiaryColour: '#ff0079'
    })
    //FroalaEditorModule.forRoot(),
    //FroalaViewModule.forRoot()
  ],
  providers: [ApiService, ValidateService, AuthGuard, CommonService, SeoService, GoogleAnalyticsEventsService, CategoryResolve, BrandAuthGuard, SeoResolve],
  bootstrap: [AppComponent],
  entryComponents: [
    RegistrationDialog,
    UserProfileDialog,
    GroupJoinDialog,
    GroupJoinDialogMobile,
    GroupJoinIndividualPageDialog,
    GroupLeaveIndividualPageDialog,
    CreatePostDialog,
    CreatePostConfirmDialog,
    PostCommentDialog,
    ParticipateConfirmDialog,
    ParticipatedDialog,
    SubscribeDialog,
    ArticleSubmitDialog,
    LoginDialog,
    RadioDialog,
    TvDialog,
    ArticleCommentDialog,
    MobileArticleCommentDialog,
    MobileParticipateConfirmDialog,
    MobileParticipatedDialog,
    MobileTvDialog,
    MobileRadioDialog,
    GroupJoinSocialUserPageDialog,
    MobileGroupJoinIndividualPageDialog,
    MobileGroupLeaveIndividualPageDialog,
    MobileLoginDialog,
    MobileDialog,
    WebDialog,
    MobileRegistrationDialog,
    MobilePostCommentDialog,
    TopnavSocialSubscribeDialog,
    TopnavSocialNofilterSubscribeDialog,
    MobileUserProfileDialog,
    SocialUserGroupJoinDialog,
    WebKspMembershipDialog,
    MobileKspMembershipDialog,
    WebEventSubmitDialog,
    MobileEventSubmitDialog,
    WebSummerEventSubmitDialog,
    MobileSummerEventSubmitDialog,
    WebBrandRegistrationDialog,
    MobileBrandRegistrationDialog,
    BrandDashboardDialog,
    MobileBrandDashboardDialog,
    PostAlterGroupIndividualPageDialog,
    PostAlterPostIndividualPageDialog,
    MobilePostAlterGroupIndividualPageDialog,
    MobilePostAlterPostIndividualPageDialog,
    VerificationDialog,
    AppDialog,
    MobileAppDialog
  ]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { BrandAuthGuard } from './guards/brand-auth.guard';

// Resolvers
import { CategoryResolve } from './resolvers/category-resolve.service';
import { SeoResolve } from './resolvers/seo-resolve.service';

// Components
import { HomeComponent } from './components/home/home.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { BottomnavComponent } from './components/bottomnav/bottomnav.component';
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
import { TvIndividualComponent } from './components/tv-individual/tv-individual.component';
import { RadioIndividualComponent } from './components/radio-individual/radio-individual.component';
import { TvAllComponent } from './components/tv-all/tv-all.component';
import { RadioAllComponent } from './components/radio-all/radio-all.component';
import { CategorywiseArticleComponent } from './components/categorywise-article/categorywise-article.component';
import { CategorywiseTvComponent } from './components/categorywise-tv/categorywise-tv.component';
import { CategorywiseRadioComponent } from './components/categorywise-radio/categorywise-radio.component';
import { EventIndividualComponent } from './components/event-individual/event-individual.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EventAllComponent } from './components/event-all/event-all.component';
import { CampAllComponent } from './components/camp-all/camp-all.component';
import { EventSubmitComponent } from './components/event-submit/event-submit.component';
import { KspCodeComponent } from './components/ksp-code/ksp-code.component';
import { SocialIndividualComponent } from './components/social-individual/social-individual.component';
import { SocialAllComponent } from './components/social-all/social-all.component';
import { ArticleLatestComponent } from './components/article-latest/article-latest.component';
import { ArticleMostLovedComponent } from './components/article-most-loved/article-most-loved.component';
import { ArticleMostPopularComponent } from './components/article-most-popular/article-most-popular.component';
import { BookmarkListComponent } from './components/bookmark-list/bookmark-list.component';
import { CreateNewSocialPostComponent } from './components/create-new-social-post/create-new-social-post.component';
import { PostIndividualComponent } from './components/post-individual/post-individual.component';
import { CmsComponent } from './components/cms/cms.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { TestimonialAllComponent } from './components/testimonial-all/testimonial-all.component';
import { CkeditorImageBrowserComponent } from './components/ckeditor-image-browser/ckeditor-image-browser.component';
import { ArticleSubmitComponent } from './components/article-submit/article-submit.component';
import { PressComponent } from './components/press/press.component';
import { PreLoginRegisterComponent } from './components/pre-login-register/pre-login-register.component';
import { LoveListComponent } from './components/love-list/love-list.component';
import { TeamComponent } from './components/team/team.component';
import { ContributorComponent } from './components/contributor/contributor.component';
import { AuthorwisePostsComponent } from './components/authorwise-posts/authorwise-posts.component';
import { PlaylistwiseRadioComponent } from './components/playlistwise-radio/playlistwise-radio.component';
import { KspCodeMembershipFormComponent } from './components/ksp-code-membership-form/ksp-code-membership-form.component';
import { KspAwardsComponent } from './components/ksp-awards/ksp-awards.component';
import { KspSurveyComponent } from './components/ksp-survey/ksp-survey.component';
import { MobileKspAwards2017Component } from './components/mobile/mobile-ksp-awards-2017/mobile-ksp-awards-2017.component';
import { WebKspAwards2017Component } from './components/web/web-ksp-awards-2017/web-ksp-awards-2017.component';
import { KspAwards2017Component } from './components/ksp-awards-2017/ksp-awards-2017.component';
import { KspAwards2017VotingEndedComponent } from './components/ksp-awards2017-voting-ended/ksp-awards2017-voting-ended.component';
import { BrandRegistrationComponent } from './components/brand-registration/brand-registration.component';
import { SummerEventSubmitComponent } from './components/summer-event-submit/summer-event-submit.component';
import { BrandDashboardComponent } from './components/brand-dashboard/brand-dashboard.component';
import { KspAwards2017ResultComponent } from './components/ksp-awards-2017-result/ksp-awards-2017-result.component';
import { ManageEventComponent } from './components/manage-event/manage-event.component';
import { SummerChallengeComponent } from './components/summer-challenge/summer-challenge.component';
import { SavedImageComponent } from './components/saved-images/saved-images.component';
import { CustomResultComponent } from './components/custom-result/custom-result.component';
import { GrowthContestComponent } from './components/growth-contest/growth-contest.component';
import { emailVerification } from './components/email-verification/email-verification.component';
import { kspCodeActivityComponent } from './components/ksp-code-activity/ksp-code-activity.component';
import { MagazineComponent } from './components/magazine/magazine.component';
import { AppDownloadComponent } from './components/app-download/app-download.component';
import { KspCodePackageComponent } from './components/ksp-code-package/ksp-code-package.component';
import { kspAppPromoComponent } from './components/ksp-app-promo/ksp-app-promo.component';
import { KspAwards2019Component } from './components/ksp-awards-2019/ksp-awards-2019.component';
import { KspVoting2019Component } from './components/ksp-voting-2019/ksp-voting-2019.component';
import { StayTunedAwards2018Component } from './components/stay-tuned-awards2018/stay-tuned-awards2018.component';
import { KspVoting2019ContentComponent } from './components/ksp-voting-2019-content/ksp-voting-2019-content.component';
import { AwardsResultsComponent } from './components/awards-result/awards-result.component';



const title = 'Parenting, pregnancy, baby care and kids guide for Indian parents.';
const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'article-public', component: ArticlePublicComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  {
    path: 'article-individual/:slug/:id',
    component: ArticleIndividualComponent,
    canActivate: [AuthGuard],
    data: { headless: false, loginRequired: false, usertype: 'siteUser' },
    resolve: { seo: SeoResolve }
  },
  {
    path: 'details/:slug/:id',
    component: ArticleIndividualComponent,
    canActivate: [AuthGuard],
    data: { headless: false, loginRequired: false, usertype: 'siteUser' },
    resolve: { seo: SeoResolve }
  },
  {
    path: 'grow-right/:slug/:id',
    component: ArticleIndividualComponent,
    canActivate: [AuthGuard],
    data: { headless: false, loginRequired: false, usertype: 'siteUser' },
    resolve: { seo: SeoResolve }
  },
  {
    path: 'grow-right/:id',
    component: ArticleIndividualComponent,
    canActivate: [AuthGuard],
    data: { headless: false, loginRequired: false, usertype: 'siteUser' },
    resolve: { seo: SeoResolve }
  },
  {
    path: 'article-individual/:id',
    component: ArticleIndividualComponent,
    canActivate: [AuthGuard],
    data: { headless: false, loginRequired: false, usertype: 'siteUser' },
    resolve: { seo: SeoResolve }
  },
  {
    path: 'details/:id',
    component: ArticleIndividualComponent,
    canActivate: [AuthGuard],
    data: { headless: false, loginRequired: false, usertype: 'siteUser' },
    resolve: { seo: SeoResolve }
  },
  { path: 'bundle-individual/:id',
  component: BundleIndividualComponent,
  canActivate: [AuthGuard],
  data: {headless: false, loginRequired: false, usertype: 'siteUser'},
  resolve : {seo : SeoResolve}
  },
  {
    path: 'growth',
    redirectTo: '/grow-right',
  },
  { path: 'grow-right',
  component: GrowthContestComponent,
  canActivate: [AuthGuard],
  data: {headless: false, loginRequired: false, usertype: 'siteUser'}
  },

  {path: 'categorywise-article/:id', component: CategorywiseArticleComponent, canActivate: [AuthGuard], data: {headless: false, title: title, loginRequired: false, usertype: 'siteUser'}},
  {path: 'categorywise-article/:slug/:id', component: CategorywiseArticleComponent, canActivate: [AuthGuard], data: {headless: false, title: title, loginRequired: false, usertype: 'siteUser'}},

  { path: 'ksp-latest', component: ArticleLatestComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'ksp-most-shared', component: ArticleMostLovedComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'ksp-most-popular', component: ArticleMostPopularComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'social-public', component: SocialPublicComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'social-individual/:id', component: SocialIndividualComponent, canActivate: [AuthGuard], data: { headless: false, loginRequired: false, usertype: 'siteUser' } },

  { path: 'social-all', component: SocialAllComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  {
    path: 'tv-individual/:slug/:id',
    component: TvIndividualComponent,
    canActivate: [AuthGuard],
    data: { headless: false, loginRequired: false, usertype: 'siteUser' },
    resolve: { seo: SeoResolve }
  },
  {
    path: 'awards/:id',
    component: AwardsResultsComponent,
    resolve: { seo: SeoResolve }
  },
  // {
  //   path: 'awards/:id',
  //   component: KspAwards2019Component,
  //   resolve: { seo: SeoResolve }
  // },
  // {
  //   path: 'vote-submit/:id',
  //   component: KspVoting2019Component,
  //   resolve: { seo: SeoResolve }
  // },
  // {
  //   path: 'vote-submit/:id:token',
  //   component: KspVoting2019Component,
  //   resolve: { seo: SeoResolve }
  // },
  {
    path: 'awards/:id/:token',
    component: AwardsResultsComponent,
    resolve: { seo: SeoResolve }
  },
  // {
  //   path: 'awards/:id/:token',
  //   component: KspAwards2019Component,
  //   resolve: { seo: SeoResolve }
  // },
  {
    path: 'tv-individual/:id',
    component: TvIndividualComponent,
    canActivate: [AuthGuard],
    data: { headless: false, loginRequired: false, usertype: 'siteUser' },
    resolve: { seo: SeoResolve }
  },

  { path: 'tv-all', component: TvAllComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'categorywise-tv/:id', component: CategorywiseTvComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  {
    path: 'radio-individual/:slug/:id',
    component: RadioIndividualComponent,
    canActivate: [AuthGuard],
    data: { headless: false, loginRequired: false, usertype: 'siteUser' },
    resolve: { seo: SeoResolve }
  },

  {
    path: 'radio-individual/:id',
    component: RadioIndividualComponent,
    canActivate: [AuthGuard],
    data: { headless: false, loginRequired: false, usertype: 'siteUser' },
    resolve: { seo: SeoResolve }
  },

  { path: 'radio-all', component: RadioAllComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'categorywise-radio/:id', component: CategorywiseRadioComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'event-individual/:slug/:id', component: EventIndividualComponent, canActivate: [AuthGuard], data: { headless: false, loginRequired: false, usertype: 'siteUser' } },

  { path: 'event-individual/:id', component: EventIndividualComponent, canActivate: [AuthGuard], data: { headless: false, loginRequired: false, usertype: 'siteUser' } },

  { path: 'event-all/:city/:age/:interest/:startdate/:enddate', component: EventAllComponent, canActivate: [AuthGuard], data: { headless: false, title: 'Events and Activities | Kids Stop Press', loginRequired: false, usertype: 'siteUser' } },

  { path: 'event-all', component: EventAllComponent, canActivate: [AuthGuard], data: { headless: false, title: 'Events and Activities | Kids Stop Press', loginRequired: false, usertype: 'siteUser' } },

  { path: 'camp-all', component: CampAllComponent, canActivate: [AuthGuard], data: { headless: false, title: 'Camps and Activities | Kids Stop Press', loginRequired: false, usertype: 'siteUser' } },

  { path: 'event-and-activity', component: EventAllComponent, canActivate: [AuthGuard], data: { headless: false, title: 'Events and Activities | Kids Stop Press', loginRequired: false, usertype: 'siteUser' } },

  { path: 'events-and-activities-for-kids-this-weekend-in-mumbai', component: EventAllComponent, canActivate: [AuthGuard], data: { headless: false, title: 'Events and Activities | Kids Stop Press', loginRequired: false, usertype: 'siteUser' } },

  { path: 'events-and-activities-for-kids-this-weekend-in-delhi-ncr', component: EventAllComponent, canActivate: [AuthGuard], data: { headless: false, title: 'Events and Activities | Kids Stop Press', loginRequired: false, usertype: 'siteUser' } },

  { path: 'events-and-activities-for-kids-this-weekend-in-bengaluru', component: EventAllComponent, canActivate: [AuthGuard], data: { headless: false, title: 'Events and Activities | Kids Stop Press', loginRequired: false, usertype: 'siteUser' } },

  { path: 'events-and-activities-for-kids-this-weekend-in-hyderabad', component: EventAllComponent, canActivate: [AuthGuard], data: { headless: false, title: 'Events and Activities | Kids Stop Press', loginRequired: false, usertype: 'siteUser' } },

  { path: 'events-and-activities-for-kids-this-weekend-in-chennai', component: EventAllComponent, canActivate: [AuthGuard], data: { headless: false, title: 'Events and Activities | Kids Stop Press', loginRequired: false, usertype: 'siteUser' } },

  { path: 'events-and-activities-for-kids-this-weekend-in-pune', component: EventAllComponent, canActivate: [AuthGuard], data: { headless: false, title: 'Events and Activities | Kids Stop Press', loginRequired: false, usertype: 'siteUser' } },

  { path: 'dashboard/submit-an-event', component: EventSubmitComponent, canActivate: [AuthGuard], data: { headless: false, title: 'Submit an Event | Kids Stop Press', loginRequired: true, usertype: 'siteUser' } },

  { path: 'product-public', component: ProductPublicComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'ksp-code', component: KspCodeComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'kspcode', component: KspCodeComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'testimonial-all', component: TestimonialAllComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'signup', component: RegistrationComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: true, usertype: 'siteUser' } },

  { path: 'article-user', component: ArticleUserComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: true, usertype: 'siteUser' } }
  ,

  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: true, usertype: 'siteUser' } }
  ,

  { path: 'social-user', component: SocialUserComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: true, usertype: 'siteUser' } },

  { path: 'bookmarks', component: BookmarkListComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: true, usertype: 'siteUser' } },

  {
    path: 'create-social-post/:id', component: CreateNewSocialPostComponent, canActivate: [AuthGuard], data: {
      headless: false, title: title, loginRequired: true,
      usertype: 'siteUser'
    }
  },

  { path: 'article-submit', component: ArticleSubmitComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: true, usertype: 'siteUser' } },

  { path: 'post-individual/:id', component: PostIndividualComponent, canActivate: [AuthGuard], data: { headless: false, loginRequired: false, usertype: 'siteUser' } },

  { path: 'cms/:slug', component: CmsComponent, canActivate: [AuthGuard], data: { headless: false, title: 'Indian Parenting website, Kids website in India, Activities &amp; Events for children in India | CMS', loginRequired: false, usertype: 'all' } },

  { path: 'search-result/', component: SearchResultComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'search-result/:text', component: SearchResultComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'search-result/:type/:text', component: SearchResultComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'image-browser', component: CkeditorImageBrowserComponent, canActivate: [AuthGuard], data: { headless: true, title: title, loginRequired: false, usertype: 'all' } },

  { path: 'press', component: PressComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'all' } },

  { path: 'team', component: TeamComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'contributors', component: ContributorComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'pre-login-register', component: PreLoginRegisterComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'loves', component: LoveListComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: true, usertype: 'siteUser' } },

  { path: 'authorwise-posts/:id', component: AuthorwisePostsComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'playlist/:id', component: PlaylistwiseRadioComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'ksp-awards', component: KspAwardsComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'ksp-awards-2016', component: KspAwardsComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'ksp-awards-2016/ksp-awards-2016-winners', component: KspAwardsComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'ksp-awards', component: KspAwardsComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  {
    path: 'Awards2017',
    component: KspSurveyComponent,
    canActivate: [AuthGuard],
    data: { headless: false, title: 'KSP Awards 2017 - Celebrating Excellence In Parenting And Baby Care', loginRequired: false, usertype: 'siteUser' },
    /*resolve :{
      categories : CategoryResolve
    }*/
  },

  {
    path: 'KSPAwards2017',
    // component:KspSurveyComponent,
    component: KspAwards2017ResultComponent,
    canActivate: [AuthGuard],
    data: { headless: false, title: 'KSP Awards 2017 - Celebrating Excellence In Parenting And Baby Care', loginRequired: false, usertype: 'siteUser' },
    /*resolve :{
      categories : CategoryResolve
    }*/
  },

  {
    path: 'Awards2017/:id',
    component: KspAwards2017VotingEndedComponent,
    canActivate: [AuthGuard],
    data: { headless: false, title: 'KSP Awards 2017 - Celebrating Excellence In Parenting And Baby Care', loginRequired: false, usertype: 'siteUser' },
  },

  {
    path: 'payment-statusFinal',
    component: PaymentFinal,
    canActivate: [AuthGuard],
    data: { headless: false, title: 'KSP Payment Final', loginRequired: false, usertype: 'siteUser' },
  },

  { path: 'Awards2017-Voting-Ended', component: KspAwards2017VotingEndedComponent, canActivate: [AuthGuard], data: { headless: false, title: 'KSP Awards 2017 - Celebrating Excellence In Parenting And Baby Care', loginRequired: false, usertype: 'siteUser' } },
  { path: 'Awards2017-Result', component: KspAwards2017Component, data: { headless: false, title: 'KSP Awards 2017 - Celebrating Excellence In Parenting And Baby Care', loginRequired: false, usertype: 'siteUser' } },

  { path: 'brand-signup', component: BrandRegistrationComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'brand-dashboard', component: BrandDashboardComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: true, usertype: 'business' } },

  /*Event Management*/

  { path: 'manage-events', component: ManageEventComponent, canActivate: [AuthGuard], data: { headless: false, title: 'Manage Event | Kids Stop Press', type: 'event', loginRequired: true, usertype: 'business' } },

  { path: 'manage-camps', component: ManageEventComponent, canActivate: [AuthGuard], data: { headless: false, title: 'Manage Event | Kids Stop Press', type: 'camp', loginRequired: true, usertype: 'business' } },

  { path: 'event-submit', component: EventSubmitComponent, canActivate: [AuthGuard], data: { headless: false, title: 'Submit an Event | Kids Stop Press', loginRequired: false, usertype: 'all' } },

  { path: 'event-submit/:id', component: EventSubmitComponent, canActivate: [AuthGuard], data: { headless: false, title: 'Submit an Event | Kids Stop Press', loginRequired: true, usertype: 'all' } },

  /* Summer challenge */
  { path: 'summer-funfactory', component: SummerChallengeComponent, canActivate: [AuthGuard], data: { headless: false, title: 'Summer Challenge | Kids Stop Press', loginRequired: false, usertype: 'siteUser' } },

  /* Saved Images */
  { path: 'saved-images', component: SavedImageComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: true, usertype: 'siteUser' } },


  /* Custom results */
  { path: 'resultPage/:type/:id', component: CustomResultComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  /* email verification */
  { path: 'emailVerification/:token', component: emailVerification, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  /* Ksp Code Activity */
  { path:'ksp-code-activity',redirectTo:'\shopping'},
  { path: 'shopping', component: kspCodeActivityComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  /* Ksp App Promo */
  { path: 'app', component: kspAppPromoComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  /*ksp magazine */
  { path: 'ksp-magazine', component: MagazineComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'ksp-mobile-downloads', component: AppDownloadComponent, data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: 'ksp-code-package', component: KspCodePackageComponent, data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  // ksp-award-2018
  { path: 'KSPAwards2018', component: StayTunedAwards2018Component, data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },
  { path: 'KSPAwards2018/stay-tuned', component: StayTunedAwards2018Component, data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },
  // {path: 'KSPAwards2018', component: StayTunedAwards2018Component,  data: {headless: false, title: title, loginRequired: false, usertype: 'siteUser'}},

  { path: ':name/:id/:price', component: KspCodeMembershipFormComponent, canActivate: [AuthGuard], data: { headless: false, title: title, loginRequired: false, usertype: 'siteUser' } },

  { path: '**', redirectTo: 'home', data: { headless: false, title: title } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

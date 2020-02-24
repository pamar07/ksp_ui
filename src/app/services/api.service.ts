import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiService {

  authToken: any;
  user: any;
  authUrl: any;
  base_url: any;
  share_payment: any;
  upload_url: any;
  browse_url: any;
  admin_url: any;
  share_url: any;

  constructor(private http: Http) {
    // this.authUrl = 'http://182.75.177.246:8000/ksp_api/api/';
    // this.base_url = 'http://182.75.177.246:8000/ksp_api/api/';
    // this.upload_url = 'http://182.75.177.246:8000/ksp_api/api/filebrowserUploadUrl';
    // this.browse_url = 'http://182.75.177.246:8000/ksp_api/api/filebrowserBrowseUrl';

    // this.authUrl = 'http://35.154.204.200/ksp_api/api/';
    // this.base_url = 'http://35.154.204.200/ksp_api/api/';
    // this.upload_url = 'http://35.154.204.200/ksp_api/api/filebrowserUploadUrl';
    // this.browse_url = 'http://35.154.204.200/ksp_api/api/filebrowserBrowseUrl';

    this.authUrl = environment.base_url;
    this.admin_url = environment.admin_url;
    this.share_url = environment.share_url;
    this.share_payment = environment.share_payment;
    this.upload_url = this.authUrl + 'filebrowserUploadUrl';
    this.browse_url = this.authUrl + 'filebrowserBrowseUrl';
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  loggedIn() {
    if (localStorage.getItem('token') == null || localStorage.getItem('user') == null) {
      return false;
    } else {
      return true;
    }
  }

  showFooter() {
    if (localStorage.getItem('footerVisible') && localStorage.getItem('footerVisible') == 'hide') {
      return false;
    } else {
      return true;
    }
  }

  getAuthUser() {
    if (this.loggedIn()) {
      const user = localStorage.getItem('user');
      this.user = JSON.parse(user);
      return this.user;
    }else {
      return null;
    }
  }

  getUserName() {
    if (this.loggedIn()) {
      if (localStorage.getItem('user') == null) {
        return JSON.parse(localStorage.getItem('user'));
      }else {
        return null;
      }
    }else {
      return null;
    }
  }

  getShareUrlPay() {
    return this.share_payment;
  }

  loginUser(user) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'login', user, { headers: headers }).map(ret => ret.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  }

  clearGuestId() {
    if (localStorage.getItem('guest_id') != null) {
      localStorage.removeItem('guest_id');
    }
  }

  localStorageTimeOut() {
    const hours = 24; // Reset when storage is more than 24hours
    const now = new Date().getTime();
    const setupTime = localStorage.getItem('setupTime');
    if (setupTime == null) {
      localStorage.setItem('setupTime', now.toString());
    } else {
      if (now - parseInt(setupTime) > hours * 60 * 60 * 1000) {
        localStorage.clear();
        localStorage.setItem('setupTime', now.toString());
      }
    }
  }

  logoutUserData() {
    this.authToken = null;
    this.user = null;
    // localStorage.clear();
    if (localStorage.getItem('user') != null) {
      localStorage.removeItem('user');
    }
    if (localStorage.getItem('token') != null) {
      localStorage.removeItem('token');
    }
    if (localStorage.getItem('selectedCities') != null) {
      localStorage.removeItem('selectedCities');
    }
    if (localStorage.getItem('selectedAges') != null) {
      localStorage.removeItem('selectedAges');
    }
    this.clearGuestId();
    return 1;
  }

  logoutAPI() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'api_logout', {}, { headers: headers }).map(ret => ret.json());
  }
  getUserDetails() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'getUserDetails', {}, { headers: headers }).map(ret => ret.json());
  }
  registerUser(user) {
    user.guest = localStorage.getItem('guest_token');
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'registerUser', user, { headers: headers }).map(ret => ret.json());
  }

  updateTourCompleted() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'tourCompleted', {}, { headers: headers }).map(ret => ret.json());
  }

  getCities() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'getCities', { headers: headers }).map(res => res.json());
  }

  checkPaymentStatus(id) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'checkStatusPayment', { 'bundle_id': id }, { headers: headers }).map(res => res.json());
  }
  submitPaymentDet(id, status) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'submitPayment',
    { 'bundle_id': id, 'status': status }, { headers: headers }).map(res => res.json());
  }

  submitPaymentDetConfirm(id, status, paymentId) {
    let jsonobj = { 'bundle_id': localStorage.getItem('bundle_id'),
     'status': status, 'paymentId': paymentId, 'order_no': localStorage.getItem('order_no') };
    const token = localStorage.getItem('token');
    $.ajax('https://www.kidsstoppress.com/ksp_api/api/' + 'submitPayment', {
      // method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      type: 'post',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(jsonobj),
      success: function (xmlHttpRequest) {
        window.location.reload();
        return;
      }
    });

    // const headers = new Headers();
    // this.loadToken();
    // headers.append('Authorization', 'Bearer ' + this.authToken);
    // headers.append('Content-type', 'application/json');
    // return Http.prototype.post(this.authUrl + 'submitPayment', {'bundle_id': id ,'status': status, 'paymentId': paymentId},
    //  {headers: headers}).map(res => res.json());
  }

  getBundleDetails() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'bundleDetails', { headers: headers }).map(res => res.json());
  }

  getBundleDetailsById(id) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'getBundleDetailsById', { 'id': id }, { headers: headers }).map(res => res.json());
  }
  submitGuestDet(email, phone, intent_type) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'saveintentinfo', { 'email': email, 'phone': phone, 'intent_type': intent_type },
     { headers: headers }).map(res => res.json());
  }

  getRecommended(articleId) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'getRecommended', { 'articleId': articleId }, { headers: headers }).map(res => res.json());
  }


  getAgeGroups() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'getAgeGroup', { headers: headers }).map(res => res.json());
  }
  getAgeGroupsforChalange() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'getAgeGroupSummerChallenge', { headers: headers }).map(res => res.json());
  }
  /* Most Shared Articles */
  getArticlesMostLoved(page, noOfData, city?, age?) {
    const headers = new Headers();
    if (this.loggedIn()) {
      this.loadToken();
      headers.append('Authorization', 'Bearer ' + this.authToken);
    }
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'showArticles_mostShared', { 'page_no': page, 'no_of_data': noOfData, 'city': city, 'age': age },
     { headers: headers }).map(res => res.json());
  }

  getArticlesRecommended(page, noOfData, city?, age?) {
    const headers = new Headers();
    if (this.loggedIn()) {
      this.loadToken();
      headers.append('Authorization', 'Bearer ' + this.authToken);
    }
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'showArticles_recommended',{ 'page_no': page, 'no_of_data': noOfData, 'city': city, 'age': age },
     { headers: headers }).map(res => res.json());
  }

  getArticlesRecent(page, noOfData, city?, age?) {
    const headers = new Headers();
    if (this.loggedIn()) {
      this.loadToken();
      headers.append('Authorization', 'Bearer ' + this.authToken);
    }
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'showArticles_recent', { 'page_no': page,
     'no_of_data': noOfData, 'city': city, 'age': age }, { headers: headers }).map(res => res.json());
  }

  getArticlesRandom(noOfData) {
    const headers = new Headers();
    if (this.loggedIn()) {
      this.loadToken();
      headers.append('Authorization', 'Bearer ' + this.authToken);
    }
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'showArticles_random/' + noOfData, { headers: headers }).map(res => res.json());
  }

  getArticlesHandpicked(noOfData) {
    const headers = new Headers();
    this.loadToken();
    if (this.authToken != null) {
      headers.append('Authorization', 'Bearer ' + this.authToken);
    }
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'handpickedArticle/' + noOfData, { headers: headers }).map(res => res.json());
  }

  getBannerArticle(noOfData, isLogin) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'getBannerArticle', { limit: noOfData, isLogin: isLogin },
    { headers: headers }).map(res => res.json());
  }

  getAllPageBanners(noOfData) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'getAllPageBanners/' + noOfData, { headers: headers }).map(res => res.json());
  }

  getEvents() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'events', { headers: headers }).map(res => res.json());
  }
  getPageGrowth(id) {
    const headers = new Headers();
    this.loadToken();
    // headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'getPage', { 'id': id }, { headers: headers }).map(res => res.json());
  }

  getAllEvents(page, noOfData) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'events', { 'page': page, 'noOfData': noOfData }, { headers: headers }).map(res => res.json());
  }

  getEventsCitywise(city) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'showEvents/' + city, { headers: headers }).map(res => res.json());
  }

  getEventsCityAndDatewise(noOfData, offSet, city?, date?, type?) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'showEvents', { 'city': city, 'date': date, 'noOfData': noOfData,
     'offSet': offSet, 'type': type }, { headers: headers }).map(res => res.json());
  }

  advanceEventSearch(type, city, age, category, noOfData, offSet, tag?, start_date?, end_date?) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'showEvents',
    { 'city': city, 'startDate': start_date, 'endDate': end_date, 'age': age, 'category': category, 'tag_id': tag,
    'noOfData': noOfData, 'offSet': offSet, 'type': type }, { headers: headers }).map(res => res.json());
  }

  getEventsDatewise(date) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'showEvents', { 'start_date': date }, { headers: headers }).map(res => res.json());
  }

  filterEventsDatewise(page, noOfData, sdate, edate) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'showEvents_byDates', { 'page': page, 'noOfData': noOfData, 'startdate': sdate, 'enddate': edate },
     { headers: headers }).map(res => res.json());
  }

  filterEventsCitywise(page, noOfData, venue_city) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'showEvents_byCities',
     { 'page': page, 'noOfData': noOfData, 'venue_city': venue_city }, { headers: headers }).map(res => res.json());
  }

  filterEventsCategorywise(page, noOfData, categories) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'showEvents_byCategories',
     { 'page': page, 'noOfData': noOfData, 'category_id': categories }, { headers: headers }).map(res => res.json());
  }

  getIndividualEvent(id) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'events/' + id, { headers: headers }).map(res => res.json());
  }

  uploadEventPicture(file) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.authUrl + 'uploadFile', formData).map(res => res.json());
  }

  submitEvent(event) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'submitEvents', event, { headers: headers }).map(res => res.json());
  }

  submitArticle(article) {
    const headers = new Headers();
    if (this.loggedIn()) {
      this.loadToken();
      headers.append('Authorization', 'Bearer ' + this.authToken);
    }
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'submitArticle', article, { headers: headers }).map(res => res.json());
  }

  getUserEvents(type?) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'showEvents_user/', { 'type': type }, { headers: headers }).map(res => res.json());
  }

  participateEvent(event_id, status = 1 /* 1 for participate, 2->Interested, 3->Going */) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'participate_in_Event/', { 'event_id': event_id }, { headers: headers }).map(res => res.json());
  }

  getRadio(page, noOfData, city?, age?) {
    const headers = new Headers();
    if (this.loggedIn()) {
      this.loadToken();
      headers.append('Authorization', 'Bearer ' + this.authToken);
    }
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'radio', { 'page': page, 'noOfData': noOfData, 'city': city, 'age': age },
     { headers: headers }).map(res => res.json());
  }

  getIndividualRadio(id, no) {
    const headers = new Headers();
    if (this.loggedIn()) {
      this.loadToken();
      headers.append('Authorization', 'Bearer ' + this.authToken);
    }
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'IndividualRadio/' + id, { 'no': no }, { headers: headers }).map(res => res.json());
  }

  getIndividualTv(id, no) {
    const headers = new Headers();
    if (this.loggedIn()) {
      this.loadToken();
      headers.append('Authorization', 'Bearer ' + this.authToken);
    }
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'IndividualTV/' + id, { 'no': no }, { headers: headers }).map(res => res.json());
  }

  getTv(page, noOfData, city?, age?) {
    const headers = new Headers();
    if (this.loggedIn()) {
      this.loadToken();
      headers.append('Authorization', 'Bearer ' + this.authToken);
    }
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'tv', { 'page': page, 'noOfData': noOfData, 'city': city, 'age': age },
     { headers: headers }).map(res => res.json());
  }

  getIndividualArticle(id, no?) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'detailArticle', { 'id': id, 'no': no }, { headers: headers }).map(ret => ret.json());
  }

  getCategorywiseArticle(noOfData) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'showCategories/' + noOfData, { headers: headers }).map(res => res.json());
  }

  getInstagram() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'fetchInstaData', { headers: headers }).map(res => res.json());
  }

  getOneCategoryArticles(id, page, noOfData) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'categorysearch', { 'id': id, 'page_no': page, 'no_of_data': noOfData },
     { headers: headers }).map(res => res.json());
  }

  sendRegistrationOTP(email, phone, sender_id?) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'sendOtp', { 'email': email, 'phone': phone, 'sender': sender_id },
     { headers: headers }).map(res => res.json());
  }

  verifyRegistrationOTP(phone, otp) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'verify', { 'phone': phone, 'otp': otp }, { headers: headers }).map(res => res.json());
  }

  sendOTP(phone) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'forgotPassword', { 'phone': phone }, { headers: headers }).map(res => res.json());
  }

  verifyOTP(phone, otp) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'verifyOtp', { 'phone': phone, 'otp': otp }, { headers: headers }).map(res => res.json());
  }

  changePassword(phone, newPassword) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'changePassword', { 'phone': phone, 'newPassword': newPassword },
     { headers: headers }).map(res => res.json());
  }

  sendEmailOTP(email) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'emailForgotPassword', { 'email': email }, { headers: headers }).map(res => res.json());
  }

  verifyEmailOTP(email, otp) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'verifyOtp', { 'email': email, 'otp': otp }, { headers: headers }).map(res => res.json());
  }
  loginWithOTP(email, otp) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'userlogin', { 'email': email, 'otp': otp }, { headers: headers }).map(res => res.json());
  }
  changePasswordByEmail(email, newPassword) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'changePassword', { 'email': email, 'newPassword': newPassword },
     { headers: headers }).map(res => res.json());
  }

  updatePassword(newPassword) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'updatePassword', { 'newPassword': newPassword }, { headers: headers }).map(res => res.json());
  }

  getAllGroups(noOfData, city?, age?) {
    const headers = new Headers();
    this.loadToken();
    if (this.authToken != null) {
      headers.append('Authorization', 'Bearer ' + this.authToken);
    }
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'showGroups/' + noOfData, { 'city': city, 'age': age },
     { headers: headers }).map(res => res.json());
  }

  getTrendingGroups(noOfData) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'showGroups/' + noOfData, { headers: headers }).map(res => res.json());
  }

  getAllGroupsPagewise(page, noOfData) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'showGroupsPagewise', { 'page_no': page, 'no_of_data': noOfData },
     { headers: headers }).map(res => res.json());
  }

  getIndividualgroup(id) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'detailGroup/', { 'id': id }, { headers: headers }).map(res => res.json());
  }

  getUserGroups() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.get(this.authUrl + 'showGroupUsers/', { headers: headers }).map(res => res.json());
  }

  joinGroup(group_id) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'joinGroup/', { 'group_id': group_id }, { headers: headers }).map(res => res.json());
  }

  leaveGroup(group_id) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.get(this.authUrl + 'leaveGroup/' + group_id, { headers: headers }).map(res => res.json());
  }

  getUserProfileDetails() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.get(this.authUrl + 'viewProfile/', { headers: headers }).map(res => res.json());
  }

  updateUserProfileDetails(user_profile_details) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'updateUser/', user_profile_details, { headers: headers }).map(res => res.json());
  }

  updateBusinessUserProfileDetails(user_profile_details) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'updateBusinessUser', user_profile_details, { headers: headers }).map(res => res.json());
  }

  updateUserChildExpectingDetails(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'updateUserChildExpectingDetails/', data, { headers: headers }).map(res => res.json());
  }

  uploadPhoto(file) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.authUrl + 'uploadFile', formData).map(res => res.json());
  }

  updateAboutYourself(about_yourself) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'aboutUser/', { 'about_yourself': about_yourself }, { headers: headers }).map(res => res.json());
  }

  updateChildDetails(child_id, child_details) {
    console.log(child_id);
    console.log(child_details);
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'updateChild/' + child_id, child_details, { headers: headers }).map(res => res.json());
  }

  getUserFavourites() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.get(this.authUrl + 'favourite/', { headers: headers }).map(res => res.json());
  }

  updateUserFavourites(fav) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'userFavourite/', { 'fav': fav }, { headers: headers }).map(res => res.json());
  }

  getChildFavourites() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.get(this.authUrl + 'favourite/dummy', { headers: headers }).map(res => res.json());
  }

  updateChildFavourites(child_id, fav) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'childFavourite/' + child_id, { 'fav': fav }, { headers: headers }).map(res => res.json());
  }

  onboardChild(child_details) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'childOnboard/', child_details, { headers: headers }).map(res => res.json());
  }

  checkEventStatus(event_id) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'getEventStatus', { 'event_id': event_id }, { headers: headers }).map(res => res.json());
  }

  eventStatusChange(event_id, status) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'participate_in_Event',
     { 'event_id': event_id, 'status': status }, { headers: headers }).map(res => res.json());
  }

  doLove(type, entity_id) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    if (type == 'event') {
      return this.http.post(this.authUrl + 'event_task_like', { 'type': type, 'entity_id': entity_id },
       { headers: headers }).map(res => res.json());
    }
    return this.http.post(this.authUrl + 'task_like/', { 'type': type, 'entity_id': entity_id },
     { headers: headers }).map(res => res.json());
  }

  doBookmark(type, entity_id) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'task_bookmark/', { 'type': type, 'entity_id': entity_id },
     { headers: headers }).map(res => res.json());
  }

  doComment(type, entity_id, content, parent?) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    if (type == 'event') {
      return this.http.post(this.authUrl + 'event_task_comment/', { 'type': type, 'entity_id': entity_id, 'content': content,
       'parent': parent }, { headers: headers }).map(res => res.json());
    } else {
      return this.http.post(this.authUrl + 'task_comment/', { 'type': type, 'entity_id': entity_id, 'content': content, 'parent': parent },
       { headers: headers }).map(res => res.json());
    }
  }

  doRead(type, entity_id) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'task_read/',
     { 'type': type, 'entity_id': entity_id }, { headers: headers }).map(res => res.json());
  }

  getBookmarkList(id) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.get(this.authUrl + 'task_bookmark/' + id, { headers: headers }).map(res => res.json());
  }

  getLoveList(id) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.get(this.authUrl + 'task_love/' + id, { headers: headers }).map(res => res.json());
  }

  createSocialPost(parent, title, content) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'create_post/',
     { 'parent': parent, 'title': title, 'content': content }, { headers: headers }).map(res => res.json());
  }

  deleteSocialPost(post_id) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'deleteGroupPost/', { 'id': post_id }, { headers: headers }).map(res => res.json());
  }

  updateSocialPost(post_id, post_title, post_content) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'updateGroupPost/', { 'id': post_id, 'title': post_title, 'content': post_content },
     { headers: headers }).map(res => res.json());
  }

  getMostLovedGroups(noOfData) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.get(this.authUrl + 'mostLovedGroups/' + noOfData, { headers: headers }).map(res => res.json());
  }

  getAllCategoryArticles(noOfData, city?, age?) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'categoryArticle/' + noOfData,
     { 'city': city, 'age': age }, { headers: headers }).map(res => res.json());
  }

  subscribeNewsletter(email, type) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'subscribe', { 'email': email, 'type': type }, { headers: headers }).map(res => res.json());
  }

  subscribeBookletter(email) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'subscribeBookClub', { 'email': email }, { headers: headers }).map(res => res.json());
  }

  getCategoryList() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.get(this.authUrl + 'getCategories', { headers: headers }).map(res => res.json());
  }

  getCMS(slug) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.get(this.authUrl + 'cms/' + slug, { headers: headers }).map(res => res.json());
  }

  fetchSearchedArticle(search_key) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'searchArticle', { 'text': search_key }, { headers: headers }).map(res => res.json());
  }

  fetchSearchedTv(search_key) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'searchTv', { 'text': search_key }, { headers: headers }).map(res => res.json());
  }

  fetchSearchedRadio(search_key) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'searchRadio', { 'text': search_key }, { headers: headers }).map(res => res.json());
  }

  fetchSearchedEvent(search_key, type) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'searchEvent', { 'text': search_key, 'type': type }, { headers: headers }).map(res => res.json());
  }

  getKspPartners() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.get(this.authUrl + 'codePartners', { headers: headers }).map(res => res.json());
  }

  getKspCode() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.get(this.authUrl + 'kspcode', { headers: headers }).map(res => res.json());
  }

  fetchTestimonial() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.get(this.authUrl + 'testimonial', { headers: headers }).map(res => res.json());
  }

  filebrowserBrowseUrl() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.get(this.authUrl + 'filebrowserBrowseUrl', { headers: headers }).map(res => res.json());
  }

  showEventInterests() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'showEventInterests', { headers: headers }).map(res => res.json());
  }

  showPress() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'showPress', { headers: headers }).map(res => res.json());
  }

  getMasterCategories() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'allCategories', { headers: headers }).map(res => res.json());
  }

  filterArticleCategory(cat_id, no_of_article, page_no, no_of_cat, city?, age?) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'categoryMasterArticle/' + no_of_article,
    { 'id': cat_id, 'page_no': page_no, 'no_of_data': no_of_cat, 'city': city, 'age': age }, { headers: headers }).map(res => res.json());
  }

  getOneCategoryTvs(id, page, noOfData) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'categoryTV',
     { 'id': id, 'page_no': page, 'no_of_data': noOfData }, { headers: headers }).map(res => res.json());
  }

  getOneCategoryRadios(id, page, noOfData) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'categoryRadio',
     { 'id': id, 'page_no': page, 'no_of_data': noOfData }, { headers: headers }).map(res => res.json());
  }

  getTeamMembers() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'team', { headers: headers }).map(res => res.json());
  }

  getContributors() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'contributor', { headers: headers }).map(res => res.json());
  }

  getAuthorwisePosts(id, page, noOfData) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'team',
     { 'id': id, 'page': page, 'noOfData': noOfData }, { headers: headers }).map(res => res.json());
  }

  getEventTrendingTags() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'getTags', { headers: headers }).map(res => res.json());
  }

  getTrendingEvents(id, page, noOfData) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'getKeyEvents',
     { 'id': id, 'page': page, 'noOfData': noOfData }, { headers: headers }).map(res => res.json());
  }

  getPromotionDetails() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'getAdds', { headers: headers }).map(res => res.json());
  }

  addsByArticle(addCity, addAgegroup, id) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'addsByArticle',
      { 'city': addCity, 'age': addAgegroup, id: id }, { headers: headers }).map(res => res.json());
  }

  addsByArticleTag(id) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'addByCategory',
      { articleId: id }, { headers: headers }).map(res => res.json());
  }

  /* For Radio Playlists */

  getPlaylistRadio() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'playlist', { headers: headers }).map(res => res.json());
  }

  getPlaylistTracks(id) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'playlist/' + id, { headers: headers }).map(res => res.json());
  }

  getAllPlaylistTracks(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'playlistTracks', data, { headers: headers }).map(res => res.json());
  }

  getInterestList() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'CategoriesList', { headers: headers }).map(res => res.json());
  }

  setUserInterest(interests, email) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'setUserInterest',
     { 'categoryId': interests, 'email': email }, { headers: headers }).map(res => res.json());
  }

  kspCodeMember(member_info) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'kspCodeMember', member_info, { headers: headers }).map(res => res.json());
  }

  kspCodeInsta(member_info) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'kspCodeInsta', member_info, { headers: headers }).map(res => res.json());
  }

  getKspEvents(page, noOfData) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'EventExclusive',
     { 'page': page, 'noOfData': noOfData }, { headers: headers }).map(res => res.json());
  }

  intentCapture(entity_id, entity_type, path) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'intent_capture', {
      'entity_id': entity_id,
      'entity_type': entity_type, 'path': path, 'guest': localStorage.getItem('guest_token')
    }, { headers: headers }).map(res => res.json());
  }

  pageviewCapture(entity_id, entity_type, path) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'IndividualIntent', { 'id': entity_id,
     'entity_type': entity_type, 'path': path, 'guest': localStorage.getItem('guest_token') }, { headers: headers }).map(res => res.json());
  }

  registrationPageview(path, action?) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'registrationIntent', { 'path': path, 'action_type': action,
     'guest': localStorage.getItem('guest_token') }, { headers: headers }).map(res => res.json());
  }

  bannerClickIntent(path, action?, entity_id?) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'bannerIntent',
     { 'path': path, 'action_type': action, 'entity_id': entity_id,
      'guest': localStorage.getItem('guest_token') }, { headers: headers }).map(res => res.json());
  }

  curatedContents(page_no, no_of_data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'curatedArticles',
     { 'page_no': page_no, 'no_of_data': no_of_data }, { headers: headers }).map(res => res.json());
  }

  getShareCount(path) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'getShareCount', { 'path': path }, { headers: headers }).map(res => res.json());
  }

  anyPageview(path, entity_type?, action?) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'intent', { 'path': path, 'action_type': action,
     'entity_type': entity_type, 'guest': localStorage.getItem('guest_token') }, { headers: headers }).map(res => res.json());
  }

  /*Survey APIs*/
  getSurveyCategories() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'surveyCategories', {}, { headers: headers }).map(res => res.json());
  }

  checkUserData(data) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'checkUserData', data, { headers: headers }).map(res => res.json());
  }

  registerSurveyUser(data) {
    data.guest = localStorage.getItem('guest_token');
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'registerSurveyUser', { data: data }, { headers: headers }).map(res => res.json());
  }

  saveUserVote(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'saveUserVote', { data: data }, { headers: headers }).map(res => res.json());
  }

  updateUserVote(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'updateUserVote', { data: data }, { headers: headers }).map(res => res.json());
  }

  saveVoterInfo(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'createSurveyTmpUser', data, { headers: headers }).map(res => res.json());
  }

  getTotalVoteCount() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'getVoteCount', { headers: headers }).map(res => res.json());
  }

  getCategorywiseWinnerList() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'getCategorywiseWinnerList', { headers: headers }).map(res => res.json());
  }

  getAwardWinnerRunnerUPList() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'getAwardWinnerRunnerUPList', { headers: headers }).map(res => res.json());
  }

  getAward2017CMSContents() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'getAward2017CMSContents', { headers: headers }).map(res => res.json());
  }
  /*Survey APIs Ends*/

  getAwardImages() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'awards', { headers: headers }).map(res => res.json());
  }

  registerBrand(data) {
    data.guest = localStorage.getItem('guest_token');
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'registerBrand', data, { headers: headers }).map(res => res.json());
  }

  getRelatedVideo(entity_type) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'getRelatedVideo', { 'entity_type': entity_type }, { headers: headers }).map(res => res.json());
  }


  relatedAudioVideo(ages, cities, count) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'recommended_audio_video',
    { 'ages': ages, 'cities': cities, 'count': count }, { headers: headers }).map(res => res.json());
  }

  kspTodayContents(count, city = [], age = []) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'ksp_today', { 'count': count,
     'city': city, 'age': age }, { headers: headers }).map(res => res.json());
  }
  kspShopContents() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'getShopDetails', { headers: headers }).map(res => res.json());
  }

  getEventsByUser(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'getEventsByUser', data, { headers: headers }).map(res => res.json());
  }

  sendAdvertiseMail() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'sendAdvertiseMail', {}, { headers: headers }).map(res => res.json());
  }

  sendWorkshopMail() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'sendWorkshopMail', {}, { headers: headers }).map(res => res.json());
  }

  getEditorCamp(city, age) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'getEditorCamp', { city: city, age: age }, { headers: headers }).map(res => res.json());
  }

  getChallengesForSummer() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'getChallengesForSummer', { headers: headers }).map(res => res.json());
  }

  acceptChallenge(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'acceptChallenge', data, { headers: headers }).map(res => res.json());
  }

  changeChallengeStatus(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'changeChallengeStatus', data, { headers: headers }).map(res => res.json());
  }

  startReadingBook(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'startReadingBook', data, { headers: headers }).map(res => res.json());
  }

  changeUserBookStatus(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'changeUserBookStatus', data, { headers: headers }).map(res => res.json());
  }

  getRecommendedArticlesForChallenge(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'getRecommendedArticlesForChallenge', data, { headers: headers }).map(res => res.json());
  }

  addUserReview(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'addUserReview', data, { headers: headers }).map(res => res.json());
  }

  getNotificationCount() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'getnotificationcount', { headers: headers }).map(res => res.json());
  }

  getNotificationList() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'getnotificationlist', { headers: headers }).map(res => res.json());
  }

  subscribeSummerUser(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'subscribeSummerUser', data, { headers: headers }).map(res => res.json());
  }

  sendLinkMail(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'sendLinkMail', data, { headers: headers }).map(res => res.json());
  }

  saveUserStory(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'saveUserStory', data, { headers: headers }).map(res => res.json());
  }

  doLoveComment(type, entity_id) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'comment_like',
     { 'type': type, 'entity_id': entity_id }, { headers: headers }).map(res => res.json());
  }

  getKspCodeArticles() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'getKspCodeArticles', { headers: headers }).map(res => res.json());
  }

  getUserSavedImages(limit, page) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'getUserImages', { 'limit': limit, 'page': page }, { headers: headers }).map(res => res.json());
  }

  uploadSavePicture(file, user_id) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('user_id', user_id);
    return this.http.post(this.authUrl + 'uploadSavePicture', formData).map(res => res.json());
  }

  fetchCustomResults(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'fetchCustomResults', data, { headers: headers }).map(res => res.json());
  }

  kspCodeContactRequest(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'kspCodeContactRequest', data, { headers: headers }).map(res => res.json());
  }

  updateUserCity(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'updateUserCity', data, { headers: headers }).map(res => res.json());
  }

  getSeoMeta(slug) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'postSeo', { 'slug': slug }, { headers: headers }).map(res => res.json());
  }

  submitSurvey(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'submitSurvey', data, { headers: headers }).map(res => res.json());
  }

  getCampaignArticles() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'getCampaignArticles', { headers: headers }).map(res => res.json());
  }

  getYoutubeLatestVideo() {
    return this.http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCteVUh0QI1xw6iLqywMt8Pw&maxResults=1&order=date&type=video&key=AIzaSyBw_a3ya7iLt8cLCv-rAK8n237Ig9zyxi8').map(res => res.json());
  }

  registerUserNew(user) {
    user.guest = localStorage.getItem('guest_token');
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'registerUserNew', user, { headers: headers }).map(ret => ret.json());
  }

  saveUserDetails(user) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'saveUserDetails', user, { headers: headers }).map(ret => ret.json());
  }

  verifyUser(token) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'verifyEmail', { token: token }, { headers: headers }).map(ret => ret.json());
  }

  getPdfs(page, noOfData, city?, age?) {
    const headers = new Headers();
    if (this.loggedIn()) {
      this.loadToken();
      headers.append('Authorization', 'Bearer ' + this.authToken);
    }
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'pdfs', { 'page': page,
     'noOfData': noOfData, 'city': city, 'age': age }, { headers: headers }).map(res => res.json());
  }

  saveCodeLead(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'saveCodeLead', data, { headers: headers }).map(res => res.json());
  }

  saveSearchedItem(search_term) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'saveSearchedItem', { search_term: search_term }, { headers: headers }).map(res => res.json());
  }
  getUser() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.get(this.authUrl + 'viewProfile', { headers: headers }).map(res => res.json());
  }
  // Follow an author
  followAuthor(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'follow', data, { headers: headers }).map(res => res.json());
  }

  // Check if a user follows an author
  followCheckAuthor(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'followCheck', data, { headers: headers }).map(res => res.json());
  }

  // user data for apple app notification
  notifyAppUser(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'notifyApp', data, { headers: headers }).map(res => res.json());
  }

  codePacks() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'kspCodePacks', { headers: headers }).map(ret => ret.json());
  }

  sendAppLink(mobile) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'sendAppLink', { 'mobile': mobile }, { headers: headers }).map(res => res.json());
  }
  // ksp award 2018
  getAwardCategory(id) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'getAwardsCategory', {id: id}, { headers: headers }).map(res => res.json());
  }
  getRegisterdCompany() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.get(this.authUrl + 'getRegisteredCompany', { headers: headers }).map(res => res.json());
  }
  nominationSubmit(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'nominateBrand', data, { headers: headers }).map(res => res.json());
  }
  nominationSubmitByBrand(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.authUrl + 'nominateBrandItself', data, { headers: headers }).map(res => res.json());
  }
  listAllBrandPerCategory(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'listAllBrandPerCategory', data, { headers: headers }).map(res => res.json());
  }
  likeBrand(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'likeBrand', data, { headers: headers }).map(res => res.json());
  }
  hasSocialId() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'checkSocialhandle', { headers: headers }).map(res => res.json());
  }
  submiSocialId(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    console.log(this.authToken);
    headers.append('Content-type', 'application/form-data');
    return this.http.post(this.authUrl + 'submitSocialHandle', data, { headers: headers }).map(res => res.json());
  }

  getCategoryForVote(data) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authToken);
    return this.http.post(this.authUrl + 'getCategoryForVote', data, { headers: headers }).map(res => res.json());
  }
  getStatusForVote(data) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'getStatusForVote', data, { headers: headers }).map(res => res.json());
  }
  submitVote(data) {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'submitVote', data, { headers: headers }).map(res => res.json());
  }
  isVerified() {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'isVerified', {},  { headers: headers }).map(res => res.json());
  }
  sendOTPAwards(data) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'sendOtpForAwards', data, { headers: headers }).map(res => res.json());
  }
  verifyOTPAwards(data) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'verifyOtp', data, { headers: headers }).map(res => res.json());
  }
  loginAwards(data) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'userLoginForAwards', data, { headers: headers }).map(res => res.json());
  }
  getCategoryDetails(data) {
    const header = new Headers();
    header.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'getCategoryDetails', data, { headers: header }).map(res => res.json());
  }

  getWinnersApi() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'getWinner', { headers: headers }).map(res => res.json());
  }
  checkChalangeElegible(data) {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'checkCompatibilityOfChallenge', data, { headers: headers }).map(res => res.json());
  }
  checkBundlePayment(data) {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'checkStatusPayment', data, { headers: headers }).map(res => res.json());
  }
  getbunddle() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'bundleDetails', { headers: headers }).map(res => res.json());
  }
  getBundleByAgeId(data) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'getDetailsOfBundleByAge', { 'age_id': data }, { headers: headers }).map(res => res.json());
  }
  getchallangeByAgeId(data) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'getchallengeByAge', data, { headers: headers }).map(res => res.json());
  }
  initiatePaymentStatus(id, status) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'initiatePayment',
     { 'bundle_id': id, 'status': status }, { headers: headers }).map(ret => ret.json());
  }

  paymentInitiate(id, eType, price, url, purpose) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'paymentInitiate',
    { 'entity_id': id, 'entity_type': eType, 'price': price, 'redirect_url': url,
    'purpose': purpose }, { headers: headers }).map(ret => ret.json());
  }
  saveUserItemDetails(member_info) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'savedUserItemDetails', member_info, { headers: headers }).map(ret => ret.json());
  }
  getBannerAgainstCategory(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'getBannerAgainstCategory', data, { headers: headers }).map(ret => ret.json());
  }
  getAwardImage() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'getAwardImage', { headers: headers }).map(ret => ret.json());
  }
  getAwardsWinnersList(id) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get(this.authUrl + 'getVoteWinner/' + id, { headers: headers }).map(ret => ret.json());
  }
  intentCaptureCommon(entity_id, entity_type, actionType, path) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'intent_capture', {
      'entity_id': entity_id,
      'entity_type': entity_type, 'action_type': actionType, 'path': path, 'guest': localStorage.getItem('guest_token')
    }, { headers: headers }).map(res => res.json());
  }
  searchAll(text) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'searchAll', {text: text}, { headers: headers }).map(ret => ret.json());
  }
  checkVoteSubmitted(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', 'Bearer ' + this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post(this.authUrl + 'checkVoteSubmitByUserAgainstCategory', data, { headers: headers }).map(ret => ret.json());
  }
  getAwardMenu() {
    return this.http.get(this.authUrl + 'getAwardsDetails').map(ret => ret.json());
  }
  // checkStatusPayment(id,status){
  //   const headers = new Headers();
  //   this.loadToken();
  //   headers.append('Authorization', 'Bearer ' + this.authToken);
  //   headers.append('Content-type', 'application/json');

  // }
  getIpAddress() {
    return this.http
          .get('https://jsonip.com/')
          .map(response => response || {})
          .catch(this.handleError);
}
private handleError(error):
Observable<any> {
  // Log error in the browser console
  console.error('observable error: ', error);

  return Observable.throw(error);
}
}

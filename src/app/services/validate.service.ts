import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateMobile(mobile){
    const re = /^[1-9][0-9]{4,12}$/;
    return re.test(mobile);
  }

  validateLogin(user){
    if(user.email == undefined || user.password == undefined || user.password == ''){
      return false;
    }else{
      return true;
    }
  }


}

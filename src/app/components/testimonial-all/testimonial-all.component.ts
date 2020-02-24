import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-testimonial-all',
  templateUrl: './testimonial-all.component.html',
  styleUrls: ['./testimonial-all.component.css']
})
export class TestimonialAllComponent implements OnInit {

  testimonials:any;

  constructor(
    public _apiService:ApiService
  ) { }

  ngOnInit() {
    this._apiService.fetchTestimonial().subscribe(ret=>{
      let $ret = ret.ret;
      if($ret.code == 1){
        this.testimonials = $ret.data;
      }else{
        this.testimonials = [];
      }
    },err=>{
    });
  }

}

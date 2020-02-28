import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ksp-code-package',
  templateUrl: './ksp-code-package.component.html',
  styleUrls: ['./ksp-code-package.component.css']
})
export class KspCodePackageComponent implements OnInit {


  codeData:any = [];

  constructor(private apiService:ApiService) { }

  ngOnInit() {

  	this.apiService.codePacks().subscribe(ret=>{
  		let $ret = ret.ret;
  		console.log($ret);
  		if($ret.code == 1){
  			this.codeData = $ret.data;
  		}
  	})
  }

}

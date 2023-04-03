import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-consulteuser',
  templateUrl: './consulteuser.component.html',
  styleUrls: ['./consulteuser.component.css']
})
export class ConsulteuserComponent {
  form!:any;

  constructor(private router:Router,private formBuilder:FormBuilder){}
onreturn():void{
  this.router.navigate(['./listuser'])
}
}

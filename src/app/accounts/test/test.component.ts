import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Chart } from 'chart.js';
import { DashboardService } from '../services/dashboard.service';
import { StatistiqueService } from '../services/statistique.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent  implements OnInit {
 
  email!: string;
  pwd!:string;
 form!: FormGroup;
 submitted = false;

 constructor(private formBuilder: FormBuilder,private router: Router,private loginService:LoginService) { 
    this.form = this.formBuilder.group(
  {
   
    email: ['', [Validators.required, Validators.email]],
    pwd: [
      '',
      [
        Validators.required,]
    ],
  }
);}

 ngOnInit(): void {
 }
 get f(): { [key: string]: AbstractControl } {
   return this.form.controls;
 }

 onSubmit(): void {
   this.submitted = true;

   if (this.form.invalid) {
     return;
   }
   console.log(this.form.value)
   this.loginService.Contact_auth(this.form.value.email,this.form.value.pwd).subscribe(respond=>{
    console.log(respond)
    console.log(respond.isFailed);
    console.log(respond.code);
    
    if(respond.isFailed == false && respond.code === '201' && respond.data)
    {
      this.router.navigate(['/acceuil']);

      sessionStorage.setItem('user',JSON.stringify(respond.data));
    }
})   
   
   console.log(JSON.stringify(this.form.value, null, 2));
 }

 onReset(): void {
   this.submitted = false;
   this.form.reset();
 }

 forget():void {
  this.router.navigate(['/motdepasse']);
 }
 
}

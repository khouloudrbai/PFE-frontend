import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  email!: string;
  pwd!:string;
  loginForm!: FormGroup;
  submitted = false;
  alertErrorPwd = false
 constructor(private formBuilder: FormBuilder,private router: Router,private loginService:LoginService) { 
    this.loginForm = this.formBuilder.group(
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
   return this.loginForm.controls;
 }

 onLoginSubmit(): void {
   this.submitted = true;

   if (this.loginForm.invalid) {
     return;
   }
   console.log(this.loginForm.value)
   this.loginService.Contact_auth(this.loginForm.value.email,this.loginForm.value.pwd).subscribe(respond=>{
    console.log(respond)
    console.log(respond.isFailed);
    console.log(respond.code);
    
    if(respond.isFailed == false && respond.code === '201' && respond.data.id_user > 0)
    {
      this.alertErrorPwd = false ;
      this.router.navigate(['/acceuil']);

      sessionStorage.setItem('user',JSON.stringify(respond.data));
    }
    else{
      this.alertErrorPwd = true ;
    }
})   
   
   console.log(JSON.stringify(this.loginForm.value, null, 2));
 }
 

 onReset(): void {
   this.submitted = false;
   this.loginForm.reset();
 }

 forget():void {
  this.router.navigate(['/motdepasse']);
 }
 
}

import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,CanActivate  {
 
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

 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  const user = sessionStorage.getItem('user');
  if (user) {
    // User is already logged in, prevent navigation to login page
    this.router.navigate(['/acceuil']);
    return false;
  }
  return true;
}


decodeToken(token: string): void {
  const decodedToken: any = jwt_decode(token);
  console.log(decodedToken);
}

onLoginSubmit(): void {
  this.submitted = true;

  if (this.loginForm.invalid) {
    return;
  }

  this.loginService.Contact_auth(this.loginForm.value.email, this.loginForm.value.pwd).subscribe(respond => {
    const token = respond.data?.token; // Check if token is present
    console.log(token);

    if (token) {
      const decodedToken: any = jwt_decode(token);
      console.log('decodeeeeeeeeeeeeeeeeeeeeeeeeeee',decodedToken);

      if (decodedToken && decodedToken.id_user) {
        this.alertErrorPwd = false;
        this.router.navigate(['/acceuil']);
        console.log(decodedToken);

        const user = {
          id_user: decodedToken.id_user,
          firstname: decodedToken.firstname,
          lastname: decodedToken.lastname,
          mobile: decodedToken.mobile,
          mail: decodedToken.mail,
          address: decodedToken.address,
          pwd: decodedToken.pwd,
          picture: decodedToken.picture
        };
        console.log(user)
        sessionStorage.setItem('user', JSON.stringify(user));

      } else {
        this.alertErrorPwd = true;
      }
    } else {
      this.alertErrorPwd = true;
    }
  });

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

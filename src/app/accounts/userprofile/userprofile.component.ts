import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ProfileService } from '../services/profile.service';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  mobile!:string;
  email!:string;
  address!:string;
  id_user!:any;
 firstname!:any;
 picture!:any;


  constructor(public userService:UserService,private formbuilder:FormBuilder,private profileService :ProfileService) {
    this.form = this.formbuilder.group(
      {
       
        email: ['', [Validators.required, Validators.email]],
        mobile: [ '',[Validators.required,]],
        address: [ '',[Validators.required,]],
        firstname:['',[Validators.required],],
        picture:['',[Validators.required],]

      })
  }

  ngOnInit(): void {
      
  this.onSubmit();
  let user = sessionStorage.getItem('user');
    console.log(user);
    if(user)
    {
      this.form.patchValue({
        email: JSON.parse(user).mail ,
        mobile:JSON.parse(user).mobile,
        address:JSON.parse(user).address,
        firstname:JSON.parse(user).firstname,
      })
      this.id_user = JSON.parse(user).id_user ;
    }
  }
  onSubmit():void{
    this.submitted = true;
 
    if (this.form.invalid) {
      return;}
    console.log(this.form.value)
    this.profileService.Contact_update(this.id_user,this.form.value.mobile,this.form.value.email,this.form.value.address,this.form.value.pwd).subscribe
    (respond=>{
     console.log(respond);
     console.log(respond.isFailed);
     console.log(respond.code);
     
     if(respond.isFailed == false && respond.code === '201' && respond.data)
     {
      
    
     }
 })   
     
    console.log(JSON.stringify(this.form.value, null, 2));
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
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
  id_user:any;
 firstname!:any;
 picture!:any;


  constructor(public userService:UserService,private formbuilder:FormBuilder) {
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
    let user = sessionStorage.getItem('user');
    console.log(user);
    if(user)
    {
      this.form.patchValue({
        email: JSON.parse(user).mail ,
        mobile:JSON.parse(user).mobile,
        address:JSON.parse(user).address,
        firstname:JSON.parse(user).firstname,
        picture:JSON.parse(user).firstname,


      })
      
      this.id_user = JSON.parse(user).id_user ;
    }
   
  }

}

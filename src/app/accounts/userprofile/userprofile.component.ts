import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

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
  pwd!:string;
  id_user:any;
 firstname!:any;
 picture!:any;


  constructor(private modalService: BsModalService,private router:Router,public profileService:ProfileService,private formbuilder:FormBuilder) {
    this.form = this.formbuilder.group(
      {
       
        email: ['', [Validators.required, Validators.email]],
        pwd: [ '',[Validators.required,]],
        mobile: [ '',[Validators.required,]],
        address: [ '',[Validators.required,]],
        firstname:['',[Validators.required],],
        picture:['',[Validators.required],]

      })
  }

  ngOnInit(): void {
    this.onSubmit();

    let id = sessionStorage.getItem('id');
    console.log(id);
    if(id )
    {
      this.form.patchValue({
        email: JSON.parse(id).mail ,
        mobile:JSON.parse(id).mobile,
        address:JSON.parse(id).address,
        firstname:JSON.parse(id).firstname,
        picture:JSON.parse(id).firstname,


      })
      
      this.id_user = JSON.parse(id).id_user ;
    }
   
  }

 
  onSubmit(): void {
    this.submitted = true;
    console.log(this.form.value)

    if (this.form.invalid) {
      return;
    }
    this.profileService.Contact_update(this.id_user,this.form.value.mobile,this.form.value.email,this.form.value.address,this.form.value.pwd).subscribe
    (respond=>{
     console.log(respond);
     console.log(respond.isFailed);
     console.log(respond.code);
     
     if(respond.isFailed == false && respond.code === '201' && respond.data)
     {
      this.router.navigate(['/acceuil']);
      
     }
 })   
     
    console.log(JSON.stringify(this.form.value, null, 2));
  }
}
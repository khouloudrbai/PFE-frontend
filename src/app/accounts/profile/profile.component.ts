import {Component, OnInit, TemplateRef} from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
    let user = sessionStorage.getItem('user');
    console.log(user);
    console.log(user)
    if(user )
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

 
  onSubmit(): void {
    this.submitted = true;
 
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value)
    this.profileService.Contact_update(this.id_user,this.form.value.mobile,this.form.value.email,this.form.value.address,this.form.value.pwd).subscribe
    (respond=>{
     console.log(respond);
     console.log(respond.isFailed);
     console.log(respond.code);
     
     if(respond.isFailed == false && respond.code === '201' && respond.data)
     {
      this.router.navigate(['/profile']);

      
     }
 })   
    
    console.log(JSON.stringify(this.form.value, null, 2));
  }
  
  onclick():void{
    this.router.navigate(['/addadmin']);
  }
}



  


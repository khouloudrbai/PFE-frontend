import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ProfileService } from '../services/profile.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-modifiermotdepasse',
  templateUrl: './modifiermotdepasse.component.html',
  styleUrls: ['./modifiermotdepasse.component.css']
})
export class ModifiermotdepasseComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  mobile!:string;
  email!:string;
  address!:string;
  pwd!:string;
  id_user:any;
 firstname!:any;
 lastname!:any;

 picture!:any;
 imageToShow:any;
 user_id:any;
 image:any;
  constructor(private modalService: BsModalService,private router:Router,public profileService:ProfileService,private formbuilder:FormBuilder,public userService:UserService) {
    this.form = this.formbuilder.group(
      {
       
        email: ['', [Validators.required, Validators.email]],
        pwd: [ '',[Validators.required,]],
        mobile: [ '',[Validators.required,]],
        address: [ '',[Validators.required,]],
        firstname:['',[Validators.required],],
        lastname:['',[Validators.required],],

        picture:['',[Validators.required],]

      })
  }

  ngOnInit(): void {
    this.onSubmit();

    let user = sessionStorage.getItem('user');
    console.log(user);
    if(user )
    {
      this.form.patchValue({
        email: JSON.parse(user).mail ,
        mobile:JSON.parse(user).mobile,
        address:JSON.parse(user).address,
        firstname:JSON.parse(user).firstname,
        lastname:JSON.parse(user).lastname,

        picture:JSON.parse(user).picture,


      })
      this.image=JSON.parse(user).picture;

      
      this.id_user = JSON.parse(user).id_user ;
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
  
  onclick():void{
    this.router.navigate(['/addadmin']);
  }
}

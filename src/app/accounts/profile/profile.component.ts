import {Component, OnInit, TemplateRef} from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import {  BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { UserService } from '../services/user.service';
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

   this.GetUserInfo();
   
  }
  
 GetUserInfo()
 {
 let user=sessionStorage.getItem('user')
  if(user )
  {
    this.id_user = JSON.parse(user).id_user ;
  }
  console.log(this.id_user)
  this.userService.get_one_user(this.id_user).subscribe
  (respond=>{
   console.log(respond);
   console.log(respond.isFailed);
   console.log(respond.code);
   console.log(respond.mail)
   if(respond.isFailed == false && respond.code === '201' && respond.data)
   {

     this.form.patchValue({
        email: respond.data[0].mail ,
       mobile:respond.data[0].mobile,
       address:respond.data[0].address,
       firstname:respond.data[0].firstname,
       picture:respond.data[0].picture,
     })

   this.image=respond.data[0].picture;
 }
}) 
}
  onSubmit(): void {
    this.submitted = true;
    console.log(this.form.value)

    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
  }

  cancel(){
    this.router.navigate(['/acceuil']);
  }
  save(){
    this.profileService.Contact_update(this.id_user,this.form.value.mobile,this.form.value.firstname,this.form.value.email,this.form.value.address,this.form.value.pwd).subscribe
    (respond=>{
     console.log(respond);
     console.log(respond.isFailed);
     console.log(respond.code);
     
     if(respond.isFailed == false && respond.code === '201' && respond.data)
     {
    
         this.GetUserInfo();

      
     }
 }) 
  }
}



  


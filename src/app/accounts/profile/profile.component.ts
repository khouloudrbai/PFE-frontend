import {Component, OnInit, TemplateRef} from '@angular/core';
import { FormGroup,FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { UserService } from '../services/user.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  form!:FormGroup;
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
  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control';
  newPassword = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);
  confirmPassword = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);



  constructor(private router:Router,public profileService:ProfileService,private formbuilder:FormBuilder,public userService:UserService) {
    this.form = this.formbuilder.group(
      {
       
        email: ['', [Validators.required, Validators.email]],
        pwd: [ '',[Validators.required,]],
        mobile: [ '',[Validators.required,]],
        address: [ '',[Validators.required,]],
        firstname:['',[Validators.required],],
        lastname:['',[Validators.required],],
        old_pwd:['',[Validators.required],],
      
        picture:['',[Validators.required],],  
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword,
    }, {
      validator: this.ConfirmedValidator('newPassword', 'confirmPassword'),
    })
  }

  onSubmit(): void {
    console.log(this.form);
    if (!this.form?.valid) {
      return;
    }
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
  
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  ngOnInit(): void {
    this.GetUserInfo();
   }
   GetUserInfo(){
      let user=sessionStorage.getItem('user')
        if(user)
        {
          this.id_user = JSON.parse(user).id_user ;
        }
        console.log(this.id_user)
        this.userService.get_one_user(this.id_user).subscribe(respond=>{
            console.log(respond);

            if(respond.isFailed == false && respond.code === '201' && respond.data)
            {

              this.form.patchValue({
                  email: respond.data[0].mail ,
                mobile:respond.data[0].mobile,
                address:respond.data[0].address,
                firstname:respond.data[0].firstname,
                lastname:respond.data[0].lastname,

                picture:respond.data[0].picture,
              })
               this.image=respond.data[0].picture;
      }
      }) 
}
  
  cancel(){
    this.router.navigate(['/acceuil']);
  }

  alertWithSuccess(){
    Swal.fire('Profile updated ')
  } 

  save(){ 
    this.profileService.Contact_update(this.id_user,this.form.value.mobile,this.form.value.firstname,this.form.value.email,this.form.value.address,this.form.value.picture).subscribe
    (respond=>{
     console.log(respond);
 
     
     if(respond.isFailed == false && respond.code === '201' && respond.data)
     {
         this.GetUserInfo();
         this.alertWithSuccess()
     } 
    })
  }

 alertwithnosucces(){
  Swal.fire("old password incorrect")
 }

 alertpasswordwithsucces(){
  Swal.fire("old password modified ")
 }

 savepwd(){
  this.profileService.password_update(this.id_user,this.form.value.old_pwd,this.form.value.newPassword).subscribe
  (respond=>{
   console.log(respond);
   
   if(respond.isFailed == false && respond.code === '201' && respond.data)
   { 
    this.alertpasswordwithsucces()
    window.location.reload();
   } 
  else {
    this.alertwithnosucces()
  }
  })
 }
}



  


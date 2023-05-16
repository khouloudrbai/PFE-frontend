import { Component, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AddadminService } from '../services/addadmin.service';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent {
  submitted=false;
  form!: FormGroup;
  LastName!:string;
  FirstName!:string;
  mobile!:string;
  Address!:string;
  Password!:string;
  entry_date!:string;
  picture!:string;
  pwd:any;
  v_pwd:any;
  id_user:any;
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
  email=new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),Validators.email])



constructor(private router:Router,private Addadmin:AddadminService,private formBuilder: FormBuilder){
  this.form = this.formBuilder.group(
    {
     
      email:this.email,
      FirstName: [ '',[Validators.required,]],
      LastName: [ '',[Validators.required,]],
      mobile: [ '',[Validators.required,]],
      address: [ '',[Validators.required,]],
      entry_date: [ '',[Validators.required,]],
      picture: [ '',[Validators.required,]],
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword,


    }, {
      validator: this.ConfirmedValidator('newPassword', 'confirmPassword'),
    }
  );
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


  onSubmit(): void {
    this.submitted = true;
 
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value)
    
    
    console.log(JSON.stringify(this.form.value, null, 2));
  }
  add(){
    this.Addadmin.Contact_add(this.id_user,this.form.value.LastName,this.form.value.FirstName,this.form.value.mobile,this.form.value.email,this.form.value.address,this.form.value.pwd,this.form.value.statuts,this.form.value.entry_date,this.form.value.picture).subscribe(
      respond=>{
     console.log(respond)
     console.log(respond.isFailed);
     console.log(respond.code);
     
     if(respond.isFailed == false && respond.code === '201' && respond.data)
     {
      this.router.navigate(['/listuser']);
      
     }
 }) 
  }
  
}



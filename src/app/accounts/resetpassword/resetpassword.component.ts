import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CodeService } from '../services/code.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  form!:FormGroup;
  mobile:any;
  
  constructor(private router:Router,private formbuilder:FormBuilder,public codeService:CodeService) {
    this.form = this.formbuilder.group(
      {
        
        mobile: [ '',[Validators.required,]],
        newpassword: [ '',[Validators.required,]],
        confirmnewpassword: [ '',[Validators.required,]],
      },{
        validator: this.ConfirmedValidator('newpassword', 'confirmnewpassword'),
      })}

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
   }

   passwordreseted(){
Swal.fire('password updated')   }
   resetpassword(){ 
    this.codeService.reset_pwd(this.form.value.newpassword,this.form.value.mobile).subscribe
    (respond=>{
     console.log(respond);
     if(respond.isFailed == false && respond.code === '201' && respond.data)
     {
      this.passwordreseted();
      this.router.navigate(['/login'])
     } 
    })
   }
} 
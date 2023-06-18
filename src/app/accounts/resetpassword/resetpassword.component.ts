import { Component} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from '../services/code.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent  {
  form!:FormGroup;
  mobile:any;
  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control';
  submitted=false;
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
    user_id : any
  constructor(private router:Router,private formbuilder:FormBuilder,public codeService:CodeService,public route : ActivatedRoute) {
    this.form = this.formbuilder.group(
      {
        
        mobile: [ '',[Validators.required,]],
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword,
      },{
        validator: this.ConfirmedValidator('newPassword', 'confirmPassword'),
      })}

      ngOnInit(){
        this.user_id = this.route.snapshot.params['id_user'];
        console.log('this.user_id  ' + this.user_id)


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

   passwordreseted(){
    Swal.fire('password updated','succes')   }

   resetpassword(){ 
    this.submitted=true;
    this.codeService.reset_pwd(this.form.value.newPassword,this.user_id).subscribe
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
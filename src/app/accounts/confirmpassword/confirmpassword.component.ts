import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CodeService } from '../services/code.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirmpassword',
  templateUrl: './confirmpassword.component.html',
  styleUrls: ['./confirmpassword.component.css']
})


export class ConfirmpasswordComponent implements OnInit {
  form!:FormGroup;
 
  constructor(private router:Router,private formbuilder:FormBuilder,public codeService:CodeService) {
    this.form = this.formbuilder.group(
      {
        mobile: [ '',[Validators.required,]],
        code: [ '',[Validators.required,]],

    })
  }

  ngOnInit(): void {
    let msisdn = sessionStorage.getItem('resetpwdmobile');

    this.form.setValue({
      mobile:msisdn,
      code:''
    })
   }

   correctcode(){
    Swal.fire('Thank you...', 'code is correct', 'success')
   }
   notcorrectcode(){
    Swal.fire('Opps', 'code incorrect', 'error')
   }
   usernotfound(){
    Swal.fire('Opps', 'User not found ', 'error')
   }
   confirmcode(){ 
    console.log('**********************')
    console.log(this.form.value)
    this.codeService.confirm_code(this.form.value.mobile,this.form.value.code).subscribe
    (respond=>{
     console.log(respond);
     if(respond.isFailed == false && respond.code === '201' && respond.data ) //msg user empty 
     {
      this.correctcode();
      this.router.navigate(['/resetpassword/'+ respond.data.id_user]);
     } 
     else if (respond.code==='500'&& respond.data.id_user ==0){
      this.usernotfound();

     }
     else {
      this.notcorrectcode()
     }
    })
   }
}
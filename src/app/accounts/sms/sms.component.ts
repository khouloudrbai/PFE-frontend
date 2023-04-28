import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SmsService } from '../services/sms.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SmsComponent implements OnInit{
  form!:FormGroup;
  constructor(private smsService:SmsService,private formBuilder:FormBuilder,private router:Router){this.form = this.formBuilder.group(
    {
     
      myMobile: ['', [ Validators.required,]],
      sender: ['', [ Validators.required,]],

      mySms: ['', [ Validators.required,]],
      myDate: ['', [ Validators.required,]],

    }
)}
ngOnInit(): void {}
  alertWithSuccess(){
    Swal.fire('Thank you...', 'SMS envoyé!', 'success')
    this.router.navigate(['./sms'])
  }
  send_sms(){
    this.smsService.Send_SMS(this.form.value.myMobile,this.form.value.mySms,this.form.value.sender).subscribe(respond => {
      console.log(respond);
      console.log(respond.statusCode);
      console.log(respond.success);

      if(respond.statusCode == '200' ){
       this.alertWithSuccess();
      } 
    })
  }
}
 
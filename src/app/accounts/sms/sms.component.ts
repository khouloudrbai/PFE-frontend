import { Component, OnInit, TemplateRef } from '@angular/core';
import Swal from 'sweetalert2';
import { SmsService } from '../services/sms.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SmsComponent implements OnInit{
  form!:FormGroup;
  items:any; 
  sender='TunSMS Test';
  constructor(private smsService:SmsService,private formBuilder:FormBuilder,private router:Router,public modalRef: BsModalRef,private modalService: BsModalService)
  {this.form = this.formBuilder.group(
    {
     
      myMobile: ['', [ Validators.required,]],
      sender: ['', [ Validators.required,]],

      mySms: ['', [ Validators.required,]],
      myDate: ['', [ Validators.required,]],

    }
)}
ngOnInit(): void {
 
  let msisdn = sessionStorage.getItem('listmobile');
  this.items=msisdn;
  console.log(this.items);
  console.log(msisdn)
   this.form.setValue({
    myMobile:msisdn,
    sender:'TunSMS Test',
    mySms:'',
    myDate:'',

  })

}
  alertWithSuccess(){
    Swal.fire('Thank you...', 'SMS sent!', 'success')
    this.router.navigate(['./sms'])
  }
  alertWithNoSuccess(){
    Swal.fire('Opps', 'Try Again!', 'error')
    this.router.navigate(['./sms'])
  }

  send_sms() { 
     sessionStorage.setItem('user',JSON.stringify(this.form.value.myDate));  
    if (this.form.value.myMobile !== "" && this.form.value.mySms !== "" ) {


          this.smsService.Send_SMS(this.form.value.myMobile, this.form.value.mySms, this.sender).subscribe(respond => {
            console.log(respond);
            console.log(respond.statusCode);
            console.log(respond.success);
  
            if (respond.statusCode == '200') {
              this.alertWithSuccess();
            } else {
              this.alertWithNoSuccess();
            }

          });
      }
      else{
        this.alertWithNoSuccess()
      }
    
  }
  


}
 
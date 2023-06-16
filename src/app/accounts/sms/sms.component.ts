import { Component, OnInit, TemplateRef } from '@angular/core';
import Swal from 'sweetalert2';
import { SmsService } from '../services/sms.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SmsComponent implements OnInit{
  form!:FormGroup;
  items:any; 
  sender='TunSMS Test';
  currentdate:any;
  date:any;
  constructor(private smsService:SmsService,private formBuilder:FormBuilder,private router:Router,public modalRef: BsModalRef,private modalService: BsModalService,public datepipe:DatePipe)
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
this.currentdate=new Date();
this.currentdate=this.datepipe.transform(this.currentdate, 'yyyy-MM-ddTHH:mm:ss')

console.log(this.currentdate)

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
    this.date = this.datepipe.transform(this.form.value.myDate, 'yyyy-MM-ddTHH:mm:ss');
    console.log(this.date);
    if (this.form.value.myMobile !== "" && this.form.value.mySms !== "") {
      if (this.date !== null && this.date !== this.currentdate) {
        this.smsService.sms_prog(this.form.value.myMobile, this.form.value.mySms, this.sender, this.date).subscribe(respond => {
          console.log(respond);
          console.log(respond.message);
    
          if (respond.success == true) {
            this.alertWithSuccess();
            this.router.navigate(['/acceuil']);
          } else {
            this.alertWithNoSuccess();
          }
        });
      } else {
        this.smsService.Send_SMS(this.form.value.myMobile, this.form.value.mySms, this.sender, this.date).subscribe(respond => {
          console.log(respond.message);
          console.log(respond.statusCode);
          console.log(respond.success);
          console.log(this.sender)
    
          if (respond.statusCode == '200') {
            this.alertWithSuccess();
          } else {
            this.alertWithNoSuccess();
          }
        });
      }
    }
      else {
      this.alertWithNoSuccess();
    }
  }
  
    
   
}

 
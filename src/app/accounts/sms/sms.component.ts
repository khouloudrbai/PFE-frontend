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
    sender:'',
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

    if (this.form.value.myMobile !== "" && this.form.value.mySms !== "" && this.form.value.sender !== "") {
      const selectedDateTime = new Date(this.form.value.myDate).getTime();
      const currentDateTime = new Date().getTime();
  
      if (selectedDateTime <= currentDateTime) {
        // Selected date is in the past, show error alert
        this.alertWithNoSuccess();
      } else {
        const timeDifference = selectedDateTime - currentDateTime;
  
        // Navigate to another page while counting down to the SMS sending
        this.router.navigate(['/acceuil']);
  
        setTimeout(() => {
          this.smsService.Send_SMS(this.form.value.myMobile, this.form.value.mySms, this.form.value.sender).subscribe(respond => {
            console.log(respond);
            console.log(respond.statusCode);
            console.log(respond.success);
  
            if (respond.statusCode == '200') {
              this.alertWithSuccess();
            } else {
              this.alertWithNoSuccess();
            }
  
            // Navigate back to the homepage after SMS sending is completed
            this.router.navigate(['/acceuil']);
          });
        }, timeDifference);
      }
    } else {
      this.alertWithNoSuccess();
    }
  }
  
  
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template); 
  } 
  close() {
    this.modalService.hide(); 
}

}
 
import { Component, OnInit } from '@angular/core';
import { SmsService } from '../services/sms.service';

@Component({
  selector: 'app-programmer',
  templateUrl: './programmer.component.html',
  styleUrls: ['./programmer.component.css']
})
export class ProgrammerComponent implements OnInit {
  sms: any = [];
  time:any;
  user='';
constructor(private smsService:SmsService){}



ngOnInit(): void {
  this.sms_prog();
}

  sms_prog(){ 
    this.smsService.sms_prog().subscribe
    (respond=>{
     console.log(respond);
     if(respond.isFailed == false && respond.code === '201' && respond.data)
     {
      let user=sessionStorage.getItem('user')
      console.log(user)
      
      this.sms = respond.data;

     } 
    })
   }


}

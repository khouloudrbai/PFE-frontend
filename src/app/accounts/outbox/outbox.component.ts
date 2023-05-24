import { Component ,} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { SmsService } from '../services/sms.service';

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styleUrls: ['./outbox.component.css']
})
export class OutboxComponent {
  sms:any=[];
  form!:any;
  submitted=false;
  pageSize: number = 3;
   currentPage: number = 1;
  
 
   constructor(private router:Router,private smsService:SmsService, private formBuilder:FormBuilder){
     this.form = this.formBuilder.group(
       {
        
         keyword: ['', [ Validators.required,]],
         entry_date: ['', [ Validators.required,]],
         end_date: ['', [ Validators.required,]],
 
         
       })
   }
   ngOnInit(): void {
     this.getsms()
   }
       
     onclick():void{
 
     }
     getsms(){ 
       this.smsService.get_sms().subscribe(respond => {
 
         if(respond.isFailed == false && respond.code === '201' && respond.data){
           this.sms = respond.data ;
     
           }
       
       } )
     }
     //pagination des pages 
   get totalPages(): number {
     return Math.ceil(this.sms.length / this.pageSize);
   }
 
   get paginatedItems(): any[] {
     const startIndex = (this.currentPage - 1) * this.pageSize;
     const endIndex = startIndex + this.pageSize;
     return this.sms.slice(startIndex, endIndex);
   }
 
   nextPage() {
     if (this.currentPage < this.totalPages) {
       this.currentPage++;
     }
   }
 
   prevPage() {
     if (this.currentPage > 1) {
       this.currentPage--;
     }
   }
}

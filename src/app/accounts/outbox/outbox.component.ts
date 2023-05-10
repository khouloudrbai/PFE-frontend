import { Component ,} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styleUrls: ['./outbox.component.css']
})
export class OutboxComponent {
  services:any=[];
  form!:any;
  submitted=false;
  pageSize: number = 3;
   currentPage: number = 1;
  
 
   constructor(private router:Router,private servicesService:ServicesService, private formBuilder:FormBuilder){
     this.form = this.formBuilder.group(
       {
        
         keyword: ['', [ Validators.required,]],
         entry_date: ['', [ Validators.required,]],
         end_date: ['', [ Validators.required,]],
 
         
       })
   }
   ngOnInit(): void {
     this.getservice()
   }
       
     onclick():void{
 
       this.servicesService.get_service(this.form.value.keyword,this.form.value.entry_date,this.form.value.end_date).subscribe(respond => {
       
       console.log(respond.data)
 
       if(respond.isFailed == false && respond.code === '201' && respond.data){
         this.services = respond.data ;
   
         }
 
       })
     }
     getservice(){ 
       this.servicesService.get_service_list().subscribe(respond => {
 
         if(respond.isFailed == false && respond.code === '201' && respond.data){
           this.services = respond.data ;
     
           }
       
       } )
     }
     //pagination des pages 
   get totalPages(): number {
     return Math.ceil(this.services.length / this.pageSize);
   }
 
   get paginatedItems(): any[] {
     const startIndex = (this.currentPage - 1) * this.pageSize;
     const endIndex = startIndex + this.pageSize;
     return this.services.slice(startIndex, endIndex);
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

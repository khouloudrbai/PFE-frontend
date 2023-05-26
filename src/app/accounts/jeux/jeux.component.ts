import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { FormBuilder,FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-jeux',
  templateUrl: './jeux.component.html',
  styleUrls: ['./jeux.component.css']
})
export class JeuxComponent {
   services:any=[];
   types:any=[];
   libelle_type_service:any;
   id_service:any;

 form!:any;
 submitted=false;
 pageSize: number = 10;
  currentPage: number = 1;
 

  constructor(private router:Router,private servicesService:ServicesService, private formBuilder:FormBuilder){
    this.form = this.formBuilder.group(
      {
       
        entry_date: ['', [ Validators.required,]],
        end_date: ['', [ Validators.required,]],
        libelle_type_service: ['', [ Validators.required,]],
        
      })
  }
  ngOnInit(): void {
    this.getservice();
    this.getTypeservice();
  }
      
    onclick():void{

      this.servicesService.get_service(this.form.value.libelle_type_service,this.form.value.entry_date,this.form.value.end_date).subscribe(respond => {
      
      console.log(respond.data)

      if(respond.isFailed == false && respond.code === '201' && respond.data){
        console.log(respond.data)
        this.services = respond.data ;
        for (let i = 0; i < this.services.length; i++) {
          this.services[i].number = 0; // Add a new column with an empty value
          this.servicesService.get_number_players(this.services[i].id_service).subscribe(respond => {
            if(respond.isFailed == false && respond.code === '201' && respond.data){
                this.services[i].number=respond.data
            }
          
          })
        }
  
        }

      })
    }
    getservice(){ 
      this.servicesService.get_service_list().subscribe(respond => {

        if(respond.isFailed == false && respond.code === '201' && respond.data){
          this.services = respond.data ;
          for (let i = 0; i < this.services.length; i++) {
            this.services[i].number = 0; // Add a new column with an empty value
            this.servicesService.get_number_players(this.services[i].id_service).subscribe(respond => {
              if(respond.isFailed == false && respond.code === '201' && respond.data){
                  this.services[i].number=respond.data
              }
            
            })
          }
          console.log('test',this.services)

         
      } })
    
   


    }
    getTypeservice(){ 
      console.log('testtype')
      this.servicesService.get_type_service().subscribe(respond => {
      console.log('testtype',respond.data);
      console.log(respond.isFailed);
      console.log(respond.code);
      if(respond.isFailed == false && respond.code === '201' && respond.data){
        this.types = respond.data ;
      } 
    }
      )}
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

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { FormBuilder, Validators } from '@angular/forms';
import { StatistiqueService } from '../services/statistique.service';
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
 

  constructor(private router:Router,private servicesService:ServicesService, private formBuilder:FormBuilder,public statistiqueService:StatistiqueService){
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
      

  numberplayers(){
    
    let dataservice : any[]=[];
   
    this.statistiqueService.Get_joueur_perservice().subscribe(respond => { 

     if(respond && respond.data && respond.data.length  >0 )
     {
       respond.data.forEach((element:any) => {
       dataservice.push(element.v_number)

        
       });
    }
     })
     return dataservice
  }
  
  onclick():void{
    let number=this.numberplayers()

      this.servicesService.get_service(this.form.value.libelle_type_service,this.form.value.entry_date,this.form.value.end_date).subscribe(respond => {
      if(respond.isFailed == false && respond.code === '201' && respond.data){

        this.services = respond.data ;
        for (let i = 0; i < this.services.length; i++) {
          this.services[i].number=number[i];  
        }
        }

      })
  }



    getservice(){ 

     let number=this.numberplayers()
      this.servicesService.get_service_list().subscribe(respond => {

        if(respond.isFailed == false && respond.code === '201' && respond.data){
          this.services = respond.data ;
          for (let i = 0; i < this.services.length; i++) {
              this.services[i].number=number[i];  
          }
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

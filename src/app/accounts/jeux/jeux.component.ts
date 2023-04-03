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
 form!:any;
 submitted=false;
 

  constructor(private router:Router,private servicesService:ServicesService, private formBuilder:FormBuilder){
    this.form = this.formBuilder.group(
      {
       
        id_service: ['', [Validators.required, ]],
        shortcode: ['', [ Validators.required,]],
        
      })
  }
  ngOnInit(): void {
    this.getservice();
    this.onclick();
  }
      
      onclick():void{
        this.submitted = true;

        console.log(this.form.value)
    
        this.servicesService.get_service(this.form.value.shortcode,this.form.value.id_service).subscribe(respond => {
        console.log(respond);
        console.log(respond.isFailed);
        console.log(respond.code);
        if(respond.isFailed == false && respond.code === '201' && respond.data){
          this.services = respond.data ;
          
    
        }
      }
        )
      }

      getservice(){ 
        this.servicesService.get_service_list().subscribe(respond => {
        this.services = respond.data ;
        console.log(respond);
        console.log(respond.isFailed);
        console.log(respond.code);
      }
        )}
}

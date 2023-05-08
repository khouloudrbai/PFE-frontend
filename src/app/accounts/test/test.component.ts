import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  player_count:any;
  service_count:any;
  services: any = [];
  constructor(public dashboardService:DashboardService){
}

ngOnInit(): void {
  this.get_top10();
  this.get_number_players();
    this.get_number_services();
}
  get_number_players(){
   this.dashboardService.get_number_players().subscribe(respond=>{
    console.log(respond)
    console.log(respond.data)
    if(respond.isFailed == false && respond.code === '201' && respond.data)
     { 
      this.player_count = respond.data;

     }
   })
  }
  get_number_services(){
    this.dashboardService.get_number_services().subscribe(respond=>{
     console.log(respond)
     console.log(respond.data)
     if(respond.isFailed == false && respond.code === '201' && respond.data)
      { 
        this.service_count = respond.data;

      }
    })
   }
   get_top10(){
    this.dashboardService.get_top10().subscribe(respond=>{
     console.log(respond)
     console.log(respond.data)
     if(respond.isFailed == false && respond.code === '201' && respond.data)
      { 
        this.services = respond.data;

      }
    })
   }
}
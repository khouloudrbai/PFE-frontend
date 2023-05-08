import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {
  player_count:any;
  service_count:any;
  player_count_ajr:any;
  services: any = [];
  players: any = [];
  index=1;


  constructor(public dashboardService:DashboardService){}

ngOnInit(): void {
    this.get_number_players();
    this.get_number_services();
    this.get_number_players_ajr();
    this.get_top10();
    this.get_top10_players();
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

   get_number_players_ajr(){
    this.dashboardService.get_number_players_ajr().subscribe(respond=>{
     console.log(respond)
     console.log(respond.data)
     if(respond.isFailed == false && respond.code === '201' && respond.data)
      { 
       this.player_count_ajr = respond.data;
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

   get_top10_players(){
    this.dashboardService.get_top10_players().subscribe(respond=>{
     console.log(respond)
     console.log(respond.data)
     if(respond.isFailed == false && respond.code === '201' && respond.data)
      { 
        this.players = respond.data;

      }
    })
   }
}


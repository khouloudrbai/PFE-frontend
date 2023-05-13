import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Chart } from 'chart.js';
import { DashboardService } from '../services/dashboard.service';
import { StatistiqueService } from '../services/statistique.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
 
  player_count:any = 0;
  service_count:any = 0;
  player_count_ajr:any =0;
  services: any = [];
  players: any = [];
  chart: any;
  chartline:any;
  label: string[] = [];
  num: any[] = [];
  index=1;
  constructor(public dashboardService:DashboardService,public statistiqueService:StatistiqueService){}

  currentDate: Date = new Date();

  
   ngOnInit(): void {
    this.get_number_players();
    this.get_number_services();
    this.get_number_players_ajr();
    this.createChart();
    this.createChartline();
   this.createChartline2();
   this.get_service_statistics();
   
    
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
   
 
 

 
 
   createChart(){
 
     this.statistiqueService.Get_joueur_perservice().subscribe(response => { 
   console.log(response.data); 
   this.label = response.data.map((game: { libelle: string }) => game.libelle); 
   this.num = response.data.map((game: { number_gamers : string }) => game.number_gamers); 
   console.log(this.num);
   console.log(this.label);
 
   
   this.chart = new Chart("MyChart", {
     type: 'pie', 
 
     data: {
       labels: this.label,
        datasets: [{
         label: 'Number gamers of service ',
         data: this.num,
         backgroundColor: [
           "rgba(255, 0, 0, 0.5)",
           "rgba(100, 255, 0, 0.5)",
             "rgba(200, 50, 255, 0.5)",
             "rgba(0, 100, 255, 0.5)"
         ],
         hoverOffset: 4
 }],
     },
 
     options: {
       aspectRatio:2.5
     }
   });
   })
  }

 //chartline 1
 createChartline(){
  
  this.chartline = new Chart("MyChartt", {
    type: 'line', //this denotes tha type of chart
    data: {// values on X-Axis
      labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
               '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
       datasets: [
        {
          label: "SMS",
          data: ['467','576', '572', '79', '92',
               '574', '573', '576'],
               backgroundColor:"rgba(0,0,255,1.0)",
               borderColor: "rgba(0,0,255,0.1)",
                }
      ]
    },
    options: {
      aspectRatio:2.5,
      
    }
    
  });
 }
 //chartline 2
 createChartline2(){
  
   this.chartline = new Chart("MyCharttt", {
     type: 'bar', //this denotes tha type of chart
  
     data: {// values on X-Axis
       labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
                '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
        datasets: [
         {
           label: "Players",
           data: ['467','576', '572', '79', '92',
                '574', '573', '576'],
           backgroundColor: 'red'
         }
       ]
     },
     options: {
       aspectRatio:2.5
     }
     
   });
  }
 
 
 
  get_service_statistics(){
   this.statistiqueService.get_service_statistics().subscribe(respond=>{
    console.log(respond)
    console.log(respond.data)
    if(respond.isFailed == false && respond.code === '201' && respond.data)
     { 
       this.services = respond.data;
 
     }
   })
  }
  
   
 
}

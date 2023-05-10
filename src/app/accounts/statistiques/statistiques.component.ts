import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { StatistiqueService } from '../services/statistique.service';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit{
   
  chart: any;
  chartline:any;
  label: string[] = [];
  num: any[] = [];
  services: any = [];
  index=1;


constructor(public statistiqueService:StatistiqueService){}


  createChart(){

    this.statistiqueService.Get_joueur_perservice().subscribe(response => { 
  console.log(response.data); 
  this.label = response.data.map((game: { libelle: string }) => game.libelle); 
  this.num = response.data.map((game: { number_gamers : string }) => game.number_gamers); 
  console.log(this.num);
  console.log(this.label);

  
  this.chart = new Chart("MyChart", {
    type: 'pie', //this denotes tha type of chart

    data: {// values on X-Axis
      labels: this.label,
       datasets: [{
  label: 'Number gamers of service ',
  data: this.num,
  backgroundColor: [
    'red',
    'pink',
    'green',
          
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
ngOnInit(): void {
 this.createChart();
 this.createChartline();
this.createChartline2();
this.get_service_statistics();
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
         backgroundColor: 'blue'
       }
     ]
   },
   options: {
     aspectRatio:2.5
   }
   
 });
}
//chartline 2
createChartline2(){
 
  this.chartline = new Chart("MyCharttt", {
    type: 'line', //this denotes tha type of chart
 
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
  





  
  
  
  
 

  


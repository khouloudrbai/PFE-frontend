import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Chart } from 'chart.js/auto';
import { StatistiqueService } from '../services/statistique.service';
import { DatePipe } from '@angular/common';
 
@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {
 
  
  player_count:any = 0;
  service_count:any = 0;
  player_count_ajr:any =0;
  services: any = [];
  players: any = [];
  chart: any;
  chartline:any;
  label: string[] = [];
  labeljr: any=[];
  nbser: any[] = [];
  num: any[] = [];

  numjr: any[] = [];
  numsms: any;
  index=1;
  endDate:any;
  p_begin_date:any;
  p_end_date:any;

  constructor(public dashboardService:DashboardService,public statistiqueService:StatistiqueService,private datePipe: DatePipe){}

  currentDate: Date = new Date();

  
   ngOnInit(): void {
    this.p_begin_date ='2023-01-01 00:00:00';
    this.p_end_date ='2023-06-01 00:00:00';
    this.get_number_players();
    this.get_number_services();
    this.get_number_players_ajr();
    this.getJoueurStat();
    this.getSmsStat()
    this.JoueurpieChart()
  }

 
  
  get_number_players(){
   this.dashboardService.get_number_players().subscribe(respond=>{
    if(respond.isFailed == false && respond.code === '201' && respond.data)
     { 
      this.player_count = respond.data;
     }
   })
  }

  get_number_services(){
    this.dashboardService.get_number_services().subscribe(respond=>{

     if(respond.isFailed == false && respond.code === '201' && respond.data)
      { 
        this.service_count = respond.data;

      }
    })
  }

  get_number_players_ajr(){
    this.dashboardService.get_number_players_ajr().subscribe(respond=>{
     if(respond.isFailed == false && respond.code === '201' && respond.data)
      { 
       this.player_count_ajr = respond.data;
      }
    })
  }

 
CreateChartJoueurs(labels:any,data:any)
{
  this.chartline = new Chart("playersChart", {
    type: 'line', 
    data: {
      labels: labels, 
       datasets: [
        {
          type: 'line', 
          label: "players",
          data:data,
          fill:true,
          borderColor : 'rgb(54,162,235)',
            backgroundColor:"#ABDCFF",
        }
      ]
    },


  });
}

getJoueurStat(){
  let labels : any[]=[];
  let data : any[]=[];
    this.statistiqueService.Get_joueur_perdate(this.p_begin_date,this.p_end_date).subscribe(respond => { 
      console.log('********************************************')
       console.log(respond.data);
       if(respond && respond.data && respond.data.length  >0 )
       {
        respond.data.forEach((element:any) => {
          labels.push(this.datePipe.transform(element.entry_date , 'yyyy-MM-dd'))
          data.push(element.nbr_joueur)
          
         });
         console.log(labels);
         console.log(data)
         this.CreateChartJoueurs(labels,data);
      }
      
    else 
    {
      labels = [];
      data = [];
    }
       })
          
 
 }



 CreateChartSMS(labelssms:any,datasms:any)
 {
   this.chartline = new Chart("SMSChart", {
     data: {
       labels: labelssms, 
        datasets: [
         {
          type: 'bar', 
          label: "SMS",
           data:datasms,
           borderColor : 'rgb(54,162,235)',
             backgroundColor:"#EE9AE5",
         }
       ]
     },
 
 
   });
 }
 getSmsStat(){
  let labelssms : any[]=[];
  let datasms : any[]=[];
    this.statistiqueService.Get_sm_perdate(this.p_begin_date,this.p_end_date).subscribe(respond => { 
      console.log('********************************************')
       console.log(respond.data);
       if(respond && respond.data && respond.data.length  >0 )
       {
        respond.data.forEach((element:any) => {
          labelssms.push(this.datePipe.transform(element.entry_date , 'yyyy-MM-dd'))
          datasms.push(element.nbr_sms)
          
         });
         console.log(labelssms);
         console.log(datasms)
         this.CreateChartSMS(labelssms,datasms);
      }
      
    else 
    {
      labelssms = [];
      datasms = [];
    }
       })
          
 
 }


 CreateChartJoueurParService(labelservice:any,dataservice:any)
 {
   this.chartline = new Chart("JoueurPerServiceChart", {
     data: {
       labels: labelservice, 
        datasets: [
         {
          type: 'pie', 
          label: "Joueur Par Service",
           data:dataservice,
           backgroundColor: [
            "rgba(255, 0, 0, 0.5)",
            "rgba(100, 255, 0, 0.5)",
              "rgba(200, 50, 255, 0.5)",
              "rgba(0, 100, 255, 0.5)",
              "#FFD3A5",
              "#ABDCFF"
          ],
          hoverOffset: 4
         }
       ]
     },
 
 
   });
 }

 JoueurpieChart(){
   
    let labelservice : any[]=[];
    let dataservice : any[]=[];
   
       this.statistiqueService.Get_joueur_perservice().subscribe(respond => { 
       
        console.log('********************************************')
        console.log(respond.data);
        if(respond && respond.data && respond.data.length  >0 )
        {
         respond.data.forEach((element:any) => {
          labelservice.push(element.libelle)
          dataservice.push(element.v_number)

           
          });
          console.log(labelservice);
          console.log(dataservice)
          this.CreateChartJoueurParService(labelservice,dataservice);
       }
       
     else 
     {
      labelservice = [];
      dataservice = [];
     }

  })
     
 
      
}
 
 
 
 
  
  
   

 
}


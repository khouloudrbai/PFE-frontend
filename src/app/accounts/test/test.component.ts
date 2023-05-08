import { Component, OnInit, TemplateRef } from '@angular/core';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent  implements OnInit{
   
   chart: any;
   chartline:any;
   createChart(){

    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Red', 'Pink','Green','Yellow','Orange','Blue', ],
	       datasets: [{
    label: 'My First Dataset',
    data: [300, 240, 100, 432, 253, 34],
    backgroundColor: [
      'red',
      'pink',
      'green',
			'yellow',
      'orange',
      'blue',			
    ],
    hoverOffset: 4
  }],
      },
      options: {
        aspectRatio:2.5
      }

    });
  }
ngOnInit(): void {
  this.createChart();
  this.createChartline();
}
//chartline 
createChartline(){
  
  this.chartline = new Chart("MyChartt", {
    type: 'line', //this denotes tha type of chart

    data: {// values on X-Axis
      labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
               '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
       datasets: [
        {
          label: "Sales",
          data: ['467','576', '572', '79', '92',
               '574', '573', '576'],
          backgroundColor: 'blue'
        },
        {
          label: "Profit",
          data: ['542', '542', '536', '327', '17',
                 '0.00', '538', '541'],
          backgroundColor: 'limegreen'
        }  
      ]
    },
    options: {
      aspectRatio:2.5
    }
    
  });
}



}
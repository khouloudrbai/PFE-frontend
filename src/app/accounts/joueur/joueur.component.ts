import { Component,OnInit,VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../services/playerservice';
import { ServicesService } from '../services/services.service';
import { FormGroup ,FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-joueur',
  templateUrl: './joueur.component.html',
  styleUrls: ['./joueur.component.css']
})
export class JoueurComponent implements OnInit {
  form!:FormGroup;
  submitted = false;
   services:any=[];
  players:any=[];
  types:any=[];
  service_libelle:any;
  libelle_type_service:any;
  entry_date:any;
  date_end:any;
  pageSize: number = 10;
  currentPage: number = 1;
  masterSelected=false;
  playerList:any;
  isSelected=false;
  mobileList:any;

constructor(private router:Router,private playerservice:PlayerService,private formBuilder:FormBuilder,public servicesService:ServicesService){
  this.form = this.formBuilder.group(
    {
      
      service_libelle: ['', [ Validators.required,]],
      libelle_type_service:['', [ Validators.required,]],
      entry_date: ['', [ Validators.required,]],
      date_end: ['', [ Validators.required,]],

    }

)
this.getCheckedItemList();
}

ngOnInit(): void {
  this.getTypeservice();
  this.getservice();
  this.get_player();
}

isAllSelected() {
  this.masterSelected = this.players.every((group: any) => {
    return group.isSelected == true;
  }
  );
  this.getCheckedItemList();
  console.log('test selection',this.masterSelected) 
}

getCheckedItemList() {
  this.playerList = this.players.filter((item: any) => item.isSelected);
  console.log(this.playerList)
  for (const player of this.playerList) {
    this.mobileList = this.playerList.map((player: any) => player.mobile);
  }   
 console.log(this.mobileList)

}

checkUncheckAll() {
  for (var i = 0; i < this.players.length; i++) {
    this.players[i].isSelected = this.masterSelected;

  }

  this.getCheckedItemList();
}
  


onclick():void{ 
  this.submitted = true;
  console.log(this.form.value)
  this.playerservice.get_player(this.form.value.service_libelle,this.form.value.libelle_type_service,this.form.value.entry_date,this.form.value.date_end).subscribe(respond => {
  console.log(respond);
  console.log(respond.isFailed);
  console.log(respond.code);
  if(respond.isFailed == false && respond.code === '201' && respond.data){
    this.players = respond.data ;
  } 
})
}
  

getservice(){ 
  console.log('test')
  this.servicesService.get_service_list().subscribe(respond => {
  console.log(respond.data);
  if(respond.isFailed == false && respond.code === '201' && respond.data){
  this.services = respond.data ;
  } 
  })
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
})
}

get_player(){
      this.playerservice.get_list_player().subscribe(respond => {
        console.log(respond);
        console.log(respond.isFailed);
        console.log(respond.code);
        if(respond.isFailed == false && respond.code === '201' && respond.data){
          this.players = respond.data ;
        }
      })
}

//send to sms
send(){
this.router.navigate(['/sms'])
console.log(this.mobileList)
sessionStorage.setItem('listmobile',this.mobileList)

}


  //pagination des pages 
get totalPages(): number {
 return Math.ceil(this.players.length / this.pageSize);
}

get paginatedItems(): any[] {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  return this.players.slice(startIndex, endIndex);
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

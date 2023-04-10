import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit{
  users: any=[];
  user:any;
  constructor(private userService: UserService ,private router:Router) {
  }
  ngOnInit() {
    this.getuser();
 }
  getuser(){ 
    this.userService.get_user().subscribe(respond => {
    this.users = respond.data ;

    console.log(respond);
    console.log(respond.isFailed);
    console.log(respond.code);
    if(respond.isFailed == false && respond.code === '201' && respond.data){

  }}
    )}

  deleteItem(id_user:any) {
    console.log(id_user)
      this.userService.delete_user(id_user).subscribe(respond => {
        console.log(respond);
        this.ngOnInit();
      });
  }
  
  consulter():void{
      this.userService.get_user().subscribe(respond => {
        if(respond.isFailed == false && respond.code === '201' && respond.data){
      this.router.navigate(['./consulteruser'])}
    })
  }
  modifier(id_user:any){
    console.log(id_user)
    this.userService.get_one_user(id_user).subscribe(respond => {
      console.log(respond);
      sessionStorage.setItem('id',JSON.stringify(respond.data));
    });
    
    this.router.navigate(['./userprofile'])
  }
}

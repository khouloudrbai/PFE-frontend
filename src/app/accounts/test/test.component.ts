import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PlayerService } from '../services/playerservice';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent   {


  constructor(private fb: FormBuilder,private router:Router) {}
  
onclick():void{
  this.router.navigate(['./profile']);
  }
  logout():void{
    localStorage.removeItem('currentUser');
    this.router.navigate(['./login'])
  }

}


  

 


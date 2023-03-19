import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AddadminService } from '../services/addadmin.service';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent {
  submitted=false;
  form!: FormGroup;
  email!: string;
  LastName!:string;
  FirstName!:string;
  mobile!:string;
  Address!:string;
  Password!:string;
  entry_date!:string;
  picture!:string;



constructor(private router:Router,private Addadmin:AddadminService,private formBuilder: FormBuilder){
  this.form = this.formBuilder.group(
    {
     
      email: ['', [Validators.required, Validators.email]],
      pwd: [ '',[Validators.required,]],
      FirstName: [ '',[Validators.required,]],
      LastName: [ '',[Validators.required,]],
      mobile: [ '',[Validators.required,]],
      address: [ '',[Validators.required,]],
      entry_date: [ '',[Validators.required,]],
      picture: [ '',[Validators.required,]],


    }
  );
}




  onSubmit(): void {
    this.submitted = true;
 
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value)
    this.Addadmin.Contact_add(this.form.value.LastName,this.form.value.FirstName,this.form.value.mobile,this.form.value.email,this.form.value.address,this.form.value.pwd,this.form.value.statuts,this.form.value.entry_date,this.form.value.picture).subscribe(
      respond=>{
     console.log(respond)
     console.log(respond.isFailed);
     console.log(respond.code);
     
     if(respond.isFailed == false && respond.code === '201' && respond.data)
     {
      this.router.navigate(['/listuser']);
      
     }
 })   
    
    console.log(JSON.stringify(this.form.value, null, 2));
  }
  alertWithSuccess(){
    Swal.fire('Thank you...', 'You added a user  succesfully!', 'success')
  }
}



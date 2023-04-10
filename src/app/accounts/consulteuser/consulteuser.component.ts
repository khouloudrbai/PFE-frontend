import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,FormBuilder, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-consulteuser',
  templateUrl: './consulteuser.component.html',
  styleUrls: ['./consulteuser.component.css']
})
export class ConsulteuserComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  mobile!:string;
  email!:string;
  address!:string;
  pwd!:string;
  id_user:any;
 firstname!:any;
 picture!:any;

  constructor(private router:Router,private formBuilder:FormBuilder){
    this.form = this.formBuilder.group(
      {
       
        email: ['', [Validators.required, Validators.email]],
        pwd: [ '',[Validators.required,]],
        mobile: [ '',[Validators.required,]],
        address: [ '',[Validators.required,]],
        firstname:['',[Validators.required],],
        picture:['',[Validators.required],]

      })
  }
  ngOnInit(): void {
    this.onSubmit();

    let id = sessionStorage.getItem('id');
    console.log(id);
    if(id )
    {
      this.form.patchValue({
        email: JSON.parse(id).mail ,
        mobile:JSON.parse(id).mobile,
        address:JSON.parse(id).address,
        firstname:JSON.parse(id).firstname,
        picture:JSON.parse(id).firstname,


      })
      
      this.id_user = JSON.parse(id).id_user ;
    }
   
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.form.value)

    if (this.form.invalid) {
      return;
    }
  }
  
onreturn():void{
  this.router.navigate(['./listuser'])
}
}

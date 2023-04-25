import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ProfileService } from '../services/profile.service';
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
user_id:any;

  constructor(private modalService: BsModalService,private router:Router,public profileService:ProfileService,
    private formbuilder:FormBuilder,public route : ActivatedRoute, public userService : UserService) {
    this.form = this.formbuilder.group(
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
    this.user_id = this.route.snapshot.params['id_user'];
  
    console.log('this.user_id  ' + this.user_id)
    this.getuser();
  
    }
  
    getuser(){ 
  
      this.userService.get_user(this.user_id.toString()).subscribe(respond => {
  
      console.log(respond); 
  
      if(respond.isFailed == false && respond.code === '201' && respond.data)
        {
  
          this.form.patchValue({
             email: respond.data[0].mail ,
            mobile:respond.data[0].mobile,
            address:respond.data[0].address,
            firstname:respond.data[0].firstname,
            picture:respond.data[0].picture,
          })
    
        
      }}
      )}
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

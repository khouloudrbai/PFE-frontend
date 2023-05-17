import { Component, OnInit } from '@angular/core';
import { CodeService } from '../services/code.service';
import { FormBuilder ,FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-motdepasse',
  templateUrl: './motdepasse.component.html',
  styleUrls: ['./motdepasse.component.css']
})
export class MotdepasseComponent implements OnInit {
  form!:FormGroup;
  mobile!:string;
 
  constructor(private router:Router,private formbuilder:FormBuilder,public codeService:CodeService) {
    this.form = this.formbuilder.group(
      {
        mobile: [ '',[Validators.required,]],
    })
  }



  ngOnInit(): void {
   }
   alertcodesent(){
    Swal.fire('code is sent to your number')
   }
   sendcode(){  
    this.codeService.add_code(this.form.value.mobile).subscribe
    (respond=>{
     console.log(respond);
     if(respond.isFailed == false && respond.code === '201' && respond.data)
     {
      this.alertcodesent();
      sessionStorage.setItem('resetpwdmobile',respond.data.mobile)
      this.router.navigate(['/confirmpassword'])
     } 
    })
   }
}
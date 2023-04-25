import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ProfileService } from '../services/profile.service';
import { ServicesService } from '../services/services.service';
import { PlayerService } from '../services/playerservice';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  mobile!:string;
  email!:string;
  address!:string;
  num_sms:any;
  id_player:any;
  entry_date:any;
 firstname!:any;
 lastname!:any;
player_id:any;

  constructor(private modalService: BsModalService,private router:Router,public profileService:ProfileService,
    private formbuilder:FormBuilder,public route : ActivatedRoute, public serviceService : ServicesService,public playerService:PlayerService) {
    this.form = this.formbuilder.group(
      {
        id_player: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        lastname: [ '',[Validators.required,]],
        mobile: [ '',[Validators.required,]],
        address: [ '',[Validators.required,]],
        firstname:['',[Validators.required],],
        num_sms:['',[Validators.required],],
        entry_date:['',[Validators.required],]


      })
  }

  ngOnInit(): void {
    this.player_id = this.route.snapshot.params['id_player'];
  
    console.log('this.player_id  ' + this.player_id)
    this.getuser();
  
    }
  
    getuser(){ 
  
      this.playerService.get_joueur(this.player_id.toString()).subscribe(respond => {
  
      console.log(respond);
  
      if(respond.isFailed == false && respond.code === '201' && respond.data)
        {
  
          this.form.patchValue({
            id_player:respond.data[0].id_player,
            email: respond.data[0].mail ,
            mobile:respond.data[0].mobile,
            address:respond.data[0].address,
            firstname:respond.data[0].firstname,
            lastname:respond.data[0].lastname,
            entry_date:respond.data[0].entry_date,
            num_sms:respond.data[0].num_sms,

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
  this.router.navigate(['./table'])
}

}

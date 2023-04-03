import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PlayerService } from '../services/playerservice';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit  {
  form!: FormGroup;

  members = [
    {
      dataLimit: 'Package 1: Voice',
      value: 0,
      uom: 'Minutes',
    },
    {
      dataLimit: 'Package 2: SMS',
      value: 0,
      uom: 'Units',
    },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const myFields = this.buildFormFieldsFormGroup();
    console.log('myFields: ', myFields);

    this.form = myFields;
  }

  private buildFormFieldsFormGroup(): FormGroup {
    const membersLength = this.members.length;
    let response: FormGroup = this.fb.group({ dummy: ['', []] });

    for (let i = 0; i < membersLength; i++) {
      response.addControl(`field${i}`, new FormControl());
    }
    console.log('response: ', response);

    return response;
  }
}


  

 


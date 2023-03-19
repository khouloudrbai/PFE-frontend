import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulteuserComponent } from './consulteuser.component';

describe('ConsulteuserComponent', () => {
  let component: ConsulteuserComponent;
  let fixture: ComponentFixture<ConsulteuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulteuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulteuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

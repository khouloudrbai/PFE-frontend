import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiermotdepasseComponent } from './modifiermotdepasse.component';

describe('ModifiermotdepasseComponent', () => {
  let component: ModifiermotdepasseComponent;
  let fixture: ComponentFixture<ModifiermotdepasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifiermotdepasseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifiermotdepasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComputersComponent } from './new-computers.component';

describe('NewComputersComponent', () => {
  let component: NewComputersComponent;
  let fixture: ComponentFixture<NewComputersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewComputersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewComputersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

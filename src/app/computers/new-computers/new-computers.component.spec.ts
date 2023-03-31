import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComputersComponent } from './new-computers.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ComputerService } from 'src/app/services/computer.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NewComputersComponent', () => {
  let component: NewComputersComponent;
  let fixture: ComponentFixture<NewComputersComponent>;

  let computerSvcSpy = jasmine.createSpyObj<ComputerService>(
    'ComputerService',
    ['saveComputer']
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewComputersComponent],
      imports: [
        RouterTestingModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [{ provide: ComputerService, useValue: computerSvcSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(NewComputersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

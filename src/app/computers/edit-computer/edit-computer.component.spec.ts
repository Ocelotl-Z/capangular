import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComputerComponent } from './edit-computer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComputerService } from 'src/app/services/computer.service';
import { ActivatedRoute } from '@angular/router';
import { NEVER } from 'rxjs';

describe('EditComputerComponent', () => {
  let component: EditComputerComponent;
  let fixture: ComponentFixture<EditComputerComponent>;

  let computerSvcSpy = jasmine.createSpyObj<ComputerService>(
    'ComputerService',
    ['getByID', 'patchComputer']
  );

  let activeRouteSpy = jasmine.createSpyObj<ActivatedRoute>('ActivatedRoute', [
    'params',
  ]);

  activeRouteSpy.params = NEVER;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditComputerComponent],
      imports: [
        RouterTestingModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: ComputerService, useValue: computerSvcSpy },
        { provide: ActivatedRoute, useValue: activeRouteSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

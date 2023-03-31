import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComputersComponent } from './new-computers.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ComputerService } from 'src/app/services/computer.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NEVER, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('NewComputersComponent', () => {
  let component: NewComputersComponent;
  let fixture: ComponentFixture<NewComputersComponent>;

  let computerSvcSpy = jasmine.createSpyObj<ComputerService>(
    'ComputerService',
    ['saveComputer']
  );

  let routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewComputersComponent],
      imports: [
        RouterTestingModule.withRoutes([{ path: 'computers', redirectTo: '' }]),
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: ComputerService, useValue: computerSvcSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewComputersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.formComputer).toBeTruthy();
  });

  it('should create Computer', () => {
    const mockResponse = {
      token: 'HolaSoyUnToken',
    };
    computerSvcSpy.saveComputer.and.returnValue(of([]));

    component.formComputer?.patchValue({
      brand: 'ASUS',
      model: 'ROG',
    });

    component.createComputer();

    expect(component.isLoading).toBeTrue();
    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['/computers']);
  });

  it('should create Computer error', () => {
    computerSvcSpy.saveComputer.and.returnValue(
      throwError(() => 'error al guardar')
    );

    expect(component.createComputer()).toThrowError;
  });
});

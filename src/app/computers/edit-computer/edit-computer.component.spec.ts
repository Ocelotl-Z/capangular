import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComputerComponent } from './edit-computer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComputerService } from 'src/app/services/computer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NEVER, of, throwError } from 'rxjs';
import { Computer } from 'src/app/model/computer.model';
import { MatIconModule } from '@angular/material/icon';

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

  let routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

  activeRouteSpy.params = NEVER;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditComputerComponent],
      imports: [
        RouterTestingModule.withRoutes([{ path: 'computers', redirectTo: '' }]),
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatIconModule,
      ],
      providers: [
        { provide: ComputerService, useValue: computerSvcSpy },
        { provide: ActivatedRoute, useValue: activeRouteSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    activeRouteSpy.params = of({ id: 1 });

    const fixture = TestBed.createComponent(EditComputerComponent);
    const app = fixture.componentInstance;

    const computer: Computer = { id: 1, brand: 'Asus', model: 'A7' };

    computerSvcSpy.getByID.and.returnValue(of(computer));

    app.loadData(computer);

    expect(app.computer).toBe(computer);
    expect(app.formComputer).toBeTruthy();
  });

  it('should dont load data', () => {
    activeRouteSpy.params = NEVER;

    const fixture2 = TestBed.createComponent(EditComputerComponent);
    const app2 = fixture2.componentInstance;

    computerSvcSpy.getByID.and.returnValue(
      throwError(() => 'computer nor found')
    );

    expect(app2.computer).toBeFalsy();
    expect(app2.formComputer).toBeFalsy();
  });

  it('should update computer', () => {
    computerSvcSpy.patchComputer.and.returnValue(of([]));
    component.updateComputer();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/computers']);
  });

  it('should dont update', () => {
    computerSvcSpy.patchComputer.and.returnValue(
      throwError(() => 'error al hacer update')
    );
    component.updateComputer();
    expect(component.updateComputer()).toThrowError;
  });
});

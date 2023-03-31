import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputersComponent } from './computers.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ComputerService } from '../services/computer.service';
import { of, throwError } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { Computer } from '../model/computer.model';

describe('ComputersComponent', () => {
  let component: ComputersComponent;
  let fixture: ComponentFixture<ComputersComponent>;

  let computerSvcSpy: jasmine.SpyObj<ComputerService>;

  beforeEach(async () => {
    computerSvcSpy = jasmine.createSpyObj<ComputerService>('ComputerService', [
      'deleteComputer',
      'getComputers',
    ]);

    computerSvcSpy.getComputers.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [ComputersComponent],
      imports: [
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        RouterTestingModule,
      ],
      providers: [{ provide: ComputerService, useValue: computerSvcSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ComputersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ComputersComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should load Data`, () => {
    const mockResponse: Computer[] = [
      { brand: 'Asus', model: 'A7' },
      { brand: 'Razer', model: 'Blade' },
    ];

    computerSvcSpy.getComputers.and.returnValue(of(mockResponse));

    component.loadData();

    expect(component.computers.data.length).toBe(2);
  });

  it(`should dont load Data`, () => {
    computerSvcSpy.getComputers.and.returnValue(
      throwError(() => 'not computers found')
    );

    component.loadData();

    expect(component.computers.data.length).toBe(0);
  });

  it('should delete computer', () => {
    let mockResponse: Computer[] = [
      { id: 1, brand: 'Asus', model: 'A7' },
      { id: 2, brand: 'Razer', model: 'Blade' },
    ];

    computerSvcSpy.getComputers.and.returnValue(of(mockResponse));

    component.loadData();

    const computer: Computer = { id: 1, brand: 'Asus', model: 'A7' };

    mockResponse.shift();
    computerSvcSpy.deleteComputer.and.returnValue(of(mockResponse));

    component.deleteComputer(computer);

    expect(component.computers.data.length).toBe(1);
  });

  it('should trhow error delete computer', () => {
    const mockResponse: Computer[] = [
      { brand: 'Asus', model: 'A7' },
      { brand: 'Razer', model: 'Blade' },
    ];

    computerSvcSpy.getComputers.and.returnValue(of(mockResponse));

    component.loadData();

    const computer: Computer = { brand: 'Asus', model: 'A7' };

    computerSvcSpy.deleteComputer.and.returnValue(
      throwError(() => 'Error to delete')
    );

    component.deleteComputer(computer);

    expect(component.computers.data.length).toBe(2);
  });
});

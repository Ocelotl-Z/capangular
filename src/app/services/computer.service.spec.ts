import { TestBed, inject } from '@angular/core/testing';

import { ComputerService } from './computer.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { Computer } from '../model/computer.model';

describe('ComputerService', () => {
  let service: ComputerService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(ComputerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should http get ok', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const obs = service.getComputers();

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        next(value) {
          expect(value).toBeDefined;
          expect(value.length).toBe(1);
          const first = value[0];
          expect(first.id).toBe(1);
          expect(first.brand).toBe('HP');
          expect(first.model).toBe('Pavilion');
        },
      });

      const request = httpMock.expectOne('http://localhost:3000/computers');
      expect(request.request.method).toBe('GET');

      request.flush([
        {
          id: 1,
          brand: 'HP',
          model: 'Pavilion',
        },
      ]);
    }
  ));

  it('should http get error', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const obs = service.getComputers();

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        error(err) {
          expect(err.error.type).toBe('computer not found');
        },
      });

      const request = httpMock.expectOne('http://localhost:3000/computers');
      expect(request.request.method).toBe('GET');

      request.error(new ErrorEvent('computer not found'));
    }
  ));

  it('should http save ok', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const comp: Computer = {
        brand: 'Asus',
        model: '17B',
      };

      const obs = service.saveComputer(comp);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        next(value) {
          expect(value).toBeDefined;
        },
      });

      const request = httpMock.expectOne('http://localhost:3000/computers');
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(comp);

      request.flush({});
    }
  ));

  it('should http save error', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const comp: Computer = {
        brand: 'Asus',
        model: '17B',
      };

      const obs = service.saveComputer(comp);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        error(err) {
          expect(err.error.type).toBe('error saving compute');
        },
      });

      const request = httpMock.expectOne('http://localhost:3000/computers');
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(comp);

      request.error(new ErrorEvent('error saving compute'));
    }
  ));

  it('should http patch ok', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const comp: Computer = {
        id: 1,
        brand: 'Asus',
        model: '17B',
      };

      const obs = service.patchComputer(1, comp);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        next(value) {
          expect(value).toBeDefined;
        },
      });

      const request = httpMock.expectOne(
        'http://localhost:3000/computers/' + comp.id
      );

      expect(request.request.method).toBe('PATCH');
      expect(request.request.body).toEqual(comp);

      request.flush({});
    }
  ));

  it('should http patch error', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const comp: Computer = {
        id: 1,
        brand: 'Asus',
        model: '17B',
      };

      const obs = service.patchComputer(1, comp);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        error(err) {
          expect(err.error.type).toBe('error updating compute');
        },
      });

      const request = httpMock.expectOne(
        'http://localhost:3000/computers/' + comp.id
      );

      expect(request.request.method).toBe('PATCH');
      expect(request.request.body).toEqual(comp);

      request.error(new ErrorEvent('error updating compute'));
    }
  ));

  // TAREA GET BY ID && DELETE

  // GET BY ID
  it('should http get by id ok', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const comp: Computer = {
        id: 1,
        brand: 'Asus',
        model: '17B',
      };
      const obs = service.getByID(1);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        next(value) {
          expect(value).toBeDefined;
          expect(value.id).toBe(comp.id);
          expect(value.brand).toBe(comp.brand);
          expect(value.model).toBe(comp.model);
        },
      });

      const request = httpMock.expectOne(
        'http://localhost:3000/computers/' + comp.id
      );
      expect(request.request.method).toBe('GET');

      request.flush(comp);
    }
  ));

  it('should http get by id error', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const comp: Computer = {
        id: 1,
        brand: 'Asus',
        model: '17B',
      };
      const obs = service.getByID(1);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        error(err) {
          expect(err.error.type).toBe('computadora no encontrada');
        },
      });

      const request = httpMock.expectOne(
        'http://localhost:3000/computers/' + comp.id
      );
      expect(request.request.method).toBe('GET');

      request.error(new ErrorEvent('computadora no encontrada'));
    }
  ));

  // DELETE

  it('should http delete ok', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const obs = service.deleteComputer(1);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        next(value) {
          expect(value).toBeDefined;
        },
      });

      const request = httpMock.expectOne(
        'http://localhost:3000/computers/' + 1
      );
      expect(request.request.method).toBe('DELETE');

      request.flush({});
    }
  ));

  it('should http delete error', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const obs = service.deleteComputer(1);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        error(err) {
          expect(err.error.type).toBe('error al borrar');
        },
      });

      const request = httpMock.expectOne(
        'http://localhost:3000/computers/' + 1
      );
      expect(request.request.method).toBe('DELETE');

      request.error(new ErrorEvent('error al borrar'));
    }
  ));
});

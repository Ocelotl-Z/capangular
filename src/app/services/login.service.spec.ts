import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { LoginRequest, LoginResponse } from '../model/login.model';
import { Observable } from 'rxjs';

describe('LoginService', () => {
  let service: LoginService;
  let httpCtrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(LoginService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should http post ok', () => {
    const req: LoginRequest = {
      email: 'sample@correo.com',
      password: 'somepass',
    };

    const obs = service.login(req);

    expect(obs instanceof Observable).toBeTruthy();

    obs.subscribe({
      next(response) {
        expect(response).toBeDefined();
        expect(response.token).toBe('HolaSoyUnToken');
      },
    });

    const rquest = httpCtrl.expectOne('https://reqres.in/api/login');
    expect(rquest.request.body).toEqual(req);
    expect(rquest.request.method).toBe('POST');

    const resToken: LoginResponse = {
      token: 'HolaSoyUnToken',
    };

    rquest.flush(resToken);
  });

  it('should http post error', () => {
    const req: LoginRequest = {
      email: 'sample_invalido@correo.com',
      password: 'somepass',
    };

    const obs = service.login(req);

    expect(obs instanceof Observable).toBeTruthy();

    obs.subscribe({
      error(err) {
        expect(err.error.type).toBe('user not found');
      },
    });

    const rquest = httpCtrl.expectOne('https://reqres.in/api/login');
    expect(rquest.request.body).toEqual(req);
    expect(rquest.request.method).toBe('POST');

    rquest.error(new ErrorEvent('user not found'));
  });
});

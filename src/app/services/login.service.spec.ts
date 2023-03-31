import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

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

  it('should get employees - success', () => {
    service
      .login({ email: 'eve.holt@reqres.in', password: 'cityslicka' })
      .subscribe({
        next: (response) => {
          expect(response).toBeTruthy();
        },
      });
    const mockHttp = httpCtrl.expectOne('http://localhost:3000/employees');
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual('GET');
  });
});

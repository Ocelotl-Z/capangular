import { TestBed } from '@angular/core/testing';

import { UtilService } from './util.service';

describe('UtilService', () => {
  let service: UtilService;
  const token = 'HolaSoyUnToken';

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem');
    spyOn(localStorage, 'removeItem');
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save token in localstorage', () => {
    service.isLogged.subscribe({
      next(value) {
        expect(value).toBeTrue();
      },
    });
    service.saveToken(token);

    expect(localStorage.setItem).toHaveBeenCalledWith('TOKEN', token);
  });

  it('should get token', () => {
    service.getToken();

    expect(localStorage.getItem).toHaveBeenCalledWith('TOKEN');
  });

  it('should delete token', () => {
    service.isLogged.subscribe({
      next(value) {
        expect(value).toBeFalse();
      },
    });

    service.deleteToken();

    expect(localStorage.removeItem).toHaveBeenCalledWith('TOKEN');
  });
});

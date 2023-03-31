import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UtilService } from './services/util.service';
import { Subject } from 'rxjs';

describe('AppComponent', () => {
  let utilSvcSpy = jasmine.createSpyObj<UtilService>('UtilService', [
    'getToken',
    'deleteToken',
    'isLogged',
  ]);

  utilSvcSpy.isLogged = new Subject<boolean>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', redirectTo: '' },
        ]),
        BrowserAnimationsModule,
        MatToolbarModule,
      ],
      declarations: [AppComponent],
      providers: [{ provide: UtilService, useValue: utilSvcSpy }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'capangular'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('capangular');
  });

  it('should create app whit the user logged in', () => {
    utilSvcSpy.getToken.and.returnValue('holasoyuntoken');

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.isLogged).toBeTrue();
  });

  it('should create app whit the user is not logged in', () => {
    utilSvcSpy.getToken.and.returnValue(null);

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.isLogged).toBeFalse();
  });

  it('should recive isLogged from UtilSvc true', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    utilSvcSpy.isLogged.next(true);

    expect(app.isLogged).toBeTrue();
  });

  it('should logOut', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.logout();

    expect(utilSvcSpy.deleteToken).toHaveBeenCalled();
  });
});

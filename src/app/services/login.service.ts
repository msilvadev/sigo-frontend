import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../domain/login/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    const body = `client=angular&username=${username}&password=${password}&grant_type=password`;

    let url: string = environment.baseUrl + '/oauth/token';

    const headerDict = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic YW5ndWxhcjpAbmd1bEByMA==',
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    return this.http.post<any>(url, body, requestOptions)
      .pipe(map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }
      ));
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}

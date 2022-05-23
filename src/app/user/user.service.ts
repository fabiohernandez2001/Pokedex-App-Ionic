import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {User} from './user';
@Injectable({
  providedIn: 'root'
})
export class UserCrudService {
  httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) {
  }

  register(user: User): Observable<any> {
    return this.httpClient.post<User>(
      'http://localhost:5000/api/register', user, this.httpOptions)
      .pipe(
        catchError(this.handleError<User>('Error occured'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

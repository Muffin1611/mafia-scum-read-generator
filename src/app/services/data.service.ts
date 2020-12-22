import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData(threadNumber: string): Observable<any> {
    // this is for testing
    const threadNumb = '348298';

    return this.http.get('https://vote.fireblend.com/' + threadNumb + '/raw');
  }
}

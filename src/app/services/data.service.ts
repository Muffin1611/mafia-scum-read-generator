import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameData } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData(threadNumber: string): Observable<GameData> {
    // this is for testing, one thread only for now
    const threadNumb = '348298';

    return this.http.get<GameData>(
      'https://vote.fireblend.com/' + threadNumb + '/raw'
    );
  }
}

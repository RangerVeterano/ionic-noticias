import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews() {
    return this.http.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=9ce59d2e38af493c8b1d049a4c93ea41');
  }
}

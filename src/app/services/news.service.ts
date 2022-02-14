import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { NewsResponse, Article } from '../interfaces/index';


//constante con la api key de noticias
const apiKey = environment.api_key_news;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getTopHeadLines(): Observable<Article[]> {
    return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us`, {
      params: {
        apiKey
      }
    }).pipe(
      //hacemos un filtrado de la respuesta para solo devolver los articulos que nos interesan
      map(({ articles }) => articles) //desestructuramos el la respuesta y cogemos solo los articulos
    );
  }
}

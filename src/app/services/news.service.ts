import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { storedArticlesByCategory } from '../data/mock-news';
import { NewsResponse, Article, ArticlesByCategoryAndPage } from '../interfaces/index';




//constante con la api key de noticias
const apiKey = environment.api_key_news;

//Variable de nuestra url para la peticion
const apiUrl: string = environment.api_url;
// const apiUrl: string = "top-headlines?category=";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  // Indicamos nuestra variable local que se encarga de guardar las peticiones ya realizadas
  // Además de poder ser flexible para en el caso de crear una nueva categoria no tener que modificar nada del código
  //UPDATE en vez de tener el objeto vacio lo llenamos con data local
  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = storedArticlesByCategory

  //inyectamos servicio para realizar peticiones http
  constructor(private http: HttpClient) { }

  //metodo para llamar los articlos en la página principal
  getTopHeadLines(): Observable<Article[]> {

    return this.getTopHeadLinesByCategory('business');
  }

  getTopHeadLinesByCategory(category: string, loadMore: boolean = false): Observable<Article[]> {

    //Como no podemos hacer peticiones tenemos que devolver el objeto directo
    return of(this.articlesByCategoryAndPage[category].articles);

    //para el caso de que se quieran cargar más artículos
    if (loadMore) {
      return this.getArticleByCategory(category);
    }

    //Si la categoria existe
    if(this.articlesByCategoryAndPage[category]){
      return of(this.articlesByCategoryAndPage[category].articles);
    }

    return this.getArticleByCategory(category);
  }

  private getArticleByCategory(category: string): Observable<Article[]> {

    if (Object.keys(this.articlesByCategoryAndPage).includes(category)) {
      //Si entra aqui significa que la categoria existe
      // this.articlesByCategoryAndPage[category].page += 1;
    } else {
      // No existe y por eso creamos el nuevo objeto
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: []
      }
    }

    //incrementamos la pagina en +1
    const page = this.articlesByCategoryAndPage[category].page + 1;

    return this.ejecutarPeticion<NewsResponse>(`/top-headlines?category=${category}&page=${page}`)
      .pipe(
        //Fitramos resultado para solo escoger los articulos, desestructuramos el la respuesta y cogemos solo los articulos
        map(({ articles }) => {

          //En el caso de que la consulta no de resultados porqué ya hemos llegado al final devolvemos un arreglo vacio
          if (articles.length === 0) return this.articlesByCategoryAndPage[category].articles

          //Guardamos los datos descargados en nuestra variable local
          this.articlesByCategoryAndPage[category] = {
            page: page,
            //Insertamos nuevas noticas a los articulos que previamente ya estaban
            articles: [...this.articlesByCategoryAndPage[category].articles, ...articles]
          }

          //Devolvemos los articulos anteriores mas los nuevos
          return this.articlesByCategoryAndPage[category].articles
        })
      );
  }

  private ejecutarPeticion<T>(endpoint: string) {

    console.log('bam peticion realizada');
    return this.http.get<T>(`${apiUrl}${endpoint}`, {
      params: {
        apiKey,
        country: 'us',
      }
    })
  }
}

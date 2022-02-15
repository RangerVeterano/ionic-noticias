import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/index';
import { IonInfiniteScroll } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  //Variable para almacenar los articulos, inicializado como arreglo vacio
  public articles: Article[] = [];

  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  //inyectamos nuestro servicio de noticias (ns)
  constructor(private ns: NewsService) { }

  ngOnInit(): void {
    this.getNewsTopHeads();
  }

  //Si cambia algo de la vista llamanos a buscar de nuevo nuestros articulos
  // ngAfterContentChecked() {
  //   this.getNewsTopHeads();
  // }

  //metodo para cargar más información
  loadData() {
    this.ns.getTopHeadLinesByCategory('business', true)
      .subscribe({
        next: resp => {

          //En el caso de que la ultima notica de la peticion sea la misma noticia que la que tenemos localmente
          if (resp[resp.length - 1].title === this.articles[this.articles.length - 1].title) {

            this.infiniteScroll.disabled = true; //Quitamos que se siga pudiendo hacer peticiones
            return; //no salimos de la funcion
          }

          //Cambiamos los artículos por los nuevos articulos
          this.articles = resp;

          //Damos un retraso de un segundo antes de que se pueda volver a hacer la peticion para evitar una doble peticion
          setTimeout(() => {
            this.infiniteScroll.complete();
          }, 1000);
        }
      });
  }

  private getNewsTopHeads() {
    this.ns.getTopHeadLines()
      .subscribe({
        next: articulos => {
          //Desestructuramos los articulos y los insertamos en nuestra variable local
          this.articles = [...articulos];
        }
      });
  }
}

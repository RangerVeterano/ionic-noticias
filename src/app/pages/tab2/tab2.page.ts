import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  //Nombres para los filtros de las categorias de las noticias
  public categories: string[] = ['business', 'entertainment', 'general', 'health', 'sciences', 'ports', 'technology'];

  //variable para almacenar la categoria seleccionada
  //El static se encarga de buscar el elemento antes de que carge, para poder tenerlo disponible en cualquier momento
  public selectedCategory: string = this.categories[0];

  //Varible para almacenar localmente los articulos
  public articles: Article[] = [];

  // Hacemos referencia al infinite scroll del template
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  //inyectamos nuestro servicio para la peticion de las noticias por categoria
  constructor(private ns: NewsService) { }

  ngOnInit(): void {
    //Cargamos las categorias predefinidas al cargar el componente
    this.getNewsByCategory(this.categories[0]);
  }

  segmentChanged(ev) {
    //cambiamos el valor de la categoria seleccionada
    this.selectedCategory = ev.detail.value;

    //Cambiamos las noticias a la nueva categoria
    this.getNewsByCategory(this.selectedCategory);
  }

  //Metodo que se encarga de realizar la peticion de categorias
  private getNewsByCategory(category: string) {
    this.ns.getTopHeadLinesByCategory(category)
      .subscribe({
        next: resp => {
          //Pisamos los artiuclos con los nuevos
          this.articles = [...resp];
        }
      })
  }

  loadData() {
    this.ns.getTopHeadLinesByCategory(this.selectedCategory, true)
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

}

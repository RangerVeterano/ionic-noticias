import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/index';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  //Variable para almacenar los articulos, inicializado como arreglo vacio
  public articles: Article[] = [];

  //inyectamos nuestro servicio de noticias (ns)
  constructor(private ns: NewsService) { }

  ngOnInit(): void {

    this.ns.getTopHeadLines()
      .subscribe({
        next: articulos => {

          //Desestructuramos los articulos y los insertamos en nuestra variable local
          this.articles.push(...articulos)
        }
      });
  }

}

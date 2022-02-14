import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { NewsResponse } from '../../interfaces/index';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  //inyectamos nuestro servicio de noticias (ns)
  constructor(private ns: NewsService) { }

  ngOnInit(): void {

    this.ns.getTopHeadLines()
      .subscribe({
        next: articulos => {
          console.log(articulos);
        }
      });
  }

}

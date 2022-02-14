import { Component, Input } from '@angular/core';
import { Article } from '../../interfaces/index';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent {

  //Recibimos todos los articulos del padre
  @Input() articles: Article[];

  constructor() { }



}

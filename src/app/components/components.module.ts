import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ArticleComponent } from './article/article.component';
import { ArticlesComponent } from './articles/articles.component';



@NgModule({
  //declaramos los dos componentes para poder usarlos
  declarations: [
    ArticleComponent,
    ArticlesComponent
  ],
  imports: [
    CommonModule,
    IonicModule //Necesitamos poder usar usar componentes de ionic, lo importamos
  ],
  exports: [
    ArticlesComponent //Solo vamos a emplear el que contiene todos los articulos
  ]
})
export class ComponentsModule { }

import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  //Variable para almacenar la informacion de los articulos en nuestro local storage
  private _storage: Storage | null = null;

  //Variable con nuestras noticias locales
  private _localArticles: Article[] = [];

  //getter para los articulos locales
  get getLocalArticles() {
    return [...this._localArticles]
  }

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    //Creamos nuestro almacenamiento local
    const storage = await this.storage.create();
    //Asignamos nuestro almacenamiento local a nuestra variable local
    this._storage = storage;

    //Hacemos la carga de nuestras noticias guardadas
    this.loadFavorites()
  }

  //metodo asincrono para guardar articulos
  async saveRemoveArtivle(article: Article) {

    //Buscamos si el articulo existe dentro de nuestro arreglo local
    //Si se encuentra devuelve el objeto sino devuelve undefined
    const existe = this._localArticles.find(localArticle => localArticle.title === article.title)

    if (existe) {
      //existe por lo tanto se quiere quitar de la lista
      //Devolvemos un arreglo con todos los articulos menos el que queremos
      this._localArticles = this._localArticles.filter(localArticle => localArticle.title !== article.title)
    } else {
      //No existe por lo tanto se quiere insertar en la lista
      //Añadimos nuestro articulo nuevo como el primero y luego los anteriores
      this._localArticles = [article, ...this._localArticles]
    }

    //Guardamos todos los articulos dentro de nuestro almacenamiento
    this._storage.set('articles', this._localArticles);

  }

  //metodo para cargar las noticias favoritas
  async loadFavorites() {
    try {

      //hacemos una peticion para recoger todas las noticas guardadas de nuestro local storage
      const articles = await this._storage.get('articles');
      //Las guardamos en caso de encontrarlas y sino se encuentan se guardan como un arreglo vacío
      this._localArticles = articles || []

    } catch (error) {
    }
  }

  //metodo para comprobar si exsite un articulo en nuestro arreglo local
  articleInFavorities(article: Article) {
    return !!this._localArticles.find(localArticle => localArticle.title === article.title)
  }
}


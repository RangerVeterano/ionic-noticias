import { Component, Input } from '@angular/core';

import { Article } from '../../interfaces/index';

//plugin para abrir el navegador del movil
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';

import { Browser } from '@capacitor/browser';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {

  @Input() article: Article;
  @Input('index') i: number;

  //inyectamos el servicio del navegador interno de capaciot (iab)
  //inyectamos el servicio para determinar en qué dispositivo nos encontramos (platform)
  //inyectamos el servicio para controlar el action sheet (as)
  //inyectamos el servicio para compartir en redes sociales (ss)
  constructor(
    private iab: InAppBrowser,
    private platform: Platform,
    private as: ActionSheetController,
    private ss: SocialSharing,
    private storageService: StorageService) { }

  openArticle() {

    //comprobamos en la plataforma que se está manejando el dispositivo
    //si es ios o android
    if (this.platform.is('ios') || this.platform.is('android')) {

      //Creamos una constante con la url que tiene que abrir el navegador interno de la aplicacion
      const browser = this.iab.create(this.article.url);
      //mostramos el navegador
      browser.show();

      return; // nos salimos de la función
    };

    //sino para el resto de dispositivos abrimos una ventana de navegador normal y corriente
    window.open(this.article.url, '_blank');
  }

  //Metodo que muestra el action sheet
  async onOpenMenu() {

    const articleInFavorites = this.storageService.articleInFavorities(this.article);


    //Creamos los botones que va a tener nuestro action sheet
    const btnNormales: ActionSheetButton[] = [
      {
        text: articleInFavorites? 'Quitar de Favoritos': 'Favorito',
        icon: articleInFavorites? 'heart' : 'heart-outline',
        handler: () => this.onToggleFavorite()
      },
      {
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel',
      }
    ]

    const share: ActionSheetButton = {
      text: 'Compartir',
      icon: 'share-outline',
      handler: () => this.onSharedArticle()
    }

    //comprobamos que la aplicacion esté corriendo en capacitor
    if (this.platform.is('capacitor')) {
      //de ser asi insertamos la opcion de compartir en redes sociales
      btnNormales.unshift(share)
    }

    const actionSheet = await this.as.create({
      header: 'Opciones',//titulo del action sheet
      buttons: btnNormales //añadimos nuestros botones
    });



    //mostramos nuestra action sheet
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

  //metodo para cuando se hace click en compartir
  onSharedArticle() {

    //desestructuramos el elemento
    const { title, source, url } = this.article

    this.ss.share(
      title,
      source.name,
      null,
      url
    )

  }

  //metodo para cuando se da a favorita una noticia
  onToggleFavorite() {
    //Guardamos nuestro artículo
    this.storageService.saveRemoveArtivle(this.article);
  }

  //Metodo que abre una url con el navegador predeterminado del dispositivo
  async abrirArticuloConNavegador() {
    //otra forma 
    await Browser.open({ url: this.article.url });
  }



}

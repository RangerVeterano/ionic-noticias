import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Article } from '../../interfaces/index';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  get articles(): Article[] {

    //Hacemos un get de los articulos del local storage
    return this.storageService.getLocalArticles;
  }

  //inyectamos nuestro servicio de almacenamiento local
  constructor(private storageService: StorageService) { }



}

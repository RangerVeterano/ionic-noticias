import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Plugins, este abre el navegador del movil
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
//Compartir en redes sociales
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
//Mensajes toasts
import { Toast } from '@awesome-cordova-plugins/toast/ngx';


//almacenamiento nativo de ionic
import { IonicStorageModule } from '@ionic/storage-angular';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule, //Modulo de angular para peticiones http
    IonicStorageModule.forRoot(), ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: environment.production,
  // Register the ServiceWorker as soon as the app is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
}) //modulo de ionic para las guardar datos localmente
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    InAppBrowser,
    SocialSharing,
    Toast
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

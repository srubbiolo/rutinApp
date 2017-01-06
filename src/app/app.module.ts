import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { RegistrarUsuario } from '../pages/registrarUsuario/registrarUsuario';

import { ServicioPersonas} from '../app/servicios/servicio.persona';
import { Cliente } from '../app/Modelo/cliente';
import { Entrenador } from '../app/Modelo/entrenador'
import { Gimnasio } from '../app/Modelo/gimnasio';
import { ServicioLocal } from '../app/servicios/servicio.local';
import { Alertas } from '../app/componentes/alertas/alertas';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    RegistrarUsuario
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    RegistrarUsuario
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
              Storage, ServicioPersonas, Cliente, ServicioLocal, Alertas, Entrenador,
              Gimnasio]
})
export class AppModule {}

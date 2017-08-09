import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { RegistrarUsuario } from '../pages/registrarUsuario/registrarUsuario';
import { MainEntrenador } from '../pages/mainEntrenador/mainEntrenador';
import { MainCliente } from '../pages/mainCliente/mainCliente';
import { CrearAsignarRutina } from '../pages/crearAsignarRutina/crearAsignarRutina';
import { RutinasDeCliente } from '../pages/rutinasDeCliente/rutinasDeCliente';

import { ServicioPersonas} from '../app/servicios/servicio.persona';
import { ServicioEjercicios} from '../app/servicios/servicio.ejercicio';
import { ServicioRutinas } from '../app/servicios/servicio.rutina';
import { Cliente } from '../app/Modelo/cliente';
import { Entrenador } from '../app/Modelo/entrenador'
import { Gimnasio } from '../app/Modelo/gimnasio';
import { Ejercicio } from '../app/Modelo/ejercicio';
import { ServicioLocal } from '../app/servicios/servicio.local';
import { Alertas } from '../app/componentes/alertas/alertas';
import { CrearEjercicio } from '../app/componentes/crearEjercicio/crearEjercicio';
import { CrearRutina } from '../app/componentes/crearRutina/crearRutina';
import { AsignarRutina } from '../app/componentes/asignarRutina/asignarRutina';
import { AsignarCliente } from '../app/componentes/asignarCliente/asignarCliente';
import { VerRutina } from '../app/componentes/verRutina/verRutina';
import { RutinaDiaria } from '../app/Modelo/rutinaDiaria';
import { VerEjercicio } from '../app/componentes/verEjercicio/verEjercicio';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    RegistrarUsuario,
    MainEntrenador,
    MainCliente,
    CrearAsignarRutina,
    CrearEjercicio,
    CrearRutina,
    AsignarRutina,
    AsignarCliente,
    RutinasDeCliente,
    VerRutina,
    VerEjercicio
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      scrollAssist: true,
      autoFocusAssist: true
    })
    ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    RegistrarUsuario,
    MainEntrenador,
    MainCliente,
    CrearAsignarRutina,
    CrearEjercicio,
    CrearRutina,
    AsignarRutina,
    AsignarCliente,
    RutinasDeCliente,
    VerRutina,
    VerEjercicio
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
              Storage, ServicioPersonas, Cliente, ServicioLocal, Alertas, Entrenador,
              Gimnasio, Ejercicio, ServicioEjercicios, ServicioRutinas]
})
export class AppModule {}

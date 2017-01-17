import { Component , OnInit} from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { ServicioPersonas } from '../../app/servicios/servicio.persona';
import { ServicioLocal } from '../../app/servicios/servicio.local';
import { Cliente } from '../../app/Modelo/cliente';
import { Entrenador } from '../../app/Modelo/entrenador';
import { Gimnasio } from '../../app/Modelo/gimnasio';
import { Alertas } from '../../app/componentes/alertas/alertas';
import { CrearEjercicio } from '../../app/componentes/crearEjercicio/crearEjercicio';

import { Page1 } from '../../pages/page1/page1';

@Component({
  selector: 'crear-asignar-rutina',
  templateUrl: 'crearAsignarRutina.html'
})
export class CrearAsignarRutina implements OnInit {

  constructor(public navCtrl: NavController, private servicioPersonas: ServicioPersonas,
              private cliente: Cliente, private alertas: Alertas, private entrenador: Entrenador,
              private servicioLocal: ServicioLocal, public modal: ModalController) {}

  infoDeEntrenador = this.servicioLocal.getUsuarioRegistrado();

  ngOnInit(): void {
  }

  salir(): void {
    this.servicioLocal.limpiarUsuario();  
    this.servicioPersonas.logOut();
    setTimeout(() => { this.navCtrl.push(Page1) }, 100);
  }

  crearEjercicio(): void {
    let profileModal = this.modal.create(CrearEjercicio, {});
   profileModal.present();
  }

  crearRutina(): void {

  }

  asignarRutina(): void {

  }

}
//   @Component({
//   selector: 'agregar-ejercicio',
//   template: `
//   <ion-content padding>
//     <h1>cosillo</h1>
//   </ion-content>`
// })
//   class CrearEjercicio {

//   }
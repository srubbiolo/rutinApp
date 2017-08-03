import { Component , OnInit} from '@angular/core';

import { NavController } from 'ionic-angular';
import { ServicioPersonas } from '../../app/servicios/servicio.persona';
import { ServicioLocal } from '../../app/servicios/servicio.local';

import { Page1 } from '../../pages/page1/page1';
import { RutinasDeCliente } from '../../pages/rutinasDeCliente/rutinasDeCliente';

import { Alertas } from '../../app/componentes/alertas/alertas';

@Component({
  selector: 'main-cliente',
  templateUrl: 'mainCliente.html'
})
export class MainCliente implements OnInit {

  constructor(public navCtrl: NavController,
              private servicioPersonas: ServicioPersonas,
              private servicioLocal: ServicioLocal,
              private alertas: Alertas) {}

  infoDeCliente = this.servicioLocal.getUsuarioRegistrado();

  ngOnInit(): void {
  }

  salir(): void {
    this.servicioLocal.limpiarUsuario();
    this.servicioPersonas.logOut();
    setTimeout(() => { this.navCtrl.push(Page1) }, 100);
  }

  verRutinas(): void {
    this.navCtrl.push(RutinasDeCliente);
  }

  pedirRutina(): void {
    this.servicioPersonas.usuarioPideRutina();
    this.alertas.mostrarToast('Usted ha solicitado una rutina a su entrenador con éxito.',
      'top', 2000);
  }
}

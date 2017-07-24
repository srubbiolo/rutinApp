import { Component , OnInit} from '@angular/core';

import { NavController } from 'ionic-angular';
import { ServicioPersonas } from '../../app/servicios/servicio.persona';
import { ServicioLocal } from '../../app/servicios/servicio.local';
import { Cliente } from '../../app/Modelo/cliente';
import { Entrenador } from '../../app/Modelo/entrenador';
import { Gimnasio } from '../../app/Modelo/gimnasio';
import { Alertas } from '../../app/componentes/alertas/alertas';

import { Page1 } from '../../pages/page1/page1';
import { CrearAsignarRutina} from '../../pages/crearAsignarRutina/crearAsignarRutina';
import { AsignarCliente } from '../../app/componentes/asignarCliente/asignarCliente';

@Component({
  selector: 'main-entrenador',
  templateUrl: 'mainEntrenador.html'
})
export class MainEntrenador implements OnInit {

  constructor(public navCtrl: NavController, private servicioPersonas: ServicioPersonas,
              private cliente: Cliente, private alertas: Alertas, private entrenador: Entrenador,
              private servicioLocal: ServicioLocal) {}

  infoDeEntrenador = this.servicioLocal.getUsuarioRegistrado();

  ngOnInit(): void {
  }

  salir(): void {
    this.servicioLocal.limpiarUsuario();
    this.servicioPersonas.logOut();
    setTimeout(() => { this.navCtrl.push(Page1) }, 100);
  }

  crearAsignarRutina(): void {
    this.navCtrl.push(CrearAsignarRutina);
  }

  seguirClientes(): void {
    this.navCtrl.push(AsignarCliente);
  }
}

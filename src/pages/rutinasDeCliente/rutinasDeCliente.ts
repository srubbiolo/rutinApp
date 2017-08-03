import { Component , OnInit} from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { ServicioPersonas } from '../../app/servicios/servicio.persona';
import { ServicioLocal } from '../../app/servicios/servicio.local';
import { Alertas } from '../../app/componentes/alertas/alertas';
import { Rutina } from '../../app/modelo/rutina';

import { Page1 } from '../../pages/page1/page1';
import { VerRutina } from '../../app/componentes/verRutina/verRutina';

@Component({
  selector: 'rutinas-de-cliente',
  templateUrl: 'rutinasDeCliente.html'
})
export class RutinasDeCliente implements OnInit {

  constructor(public navCtrl: NavController, private servicioPersonas: ServicioPersonas,
              private alertas: Alertas, private servicioLocal: ServicioLocal) {}

  listaDeRutinas;

  ngOnInit(): void {
    var usuarioRegistrado: any = this.servicioLocal.getUsuarioRegistrado();
    this.listaDeRutinas = usuarioRegistrado.listaDeRutinas;
  }

  abrirRutina(rutina: Rutina): void {
    console.log(rutina);
    this.navCtrl.push(VerRutina, {rutinaSeleccionada: rutina});
  }
  salir(): void {
    this.servicioLocal.limpiarUsuario();
    this.servicioPersonas.logOut();
    setTimeout(() => { this.navCtrl.push(Page1) }, 100);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ServicioPersonas } from '../../servicios/servicio.persona';
import { ServicioLocal } from '../../servicios/servicio.local';
import { ServicioRutinas } from '../../servicios/servicio.rutina';

import { Entrenador } from '../../Modelo/entrenador';
import { Cliente } from '../../Modelo/cliente';
import { Gimnasio } from '../../Modelo/gimnasio';

import { Alertas } from '../alertas/alertas';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'asignar-cliente',
  templateUrl: 'asignarCliente.html'
})
export class AsignarCliente implements OnInit {
  todosLosClientesDelGimnasio;
  constructor(public viewCtrl: ViewController, private servicioPersonas: ServicioPersonas,
              private cliente: Cliente, private entrenador: Entrenador,
              private gimnasio: Gimnasio, public formBuilder: FormBuilder,
              private servicioLocal: ServicioLocal, private alerta: Alertas,
              private servicioRutinas: ServicioRutinas, private alertCtrl: AlertController) { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    var entrenador: any = this.servicioLocal.getUsuarioRegistrado();
    this.servicioPersonas.getTodosLosClientes().then((val) => {
      this.todosLosClientesDelGimnasio = val;
      this.todosLosClientesDelGimnasio = this.todosLosClientesDelGimnasio.filter(cliente =>{
        return cliente.gimnasio.id === entrenador.gimnasio.id;
      })
      this.todosLosClientesDelGimnasio = this.todosLosClientesDelGimnasio.filter(cliente =>{
        return cliente.emailDelEntrenador === undefined;
      })
    })
  }

  asignarCliente(cliente: Cliente) {

    let alert = this.alertCtrl.create({
      title: 'Agregar Cliente',
      message: 'Usted está por agregar a ' + cliente.nombre +
               ' ' + cliente.apellido + ' como cliente suyo.',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {

          }
        },
        {
          text: 'Asignar Cliente',
          handler: () => {
            this.servicioPersonas.asignarClienteAEntrenador(cliente);
            this.viewCtrl.dismiss();
          }
        }
      ]
    });
    alert.present();
  }

  getItems(ev: any) {
    //TODO revisar que solo cuando borras todo fonca
    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.todosLosClientesDelGimnasio = this.todosLosClientesDelGimnasio.filter((item) => {
        return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.cargarClientes();
    }
  }

  cerrarModal(): void {
    this.viewCtrl.dismiss();
  }
}
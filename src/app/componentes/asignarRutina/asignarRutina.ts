import { Component, Input, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ServicioPersonas } from '../../servicios/servicio.persona';
import { ServicioLocal } from '../../servicios/servicio.local';
import { ServicioRutinas } from '../../servicios/servicio.rutina';

import { Entrenador } from '../../Modelo/entrenador';
import { Cliente } from '../../Modelo/cliente';
import { Gimnasio } from '../../Modelo/gimnasio';
import { Rutina } from '../../Modelo/rutina';

import { AlertController } from 'ionic-angular';

@Component({
  selector: 'asignar-rutina',
  templateUrl: 'asignarRutina.html'
})
export class AsignarRutina implements OnInit {
  rutinasDelEntrenador;
  todasLasRutinas;
  clientesDelEntrenador;
  clienteSeleccionado;
  rutinaSeleccionada;
  rutinasDeTodos;
  rutinasDeUsuario;
  constructor(public viewCtrl: ViewController, private servicioPersonas: ServicioPersonas,
              private cliente: Cliente, private entrenador: Entrenador,
              private gimnasio: Gimnasio, public formBuilder: FormBuilder,
              private servicioLocal: ServicioLocal, private alertCtrl: AlertController,
              private servicioRutinas: ServicioRutinas, private navParams: NavParams) { }

  ngOnInit(): void {
    var usuarioRegistrado: any = this.servicioLocal.getUsuarioRegistrado();
    this.servicioPersonas.getTodosLosClientes().then((clientes) => {
      this.clientesDelEntrenador = clientes.filter(cliente =>{
        return cliente.emailDelEntrenador === usuarioRegistrado.email;
      })
    });
    this.servicioRutinas.getTodasLasRutinas().then((rutinas) => {
      this.todasLasRutinas = rutinas;
    });
    this.rutinasDelEntrenador = usuarioRegistrado.listaDeRutinas;
    this.clienteSeleccionado = null;
    this.rutinaSeleccionada = (this.navParams.get('rutinaCreada')) !== undefined ? this.navParams.get('rutinaCreada') : null;
    this.rutinasDeTodos = false;
    this.rutinasDeUsuario = true;
  }

  seleccionarCliente(cliente: Cliente): void {
    this.clienteSeleccionado = cliente;

    //en caso que vengo desde crear rutina y ya la tengo seteada
    if (this.rutinaSeleccionada !== null) {
      this.asignarRutina();
    }
  }

  seleccionarRutina(rutina: Rutina): void {
    this.rutinaSeleccionada = rutina;
    this.asignarRutina();
  }

  cambiarLista(): void {
    if (this.rutinasDeUsuario === true) {
      this.rutinasDeUsuario = false;
      this.rutinasDeTodos = true;
    } else {
      this.rutinasDeUsuario = true;
      this.rutinasDeTodos = false;
    }
  }

  asignarRutina(): void {
    console.log(this.clienteSeleccionado, this.rutinaSeleccionada);
    let alert = this.alertCtrl.create({
      title: 'Asignar Rutina a Cliente',
      message: 'Usted está por asignar a: ' + this.clienteSeleccionado.nombre +
               ' ' + this.clienteSeleccionado.apellido + ' la rutina ' + this.rutinaSeleccionada.nombreRutina,
      buttons: [
        {
          text: 'Cancelar y volver',
          handler: () => {
            this.viewCtrl.dismiss();
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.servicioPersonas.asignarRutinaACliente(this.clienteSeleccionado, this.rutinaSeleccionada);
            this.viewCtrl.dismiss();
          }
        }
      ]
    });
    alert.present();
  }

  cerrarModal(): void {
    this.viewCtrl.dismiss();
  }
}
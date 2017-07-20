import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

import { Cliente } from '../Modelo/cliente';
import { Entrenador } from '../Modelo/entrenador';
import { Ejercicio } from '../Modelo/ejercicio';
import { Rutina } from '../Modelo/rutina';

import { ServicioLocal } from './servicio.local';
import { ServicioPersonas } from './servicio.persona';

@Injectable()
export class ServicioRutinas {
    constructor(private storage: Storage, private ejercicio: Ejercicio,
                private servicioLocal: ServicioLocal, private servicioPersonas: ServicioPersonas) { }
entrenador = this.servicioLocal.getUsuarioRegistrado();
    setRutina(rutina: Rutina): void {
      var arrayRutinas = [];
      this.storage.get('rutinas').then((rutinas) => {
        if (rutinas == null) {
           arrayRutinas.push(rutina);
        } else {
           arrayRutinas = rutinas;
           arrayRutinas.push(rutina);
        }
        this.storage.set('rutinas', arrayRutinas);
      })

      this.cargarRutinaAlEntrenador(rutina);
      this.servicioPersonas.actualizarUsuario();
    }

    getTodasLasRutinas(): any {
      return this.storage.get('rutinas');
    }

    eliminarTodasLasRutinas(): any {
      return this.storage.remove('rutinas');
    }

    cargarRutinaAlEntrenador(rutina: Rutina): void {
      var usuarioRegistrado: any = this.servicioLocal.getUsuarioRegistrado();
      var listaDeRutinas = [];
      if (usuarioRegistrado.hasOwnProperty('listaDeRutinas')) {
        usuarioRegistrado.listaDeRutinas.push(rutina);
      } else {
        usuarioRegistrado.listaDeRutinas = [];
        usuarioRegistrado.listaDeRutinas.push(rutina);
      }

      this.servicioLocal.setUsuarioRegistrado(usuarioRegistrado);
    }
}
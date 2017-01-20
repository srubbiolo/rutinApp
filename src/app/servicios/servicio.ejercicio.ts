import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

import { Cliente } from '../Modelo/cliente';
import { Entrenador } from '../Modelo/entrenador';
import { Ejercicio } from '../Modelo/ejercicio';

import { ServicioLocal } from './servicio.local';
import { ServicioPersonas } from './servicio.persona';

@Injectable()
export class ServicioEjercicios {
    constructor(private storage: Storage, private ejercicio: Ejercicio,
                private servicioLocal: ServicioLocal, private servicioPersonas: ServicioPersonas) { }
entrenador = this.servicioLocal.getUsuarioRegistrado();
    setEjercicio(ejercicio: Ejercicio): void {
      var arrayEjercicios = [];
      this.storage.get('ejercicios').then((ejercicios) => {
        if (ejercicios == null) {
          console.log('entro por == null EJERCICIOS');
           arrayEjercicios.push(ejercicio);
        } else {
          console.log('entro por else EJERCICIOS', ejercicios);
           arrayEjercicios = ejercicios;
           arrayEjercicios.push(ejercicio);
        }
        this.storage.set('ejercicios', arrayEjercicios);
      })

      this.cargarEjercicioAlEntrenador(ejercicio);
      this.servicioPersonas.actualizarUsuario();
    }

    getTodosLosEjercicios(): any {
      return this.storage.get('ejercicios');
    }

    eliminarTodosLosEjercicios(): any {
      return this.storage.remove('ejercicios');
    }

    cargarEjercicioAlEntrenador(ejercicio: Ejercicio): void {
      var usuarioRegistrado: any = this.servicioLocal.getUsuarioRegistrado();
      var listaDeEjercicios = [];
      if (usuarioRegistrado.hasOwnProperty('listaDeEjercicios')) {
        console.log('entro por hasownproperty TRUE');
        usuarioRegistrado.listaDeEjercicios.push(ejercicio);
      } else {
        console.log('entro por false en hasownproperty');
        usuarioRegistrado.listaDeEjercicios = [];
        usuarioRegistrado.listaDeEjercicios.push(ejercicio);
      }

      this.servicioLocal.setUsuarioRegistrado(usuarioRegistrado);
    }
}
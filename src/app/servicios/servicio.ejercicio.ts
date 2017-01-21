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
           arrayEjercicios.push(ejercicio);
        } else {
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
        usuarioRegistrado.listaDeEjercicios.push(ejercicio);
      } else {
        usuarioRegistrado.listaDeEjercicios = [];
        usuarioRegistrado.listaDeEjercicios.push(ejercicio);
      }

      this.servicioLocal.setUsuarioRegistrado(usuarioRegistrado);
    }
}
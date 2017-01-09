import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Cliente } from '../Modelo/cliente';
import { Entrenador } from '../Modelo/entrenador';
import { Gimnasio } from '../Modelo/gimnasio';


@Injectable()
export class ServicioPersonas {
    //getHeroes(): Hero[] {
        //return HEROES;      NOT PROMISE
    //}
    constructor(private storage: Storage, private gimnasio: Gimnasio) { }

    setUsuario(dataUsuario: any, tipoUsuario: string): void {
      var arrayUsuarios = [],
          usuario = (tipoUsuario == 'cliente') ? 'clientes' : 'entrenadores';
      this.storage.get(usuario).then((usuarios) => {
        console.log(usuarios);
        if (usuarios == null) {
          console.log('entro por aca == null');
           arrayUsuarios.push(dataUsuario);
        } else {
          console.log('entro por aca else');
           arrayUsuarios = usuarios;
           arrayUsuarios.push(dataUsuario);
        }
        this.storage.set(usuario, arrayUsuarios);
      })
    }

    setGimnasio(gimnasio: Gimnasio): void {
      var arrayGimnasios = [];
        this.storage.get('gimnasios').then((gimnasios) => {
          if (gimnasios == null) {
             arrayGimnasios.push(gimnasio);
          } else {
             arrayGimnasios = gimnasios;
             arrayGimnasios.push(gimnasio);
          }
          this.storage.set('gimnasios', arrayGimnasios);
         })
    }
    getGimnasios(): any {
      return this.storage.get('gimnasios');
    }

    getTodosLosClientes(): any {
      return this.storage.get('clientes');
    }

    getTodosLosEntrenadores(): any {
      return this.storage.get('entrenadores');
    }

    eliminarTodo(): void {
      this.storage.clear();
    }

}
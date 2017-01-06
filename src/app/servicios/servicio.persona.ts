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

    setCliente(cliente: Cliente): void {
      var arrayClientes = [];
      this.storage.get('clientes').then((clientes) => {
        if (clientes === null) {
           arrayClientes.push(cliente);
        } else {
           arrayClientes = clientes;
           arrayClientes.push(cliente);
        }
        this.storage.set('clientes', arrayClientes);
      })
    }

    setGimnasio(gimnasio: Gimnasio): void {
      var arrayGimnasios = [];
        this.storage.get('gimnasios').then((gimnasios) => {
          if (gimnasios === null) {
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

    eliminarTodo(): void {
      this.storage.clear();
    }

}
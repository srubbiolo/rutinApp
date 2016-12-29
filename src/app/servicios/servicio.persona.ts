import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Cliente } from '../Modelo/cliente';
import { Entrenador } from '../Modelo/entrenador';
import { Observable} from 'rxjs/Observable';

@Injectable()
export class ServicioPersonas {
    //getHeroes(): Hero[] {
        //return HEROES;      NOT PROMISE
    //}
    constructor(private storage: Storage) { }

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

    getTodosLosClientes(): any {
      return this.storage.get('clientes');
    }

    eliminarTodo(): void {
      this.storage.clear();
    }

}
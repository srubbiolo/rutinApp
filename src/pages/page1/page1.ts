import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ServicioPersonas } from '../../app/servicios/servicio.persona';
import { Cliente } from '../../app/Modelo/cliente';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  constructor(public navCtrl: NavController, private storage: Storage,
              private servicioPersonas: ServicioPersonas, private cliente: Cliente) {}
agregar(): void {
    this.cliente.nombre = 'juli';
  this.cliente.apellido = 'rubbiolo';
  this.cliente.dni = 2323232322;
  this.servicioPersonas.setCliente(this.cliente);

}

eliminar(): void {
    this.servicioPersonas.eliminarTodo();
}
mostrar(): void {
    this.servicioPersonas.getTodosLosClientes().then((val) => {
       console.log('LO MAS CLAVE DEL MUNDO MALLLLLLLLLL', val);
     })
}



}

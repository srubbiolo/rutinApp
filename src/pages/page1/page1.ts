import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ServicioPersonas } from '../../app/servicios/servicio.persona';
import { Cliente } from '../../app/Modelo/cliente';
import { Alertas } from '../../app/componentes/alertas/alertas';
import { Gimnasio } from '../../app/Modelo/gimnasio';

import { RegistrarUsuario } from '../../pages/registrarUsuario/registrarUsuario';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  constructor(public navCtrl: NavController, private servicioPersonas: ServicioPersonas,
              private cliente: Cliente, private alertas: Alertas) { }

  usuario = '';
  contrasena = '';
  habilitarBoton = false;

  iniciarSesion(): void {
        console.log('todo mal');
        this.alertas.mostrarAlerta('surgun', 'drule', 'OK');
        this.usuario = '';
        this.contrasena = '';
        this.revisarCampos();
  }

  registrarUsuario(): void {
      this.usuario = '';
      this.contrasena = '';
      this.revisarCampos();
      this.navCtrl.push(RegistrarUsuario);
  }

  revisarCampos(): void {
    this.habilitarBoton = true;

    if(this.usuario == '' || this.contrasena == '') {
        this.habilitarBoton = false;
        //fire up alert component
    }
  }
agregar(): void {
  this.cliente.nombre = 'juli';
  this.cliente.apellido = 'rubbiolo';
  this.cliente.dni = 2323232322;
  this.servicioPersonas.setCliente(this.cliente);

}

agregarGimnasios(): void {
    var gym1 = new Gimnasio();
    gym1.barrio = 'Nueva Cordoba';
    gym1.ciudad = 'Córdoba';
    gym1.cp = 5000;
    gym1.id = 1;
    gym1.nombre = 'Synergy';
    gym1.pais = 'Argentina';
    this.servicioPersonas.setGimnasio(gym1);

    var gym2 = new Gimnasio();
    gym2.barrio = 'Cofico';
    gym2.ciudad = 'Córdoba';
    gym2.cp = 5001;
    gym2.id = 2;
    gym2.nombre = 'Hercules';
    gym2.pais = 'Argentina';
    this.servicioPersonas.setGimnasio(gym2);

    var gym3 = new Gimnasio();
    gym3.barrio = 'Alberdi';
    gym3.ciudad = 'Rrecoleta';
    gym3.cp = 3003;
    gym3.id = 2;
    gym3.nombre = 'Gimnasium';
    gym3.pais = 'Argentina';
    this.servicioPersonas.setGimnasio(gym3);

}

mostrarGimnasios(): void {
    this.servicioPersonas.getGimnasios().then((val) => {
       console.log('toos los gims', val);
     })
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

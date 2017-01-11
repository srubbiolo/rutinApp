import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ServicioPersonas } from '../../app/servicios/servicio.persona';
import { ServicioLocal } from '../../app/servicios/servicio.local';
import { Cliente } from '../../app/Modelo/cliente';
import { Entrenador } from '../../app/Modelo/entrenador';
import { Alertas } from '../../app/componentes/alertas/alertas';
import { Gimnasio } from '../../app/Modelo/gimnasio';

import { RegistrarUsuario } from '../../pages/registrarUsuario/registrarUsuario';
import { MainEntrenador } from '../../pages/mainEntrenador/mainEntrenador';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 implements OnInit {

  constructor(public navCtrl: NavController, private servicioPersonas: ServicioPersonas,
              private cliente: Cliente, private alertas: Alertas, private servicioLocal: ServicioLocal) { }

  email = '';
  contrasenna = '';
  habilitarBoton = false;
  todosLosClientes;
  todosLosEntrenadores;

  ngOnInit(): void {
    this.servicioPersonas.getTodosLosClientes().then((val) => {
       this.todosLosClientes = val;
    })
    this.servicioPersonas.getTodosLosEntrenadores().then((val) => {
       this.todosLosEntrenadores = val;
    })
  }

  iniciarSesion(): void {
    var cliente = this.todosLosClientes.find(usuario => usuario.email == this.email),
        entrenador = this.todosLosEntrenadores.find(usuario => usuario.email == this.email);
    if (cliente !== undefined && entrenador === undefined) {
      if (cliente.contraseña === this.contrasenna) {
        console.log('tengo un cliente válido');
        // this.servicioPersonas.setUsuarioIniciadoSesion(cliente);
        // this.servicioLocal.setUsuarioRegistrado(cliente);
        //redirigir apagina de cliente
      } else {
        this.contrasenna = '';
        this.revisarCampos();
        this.alertas.mostrarAlerta('Uuups!', 'Contraseña equivocada, inténtelo de nuevo', 'Ok');
      }
    } else if (cliente === undefined && entrenador !== undefined) {
      if (entrenador.contraseña === this.contrasenna) {
        console.log('tengo un entrenador válido');
        this.servicioPersonas.setUsuarioIniciadoSesion(entrenador);
        this.servicioLocal.setUsuarioRegistrado(entrenador);
        //redirigir apagina de entrenador
        this.navCtrl.push(MainEntrenador);
      } else {
        this.contrasenna = '';
        this.revisarCampos();
        this.alertas.mostrarAlerta('Uuups!', 'Contraseña equivocada, inténtelo de nuevo', 'Ok');
      }
    } else {
      this.email = '';
      this.contrasenna = '';
      this.revisarCampos();
      this.alertas.mostrarAlerta('Uuups!', 'Usuario no existente!', 'Ok');
    }
  }

  registrarUsuario(): void {
      this.email = '';
      this.contrasenna = '';
      this.revisarCampos();
      this.navCtrl.push(RegistrarUsuario);
  }

  revisarCampos(): void {
    this.habilitarBoton = true;

    if(this.email == '' || this.contrasenna == '') {
        this.habilitarBoton = false;
        //fire up alert component
    }
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
       console.log('todos los clientes', val);
     })
    this.servicioPersonas.getTodosLosEntrenadores().then((val) => {
       console.log('todos los entrenadores', val);
     })
}



}

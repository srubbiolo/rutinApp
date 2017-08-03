import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Cliente } from '../Modelo/cliente';
import { Entrenador } from '../Modelo/entrenador';
import { Gimnasio } from '../Modelo/gimnasio';
import { Rutina } from '../Modelo/rutina';
import { ServicioLocal } from './servicio.local';

@Injectable()
export class ServicioPersonas {
    constructor(private storage: Storage, private gimnasio: Gimnasio,
                private servicioLocal: ServicioLocal) { }

    setUsuario(dataUsuario: any, tipoUsuario: string): void {
      var arrayUsuarios = [],
          usuario = (tipoUsuario == 'cliente') ? 'clientes' : 'entrenadores';
      this.storage.get(usuario).then((usuarios) => {
        if (usuarios == null) {
           arrayUsuarios.push(dataUsuario);
        } else {
           arrayUsuarios = usuarios;
           arrayUsuarios.push(dataUsuario);
        }
        this.storage.set(usuario, arrayUsuarios);
      })
    }

    actualizarUsuario(): void {
      var promesaCliente = this.getTodosLosClientes(),
          promesaEntrenador = this.getTodosLosEntrenadores(),
          nuevoArrayClientes = [],
          nuevoArrayEntrenadores = [],
          cantidadDeClientes = null,
          cantidadDeEntrenadores = null,
          usuarioRegistrado: any = this.servicioLocal.getUsuarioRegistrado();
      Promise.all([promesaCliente, promesaEntrenador]).then(val => {
        cantidadDeClientes = val[0].length;
        cantidadDeEntrenadores = val[1].length;

        nuevoArrayClientes = val[0].filter(elemento =>{
          return elemento.email !== usuarioRegistrado.email
        })

        nuevoArrayEntrenadores = val[1].filter(elemento =>{
          return elemento.email !== usuarioRegistrado.email
        })

        if (nuevoArrayClientes.length === cantidadDeClientes) {
          nuevoArrayEntrenadores.push(usuarioRegistrado);
          this.storage.set('entrenadores', nuevoArrayEntrenadores);
        } else {
          nuevoArrayClientes.push(usuarioRegistrado);
          this.storage.set('clientes', nuevoArrayClientes);
        }

      })
    }

    actualizarCliente(cliente: Cliente) {
      this.getTodosLosClientes().then(val => {

        var nuevoArrayClientes = val.filter(elemento =>{
          return elemento.email !== cliente.email;
        });
        nuevoArrayClientes.push(cliente);
        this.storage.set('clientes', nuevoArrayClientes);

      })
    }

    asignarRutinaACliente(cliente: Cliente, rutina: Rutina) {
      var usuarioRegistrado: any = this.servicioLocal.getUsuarioRegistrado();
      if (cliente.hasOwnProperty('listaDeRutinas')) {
        cliente.listaDeRutinas.push(rutina);
      } else {
        cliente.listaDeRutinas = [];
        cliente.listaDeRutinas.push(rutina);
      }

      cliente.solicitoRutina = false;
      this.actualizarCliente(cliente);
    }

    setUsuarioIniciadoSesion(dataUsuario: any, tipoUsuario: String): void {
      var objetoUsuario = {sesionIniciada: true, datosDeUsuario: dataUsuario, claseUsuario: tipoUsuario};
      this.storage.set('usuario', objetoUsuario);
    }

    getUsuarioIniciadoSesion(): any {
      return this.storage.get('usuario');
    }

    logOut(): void {
      var objetoUsuario = {sesionIniciada: false, datosDeUsuario: {}};
      this.storage.set('usuario', objetoUsuario)
    }

    setGimnasios(): void {
      var arrayGimnasios = [];

      var gym1 = new Gimnasio();
      gym1.barrio = 'Nueva Córdoba';
      gym1.ciudad = 'Córdoba';
      gym1.cp = 5000;
      gym1.id = 1;
      gym1.nombre = 'Synergy';
      gym1.pais = 'Argentina';
      arrayGimnasios.push(gym1);

      var gym2 = new Gimnasio();
      gym2.barrio = 'Cofico';
      gym2.ciudad = 'Córdoba';
      gym2.cp = 5001;
      gym2.id = 2;
      gym2.nombre = 'Hercules';
      gym2.pais = 'Argentina';
      arrayGimnasios.push(gym2);

      var gym3 = new Gimnasio();
      gym3.barrio = 'Nueva Córdoba';
      gym3.ciudad = 'Córdoba';
      gym3.cp = 5001;
      gym3.id = 3;
      gym3.nombre = 'Best Club';
      gym3.pais = 'Argentina';
      arrayGimnasios.push(gym3);

      var gym4 = new Gimnasio();
      gym4.barrio = 'Recoleta';
      gym4.ciudad = 'Buenos Aires';
      gym4.cp = 1001;
      gym4.id = 4;
      gym4.nombre = 'Gym City';
      gym4.pais = 'Argentina';
      arrayGimnasios.push(gym4);

      this.storage.set('gimnasios', arrayGimnasios);
    }

    asignarClienteAEntrenador(cliente: Cliente): void {
      var usuarioRegistrado: any = this.servicioLocal.getUsuarioRegistrado();
      var listaDeClientes = [];
      if (usuarioRegistrado.hasOwnProperty('listaDeClientes')) {
        usuarioRegistrado.listaDeClientes.push(cliente.email);
      } else {
        usuarioRegistrado.listaDeClientes = [];
        usuarioRegistrado.listaDeClientes.push(cliente.email);
      }

      this.servicioLocal.setUsuarioRegistrado(usuarioRegistrado);
      this.actualizarUsuario();

      //ahora se lo seteo al cliente.
      cliente.emailDelEntrenador = usuarioRegistrado.email;
      this.actualizarCliente(cliente);
    }

    usuarioPideRutina(): void {
      var usuarioRegistrado: any = this.servicioLocal.getUsuarioRegistrado();
      usuarioRegistrado.solicitoRutina = true;
      this.actualizarCliente(usuarioRegistrado);
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
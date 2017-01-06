import { Component , OnInit} from '@angular/core';

import { NavController } from 'ionic-angular';
import { ServicioPersonas } from '../../app/servicios/servicio.persona';
import { Cliente } from '../../app/Modelo/cliente';
import { Entrenador } from '../../app/Modelo/entrenador';
import { Gimnasio } from '../../app/Modelo/gimnasio';
import { Alertas } from '../../app/componentes/alertas/alertas';

@Component({
  selector: 'registrar-usuario',
  templateUrl: 'registrarUsuario.html'
})
export class RegistrarUsuario implements OnInit{

  TIEMPO_TIMEOUT = 300;
  gimnasios:  Gimnasio[];
  gimnasioSeleccionado;
  usuarioSeleccionado;
  tipoUsuario;
  gimnasioDeUsuario: Gimnasio;

  constructor(public navCtrl: NavController, private servicioPersonas: ServicioPersonas,
              private cliente: Cliente, private alertas: Alertas, private entrenador: Entrenador,
              private gimnasio: Gimnasio) {
  }

  ngOnInit(): void {
    this.usuarioSeleccionado = true;
    this.gimnasioSeleccionado = false;
    this.recargarGimnasios();
  }

  recargarGimnasios(): void {
    this.servicioPersonas.getGimnasios().then((val) => {
      this.gimnasios = val;
    })
  }

  tipoUsuarioSeleccionado() {
    setTimeout(() => {
      console.log('usuarioSeleccionado', this.tipoUsuario);
      this.usuarioSeleccionado = true;
    }, this.TIEMPO_TIMEOUT);
  }

  agregarGimnasio(gym: Gimnasio) {
    setTimeout(() => {
      this.gimnasioDeUsuario = gym;
      this.gimnasioSeleccionado = true;
      this.usuarioSeleccionado = false;
    }, this.TIEMPO_TIMEOUT);
  }

  sinGimnasio() {
    setTimeout(() => {
      this.gimnasioDeUsuario = null;
      this.gimnasioSeleccionado = true;
      this.usuarioSeleccionado = false;
    }, this.TIEMPO_TIMEOUT);
  }

  getItems(ev: any) {
    //TODO revisar que solo cuando borras todo fonca
    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.gimnasios = this.gimnasios.filter((item) => {
        return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.recargarGimnasios();
    }
  }



}

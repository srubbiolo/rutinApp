import { Component , OnInit} from '@angular/core';

import { NavController } from 'ionic-angular';
import { ServicioPersonas } from '../../app/servicios/servicio.persona';
import { Cliente } from '../../app/Modelo/cliente';
import { Entrenador } from '../../app/Modelo/entrenador';
import { Gimnasio } from '../../app/Modelo/gimnasio';
import { Alertas } from '../../app/componentes/alertas/alertas';

@Component({
  selector: 'main-entrenador',
  templateUrl: 'mainEntrenador.html'
})
export class MainEntrenador implements OnInit{

  // myContent = {coso1:'lala', coso2:'lallal'};
  constructor(public navCtrl: NavController, private servicioPersonas: ServicioPersonas,
              private cliente: Cliente, private alertas: Alertas, private entrenador: Entrenador) {}

  ngOnInit(): void {
  }
}

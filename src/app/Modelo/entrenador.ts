import { Persona } from './persona';
import { Rutina } from './rutina';
import { Cliente } from './cliente';

export class Entrenador extends Persona {
    listaDeClientes: Cliente [];
    listaDeRutinas: Rutina [];
}
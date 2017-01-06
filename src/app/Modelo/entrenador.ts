import { Persona } from './persona';
import { Rutina } from './rutina';
import { Cliente } from './cliente';
import { Gimnasio } from './gimnasio';

export class Entrenador extends Persona {
    gimnasio: Gimnasio;
    listaDeClientes: Cliente [];
    listaDeRutinas: Rutina [];
}
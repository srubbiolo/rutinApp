import { Persona } from './persona';
import { Cliente } from './cliente';
import { Gimnasio } from './gimnasio';
import { Dieta } from './dieta';

export class Nutricionista extends Persona {
    gimnasio: Gimnasio;
    listaDeClientes: Cliente [];
    listaDeDietas: Dieta [];
}
import { Entrenador } from './entrenador';
import { Cliente } from './cliente';

export class Gimnasio {
    id: number;
    nombre: String;
    ciudad: String;
    barrio: String;
    cp: number;
    pais: String;
    entrenadores: Entrenador [];
    clientes: Cliente [];
}
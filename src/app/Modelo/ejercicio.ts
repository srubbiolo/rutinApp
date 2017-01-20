import { Entrenador } from './entrenador';

export class Ejercicio {
    emailDelCreador: String;
    nombre: String;
    repeticiones: number;
    series:number;
    peso: number;
    esCombinado: boolean;
    ilustracion: ImageData;
    descripcion: String;
    ejercicioConActualizaciones: boolean;
    ejercicioCompletado: boolean;
    seriesHechas: number;
    repeticionesHechas: number;
    pesoConElQueSeHizo: number;
}
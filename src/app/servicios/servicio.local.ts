export class ServicioLocal {
    usuarioRegistrado: Object;

    constructor() {
        this.usuarioRegistrado = null;
    }

    setUsuarioRegistrado(usuario) {
        this.usuarioRegistrado = usuario;
    }

    getUsuarioRegistrado() {
        return this.usuarioRegistrado;
    }
}
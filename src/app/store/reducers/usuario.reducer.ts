import { Usuario } from 'src/app/models/usuario.model';
import * as fromUsuario from '../actions';

// Creamos la interfaz del objeto a manejar
export interface UsuarioState {
    user: Usuario;
    loaded: boolean;
    loading: boolean;
    error: any;
}

// Creamos el estado inicial
const estadoInicial: UsuarioState = {
    user: null,
    loaded: false,
    loading: false,
    error: null
};


// Definimos los reducer asociados a las acciones
export function usuarioReducer( state = estadoInicial, action: fromUsuario.usuarioAcciones): UsuarioState {

    switch ( action.type ) {
        case fromUsuario.CARGAR_USUARIO:
            // Lo unico que hace esta acción es activar el loading.
            return {
                ...state,
                loading: true,
                error: null
            };

        case fromUsuario.CARGAR_USUARIO_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                user: {...action.usuario} // Esto lo hacemos para garantizar que es una objeto nuevo sino seria "action.usuario"
            };
        case fromUsuario.CARGAR_USUARIO_FAIL:
            return{
                ...state,
                loading: false,
                loaded: false, // ponemos el loaded a false porque no ha cargado correctamente.
                // error: action.payload // Asi nos da todos los errores, hagamoslo para que nos devuelva solo lo que nos interesa
                error: {
                    status: action.payload.status,
                    message: action.payload.message,
                    url: action.payload.url
                },
                user: null

            };


        default:
            return state;
    }
}

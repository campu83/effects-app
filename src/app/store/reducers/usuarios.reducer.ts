import { Usuario } from 'src/app/models/usuario.model';
import * as fromUsuarios from '../actions';

// Creamos la interfaz del objeto a manejar
export interface UsuariosState {
    users: Usuario[];
    loaded: boolean;
    loading: boolean;
    error: any;
}

// Creamos el estado inicial
const estadoInicial: UsuariosState = {
    users: [],
    loaded: false,
    loading: false,
    error: null
};


// Definimos los reducer asociados a las acciones
export function usuariosReducer( state = estadoInicial, action: fromUsuarios.usuariosAcciones): UsuariosState {

    switch ( action.type ) {
        case fromUsuarios.CARGAR_USUARIOS:
            // Lo unico que hace esta acción es activar el loading.
            return {
                ...state,
                loading: true,
                error: null
            };

        case fromUsuarios.CARGAR_USUARIOS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                users: [...action.usuarios] // Esto lo hacemos para garantizar que es una objeto nuevo sino seria "action.usuarios"
            };
        case fromUsuarios.CARGAR_USUARIOS_FAIL:
            return{
                ...state,
                loading: false,
                loaded: false, // ponemos el loaded a false porque no ha cargado correctamente.
                // error: action.payload // Asi nos da todos los errores, hagamoslo para que nos devuelva solo lo que nos interesa
                error: {
                    status: action.payload.status,
                    message: action.payload.message,
                    url: action.payload.url
                }

            };


        default:
            return state;
    }
}

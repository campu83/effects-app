// Clase que relaciona todos los state y los reducers ( se importa en el app.module.ts)
import * as reducers from './reducers';
import { ActionReducerMap } from '@ngrx/store';


// Creamos la interfaz de todos los state (objetos) que manejaremos
export interface AppState {
    usuarios: reducers.UsuariosState;
    usuario: reducers.UsuarioState;
}

// Creamos la constante de todos reducers (funciones reducer) que gestionan los estados.
// Esta constante se usara en el app.module.ts "StoreModule.forRoot( appReducers )"
export const appReducers: ActionReducerMap<AppState> = {
    usuarios: reducers.usuariosReducer,
    usuario: reducers.usuarioReducer
};

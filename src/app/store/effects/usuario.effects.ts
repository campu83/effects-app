import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as usuarioActions from '../actions';
import { of } from 'rxjs'; // Esto se usa para convertir la respuesta en observable, usado en el cachError
import { map, switchMap, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';


@Injectable()
export class UsuarioEffects {
    // se usa $ al final de la variable para definir las variables que son observables, solo es para identificarlos.
    constructor(private actions$: Actions, public usuariosService: UsuarioService) {}

    // Esta es un efecto que se disparará cuando "despachemos" un action del tipo CARGAR_USUARIO.
    @Effect() // Esto se usa para que no dispare acciones @Effect({dispatch: false })
    cargarUsuarios$ = this.actions$.pipe(ofType(usuarioActions.CARGAR_USUARIO))
    .pipe(
         // switchMap cancelamos la acción actual (CARGAR_USUARIO), para generar otra nueva
        switchMap( action => {
            // Ejecutamos el servicio, y con un pipe lo mandamos en la nueva accion.
            return this.usuariosService.getUserById(action['id'])
                .pipe(
                    // si todo va bien
                    map(user => new usuarioActions.CargarUsuarioSuccess(user)),
                    // si se produce un error
                    catchError( error => of(new usuarioActions.CargarUsuarioFail(error)))
                );
            })
        );
}

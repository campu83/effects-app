// En esta clase pondremos todos los efectos para poder usarlos solo con esta exportación.
import { UsuariosEffects } from './usuarios.effects';
import { UsuarioEffects } from './usuario.effects';

// Los sacamos como array que es como lo necesita app.module.
export const effectArr: any[] = [ UsuariosEffects, UsuarioEffects ];

// Hacemos un export para usar directamente este archivo para acceder a todos los efectos.
export * from './usuarios.effects';
export * from './usuario.effects';

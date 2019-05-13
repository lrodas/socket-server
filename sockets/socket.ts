import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuario-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista

export const conectarCliente = (cliente: Socket) => {

    const usuario = new Usuario(cliente.id);

    usuariosConectados.agregar(usuario);
}

export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {

        usuariosConectados.borrarUsuario(cliente.id);
        console.log('cliente desconectado');
    })
}

// Escuchar mensaje
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('mensaje', (payload)=> {

        console.log('Mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload);
    });

};

// Configurar usuario
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('configurar-usuario', (payload, callback: Function) => {
        
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado`
        });
    });
};
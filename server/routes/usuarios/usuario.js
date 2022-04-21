const express = require('express');
const res = require('express/lib/response');
const app = express.Router();
const arrJsnUsuarios = {_id: 1, strNombre: "", strApellido: "", strEmail: "" };

//const nombre = req.body.strNombre, apellido = req.body.strApellido, email = req.body.strEmail, id = _id;
//const path = require('path');
//const rutaDescarga = path.resolve(__dirname, '../../assets/index.html')

app.get('/', (req,res)=>{
    const arrUsuarios = arrJsnUsuarios;

    if (arrUsuarios.length > 0) {
   return res.status(200).json({
        ok: true,
        msg:'Se recibieron los usuarios de forma exitosa',
        cont: { arrJsnUsuarios }
    })
}else{
    res.status(400).json({
        ok: false,
        msg: 'No se encontraron usuarios: ',
        cont:{
            arrJsnUsuarios
        }
    })

}
    
   //console.log(rutaDescarga);
  // return res.download(rutaDescarga, 'index.html');
})



    app.post('/',(req,res) =>{       

        const body = {
            strNombre: req.body.strNombre,
            strApellido: req.body.strApellido,
            strEmail: req.body.strEmail,
            _id: Number(req.body._id)
        }

        if(body.strNombre && body.strApellido && body.strEmail && body._id) {
        
        const encontroUsuario = arrJsnUsuarios.find(usuario => usuario._id == body._id || usuario.strEmail == body.strEmail)
        if (encontroUsuario) {
            res.status(400).json({
                ok: false,
                msg: 'El usuario ya se encuentra registrado: ',
                cont:{
                    encontroUsuario
                }
            })
        }else{
            arrJsnUsuarios.push(body)
            res.status(200).json({
            ok: true,
            msg: 'Se registró el usuario de manera correcta',
            cont: {
                arrJsnUsuarios
            }
        })  
        } 

    }else{
        res.status(400).json({
            ok: false,
            msg: 'No se recibió alguno o todos los valores requeridos (strNombre, strApellido, strEmail, _id): ',
            cont:{
                body
            }
        })
    }           
})

app.put('/', (req, res) => {
    const _idUsuario = parseInt(req.query._idUsuario);
    if (_idUsuario) {
        const encontroUsuario = arrJsnUsuarios.find(usuario => usuario._id === _idUsuario);
        if (encontroUsuario) {
            const actualizarUsuario = { _id: _idUsuario, strNombre: req.body.strNombre, strApellido: req.body.strApellido, strEmail: req.body.strEmail}
            const filtrarUsuario = arrJsnUsuarios.filter(usuario => usuario._id != _idUsuario)
            arrJsnUsuarios = filtrarUsuario;
            arrJsnUsuarios.push(actualizarUsuario);
            return res.status(200).json({
                ok: true,
                msg: 'El usuario se actualizó de manera exitosa',
                cont: {
                    actualizarUsuario
                }
            })
        } else {
            return res.status(400).json({
                ok: false,
                msg: `El usuario con el id: ${_idUsuario}, no se encuentra registrado en la base de datos`,
                cont:{
                    _idUsuario
                }
            })
        }
    }else{
        return res.status(400).json({
            ok: false,
            msg: 'El identificador del usuario no existe',
            cont:{
                _idUsuario
            }
        })
    }
})

app.delete('/', (req,res) => {
    const _idUsuario = parseInt(req.query._idUsuario);
    if (!_idUsuario) {
        return res.status(400).json({
            ok:false,
            msg: 'No se recibió un identificador de usuario',
            cont: {
                _idUsuario
            }
        })
    } 
    const encontroUsuario = arrJsnUsuarios.find(usuario => usuario._id == _idUsuario)
    if(!encontroUsuario){
        return res.status(400).json({
            ok: false,
            msg: `No se encontró un usuario con el id: ${_idUsuario} en la base de datos`,
            cont: {
                _idUsuario
            }
        })
    }
    const usuarioFiltrado = arrJsnUsuarios.filter(usuario => usuario._id != _idUsuario);
    //arrJsnUsuarios = usuarioFiltrado;
    return res.status(200).json({
        ok: true,
        msg: 'Se eliminó de manera exitosa el usuario:',
        cont: { encontroUsuario}
    })
})

module.exports = app;
const express = require('express');
const app = express.Router();

const arrJsnProductos = [{_id: 1, strNombre: "", strDescripcion: "", nmbCantidad: 0, nmbPrecio: 0} ]

module.exports = app;

app.get('/', (req,res)=>{
    const arrProductos = arrJsnProductos;

    if (arrProductos.length > 0) {
        return res.status(200).json({
             ok: true,
             msg:'Se recibieron los productos de forma exitosa',
             cont: { arrJsnProductos }
         })
     }else{
         res.status(400).json({
             ok: false,
             msg: 'No se encontraron productos: ',
             cont:{
                 arrJsnProductos
             }
         })
     
     }
}) //Fin de metodo GET

app.post('/', (req, res)=>{

    const arrProductos = arrJsnProductos;
    const body = {
        _id: Number(req.body._id),
        strNombre: req.body.strNombre,
        strDescripcion: req.body.strDescripcion,
        nmbCantidad: req.body.nmbCantidad,
        nmbPrecio: req.body.nmbPrecio
    }

    if (body._id && body.strNombre && body.strDescripcion && body.nmbCantidad && body.nmbPrecio) {
        const encontroProducto = arrJsnProductos.find(it => it._id == body._id)
        if (encontroProducto) {
            res.status(400).json({
                ok: false,
                msg: 'El producto ya se encuentra registrado: ',
                cont:{
                    encontroProducto
                }
            })
        }else{
            arrJsnProductos.push(body)
            res.status(200).json({
            ok: true,
            msg: 'Se registró el producto de manera correcta',
            cont: {
                arrJsnProductos
                    }
                })  
            } 
    } else {
        res.status(400).json({
            ok: false,
            msg: "No se recibió alguno o todos los valores requeridos (_id, strNombre, strDescripcion, nmbCantidad, nbmPrecio)",
            cont: {body}
        })
    }
})//Fin de metodo POST


app.put('/',(req, res) => {
    //var arreglo = arrJsnProductos.slice();
    const _idProducto = parseInt(req.query._idProducto);
    if (_idProducto) {
        const encontroProducto = arrJsnProductos.find(producto => producto._id === _idProducto)
        if (encontroProducto) {
            const actualizarProducto = {_id: _idProducto, strNombre: req.body.strNombre, strDescripcion: req.body.strDescripcion, nmbCantidad: req.body.nmbCantidad, nmbPrecio: req.body.nmbPrecio};
            const index = arrJsnProductos.findIndex(producto => producto._id === _idProducto)
          // arrJsnProductos = filtrarProducto.slice();
           //arrJsnProductos.push(actualizarProducto);
           arrJsnProductos[index] = actualizarProducto;
            return res.status(200).json({
                ok: true,
                msg: 'El producto se actualizó de manera exitosa',
                cont: {
                    actualizarProducto
                }
            })
        }else{
            return res.status(400).json({
                ok: false,
                msg: `El producto con el id: ${_idProducto}, no se encuentra registrado en la base de datos`,
                cont:{
                    _idProducto
                }
            })
        }
    } else {
        return res.status(400).json({
            ok: false,
            msg: "El id de producto no existe",
            cont:{_idProducto}
        })
    }
}) //Fin del metodo PUT

app.delete('/', (req,res) =>{
    const _idProducto = parseInt(req.body._idProducto)
    if (!_idProducto) {
        return res.status(400).json({
            ok:false,
            msg: 'No se recibió un identificador de producto',
            cont: {
                _idProducto
            }
        })
    }

    const encontroProducto = arrJsnProductos.find(producto => producto._id == _idProducto )
    if(!encontroProducto){
        return res.status(400).json({
            ok: false,
            msg: `No se encontró un producto con el id: ${_idProducto} en la base de datos`,
            cont: {
                _idProducto
            }
        })
    }

    let indice = arrJsnProductos.findIndex(i=> i._id == _idProducto);
    arrJsnProductos.splice(indice,1);
    return res.status(200).json({
        ok: true,
        msg: 'Se eliminó de manera exitosa el producto:',
        cont: { encontroProducto}
    })

}) //Fin del metodo DELETE


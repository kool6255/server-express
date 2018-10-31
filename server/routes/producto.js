const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion')
let app = express();
let Producto = require('../models/producto');

app.get('/producto', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({ disponible: true })
        .populate('categoria')
        .populate('usuario', 'nombre email')
        .skip(desde)
        .limit(5)
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };

            res.json({
                ok: true,
                productos
            });
        })

});

app.get('/producto/:id', verificaToken, (req, res) => {
    //un producto por id
    //populate: usuario de categoria
    //paginado


    let id = req.params.id;
    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };
            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'producto no encontrado'
                    }
                });
            }
            res.json({
                ok: true,
                producto: productoDB
            })
        })


});


app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };
            res.json({
                ok: true,
                productos
            })
        })
});

app.post('/producto', verificaToken, (req, res) => {

    let body = req.body

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precio,
        descripcion: body.descripcion,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            producto: productoDB
        });
    });

});

app.put('/producto/:id', verificaToken, (req, res) => {
    //actualizar producto
    //grabar categoria
    let id = req.params.id;
    let body = req.body;

    let descProducto = {
        nombre: body.nombre,
        precioUni: body.precio,
        descripcion: body.descripcion
    };
    Producto.findByIdAndUpdate(id, descProducto, { new: true, runValidators: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            producto: productoDB
        });
    })
});

app.delete('/producto/:id', verificaToken, (req, res) => {
    //actualizar producto a no disponible
    let id = req.params.id;

    Producto.findByIdAndUpdate(id, { disponible: false }, { new: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            producto: productoDB
        });
    });
});

module.exports = app;
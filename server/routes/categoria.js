const express = require('express');
let { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');

let app = express();
let Categoria = require('../models/categoria');

app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({})
        .populate('usuario', 'nombre email')
        .sort('descripcion')
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            res.json({
                ok: true,
                categorias
            });
        });
});

app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id
    Categoria.findById(id, (err, caterogiaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!caterogiaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'no existe una categoria con este id'
                }
            });
        }
        res.json({
            ok: true,
            categoria: caterogiaDB
        });
    });
});
app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });
});
app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    };
    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });

});
app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id;
    Categoria.findOneAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'el id no existe'
                }
            });
        };
        res.json({
            ok: true,
            message: 'categoria borrada'
        })

    })
});

module.exports = app;
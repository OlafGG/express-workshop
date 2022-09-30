const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post("/", (req, res, next)=>{
    return res.status(200).send(req.body);
});

pokemon.get("/", async (req, res, next)=>{
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json(pkmn);
});

pokemon.get('/:id([0-9]{1,3})', (req, res, next)=>{
    const id = req.params.id - 1;
    if(id >= 0 && id <= 150){
        return res.status(200).send(pk[req.params.id - 1]);
    } 
    return res.status(404).send("Pokemon no encontrado");
});

pokemon.get('/:name([A-Za-z]+)', (req, res, next) => {
    const name = req.params.name;

    const pkmn = pk.filter((p)=>{
        //Operador ternario
        //condicion ? valor si verdadero : valor si falso
        //Con el AND retorna la P
        return (p.name.toUpperCase() == name.toUpperCase()) && p;
    });

    if(pkmn.length > 0){
        return res.status(200).send(pkmn);
    }
    return res.status(404).send("Pokemon no encontrado");
});

module.exports = pokemon;//comun, pero solo una cosa
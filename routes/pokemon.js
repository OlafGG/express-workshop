const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post("/", (req, res, next)=>{
    return res.status(200).send(req.body);
});

pokemon.get("/", async (req, res, next)=>{
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json({code: 1, message: pkmn});
});

pokemon.get('/:id([0-9]{1,3})', async(req, res, next)=>{
    const id = req.params.id;
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id = " + id);
    if(pkmn > 0 && pkmn < 722){
        return res.status(200).json({code: 1, message: pkmn});
    }
    return res.status(404).json({code: 404, message: "Pokemon no encontrado"});
});

pokemon.get('/:name([A-Za-z]+)', async(req, res, next) => {
    const name = req.params.name;
    
    /*const pkmn = pk.filter((p)=>{
        //Operador ternario
        //condicion ? valor si verdadero : valor si falso
        //Con el AND retorna la P
        return (p.name.toUpperCase() == name.toUpperCase()) && p;
    });*/
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name = '" + name.toLowerCase() + "'");
    if(pkmn > 0){
        return res.status(200).json({code: 1, message: pkmn});
    }
    return res.status(404).json({code: 404, message: "Pokemon no encontrado"});
});

module.exports = pokemon;//comun, pero solo una cosa
require('dotenv').config();
const { Router, response } = require('express');
const { Pokemon, Type } = require('../db.js');
const axios = require('axios');
const router = Router();

const {
  API_URL,
} = process.env;



router.get('/:idPokemon', async (req, res, next) => {
    const { idPokemon } = req.params
    let dataPokemon;
    try {
      if(idPokemon.includes('-')){
        dataPokemon = await Pokemon.findById(idPokemon,{include: Type})
        dataPokemon={
          id:dataPokemon.id,
          height:dataPokemon.height,
          image: 'default',
          hp: dataPokemon.hp,
          attack: dataPokemon.attack,
          defense: dataPokemon.defense,
          speed: dataPokemon.speed,
          weight: dataPokemon.weight,
          types: dataPokemon.types.map(type=>type.type.name), 
        }
      }else{
        let pokemonResponse=await axios.get(`${API_URL}pokemon/${idPokemon}`)
        let data= pokemonResponse.data
        dataPokemon={
          id:data.id,
          height:data.height,
          image: data.sprites.front_default,
          hp: data.stats.map(stat=>stat.stat.name==="hp"?stat.base_stat:null).filter(data=>data!=null)[0],
          attack: data.stats.map(stat=>stat.stat.name==="attack"?stat.base_stat:null).filter(data=>data!=null)[0],
          defense: data.stats.map(stat=>stat.stat.name==="defense"?stat.base_stat:null).filter(data=>data!=null)[0],
          speed: data.stats.map(stat=>stat.stat.name==="speed"?stat.base_stat:null).filter(data=>data!=null)[0],
          weight: data.weight,
          types: data.types.map(type=>type.type.name),
        }
      }
      if(dataPokemon.length>0)
        res.json(dataPokemon).status(200)
      else
        res.send("Not found Pokemon").status(400)
      
    } catch (error) {
      next(error)
    }
})

router.get('/', async (req, res, next) => {
  const {name=null} = req.query;
  let apiPokemon;
  try {
    $enlace='';
    if(name){//existe query

    }else{
      let dataapi= await axios.get(
        `${API_URL}/pokemon`
      )
      apiPokemon = dataapi.data.results.map(pokem=>{   
        let info = axios.get(`${pokem.url}`)
        return{
          name:pokem.name,
          url: pokem.url,
          info: info,    
        }
      })
    }
    //res.json(apiPokemon).status(200);
    
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
    const { name, hp, attack, defense, speed, height, weight } = req.body;
    console.log(name, hp, attack)
    try {
       Pokemon.create({
        name, 
        hp, 
        attack,
        defense,
        speed,
        height,
        weight,
      }) 
      .then(pokemon=>res.send('Pokemon registrado').status(200))
      //.then(pokemon => pokemon.setTypes(types))
      //.then(pokemontype => res.json(pokemontype).status(200))
      
    } catch (error) {
      next(error)
    }
})

module.exports = router;
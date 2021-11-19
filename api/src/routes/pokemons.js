require('dotenv').config();
const { Router, response } = require('express');
const { Pokemon, Type } = require('../db.js');
const axios = require('axios');
const router = Router();
const { getDataPokemonAPI, getIDType, getDataPokemonDB } = require ('../Functions/getData.js');
const db = require('../db.js');

const {
  API_URL,
} = process.env;



router.get('/:idPokemon', async (req, res, next) => {
    const { idPokemon } = req.params
    let dataPokemon;
    try {
      if(idPokemon.includes('-')){
        dataPokemon = await Pokemon.findById(idPokemon,{include: Type})
        dataPokemon=getDataPokemonDB(dataPokemon,true)
      }else{
        let URLPok=`${API_URL}pokemon/${idPokemon}`;
        console.log(URLPok)
        dataPokemon=await getDataPokemonAPI(URLPok); 
      }
      res.json(dataPokemon).status(200)
      
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
      const url_name=`${API_URL}/pokemon/${name}`;
      //apiPokemon= await axios.get(url_name).catch(()=> []);
      apiPokemon= await getDataPokemonAPI(url_name)
      //console.log(apiPokemon)
       if(apiPokemon.length===0){
        let dbpokemons = await Pokemon.findOne({
          where:{
              name:name
          },
          include:Type
          })
          dbpokemons = await dbpokemons.dataValues;
          apiPokemon = await getDataPokemonDB([dbpokemons],true)
      } /**/
    }else{
      let dataapi= await axios.get(`${API_URL}/pokemon?offset=0&limit=40`)
      apiPokemon = dataapi.data.results.map(async pokem=>{
        const {id,name,image, height, types} = await getDataPokemonAPI(pokem.url)
        return {
          id:id,
          name: name,
          image: image,
          height: height, 
          types: types}
      })
      apiPokemon= await Promise.all(apiPokemon)
      let dbPokem=await Pokemon.findAll({include:Type});
      dbPokem = dbPokem.map(pokemdata=>{
        return pokemdata.dataValues
      })
      let dataDB = await getDataPokemonDB(dbPokem,true)
      apiPokemon=[...apiPokemon, ...dataDB]
    }
    res.json(apiPokemon).status(200);
    
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
    const { name, hp, attack, defense, speed, height, weight, types } = req.body;
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
      //.then( pokemon=>{//res.send(getIDType(types)).status(200))})
      .then(async pokemon => {
        return pokemon.setTypes(await getIDType(types))
      })
      .then(pokemontype => res.json(pokemontype).status(200))  
    } catch (error) {
      next(error)
    }
})

module.exports = router;
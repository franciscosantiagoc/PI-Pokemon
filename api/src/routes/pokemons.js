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
        console.log('bd')
        //dataPokemon = await Pokemon.findByPk(idPokemon,{include: Type, include:{attributes:['name']}})
        dataPokemon = await Pokemon.findByPk(idPokemon,{include: [{model: Type,attributes:['name']}]})
        //console.log([dataPokemon.dataValues])
        dataPokemon=getDataPokemonDB([dataPokemon.dataValues],false)
      }else{
        //console.log('axio')
        let URLPok=`${API_URL}pokemon/${idPokemon}`;
        //console.log(URLPok)
        dataPokemon=await getDataPokemonAPI(URLPok); 
      }
      if(dataPokemon.length===0) return res.send('Pokemon is not found').status(404)
      res.json(dataPokemon).status(200) 
    } catch (error) {
      res.send(400).status(404);
    }
})

router.get('/', async (req, res, next) => {
  const {name=null} = req.query;
  let apiPokemon;
  try {
    $enlace='';
    if(name){//existe query
      const url_name=`${API_URL}/pokemon/${name}`;
      apiPokemon= await getDataPokemonAPI(url_name)
      
       if(apiPokemon.length===0){
        let dbpokemons = await Pokemon.findOne({
          where:{
              name:name
          },
          include:Type
          })
          if(dbpokemons!=null){
            dbpokemons = await dbpokemons.dataValues;
            apiPokemon = await getDataPokemonDB([dbpokemons],true)
          }else{
            apiPokemon='Pokemon is not found'
          }
      }
    }else{
      let dataapi= await axios.get(`${API_URL}/pokemon?offset=0&limit=70`)
      apiPokemon = dataapi.data.results.map(async pokem=>{
        const {id,name,image, types, attack} = await getDataPokemonAPI(pokem.url)
        return {
          id:id,
          name: name,
          image: image,
          types: types,
          attack:attack,
        }
      })
      apiPokemon= await Promise.all(apiPokemon)
      let dbPokem=await Pokemon.findAll({include:Type});
      dbPokem = dbPokem.map(pokemdata=>{
        return pokemdata.dataValues
      })
      let dataDB = await getDataPokemonDB(dbPokem,true)
      apiPokemon=[...apiPokemon, ...dataDB]
    }
    res.send(apiPokemon).status(200);
    
  } catch (error) {
    res.send('Pokemons not found').status(404)
  }
})

router.post('/', async (req, res, next) => {
    const { name, hp, attack, defense, speed, height, weight, types,image } = req.body;
    try {
       Pokemon.create({
        name, 
        hp, 
        attack,
        defense,
        speed,
        height,
        weight,
        image
      }) 
      //.then( pokemon=>{//res.send(getIDType(types)).status(200))})
      .then(async pokemon => {//['bug','flying']
        return pokemon.setTypes(await getIDType(types))
      })
      .then(pokemontype => res.json(pokemontype).status(200)) 
      .catch(err => res.send('Pokemon existente').status(404)) 
    } catch (error) {
      res.send('Name is required to create a new pokemon').status(404)
    }
})

module.exports = router;
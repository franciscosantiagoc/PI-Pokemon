const { Pokemon, Type } = require('../db.js');
const axios = require('axios');
function getStat(stats) {
    return (name)=>{
        let stat = stats.map(stat=>stat.stat.name===name?stat.base_stat:null)
        return stat.filter(data=>data!=null)[0]
    }
}

 async function getIDType(names){
    let ids=[]
    for(let i=0; i<names.length; i++) {
        let data = await Type.findOne({
            where:{name:names[i]},
            attributes:["id"]
        })
        ids.push(data.dataValues.id)
    }
    return ids;
}

async function getDataPokemonAPI(URL){
    let pokemonResponse=await axios.get(URL).catch(()=>[])
    
    if(pokemonResponse.length===0) return pokemonResponse;
    
    let data= pokemonResponse.data
    let dat=getStat(data.stats)
    dataPokemon={
        id:data.id,
        name:data.name,
        height:data.height,
        image: data.sprites.other.dream_world.front_default,
        hp: dat("hp"),
        attack: dat("attack"),
        defense: dat("defense"),
        speed: dat("speed"),
        weight: data.weight,
        types: data.types.map(type=>type.type.name),
    }
    return dataPokemon;
}

function getDataPokemonDB(data,global){
    console.log('map')
    //console.log(data)
    return data.map(Pokem=>{
        console.log(Pokem)
        if(!global){
            return{
            id:Pokem.id,
            name:Pokem.name,
            height:Pokem.height,
            image: Pokem.image,
            hp: Pokem.hp,
            attack: Pokem.attack,
            defense: Pokem.defense,
            speed: Pokem.speed,
            weight: Pokem.weight,
            types: Pokem.types.map(type=>type.dataValues.name?type.dataValues.name:type.type.name), 
            }
        }else{
            return{
                id:Pokem.id,
                name:Pokem.name,
                height:Pokem.height,
                image: Pokem.image,
                weight: Pokem.weight,
                types: Pokem.types.map(type=>{
                    return type.dataValues.name
                }), 
            }
        }
    })
}


module.exports={
    getStat,
    getIDType,
    getDataPokemonAPI,
    getDataPokemonDB
}
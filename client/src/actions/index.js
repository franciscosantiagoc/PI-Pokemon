import axios from 'axios';


function getAllPokemons() {
  return {
    type: 'GET_ALL_POKEMONS',
  }
};

function getPokemonName(name) {
  return {
    type: 'GET_POKEMON_NAME',
    payload: name
  }
}

function getPokemonID(id){
    return {
        
    }
}

function getPokemon(){
    return {
        type: 'GET_POKEMON',
    }
}

export function receivePokemon(pokemons) {
    return {
      type: 'RECEIVE_POKEMON',
      pokemons
    }
  }

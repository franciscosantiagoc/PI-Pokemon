import axios from 'axios';
let rutaServidor='http://localhost:3001';


export function getAllPokemons() {
  return function (dispatch) {
    dispatch(getPokemon());
    console.log(`${rutaServidor}/pokemons`)
    axios.get(`${rutaServidor}/pokemons`)
      .then(r =>  r.data)
      .then(d => dispatch(receivePokemon(d)))
      .then(() => dispatch(getPokemonTypes()))
      .catch(e => console.log(e));
  }
};

function getIdPokemon(id) {
  return function (dispatch) {
    dispatch(getPokemon());
    axios.get(`${rutaServidor}/pokemons/${id}`)
      .then(r => r.data)
      .then(d => dispatch(receivePokemon(d)))
      .catch(e => console.log(e));
  }
};

function getNamePokemon(name) {
  return function (dispatch) {
    dispatch(getPokemon());
    axios.get(`${rutaServidor}/pokemons?name=${name}`)
      .then(r => r.data)
      .then(d => dispatch(receivePokemon(d)))
      //.then(d => dispatch(receivePokemon(d)))
      .catch(e => console.log(e));
  }
};

function postPokemon(obj) {
  return function (dispatch) {
    dispatch(getPokemon());
    axios.post(`${rutaServidor}/pokemons`,obj)
      .then(r => r.data)
      .then(d => dispatch(pokemonRegistered()))
      .catch(e => console.log(e));
  }
};

function getPokemonTypes() {
  return function (dispatch) {
    dispatch(getPokemon());
    axios.get(`${rutaServidor}/types`)
      .then(r => r.data)
      .then(d => dispatch(receiveTypes(d)))
      .catch(e => console.log(e));
  }
};

function getPokemon(){
  return {
      type: 'GET_POKEMON',
  }
}

function receivePokemon(pokemons) {
  return {
    type: 'RECEIVE_POKEMON',
    pokemons
  }
}

function receiveTypes(types) {
  return {
    type: 'RECEIVE_TYPES',
    types
  }
}

export function pokemonRegistered(){
  return {
    type: 'POKEMON_REGISTERED',
  }
}

//----------------FILTROS-----------------
function pokefilterOrigin(solic){
  if(solic==="api")
    return {
        type: 'POKEMONS_API',
    }
  else return {
    type: 'POKEMONS_DB',
  }

}

function filterTypePokemons(filtro) {
  console.log(filtro)
  if(filtro!="all") return {
    type:'POKEMON_FILTER_TYPE',
    filtro:filtro
  }
  
}

export function orderPokemons(order) {
  console.log(order)
  if(order==="ascnam") return {
    type:'POKEMON_NAME_ORASC'}
  else if(order==="descname") return {
    type:'POKEMON_NAME_ORDESC'}
  else if(order==="ascatt") return {
    type:'POKEMON_ATTACK_ORASC'}
  else if(order==="descatt") return {
    type:'POKEMON_ATTACK_ORDESC'} /**/
}



export function pokemonOrigin(name,value){
  return function (dispatch) {
    if(name==="origin"&&value==="all"){
      dispatch(getAllPokemons());
    }else if(name==="origin"&&value==="api" || value==="db"){
      dispatch(resetPokemons())
      dispatch(pokefilterOrigin(value));
    }else if(name==="order"){
      dispatch(resetPokemons())
      dispatch(orderPokemons(value))
    }else if(name==="type"){
      dispatch(resetPokemons())
      dispatch(filterTypePokemons(value))
    }
  }
}

function resetPokemons() {
  return {
    type:'POKEMON_RESET'
  }
  
}



  /* export function pokepagination(page,itemsPerPage){
  
    let initialPage;
    let lastPage;
    if(page==1||page<1)initialPage=0
    else if(page!=1) initialPage=itemsPerPage*(page-1);
    
    lastPage=(itemsPerPage*page)-1;
    //alert(initialPage)
    console.log('inicio',initialPage)
    console.log('fin',lastPage)

    return {
      type: 'POKEMON_PAGINATION',
       payload: [initialPage,
      lastPage] 
    }
  
  } */



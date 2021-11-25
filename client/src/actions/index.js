import axios from 'axios';
let rutaServidor='http://localhost:3001';


export function getAllPokemons(page=1,itemsPerPage=9) {
  return function (dispatch) {
    dispatch(getPokemon());
    axios.get(`${rutaServidor}/pokemons`)
      .then(r =>  r.data)
      .then(d => dispatch(receivePokemons(d,itemsPerPage)))
      .then(() =>dispatch(getPokemonTypes()))
      .catch(e => console.log(e));
  }
};

export function getIdPokemon(id) {
  return function (dispatch) {
    dispatch(resetPokemons())
    dispatch(getPokemon());
    axios.get(`${rutaServidor}/pokemons/${id}`)
      .then(r => r.data)
      .then(d => {
        if(Array.isArray(d))d=d[0]
        dispatch(receiveSearch(d))
      })
      .catch(e => console.log(e));
  }
};

export function getNamePokemon(name) {
  return function (dispatch) {
    let namen=name.toLowerCase();
    dispatch(getPokemon());
    axios.get(`${rutaServidor}/pokemons?name=${namen}`)
      .then(r => r.data)
      .then(d => {
        if(Array.isArray(d))d=d[0]
        dispatch(receivePokemons([d]))})//[{}]
      .catch(e => console.log(e));
  }
};

export function postPokemon(obj) {
  console.log(obj)
  return function (dispatch) {
    dispatch(getPokemon());
    axios.post(`${rutaServidor}/pokemons`,obj)
      .then(r =>r.data)
       .then(d => {
         console.log(d)
         if(d==='Pokemon existente')dispatch(pokemonNotRegistered())
         else {dispatch(pokemonRegistered())}
         
       }) /**/
      .catch(e => {
        alert(`Error al registrar al pokemon ${obj.name}, el pokemon ya existe`)
        console.log(e.response.status)});
  }
};

export function getPokemonTypes() {
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

function receivePokemons(pokemons,itemsPerPage) {
  return {
    type: 'RECEIVE_POKEMONS',
    pokemons,
    itemsPerPage
  }
}

function receiveSearch(data) {
  return {
    type: 'RECEIVE_SEARCH',
    data,
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

export function pokemonNotRegistered(){
  return {
    type: 'POKEMON_NOTREGISTERED',
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
  //console.log(filtro)
  if(filtro!="all") return {
    type:'POKEMON_FILTER_TYPE',
    filtro:filtro
  }
  
}

export function orderPokemons(order) {
  //console.log(order)
  if(order==="ascnam") return {
    type:'POKEMON_NAME_ORASC'}
  else if(order==="descname") return {
    type:'POKEMON_NAME_ORDESC'}
  else if(order==="ascatt") return {
    type:'POKEMON_ATTACK_ORASC'}
  else if(order==="descatt") return {
    type:'POKEMON_ATTACK_ORDESC'} /**/
}



export function pokemonOrigin(name,value,itemsPerPage){
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
    dispatch(pokepagination(1,itemsPerPage))
  }
}

function resetPokemons() {
  return {
    type:'POKEMON_RESET'
  }
}

function resetPage() {
  return {
    type:'PAGINATION_RESET'
  }
  
}

function paginations(initialPage, lastPage) {
  return {
    type: 'POKEMON_PAGINATION',
      payload: [initialPage, lastPage] 
  }
}



export function pokepagination(page=1,itemsPerPage=9){
  if(!isNaN(page) && Number.isInteger(page)){
    let initialPage;
    let lastPage;
    if(page==1||page<1)initialPage=0
    else if(page!=1) initialPage=itemsPerPage*(page-1);
    lastPage=(itemsPerPage*page);

    return function (dispatch) {
      dispatch(resetPage)
      dispatch(paginations(initialPage, lastPage))
    }
  }

}



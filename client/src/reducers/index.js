const initialState = {
    pokemons: [],
    aux: [],
    filters:false,
    pagination:[],
    loading: false,
    register: false,
    types:[],
}

export default (state = initialState, action) => {
    switch (action.type) {
        
        case 'GET_POKEMON':
            return {
                ...state,
                loading: true,
            }
        case 'RECEIVE_POKEMON':
            return {
                ...state,
                filters:false,
                loading: false,
                aux: action.pokemons,
                pokemons: action.pokemons,
            }
        case 'RECEIVE_TYPES':
            return {
                ...state,
                loading: false,
                types: action.types.sort((ob1,ob2)=>{
                    if(ob1.name<ob2.name) return -1;
                    else if(ob1.name>ob2.name)return 1;
                    else return 0;
                }),
            }
        case 'POKEMON_REGISTERED':
            return {
                ...state,loading: false,
                register: !state.register,
            }

        case 'POKEMONS_API':
            return {
                ...state,
                pokemons: state.aux.filter(pokemon=>{
                    let id=`${pokemon.id}`;
                    return !id.includes('-')
                }),
                filters:false,
            }
        case 'POKEMONS_DB':
            return {
                ...state,
                pokemons: state.aux.filter(pokemon=>{
                    let id=`${pokemon.id}`;
                    return id.includes('-')
                }),
                filters:false
            }
        case 'POKEMON_FILTER_TYPE':
            let filtro=state.filters.filter(pokemon=>{
                return pokemon.types.includes(action.filtro)
            })
            if(filtro.length>0){
                return {
                    ...state,
                    pokemons: state.filters.filter(pokemon=>{
                        return pokemon.types.includes(action.filtro)
                    }),
                    filters:false
                }
            }else{
                return {
                    ...state,
                    pokemons: state.aux.filter(pokemon=>{
                        return pokemon.types.includes(action.filtro)
                    }),
                    filters:false
                }
            }
                
        case 'POKEMON_NAME_ORASC':
            console.log('ordenamiento ascendente')
            return {
                ...state,
                pokemons: state.filters.sort((ob1,ob2)=>{
                    if(ob1.name<ob2.name) return -1;
                    else if(ob1.name>ob2.name)return 1;
                    else return 0;
                }),
                filters:false
            }

        case 'POKEMON_NAME_ORDESC':
            return {
                ...state,
                pokemons: state.filters.sort((ob1,ob2)=>{
                    if(ob1.name>ob2.name) return -1;
                    else if(ob1.name<ob2.name)return 1;
                    else return 0;
                }),
                filters:false,
            }
        
            
        case 'POKEMON_ATTACK_ORASC':
            console.log(state.filters)
            return {
                ...state,
                pokemons: state.filters.sort((ob1,ob2)=>{
                    if(ob1.attack<ob2.attack) return -1;
                    else if(ob1.attack>ob2.attack)return 1;
                    else return 0;
                }),
                filters:false,
            }

        case 'POKEMON_ATTACK_ORDESC':
            return {
                ...state,
                pokemons: state.filters.sort((ob1,ob2)=>{
                    if(ob1.attack>ob2.attack) return -1;
                    else if(ob1.attack<ob2.attack)return 1;
                    else return 0;
                }),
                filters:false,
            }

        case 'POKEMON_RESET':
            return{
                ...state,
                filters: state.pokemons,
                pokemons:false,
            }
         case 'POKEMON_PAGINATION':
            return {
                ...state,
                pagination: state.pokemons.slice(action.payload[0],action.payload[1])
            } 
      default:
        return {...state}
    }
  }
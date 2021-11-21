const initialState = {
    pokemons: [],
    loading: false,
    message: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        
        case 'GET_POKEMON':
            return {
                ...state,
                loading: true,
            }
      
      default:
        return {...state}
    }
  }
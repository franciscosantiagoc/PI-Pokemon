import style from './FilterBar.module.css';
import { pokemonOrigin,orderPokemons } from '../actions/index.js';
import { connect } from 'react-redux';

function FilterBar({pokemonOrigin,orderPokemons,types}) {
    function filterchange(e){
        let name=e.target.name
        let value=e.target.value /* */

        pokemonOrigin(name,value)
     }
    return (
      <div className={style.container}>
          <div className={style.filters}>
            <div className={style.group}>
                <label>Type Origin</label>
                <select onChange={filterchange} name="origin">
                    <option value="all">All</option>
                    <option value="api">API</option>
                    <option value="db">DB</option>
                </select>
            </div>

            {types?<div className={style.group}>
                <label>Type Pokemon</label>
                <select onChange={filterchange} name="type">
                    <option value="all" >All</option>
                {
                    types.map((type,i)=><option key={i}>{type.name}</option>)
                }
                </select>
            </div>:null}  
            <div className={style.group}>
                <label>Type Order</label>
                <select onChange={filterchange} name="order">
                    <option value="any">ANY</option>
                    <option value="ascnam">ASCENDENT NAME</option>
                    <option value="descname">DESCENDENT NAME</option>
                    <option value="ascatt">ASCENDENT ATTACK</option>
                    <option value="descatt">DESCENDENT ATTACK</option>
                </select>
            </div>
          </div>
          <div className={style.pagination}>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button>5</button>
                <button>6</button>
          </div>
          
      </div>
    );
  }
  const mapStateToProps = (state) => ({
    types: state.types,
  });

  export default connect(mapStateToProps, {pokemonOrigin,orderPokemons})(FilterBar);
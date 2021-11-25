import style from './FilterBar.module.css';
import { pokemonOrigin,orderPokemons,pokepagination } from '../actions/index.js';
import { connect } from 'react-redux';

function FilterBar({itemsPerPage,page, changePage, pokemonOrigin,pokepagination,types,data,}) {
    const arrbtns=[]
    
    let nbuttons=Math.ceil(data.length/itemsPerPage);
    for(let i=0;i<nbuttons;i++){
        arrbtns.push((i+1))
    } 
    
    function filterchange(e){
        if(e!=null){
            let name=e.target.name
            let value=e.target.value
            if(name==="origin")document.querySelector('select[name="type"] [value="all"]').selected = true;
            if(name!="types" && value!="all")
                pokemonOrigin(name,value,itemsPerPage)
        }
        click(0)
    }

    function click(i) {
        pokepagination((i+1),itemsPerPage)
        changePage(i+1)
        let buttons=document.querySelectorAll('.btn');
        buttons[i].style.background='#ff0000'
        buttons.forEach((btn,pos)=>{
            btn.style.color='#fff'
            if(pos!=i)btn.style.background='blue'
        })
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
              {arrbtns.map((button,i)=><button key={i} className='btn' onClick={()=>click(i)}>{button}</button>)}
              <span>Página {page} de {arrbtns.length}</span>
          </div>
          
      </div>
    );
  }
  const mapStateToProps = (state) => ({
    types: state.types,
    data: state.pokemons,
  });

  export default connect(mapStateToProps, {pokemonOrigin,orderPokemons,pokepagination})(FilterBar);
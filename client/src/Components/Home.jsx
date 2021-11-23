import style from './Home.module.css';
import Nav from './Nav.jsx';
import Modal from './modal.jsx';
import FilterBar from './FilterBar.jsx';
import PokemCard from './PokemCard.jsx';
//import {data} from './../data.js'
import { useEffect } from 'react';
import { getAllPokemons} from '../actions/index.js';
import { connect } from 'react-redux';

 function Home({loading,data,getAllPokemons}) {
  let itemsPerPage = 9;
    useEffect(() => {
      getAllPokemons(1,itemsPerPage) 
    },[]);

    return (
      <div >
        {loading?<Modal/>:null}
        <Nav/>
        <FilterBar itemsPerPage={itemsPerPage}/>
        <div className={style.card}>
          
          {            
            !loading&&data&&data.map((pokem,i)=>{
              return <PokemCard key={i} id={pokem.id} name={pokem.name} image={pokem.image} types={pokem.types} />
            })
        }
        </div>
          
      </div>
    );
  }
  const mapStateToProps = (state) => ({
    data: state.pagination,
    loading:state.loading,
    register:state.register,
  });

  export default connect(mapStateToProps, {getAllPokemons})(Home);
  

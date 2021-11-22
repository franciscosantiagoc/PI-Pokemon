import style from './Home.module.css';
import Nav from './Nav.jsx';
import Modal from './modal.jsx';
import FilterBar from './FilterBar.jsx';
import PokemCard from './PokemCard.jsx';
//import {data} from './../data.js'
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getAllPokemons } from '../actions/index.js';
import { connect } from 'react-redux';

 function Home({loading,register,data,aux,getAllPokemons }) {
   let itemsPerPage = 9;
   let { page } = useParams();
    useEffect(() => {
      getAllPokemons()      
    },[]);

    return (
      <div >
        {(loading||register)?<Modal/>:null}
        <Nav/>
        <FilterBar/>
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
    data: state.pokemons,
    aux:state.aux,
    loading:state.loading,
    register:state.register,
  });

  export default connect(mapStateToProps, {getAllPokemons })(Home);
  

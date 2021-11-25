import style from './Home.module.css';
import Nav from './Nav.jsx';
import Modal from './modal.jsx';
import FilterBar from './FilterBar.jsx';
import PokemCard from './PokemCard.jsx';
import img404 from '../img/404.jpg'
//import {data} from './../data.js'
import { useEffect, useState } from 'react';
import { getAllPokemons} from '../actions/index.js';
import { connect } from 'react-redux';

 function Home({loading,data,getAllPokemons}) {
  let itemsPerPage = 9;
    let [page,setPage] = useState('1')
    useEffect(() => {
      getAllPokemons(1,itemsPerPage) 
    },[]);
    function changePage(newpage) {
      setPage(newpage)
    }
    return (
      <div >
        {loading?<Modal/>:null}
        <Nav/>
        <FilterBar itemsPerPage={itemsPerPage} page={page} changePage={changePage}/>
        <div className={style.card}>
          {            
            !loading&&data&&data.map((pokem,i)=>{
              return <PokemCard key={i} id={pokem.id} name={pokem.name} image={pokem.image} types={pokem.types} attack={pokem.attack} />
            })
          }
          {data?.length===0?<div><img className={style.error} src={img404}/><p>Pokemons not found</p></div>:null}
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
  

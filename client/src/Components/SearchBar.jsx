import style from './SearchBar.module.css'
import {useState} from 'react';
import { getNamePokemon} from '../actions/index.js';
import { connect } from 'react-redux';
function SearchBar({getNamePokemon}) {
    let [name,setName]=useState('')
    
    function envio(e) {
        e.preventDefault();
        alert(name)
        getNamePokemon(name)
    }
    function validaname(e) {
        let name=e.target.value;
        if(/\d/.test(name)){
            alert('Caracter no admitido')
        }else{
            setName(name)
        }
    }
    return (
        <div>
            <form className={style.form} onSubmit={envio}>
                <input className={style.input} type="search" placeholder="Escribe un nombre" value={name} onChange={(e)=>validaname(e)} ></input>
                <button className={style.btn} type="submit" >Buscar</button>
            </form>
        </div>
    );
  }

  export default connect(null, {getNamePokemon})(SearchBar);
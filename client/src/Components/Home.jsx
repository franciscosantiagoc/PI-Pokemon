import style from './Home.module.css';
/* import { Link } from 'react-router-dom'; */
import Nav from './Nav.jsx';
import PokemCard from './PokemCard.jsx';
import {data} from './../data.js'
export default function Home() {
    return (
      <div >
        {<Nav/>}
        <div className={style.card}>
          {
          data.map(pokem=>
            <PokemCard id={pokem.id} name={pokem.name} image={pokem.image} types={pokem.types} />
          )
        }
        </div>
          
      </div>
    );
  }
  

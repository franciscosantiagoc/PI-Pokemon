import style from './Landing.module.css';
import { Link } from 'react-router-dom';
export default function Landing() {

    function escritura() {
      
      
    }
    return (
      <div className={style.back}>
          <div className={style.title}>
            <div>
              <p>Hola sean bienvenidos a la POKEAPI<br/>
              {/* Proyecto realizado por Francisco Santiago de la Cruz */}
              </p>
              {/* <h1>PokeAPI</h1> */}
            </div>
            <Link to='/home'>
            <button className={style.button}></button>
            </Link>
          </div>
      </div>
    );
  }
  

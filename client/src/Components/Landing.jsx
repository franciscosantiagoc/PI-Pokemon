import style from './Landing.module.css';
import { Link } from 'react-router-dom';
export default function Landing() {

    function escritura() {
      
      
    }
    return (
      <div className={style.back}>
          <div className={style.title}>
            <div>
              <p>Hola sean bienvenidos a la POKEAPI</p><br/>
              <span>Proyecto realizado por Francisco Santiago de la Cruz</span>
            </div>
            <br/>
            <Link to='/home'>
            <button className={style.button}></button>
            </Link>
            <br/>
            <span>Click aquí, para empezar el pokerecorrido</span>
          </div>
      </div>
    );
  }
  

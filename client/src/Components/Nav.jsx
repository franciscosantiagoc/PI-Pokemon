 import style from './Nav.module.css';/* */
import SearchBar from "./SearchBar";
import { Link } from 'react-router-dom';
export default function Nav() {
    return (
      <nav className={style.container} >
          <Link to='/'><img className={style.img} src='https://1000marcas.net/wp-content/uploads/2020/01/Pokemon-Logo.png' alt="Logo pokemon"/></Link>
          {<SearchBar/>}    
          <Link to='/Registro'>
              <button className={style.btn}>
                  <img className={style.btnicon} src='https://tricia.carrd.co/assets/images/image11.gif?v10699671280551' alt="Icon registro pokemon"></img>
                  Registrar
              </button>
          </Link>
      </nav>
    );
  }
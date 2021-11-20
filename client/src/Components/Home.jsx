import style from './Home.module.css';
/* import { Link } from 'react-router-dom'; */
import Nav from './Nav.jsx';
export default function Home() {
    return (
      <div >
        {<Nav/>}
        <div className={style.card}>

        </div>
          
      </div>
    );
  }
  

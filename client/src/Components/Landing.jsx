import style from './Landing.module.css';
import { Link } from 'react-router-dom';
export default function Landing() {
    return (
      <div className={style.back}>
          <Link to='/home'>
          <button className={style.button}></button>
          </Link>
          
      </div>
    );
  }
  

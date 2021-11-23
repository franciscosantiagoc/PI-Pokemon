import style from './NotFound.module.css'
import { Link } from 'react-router-dom';
import img from './../img/404.jpg';
export default function NotFound() {
    return (
        <div className={style.content}>  
            <img className={style.img} src={img} alt="Imagen PokePage 404" />
            <div className={style.desc}>
                <h2 className={style.title}>Página no encontrada</h2>
                <p className={style.text}>Parece que andas perdido, la página que solicitaste no existe</p>
                <Link to={`/home`}>
                    <button className={style.btn}>Volver</button>
                </Link>
            </div>
        </div>
    )
}
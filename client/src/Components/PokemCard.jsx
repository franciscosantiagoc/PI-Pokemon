import style from './PokemCard.module.css'
import { Link } from 'react-router-dom';
export default function PokemCard({id,name,image,types}) {
return (
    <div key={id} className={style.card}>  
        <img className={style.imgPokem} src={image} />
        <div className={style.data}>
            <Link to={`detail/${id}`}>
                <h2> {name.toUpperCase()}</h2>
            </Link>
            <div className={style.types}>
            {
                types.map(type => <abbr title={`Tipo ${type}`}><img className={style.iconType} src={`./img/types/${type}.png`} alt={type} /></abbr>)
            }
            </div>
            <Link to={`detail/${id}`}>
                <button className={style.btn}>Ver detalles</button>
            </Link>
        </div>
    </div>
);
}
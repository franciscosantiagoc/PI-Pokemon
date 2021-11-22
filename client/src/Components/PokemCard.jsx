import style from './PokemCard.module.css'
import { Link } from 'react-router-dom';
export default function PokemCard({id,name,image,types}) {
return (
    <div className={style.card}>  
        <img className={style.imgPokem} src={image} />
        <div className={style.data}>
            <Link to={`detail/${id}`}>
                <h2> {name}</h2>
            </Link>
            <div className={style.typescss}>
                {/* {
                    types.map((type,i)=><p key={i}>{type}</p>)
                } */}
            {
                types&&types.map((type,i) => <abbr key={i} title={`Tipo ${type}`}><img className={style.iconType} src={`./img/types/${type}.png`} alt={type} /></abbr>)
            } 
            </div>
            <Link to={`detail/${id}`}>
                <button className={style.btn}>Ver detalles</button>
            </Link>
        </div>
    </div>
);
}
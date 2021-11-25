import style from './PokemCard.module.css'
import { Link } from 'react-router-dom';
import img404 from '../img/404.jpg'
export default function PokemCard({id,name,image,types,attack}) {
return (
    <div className={style.card}>  
        {id&&name?<img className={style.imgPokem} src={image?image:'https://okdiario.com/img/series/2016/11/05/pokemon.jpg'} alt={`Imagen Pokemon ${name}`} />:null}
        {!id&&!name?<img className={style.imgPokem} src={img404} alt={`Imagen Pokemon ${name}`} />:null}
        
        <div className={style.data}>
            {name?<Link to={`detail/${id}`}><h2><strong>NAME:</strong><br/> {name}</h2></Link>:<h2>Pokemon no encontrado</h2>}
            <div className={style.typescss}>
            {
                types&&types.map((type,i) => <abbr key={i} title={`Tipo ${type}`}><img className={style.iconType} src={`./img/types/${type}.png`} alt={type} /></abbr>)
            } 
            </div>
            {id&&name&&attack?<p className={style.attack}><strong>ATTACK: </strong>{attack}</p>:null}
            {id?<Link to={`detail/${id}`}>
                <button className={style.btn}>Ver detalles</button>
            </Link>:<p>Lo sentimos, el pokemon buscado no existe, intente registrarlo</p>}
        </div>
    </div>
);
}
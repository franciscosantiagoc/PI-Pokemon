import style from './Detail.module.css';
import { getIdPokemon } from '../actions/index.js';
import { connect } from 'react-redux';
import { useParams, Link } from "react-router-dom";
import {useEffect } from 'react';

function Detail({ getIdPokemon, data }) {
    let { idPokemon } = useParams();

    useEffect(() => {
        getIdPokemon(idPokemon)
    },[]);

    return (
        <div className={style.container}>
            <Link to='/home'><button className={style.btnBack}>Volver</button></Link>
            <div className={style.title}>
                {data.name?<h2>Datos de pokemon llamado {data.name}</h2>:<h2>'Pokemon No encontrado'</h2>}
            </div>  
            <div className={style.data}>
                <div className={style.imgcontainer}>
                    <img className={style.img} src={data.image?data.image:'https://cdn.dribbble.com/users/4040675/screenshots/10545158/media/85a3329e4202059593616d3b42f16e8d.png'} alt="Imagen de Pokemon"/>
                </div>
                <div className={style.description}>
                    <div className={style.group}>
                        <h3>ID:</h3>
                        <p>{data.id?data.id:'Desconocido'}</p>
                    </div>
                    <div className={style.group}>
                        <h3>NAME:</h3>
                        <p>{data.name?data.name:'Desconocido'}</p>
                    </div>
                    <div className={style.group}>
                        <h3>TYPES:</h3>
                        {(data&&data.types)?data&&data.types.map((type,i)=><p key={i}>{type}</p>):'Desconocidos'}
                    </div>
                    <div className={style.group}>
                        <h3>ATTACK:</h3>
                        <p>{data.attack?data.attack:'Desconocido'}</p>
                        
                    </div>

                    <div className={style.group}>
                        <h3>DEFENSE:</h3>
                        <p>{data.defense?data.defense:'Desconocido'}</p>
                    </div>
                    <div className={style.group}>
                        <h3>HP:</h3>
                        <p>{data.hp?data.hp:'Desconocido'}</p>
                    </div>
                    <div className={style.group}>
                        <h3>SPEED:</h3>
                        <p>{data.speed?data.speed:'Desconocido'}</p>
                    </div>

                    <div className={style.group}>
                        <h3>WEIGHT:</h3>
                        <p>{data.weight?data.weight:'Desconocido'}</p>
                    </div>
                </div>
            </div>  
        </div>
    );
  }
  const mapStateToProps = (state) => ({
    data: state.details,
  });

  export default connect(mapStateToProps, {getIdPokemon})(Detail);
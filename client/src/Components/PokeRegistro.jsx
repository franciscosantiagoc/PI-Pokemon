import style from './PokeRegistro.module.css'
import card from './PokemCard.module.css'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import image from './../img/pokebola.png';
export default function PokeRegistro() {
    let initialState = {
        name:'',
        image:'',
        hp: 0,
        attack:0,
        defense:0,
        speed:0,
        height:0,
        weight:0,
        types:['electric','fire','electric','fire','electric','fire']
    }

    let initialError = {
        name:'Ingrese un valor',
        image:'',
        hp: 'Ingrese un valor',
        attack:'Ingrese un valor',
        defense:'Ingrese un valor',
        speed:'Ingrese un valor',
        height:'Ingrese un valor',
        weight:'Ingrese un valor',
        types:'Ingrese un valor',
    }
    const [data, setData] = useState(initialState);
    const [error, setError] = useState(initialError);

    function validate(e) {
        let ename=e.target.name;
        let value=e.target.value;
        if(ename==="name" && /\d/.test(value)){
            setError({...error,[ename]:'Solo se admiten letras'})
        } else if(ename==="image" && !/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif||svg))/.test(value) && value){
            setError({...error,[ename]:'URL no válida'})
        } else if(ename!="name" && ename!="image" && !Number.isInteger(value) && !(value>0 && value<=100)){
            setError({...error,[ename]:'Solo se admiten valores numéricos mayor a 0'})
        }else{
            setError({...error,[ename]:''})
        }
        
        setData({...data,[ename]:value}); 
      }
    return (
        <div className={style.container}>  
            <div className={style.target}>
                <form className={style.form}>
                    <div className={style.header}>
                        <Link to='/home'><img src={image} className={style.icon} alt=""/></Link>
                        <h2 className={style.title}>PokeRegistro</h2>
                    </div>
                    <div className={style.group}>
                        <div className={style.formgroup}>
                            <label>Escribe el nombre</label>
                            <input type="text" placeholder="Ingrese el nombre" name="name" value={data.name} onChange={(e) => validate(e)}/>
                            {error.name?<span>{error.name}</span>:null}
                        </div>
                        <div className={style.formgroup}>
                            <label>Ingrese el hp</label>
                            <input type="number" placeholder="Ingrese el hp" name="hp" value={data.hp} onChange={(e) => validate(e)}/>
                            {error.hp?<span>{error.hp}</span>:null}
                        </div>
                        <div className={style.formgroup}>
                            <label>Ingrese el attack</label>
                            <input type="number" placeholder="Ingrese el attack" name="attack" value={data.attack} onChange={(e) => validate(e)}/>
                            {error.attack?<span>{error.attack}</span>:null}
                        </div>
                        <div className={style.formgroup}>
                            <label>Ingrese el defense</label>
                            <input type="number" placeholder="Ingrese el defense" name="defense" value={data.defense} onChange={(e) => validate(e)}/>
                            {error.defense?<span>{error.defense}</span>:null}
                        </div>
                        <div className={style.formgroup}>
                            <label>Ingrese el speed</label>
                            <input type="number" placeholder="Ingrese el speed" name="speed" value={data.speed} onChange={(e) => validate(e)}/>
                            {error.speed?<span>{error.speed}</span>:null}
                        </div>
                        <div className={style.formgroup}>
                            <label>Ingrese el height</label>
                            <input type="number" placeholder="Ingrese el height" name="height" value={data.height} onChange={(e) => validate(e)}/>
                            {error.height?<span>{error.height}</span>:null}
                        </div>
                        <div className={style.formgroup}>
                            <label>Ingrese el weight</label>
                            <input type="number" placeholder="Ingrese el weight" name="weight" value={data.weight} onChange={(e) => validate(e)}/>
                            {error.weight?<span>{error.weight}</span>:null}
                        </div>
                        <div className={style.formgroup}>
                            <label>Ingrese la url de imagen</label>
                            <input type="text" placeholder="Ingrese una url de la imagen" name="image" value={data.image} onChange={(e) => validate(e)}/>
                            {error.image?<span>{error.image}</span>:null}
                        </div>
                        <div className={style.formgroup}>
                            {(!error.name && !error.hp && !error.attack && !error.defense && !error.speed && !error.height && !error.weight)?<button type="submit">Capturar</button>:null}
                        </div>
                    </div>
                </form>
            </div>
            <div className={` ${style.card}`}>
                <img className={style.imgPokem} src={data.image?data.image:'https://okdiario.com/img/series/2016/11/05/pokemon.jpg'} />
                <div className={style.data}>
                    <h2> {data.name}</h2>
                    <div className={style.descrip}>
                        <p><strong>HP: </strong> {data.hp}</p>
                        <p><strong>ATTACK: </strong> {data.attack}</p>
                        <p><strong>DEFENSE: </strong> {data.defense}</p>
                        <p><strong>SPEED: </strong> {data.speed}</p>
                        <p><strong>HEIGHT: </strong> {data.height}</p>
                        <p><strong>WEIGHT: </strong> {data.weight}</p>
                    </div>
                    <div className={style.types}>
                        {
                        data.types.map((type,i) => {
                            return <abbr title={`Tipo ${type}`}>
                                    <img className={style.iconType} src={`./img/types/${type}.png`} alt={type} />
                                    <button className={style.btnDel}>x</button>
                                </abbr>
                        })
                        }
                    </div>
                </div>
            </div>
            <Link to='/home'>
                <button className={style.btnBack}>Volver</button>
            </Link>
        </div>
    );
}
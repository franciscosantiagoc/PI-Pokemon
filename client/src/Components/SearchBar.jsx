import style from './SearchBar.module.css'
export default function SearchBar() {
    return (
        <div>
            <form className={style.form}>
                <input className={style.input} type="search" placeholder="Escribe un nombre" ></input>
                <button className={style.btn} type="submit" >Buscar</button>
            </form>
        </div>
    );
  }
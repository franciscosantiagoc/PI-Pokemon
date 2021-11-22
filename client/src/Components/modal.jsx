import style from './modal.module.css';
import loadimg from './../img/loading.gif';
import successimg from './../img/success.gif';
import { pokemonRegistered } from '../actions/index.js';
import { connect } from 'react-redux';
function modal({register,loading,pokemonRegistered}) {

    const clicknotif=()=>{
        pokemonRegistered();
    }
    
    return (
      <div className={style.modal}>
            <div className={style.container}>
                <div className={style.head}>
                    {loading?<h2>CARGANDO POKEDATOS</h2>:null}
                    {register?<h2>REGISTRO EXITOSO</h2>:null}
                </div>
                <div className={style.body}>
                    {loading?<img src={loadimg} />:null}
                    {loading?<p>Cargando datos...</p>:null}

                    {register?<img src={successimg} />:null}
                    {register?<p>Pokemon Registrado correctamente</p>:null}
                    {register?<button onClick={clicknotif}>Aceptar</button>:null}
                </div>
            </div>      
      </div>
    );
  }

  const mapStateToProps = (state) => ({
    register: state.register,
    loading:state.loading,
  });

  export default connect(mapStateToProps, {pokemonRegistered})(modal);
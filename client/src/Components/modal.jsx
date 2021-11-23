import style from './modal.module.css';
import loadimg from './../img/loading.gif';
import successimg from './../img/success.gif';
import failedimg from './../img/404.jpg';
import { pokemonRegistered } from '../actions/index.js';
import { connect } from 'react-redux';
function modal({register,loading,pokemonRegistered,unregister}) {

    const clicknotif=()=>{
        pokemonRegistered();
    }
    
    return (
      <div className={(loading||register||unregister)?style.modal:null}>
            <div className={style.container}>
                <div className={style.head}>
                    {loading?<h2>CARGANDO POKEDATOS</h2>:null}
                    {register?<h2>REGISTRO EXITOSO</h2>:null}
                    {unregister?<h2>REGISTRO FALLIDO</h2>:null}
                </div>
                <div className={style.body}>
                    {loading?<img src={loadimg} alt="Imagen de pokecarga" />:null}
                    {loading?<p>Cargando datos...</p>:null}

                    {register?<img src={successimg} alt="Imagen de Registro pokemon exitoso"/>:null}
                    {register?<p>Pokemon Registrado correctamente</p>:null}

                    {unregister?<img src={failedimg} alt="Imagen de Registro pokemon fallido"/>:null}
                    {unregister?<p>Error al registrar el pokemon</p>:null}


                    {(register||unregister)?<button onClick={clicknotif}>Aceptar</button>:null}
                </div>
            </div>      
      </div>
    );
  }

  const mapStateToProps = (state) => ({
    register: state.register,
    unregister: state.unregister,
    loading:state.loading,
  });

  export default connect(mapStateToProps, {pokemonRegistered})(modal);
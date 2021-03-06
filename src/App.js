import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';
import Footer from './components/Footer';

function App() {

  //state del formulario
  const [ busqueda, guardarBusqueda ] = useState({
      ciudad: '',
      pais: ''
    });

  //State para no consultar la API todo el tiempo => dependecia consultar
  const [ consultar, guardarConsultar ] = useState(false);
  const [ resultado, guardarResultado ] = useState({});
  const [ error, guardarError ] = useState(false);

  //Extraer datos
  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {

        if(consultar) {
          const appId = '31b9ec4e984aa3f09145be63da256bf2';
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
    
          guardarResultado(resultado);

          //Para poder realizar otra consulta
          guardarConsultar(false);

          //Detecta si hay resultados correctos en la consulta
          if(resultado.cod === "404") {
              guardarError(true);
          } else {
              guardarError(false);
          }
        }

    }
    consultarAPI();
    //eslint-disable-next-line
  }, [consultar]);

  let componente;
  if(error) {
    componente = < Error mensaje="No hay resultados" />
  } else {
    componente = <Clima
                    resultado={resultado}
                />
  }



  return (
    <Fragment>
      <Header
        titulo='Tu Tiempo'
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export default App;

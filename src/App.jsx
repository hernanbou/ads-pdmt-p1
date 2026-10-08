import React from "react"
import 'primeicons/primeicons.css';

export default class App extends React.Component {

  render(){
    
    const estiloSubtitulo = {color: "lightgray"};
    const obterAno = () => new Date().getFullYear();

    return(
      <div>
        <div className="header">
          <div className="logo">
            <i className=" pi pi-map-marker" style={{ fontSize: '30px', color: 'red'}}/>
            <h1 className="titulo">RolêRadar</h1>
          </div>
          <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>
        </div>
        <div className="rodape">
          <p>RolêRadar © {obterAno()}</p>
        </div>
      </div>
    )
  }
};

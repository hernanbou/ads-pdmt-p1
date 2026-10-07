import React from "react"

export default class App extends React.Component {

  render(){
    
    const estiloSubtitulo = {color: "lightgray"};
    const obterAno = () => new Date().getFullYear();

    return(
      <div>
        <div>
          <h1 className="titulo">RolêRadar</h1>
          <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>
        </div>
        <div className="rodape">
          <p>RolêRadar © {obterAno()}</p>
        </div>
      </div>
    )
  }
};

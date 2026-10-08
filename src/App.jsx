import React from 'react'
import 'primeicons/primeicons.css';
import { Cartao } from "./components/Cartao";
import { Creditos } from './components/Creditos';

export default class App extends React.Component {

  render(){
    
    const estiloSubtitulo = {color: "lightgray"};
    const obterAno = () => new Date().getFullYear();

    return(
      <div className='flex flex-column gap-5'>
        <div className="header">
          <div className="logo">
            <i className=" pi pi-map-marker" style={{ fontSize: '30px', color: 'red'}}/>
            <h1 className="titulo">RolêRadar</h1>
          </div>
          <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>
          <Creditos/>
        </div>
        <div className="main">
          <Cartao cabecalho="Teste">
            <p>Conteúdo do cartão.</p>
          </Cartao>
        </div>
        <div className="rodape">
          <p>RolêRadar © {obterAno()}</p>
        </div>
      </div>
    )
  }
};

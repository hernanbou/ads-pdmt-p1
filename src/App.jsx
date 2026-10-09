import React from 'react'
import 'primeicons/primeicons.css'

import { Cartao } from "./components/Cartao"
import { Creditos } from './components/Creditos'
import geoapifyClient from './utils/geoapifyClient'
import MeuPonto from './components/MeuPonto'
import Loading from "./components/Loading"
import Busca from './components/Busca';

export default class App extends React.Component {

  state = {
    latitude: null,
    longitude: null,
    horarioLocalizacao: null,
    mensagemDeErro: null
  };


  componentDidMount(){
    this.obterLocalizacao()
  }

  onBuscaRealizada = async (categoria, raio) => {
    const {latitude, longitude} = this.state;

    const result = await geoapifyClient.get('/places', {
      params:{
        categories: categoria,
        filter: `circle:${longitude},${latitude},${raio}`,
        bias: `proximity:${longitude},${latitude}`,
        limit: 20
      }
    })
    console.log(result.data.features)
  }

  render(){
    
    const estiloSubtitulo = {color: "lightgray"};
    const obterAno = () => new Date().getFullYear();

    return(
      <div className='flex flex-column gap-5'>
        <div className="header">
          <div className="logo">
            <i className="pi pi-map-marker" style={{ fontSize: '30px', color: 'red'}}/>
            <h1 className="titulo">RolêRadar</h1>
          </div>
          <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>
          <Creditos/>
        </div>
        <div className="main">
          {
            this.state.mensagemDeErro ?
            <p>{this.state.mensagemDeErro}</p>
            :
            !this.state.latitude ?
              <Loading mensagem='Aguardando permissão de localização...'/>
              :
              <Cartao cabecalho='Você está aqui'>
                <MeuPonto
                  latitude={this.state.latitude}
                  longitude={this.state.longitude}
                  horarioLocalizacao={this.state.horarioLocalizacao}
                  onAtualizar={this.obterLocalizacao}
                />
              </Cartao>
          }
          <Cartao cabecalho="O que você procura?">
            <Busca onBuscaRealizada={this.onBuscaRealizada}/>
          </Cartao>
        </div>
        <div className="rodape">
          <p>RolêRadar © {obterAno()}</p>
        </div>
      </div>
    )
  }
  
  obterLocalizacao = () => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          horarioLocalizacao: Date.now(),
          mensagemDeErro: null
        })
      },
      (erro) => {
        console.log(erro)
        this.setState({
          mensagemDeErro: 'Não foi possível obter sua localização. Libere o acesso no navegador e atualize a página.'
        })
      }
    )
  }


};

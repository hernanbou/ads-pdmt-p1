import React from 'react'
import 'primeicons/primeicons.css'

import { Cartao } from "./components/Cartao"
import { Creditos } from './components/Creditos'
import geoapifyClient from './utils/geoapifyClient'
import MeuPonto from './components/MeuPonto'
import Loading from "./components/Loading"
import Busca from './components/Busca';
import MapaRadar from './components/MapaRadar'

import ListaLugares from './components/ListaLugares'

export default class App extends React.Component {

  state = {
    latitude: null,
    longitude: null,
    horarioLocalizacao: null,
    mensagemDeErro: null,
    lugares: null,
    buscando: false,
    erroBusca: null,
    raioBusca: null
  }


  componentDidMount(){
    this.obterLocalizacao()
  }

  onBuscaRealizada = async (categoria, raio) => {
    const {latitude, longitude} = this.state;

    this.setState({
      buscando:true,
      erroBusca:null,
      raioBusca: raio
    })

    try{
      const result = await geoapifyClient.get('/places', {
        params:{
          categories: categoria,
          filter: `circle:${longitude},${latitude},${raio}`,
          bias: `proximity:${longitude},${latitude}`,
          limit: 20
        }
      })
      this.setState({
        lugares: result.data.features,
        buscando:false
      })
    } catch (erro) {
      console.log(erro)

      this.setState({
        buscando: false,
        erroBusca: 'Não foi possível consultar os lugares. Tente novamente.'
      })
    }
  }

  render(){
    
    const estiloSubtitulo = {color: "lightgray"};
    const obterAno = () => new Date().getFullYear();

    return(
      <div className='flex flex-column gap-5'>
        <div className="flex flex-column align-items-center justify-content-center mt-3">
          <div className="flex align-items-center gap-1">
            <i className="pi pi-map-marker" style={{ fontSize: '30px', color: 'red'}}/>
            <h1 className="text-purple-500 font-bold text-2xl m-0">RolêRadar</h1>
          </div>
          <p className="text-center" style={estiloSubtitulo}>Descubra o que existe perto de você</p>
          <Creditos/>
        </div>
        <div className="grid p-5">
          <div className='col-6 flex flex-column gap-3'>
            {this.state.mensagemDeErro ?
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
          <div className='col-6 flex flex-column gap-3'>
            {this.state.buscando ? (
              <Loading mensagem="Procurando lugares..." />
                ) : this.state.erroBusca ? (
                  <p className='text-gray-300 text-xl text-bold border-round-lg p-5 bg-gray-500'>
                    {this.state.erroBusca}
                  </p>
                ) : this.state.lugares === null ? null :
                this.state.lugares.length === 0 ? (
                  <p className='text-gray-300 text-xl text-bold border-round-lg p-5 bg-gray-500'>
                    Nenhum lugar encontrado. Tente aumentar o raio.
                  </p>
                ) : (
                  <>
                    <strong>
                      {this.state.lugares.length}
                      {this.state.lugares.length === 1
                      ? ' lugar encontrado'
                      : ' lugaers encontrados'} em até {this.state.raioBusca} m
                    </strong>
                    <Cartao cabecalho="Radar">
                        <MapaRadar
                          latitude={this.state.latitude}
                          longitude={this.state.longitude}
                          lugares={this.state.lugares}
                        />
                    </Cartao>
                    <ListaLugares lugares={this.state.lugares}/>
                  </>
                )
              }
          </div>
        </div>
        <div className="flex justify-content-center align-items-center text-gray-300 text-xs border-top-1 border-gray-500">
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

import { Component } from 'react'
import { Button } from 'primereact/button'
import { GEOAPIFY_KEY } from '../utils/chaves'

export default class MeuPonto extends Component {
    
    state = { 
        agora: Date.now()
    }

    componentDidMount() { 
        this.timer = setInterval(() => {
            this.setState({ 
                agora: Date.now()
            }); 
        }, 1000)
    }
             
    componentWillUnmount() { 
        clearInterval(this.timer); 
        console.log('MeuPonto removido')
    }
  
  
    render() {

        const latitude = this.props.latitude
        const longitude = this.props.longitude

        const urlMapa = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=300&center=lonlat:${longitude},${latitude}&zoom=16&marker=lonlat:${longitude},${latitude};color:%23d32f2f;size:48&apiKey=${GEOAPIFY_KEY}`

        const hemisferio = latitude < 0 
            ? 'Hemisfério Sul'
            : 'Hemisfério Norte'
        
        const segundos = Math.floor(
            (this.state.agora - this.props.horarioLocalizacao) / 1000
        )

        return (
            <div className='flex flex-column gap-2'>
                <div className='w-full mt-2 border-round-xl overflow-hidden'>
                    <img
                        src={urlMapa}
                        alt='Localização'
                        className='w-full block'
                    />
                </div>
                <p>Latitude: {latitude.toFixed(4)} &#124; Longitude: {longitude.toFixed(4)}</p>
                <p>{hemisferio}</p>
                <p>Localização obtida há {segundos} s</p>

                <Button
                    className='flex justify-content-center align-items-center gap-3 bg-black-alpha-40 border-3 border-green-400 border-round-lg p-2 text-green-400 text-xl font-bold transition-all transition-duration-500 hover:bg-green-400 hover:text-color'
                    onClick={this.props.onAtualizar}>
                    <i className="pi pi-refresh"/>
                    <span>Atualizar localização</span>
                </Button>
            </div>
        )
  }
}
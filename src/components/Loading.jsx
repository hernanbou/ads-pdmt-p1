import { Component } from 'react'

export default class Loading extends Component {
  render() {
    return (
        <div className='flex flex-column border-round-lg p-5 bg-gray-500 gap-3'>
            <div className='flex justify-content-center align-content-center'>
                <span className='pi pi-spin pi-spinner' style={{ fontSize: '2rem'}}/>
            </div>
            <p className='text-gray-300 text-xl text-bold'>{this.props.mensagem}</p>
        </div>
    )
  }
}

Loading.defaultProps = {
  mensagem: 'Carregando...'  
}
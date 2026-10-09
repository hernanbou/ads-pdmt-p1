import { Component } from 'react'

export default class Loading extends Component {
  render() {
    return (
        <div className='flex flex-column'>
            <div className='flex justify-content-center align-content-center'>
                <span className='pi pi-spin pi-spinner' style={{ fontSize: '2rem'}}/>
            </div>
            <p>{this.props.mensagem}</p>
        </div>
    )
  }
}

Loading.defaultProps = {
  mensagem: 'Carregando...'  
}
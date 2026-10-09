import { Cartao } from './Cartao'

const estiloNumero = {
  width: '2rem',
  height: '2rem',
  borderRadius: '50%',
  backgroundColor: '#3B82F6',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '26px'
}

const formatarDistancia = (distancia) => {
    if (distancia < 1000) {
        return `${Math.round(distancia)} m`
    }

    return `${(distancia / 1000).toFixed(1).replace('.', ',')} km`
}

const Lugar = ({ numero, nome, endereco, distancia }) => {
  return (
    <Cartao cabecalho={`a ${formatarDistancia(distancia)}`}>
        <div className='flex flex-column align-content-center gap-3 p-2'>
            <div style={estiloNumero}>
                {numero}
            </div>
            <div className='flex flex-column'>
                <p>{nome || 'Sem nome'}</p>
                <span>{endereco}</span>
            </div>
        </div>
    </Cartao>
  )
}

export default Lugar
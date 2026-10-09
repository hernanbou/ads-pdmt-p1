import { Component } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

const categorias = [
    { rotulo: 'Cafés', chave: 'catering.cafe' },
    { rotulo: 'Restaurantes', chave: 'catering.restaurant' },
    { rotulo: 'Parques', chave: 'leisure.park' },
    { rotulo: 'Farmácias', chave: 'healthcare.pharmacy' },
    { rotulo: 'Supermercados', chave: 'commercial.supermarket' },
    { rotulo: 'Museus', chave: 'entertainment.museum' }
]

export default class Busca extends Component {

    state = {
        categoria: null,
        raio: '1000',
        erro: null
    }

    onCategoriaSelecionada = (categoria) => {
        this.setState({
            categoria: categoria,
            erro: null
        })
    }

    onRaioAlterado = (evento) => {
        this.setState({
            raio: evento.target.value
        })
    }

    onFormSubmit = (evento) => {
        evento.preventDefault()

        if (!this.state.categoria) {
            this.setState({
                erro: 'Escolha uma categoria.'
            })
            return
        }

        const raio = Number(this.state.raio)

        if (
            !Number.isInteger(raio) ||
            raio < 100 ||
            raio > 5000
        ) {
            this.setState({
                erro: 'Informe um raio inteiro entre 100 e 5000 metros.'
            })
            return
        }

        this.setState({ erro: null });

        this.props.onBuscaRealizada(
            this.state.categoria,
            raio
        );
    };

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <div className="flex flex-wrap gap-2 p-3 ">
                    {categorias.map((categoria, key) => {
                        const selecionada = this.state.categoria === categoria.chave;

                        return (
                            <Button
                            key={key}
                            type="button"
                            className={`text-base font-bold transition-all transition-duration-500 border-round-lg px-3 py-2 border-3 ${
                                selecionada
                                ? 'bg-blue-500 text-white border-blue-500'
                                : 'bg-transparent text-blue-500 border-blue-500'
                            }`}
                            onClick={() => this.onCategoriaSelecionada(categoria.chave)}
                            >
                            {categoria.rotulo}
                            </Button>
                        );
                    })}
                </div>

                <div className="flex flex-column gap-2">
                    <InputText
                        value={this.state.raio}
                        onChange={this.onRaioAlterado}
                        className="w-full border-round-lg p-2"
                        placeholder={this.props.dica}
                    />

                    <Button
                        type="submit"
                        className='flex justify-content-center align-items-center gap-3 bg-black-alpha-40 border-3 border-green-400 border-round-lg p-2 text-green-400 text-xl font-bold transition-all transition-duration-500 hover:bg-green-400 hover:text-color'
                    >
                        <i className='pi pi-search'/>
                        <span>Buscar</span>
                    </Button>

                    {this.state.erro && (
                        <p className="text-red-500">
                            {this.state.erro}
                        </p>
                    )}
                </div>
            </form>
        )
    }
}

Busca.defaultProps = {
    dica: 'Raio em metros (100 a 5000)'
}
export const Cartao = (props) => {
   
    return (
        <div className="flex flex-column border-round-lg p-2 bg-gray-500">
            <div className="w-full border-bottom-1 py-1 pl-3 flex text-gray-200">
                {props.cabecalho}
            </div>
            <div className='pl-3'>
                {props.children}
            </div>
        </div>
    )
}
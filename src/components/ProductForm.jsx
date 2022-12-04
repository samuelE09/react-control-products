import {useState , useContext} from 'react'
import {ProductContext} from '../context/ProductContext'
import "./form.css"

function ProductForm() {

    const {createProduct} = useContext(ProductContext)

    const [code, setCode] = useState("")
    const [amount, setAmount] = useState("")
    const [price, setPrice] = useState("")
    const [page, setPage] = useState("")

    const handleSubmit = (e)=>{
        e.preventDefault()
         createProduct({
            code,
            amount,
            price,
            page,
            price_total: parseFloat(amount)* parseFloat(price)
          })
          
        setCode("")
        setAmount("")
        setPrice("")
        setPage("")
    }   

  return (
    <div className='card container p-5 text-center' style={{width:'18rem'}}>
      <form onSubmit={handleSubmit}>
        <h1 className='mb-4 title-form' >Lista de Productos</h1>
        <div className="mb-3">
          <input
              className='form-control'
              type="text" 
              name="codeProduct"
              placeholder='Codigo del Producto'
              onChange={(e)=>{setCode(e.target.value)}}
              value={code}
              autoFocus
              required/>
        </div>
        <div className="mb-3">
          <input
              className='form-control'
              type="number" 
              name="amountProduct" 
              placeholder='Cantidad'
              onChange={(e)=>{setAmount(e.target.value)}}
              value={amount}
              required/>
        </div>
        <div className="mb-3">
          <input
              className='form-control'
              type="number" 
              step="any" 
              name="priceProduct"
              placeholder='Precio del Producto'
              onChange={(e)=>{setPrice(e.target.value)}}
              value={price}
              required/>
        </div>
        <div className="mb-3">
          <input 
              className='form-control'
              type="number" 
              step="any" 
              name="pageProduct"
              placeholder='Página del Producto'
              onChange={(e)=>{setPage(e.target.value)}}
              value={page}
              required/>
        </div>
        <button 
            type="submit"
            className='btn btn-success fw-bold'
            >Agregar Producto
        </button>
    </form>

    </div>
  )
}

export default ProductForm
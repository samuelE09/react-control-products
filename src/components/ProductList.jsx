import {useContext, useState} from 'react'
import {ProductContext} from '../context/ProductContext'
import jsPDF from 'jspdf'
import "jspdf-autotable"


function ProductList() {

    const [person, setPerson] = useState("")

    const fecha = new Date()
    const hoy = fecha.getDate()
    const mes = fecha.getMonth() +1 
    const año = fecha.getFullYear() 


    const {products, totalProducts,totalMount, deleteProduct} = useContext(ProductContext)

    const downloadPDF = (e) => {
        e.preventDefault()
        const pdf = new jsPDF();
        pdf.setFontSize(20)
        pdf.text(70,25,"Listado de Productos")
        pdf.autoTable({
            html: "#data",
            columns:[
                {header: '#'}, 
                {header: 'Codigo'},
                {header: 'Cantidad'},
                {header: 'Precio por Unidad'},
                {header: 'Precio Total'},
                {header: 'Pagina'}],
            margin: { top: 40 },
            styles: { halign: 'center', fontStyle:"bold" },
            })
        pdf.save(`Productos_${person}_${año}_${mes}_${hoy}.pdf`)
        setPerson("")
    }

    if (products.length == 0){
        return <div className="alert alert-info mt-4 text-center" role="alert">
        <h1>Aun no hay Productos listados</h1>
      </div>
    }

    return (
        <div className='mt-5 mb-5'>
            <div>
                <form onSubmit={downloadPDF}>
                    <div className="mb-3">
                        <input
                            className='form-control'
                            type="text" 
                            name="person"
                            placeholder='Escribe tu Nombre'
                            onChange={(e)=>{setPerson(e.target.value)}}
                            value={person}
                            required/>
                    </div>
                    <button type='submit' className="btn btn-success mb-4">Exportar</button>
                </form>
            </div>
            
                <table className="table table-striped table-hover table-responsive" id='data' >
                    
                    <thead className='text-center'>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Codigo</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Costo Unidad</th>
                        <th scope="col">Costo Total</th>
                        <th scope="col">Pagina</th>
                        <th scope="col">Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(
                            (product, index)=>(
                                <tr key={index} className='text-center'>
                                    <th scope="row">{index}</th>
                                    <td>{product.code}</td>
                                    <td>{product.amount}</td>
                                    <td>S/. {product.price}</td>
                                    <td>S/. {product.price_total}</td>
                                    <td>{product.page}</td>
                                    <td>
                                        <button
                                            className='btn'
                                            onClick={()=>{deleteProduct(index, product.price_total, product.amount)}}>
                                            <img src="/delete.svg" width="30px" alt=""/>
                                        </button> 
                                    </td>
                                </tr>
                            ) 
                        )}
                        <tr className='text-center'>
                            <th scope="row"></th>
                            <td className='fw-bold'>Total</td>
                            <td className='fw-bold'>{totalProducts}</td>
                            <td> - </td>
                            <td className='fw-bold'>S/. {totalMount}</td>
                        </tr>
                    </tbody>
                </table>
            
            
            
        </div>
    )
}

export default ProductList
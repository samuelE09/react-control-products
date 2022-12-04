import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'

function App() {

  return (
   <div className='container mt-5 row align-items-center'>
    <div className="col-md-6 col-sm-6">
      <ProductForm/>
    </div>
    <div className="col-md-6 col-sm-6">
      <ProductList/>
    </div>
    
    
   </div>
  )
}

export default App

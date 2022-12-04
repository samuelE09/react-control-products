import {createContext, useEffect, useState} from 'react'

export const ProductContext = createContext()

export function ProductContextProvider(props) {

    const [products, setProducts] = useState([])
    const [totalProducts, setTotalProducts] = useState(0)
    const [totalMount, setTotalMount] = useState(0)

    useEffect(() => {
      setProducts(products)
    }, [])
    
    function createProduct(product) {
      setProducts([...products, {
        id: products.length,
        code : product.code,
        amount : product.amount,
        price: product.price,
        page: product.page,
        price_total: product.price_total
      }])
      setTotalMount(totalMount + parseFloat(product.price_total))
      setTotalProducts(totalProducts + parseFloat(product.amount))
    }

    function deleteProduct(productIndex, price_total, amount_partial) {
      setProducts(products.filter((product, index) => index != productIndex))
      setTotalMount(totalMount - parseFloat(price_total))
      setTotalProducts(totalProducts - parseFloat(amount_partial))
    }

  return (
    <>
        <ProductContext.Provider value={{
          products,
          createProduct, 
          totalProducts,
          totalMount,
          deleteProduct
          
        }}>
            {props.children}
        </ProductContext.Provider>
    </>
  )
}


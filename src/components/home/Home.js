import React, { useContext } from 'react'
import { AppContext } from '../../context/ContextProvider';
import SingleProduct from '../product/SingleProduct';
import '../product/style.css'
import Filters from '../Filter';
export default function Home() {

  const {cartState} = useContext(AppContext)
  
  return (
    <div className='home'>
      <Filters />
      <div className='productContainer' >
        {
          cartState?.products?.map(product=>{
            return <SingleProduct key={product?.id} product={product} />
          })
        }
      </div>
    </div>
  )
}

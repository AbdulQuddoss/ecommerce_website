import React from 'react'
import { useFilterContext } from '../Context/FilterContext'
import GridView from './GridView';
import ListView from './ListView';

const ProductList = () => {
  const { filter_products, productsView } = useFilterContext();
  console.log(filter_products);
  
  if(productsView === true) {
    return <GridView products={filter_products}/>
  }

  if(productsView === false) {
    return <ListView products={filter_products}/>
  }
}

export default ProductList
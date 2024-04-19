// import ProductContext from "./ProductContext";
// import { useState } from "react";
// import { ProductProviderProps } from "../types/ProductTypes";
// // estados iniciais são criados no provider



// function ProductProvider({ children }: ProductProviderProps) {
//   //const [data, setData] = useState< ProductContexType[] | ErrorProductContexType []>([])
//   const [data, setData] = useState([])

//   async function getResultValidationionProduct() {
//     const planets = await postFileToAPI();
//     setData(planets);
//     setIsLoading(false);
//   }

//   const values = { data }
//   return (
//     <ProductContext.Provider value={values}>
//       {children}
//     </ProductContext.Provider>
//   );
// }

// export default ProductProvider;

import { useState } from 'react';
import { ProductProviderProps, ProductContextValue, ProductContexType, ErrorProductContexType } from '../types/ProductTypes';
import ProductContext from './ProductContext';

function ProductProvider({ children }: ProductProviderProps) {
  const [data, setData] = useState< ProductContexType [] | ErrorProductContexType [] >([]);
  // const [uploadResponse, setUploadResponse] = useState(null);


  const values: ProductContextValue = { data, setData };

  return (
    <ProductContext.Provider value={values}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
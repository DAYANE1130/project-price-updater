// import { createContext } from "react";

// type ProductContexType = {
//   code: number;
//   name: string;
//   sales_price: number;
//   new_price : number;
// }
//  type ErrorProductContexType = {
//   code: number;
//   message: string;
// }

// export type ProductContextValue = {
//   data: ProductContexType[] | ErrorProductContexType;  // um array de produtos
//   setData: (data: ProductContexType[]) => void;  // uma função para atualizar a lista de produtos
// };


// const ProductContext = createContext({}) 

// export default ProductContext;

import { createContext } from "react";
import { ProductContextValue } from '../types/ProductTypes';

const ProductContext = createContext<ProductContextValue | null>(null)

export default ProductContext;
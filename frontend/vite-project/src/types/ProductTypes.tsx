export type ProductContexType = {
  code: number;
  name: string;
  current_price: number;
  new_price: number;
}

export type ErrorProductContexType = {
  code: number;
  message: string;
}

export type ProductProviderProps = {
  children: React.ReactNode
}
// export type ProductContextValue = {
//   data: ProductContexType[] | ErrorProductContexType[];  // um array de produtos
//   setData: (data: ProductContexType[] | ErrorProductContexType[]) => void;  // uma função para atualizar a lista de produtos
// };
export interface ProductContextValue {
  data: ProductContexType[] | ErrorProductContexType[];
  setData: React.Dispatch<React.SetStateAction<ProductContexType[] | ErrorProductContexType[]>>;
}
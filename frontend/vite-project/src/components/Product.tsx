// import ProductContext from "../context/ProductContext";

// function Product() {

//   return (
//     //Código, Nome, Preço Atual, Novo Preço
//     <div>
//       <h1>Status da validação de produtos</h1>
//       <h2>Código:</h2>
//       <h2>Nome:</h2>
//       <h2>Preço Atual:</h2>
//       <h2>Novo Preço:</h2>
//       {/* {erros ? erros.map((erro, index ) => (
//         <p key={index}> Erro:{erro}</p>
//       )) : <p> Produtos validados com sucesso </p>} */}
//     </div>

//   )
// }

// export default Product;

// import  { useContext } from "react";
// import ProductContext from "../context/ProductContext";

// function Product() {
//   const context = useContext(ProductContext);

//   if (!context) {
//     throw new Error("Product must be used within a ProductProvider");
//   }

//   const { data } = context;

//   return (
//     //Código, Nome, Preço Atual, Novo Preço
//     // <div>
//     //   <h1>Status da validação de produtos</h1>
//     //   <h2>Código: {data?.code}</h2>
//     //   <h2>Nome: {data?.name}</h2>
//     //   <h2>Preço Atual: {data?.sales_price}</h2>
//     //   <h2>Novo Preço: {data?.new_price}</h2>
//     // </div>
//     <div>
//       <h1>Status da validação de produtos</h1>
//       {data.map((product, index) => (
//          if ('name' in item) {
//           const product = item as ProductContexType;
//         <div key={index}>
//           <h2>Código: {product.code}</h2>
//           <h2>Nome: {product.name}</h2>
//           <h2>Preço Atual: {product.sales_price}</h2>
//           <h2>Novo Preço: {product.new_price}</h2>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default Product;

import  { useContext } from "react";
import ProductContext from "../context/ProductContext";
import { ProductContexType, ErrorProductContexType } from "../types/ProductTypes";

function Product() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("Product must be used within a ProductProvider");
  }

  const { data } = context;
  console.log('EU SOU O DATA QUE CHEGA NO COMPONETE PRODUCT', data)
  // LEMBRE-SE QUE DATA É O ARRAY COM PRODUTOS OU ERROS

  return (
    <div>
      <h1>Status da validação de produtos</h1>
      {data.map((item, index) => {
        if ('name' in item) {
          const product = item as ProductContexType;
          return (
            <div key={index}>
              <h2>Código: {product.code}</h2>
              <h2>Nome: {product.name}</h2>
              <h2>Preço Atual: {product.current_price}</h2>
              <h2>Novo Preço: {product.new_price}</h2>
            </div>
          )
        } else {
          const error = item as ErrorProductContexType;
          return (
            <div key={index}>
              <h2>Código: {error.code}</h2>
              <h2>Mensagem de erro: {error.message}</h2>
            </div>
          )
        }
      })}
    </div>
  )
}

export default Product;
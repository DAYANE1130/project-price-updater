import { useState } from "react";

function UpdateProduct() {
  const [allProductsValid] = useState<boolean>(false);
  return (
      <div>
        <button disabled={!allProductsValid }>Atualizar</button>
      </div>
  );
}

export default UpdateProduct;
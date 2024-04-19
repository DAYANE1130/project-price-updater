import FileUpload from '../src/components/FileUpload';
import Product from './components/Product';
import UpdateProduct from './components/UpdateProduct';
//import ProductContext from './context/ProductContext';

function App() {
  return (
    <div className="App">
      <h1>Upload de Arquivo</h1>
      <FileUpload />
      <Product/>
      <UpdateProduct/>
    </div>
  );
}

export default App;

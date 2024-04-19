import { useState, ChangeEvent, useContext } from "react";
import { postFileToAPI } from "../services/api";
import ProductContext from "../context/ProductContext";


function FileUpload() {
  //começa seu turno, ele não tem nenhum livro(arquivo)
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("FileUpload must be used within a ProductProvider");
  }
  const { setData } = context;
  const [file, setFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };

  const handleValidation = async () => {
    if (!file) return;

    try {
      const response = await postFileToAPI(file)
      if (response && response.status === 200) {
        setData(response.data)
        setUploadSuccess(true)
      }
      console.log(response?.data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div>
      <div>
        <input type="file" onChange={handleFileChange} />
        {file && <p>Arquivo selecionado: {file.name}</p>}
      </div>
      <div>
        <button onClick={handleValidation}>Validar</button>
        {uploadSuccess && <p>Upload feito com sucesso</p>}
      </div>
      {/* <div>
        <button>Atualizar</button>
      </div> */}

    </div>
  );
}

export default FileUpload;
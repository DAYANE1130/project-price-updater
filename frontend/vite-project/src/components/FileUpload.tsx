import { useState, ChangeEvent } from "react";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Cria uma instância do axios para o mock
const mock = new MockAdapter(axios);

// Define a resposta para a requisição de upload
mock.onPost('http://localhost:3333/upload').reply(200, {
  data: 'Arquivo enviado com sucesso!'
});

const uploadFile = (file :File) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post("http://localhost:3333/upload", formData);
};

function FileUpload() {
  //começa seu turno, ele não tem nenhum livro(arquivo)
  const [file, setFile] = useState<File | null>(null);
  /*Então, um autor chega com um novo livro (o usuário seleciona um arquivo). 
  O bibliotecário pega o livro do autor e guarda com ele para adicionar à
   biblioteca mais tarde (handleFileChange é chamada e o
     arquivo é armazenado no estado). */
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };
  /* O bibliotecário tem um botão na sua mesa escrito 
  "Adicionar Livro à Biblioteca" (botão Upload). 
  Quando ele aperta esse botão, ele leva o livro que está com ele 
  e o adiciona à biblioteca (handleUpload é chamada)*/
  const handleUpload = async () => {
    if (!file) return;

    // const formData = new FormData();
    // formData.append("file", file);
    /*Para fazer isso, ele tem que preencher um formulário com os detalhes do livro (FormData) e enviá-lo para 
     a administração da biblioteca (o backend) (fetch("/api/upload")).*/
    // try {
    //   const response = await fetch("/api/upload", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   if (!response.ok) {
    //     throw new Error("Erro no upload do arquivo");
    //   }

    //   const data = await response.json();
    //   console.log(data);
    // } catch (error) {
    //   console.error("Erro:", error);
    // }
    try {
      const response = await uploadFile(file);
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {file && <p>Arquivo selecionado: {file.name}</p>}
    </div>
  );
}

export default FileUpload;
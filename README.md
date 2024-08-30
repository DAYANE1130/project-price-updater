# Ferramenta de Atualização de Preços para E-commerce

## Descrição

Este projeto é uma ferramenta desenvolvida para permitir a atualização massiva de preços de produtos em lojas de e-commerce, garantindo que os preços estejam alinhados com os custos de operação e atendendo a regras específicas para evitar erros que possam prejudicar o negócio. A ferramenta foi projetada para ser utilizada por usuários internos da empresa, permitindo a carga de arquivos CSV com os novos preços dos produtos e aplicando validações para garantir que as atualizações sejam realizadas de forma correta e eficiente.

## Cenário

A ferramenta foi desenvolvida em resposta à necessidade de atualizar os preços de produtos de forma massiva, considerando as regras estabelecidas pelos diferentes times da empresa. As regras incluem a imposição de limites de preço para evitar que os preços de venda fiquem abaixo dos custos e a restrição de reajustes maiores ou menores que 10% do preço atual do produto. Além disso, a ferramenta considera produtos vendidos em pacotes, exigindo que os preços dos componentes do pacote sejam ajustados de forma a manter o preço final do pacote consistente.

## 

O sistema envolve a construção de um sistema que atenda aos requisitos especificados, incluindo a criação de um back-end em Node.js com todas as regras definidas e um front-end em React.js para a interação do usuário. O sistema deve permitir o carregamento de arquivos CSV de precificação, realizar verificações de validação dos dados e atualizar os preços no banco de dados MySQL, considerando as regras de negócio.

## Requisitos

- **Back-end**: Desenvolvido em Node.js, contendo todas as regras de validação e lógica de negócios.
- **Front-end**: Desenvolvido em React.js, fornecendo uma interface amigável para o usuário carregar e validar arquivos de precificação.
- **Banco de dados**: MySQL (versão 5 ou 8), utilizado para armazenar os dados dos produtos e suas informações de precificação.
- **Linguagem**: JavaScript ou TypeScript, preferencialmente.
- **Funcionalidades**:
 - Carregamento de arquivos CSV de precificação.
 - Validação dos dados do arquivo, incluindo a verificação de campos necessários, existência de códigos de produtos, valores numéricos válidos para os preços e conformidade com as regras de negócio.
 - Exibição dos produtos validados e informações sobre quaisquer regras de validação quebradas.
 - Atualização dos preços no banco de dados, considerando as regras para produtos em pacotes.

## Como Instalar e Rodar o Projeto

1. Clone o repositório do projeto do GitHub.
2. Navegue até o diretório do projeto e instale as dependências com `npm install`.
3. Configure o arquivo `.env` com as informações do banco de dados MySQL.
4. Execute as migrações para criar a estrutura do banco de dados com `node ace migration:run`.
5. Inicie o servidor com `node ace serve --watch`.

## Autenticação e Autorização

A ferramenta utiliza JWT (JSON Web Token) para autenticação e autorização, garantindo que apenas usuários autorizados possam acessar e utilizar a ferramenta.

## Rotas

A ferramenta disponibiliza rotas para o cadastro de usuários, login, carregamento de arquivos de precificação, validação dos dados e atualização dos preços dos produtos.

## Documentação

A documentação da API, incluindo detalhes sobre os endpoints, parâmetros necessários e exemplos de solicitações e respostas, está disponível no Postman.

## Melhorias Futuras

- Implementação de testes automatizados para garantir a qualidade do código.
- Adição de funcionalidades de relatórios para acompanhar as atualizações de preços.
- Melhorias na interface do usuário para facilitar a interação com a ferramenta.

## Conclusão

Este projeto demonstra a capacidade de desenvolver uma ferramenta robusta e eficiente para atualização de preços em e-commerce, considerando as regras de negócio específicas e garantindo a qualidade dos dados através de validações rigorosas.

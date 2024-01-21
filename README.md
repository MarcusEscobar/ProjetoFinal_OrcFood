# Projeto Final - Assombrólisis

## instruções para execultar a aplicação:
Para execultar a aplicação é necessário que o [Node.js](https://nodejs.org/en) esteja instalado em seu computador, pois somente através do node.js as dependencias do projeto serão instaladas.

Com o node instalado entre na pasta ProjetoFinal_OrcFood, dentro dela haverá outras duas pastas, client e server, a pasta client representa o frontend da aplicação, vamos instalar suas dependencias primeiro. Entre na pasta cliente:
~~~~
cd client
~~~~
Depois utilize o node para instalar as dependencias do cliente. Execulte o comando:
~~~~
npm install
~~~~
Isso fará que as dependencias do frontend sejam baixadas, como o React, Axios entre outras dependencias.

Com as dependencias do frontend instaladas com sucesso vamos então configurar o backend.
Volte a pasta ProjetoFinal_OrcFood e depois entre na pasta server
~~~~
cd ..
~~~~
~~~~
cd server
~~~~
Depois instale as dependencias. Execute o comando:
~~~~
npm install
~~~~
Agora dentro da pasta server crie um arquivo .env seguindo as variaveis definidas em .env.exemple
 
O campo MONGODB_URI é responsável por fazer a conexão com o banco de dados, associe essa variável a seguinte url:
mongodb+srv://admin:50r7CZ3cdysrETPi@cardapio.cqgtenm.mongodb.net/?retryWrites=true&w=majority

E o campo APP_SECRET é a chave para a criptografia das senhas dos usuários, associe essa variável a seguinte valor:
T3JjRm9vZCBhcHAgc2VjcmV0

## Iniciando a aplicaão
Para rodar a aplicação é nescessário execultar tanto o backend quanto o frontend ao mesmo tempo para isso utilize dois terminais.
Para rodar o backend execulte os seguintes comandos :
~~~~
cd ..
~~~~
~~~~
cd server
~~~~
~~~~
npm run dev
~~~~

E para rodar o frontent utilize:
~~~~
cd ..
~~~~
~~~~
cd client
~~~~
~~~~
npm run dev
~~~~






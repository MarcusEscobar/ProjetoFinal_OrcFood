# Projeto Final - Assombrólisis

## Instruções para execultar a aplicação:
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

## Funcionalidades da aplicação

### Recursos para Clientes:

### Exploração do Cardápio: Os clientes podem visualizar todos os produtos disponíveis, ler descrições detalhadas e selecionar itens para compra.

### Carrinho de Compras: Facilitamos o processo de compra com um carrinho intuitivo, permitindo que os clientes revisem e finalizem seus pedidos com facilidade.

### Gamificação: Cada compra é recompensada com um ticket, dando aos clientes a chance de girar uma roleta emocionante.

### Roleta de Prêmios: Os clientes podem ganhar moedas que podem ser usadas para adquirir cupons de desconto ao girar a roleta.

### Perfil Personalizado: Os clientes têm acesso a um perfil pessoal onde podem visualizar e editar suas informações, como nome, endereço e email.

### Acompanhamento de Compras: O status e o andamento de cada compra são facilmente acessíveis no perfil do cliente. onde também é possível cancelar um pedido realizado.

### Cadastro: Os clientes podem se cadastrar na aplicação assim tendo acesso a todas as outras funcionalidades.

### Recursos para Administradores:

Gestão do Cardápio: Os administradores têm o controle total sobre o cardápio, podendo adicionar ou remover produtos conforme necessário.
Customização da Roleta: Ajuste os prêmios disponíveis na roleta para manter a experiência sempre interessante.
Monitoramento de Pedidos: Todos os pedidos são centralizados para os administradores, que podem editar os status para "pendente", "em andamento" ou "concluído".








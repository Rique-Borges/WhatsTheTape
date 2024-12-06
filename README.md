# WhatsTheTape

WhatsTheTape é uma rede social voltada para música, onde os usuários podem interagir através de postagens relacionadas a tracks, álbuns e artistas. O projeto inclui funcionalidades básicas de CRUD para gerenciar usuários e postagens, com suporte a autenticação JWT para maior segurança.

## Funcionalidades Principais

- **CRUD de Usuários**: Gerenciamento completo de usuários, incluindo criação, leitura, atualização e exclusão.
- **CRUD de Tracks**: Permite aos usuários criar, visualizar, editar e excluir postagens relacionadas a música.
- **Autenticação via Email**: Sistema de login simplificado que utiliza apenas o email do usuário, acompanhado de uma senha de teste para fins de desenvolvimento.
  - **JWT Token**: Geração de um token JWT após autenticação bem-sucedida.

## Tecnologias Utilizadas

- **React Native com Expo**: Framework para desenvolvimento mobile. Usando **TypeScript** para maior segurança e tipagem de dados.
- **Expo Plugins**:
  - `expo-router`: Gerenciamento de rotas.
  - `expo-secure-store`: Armazenamento seguro de dados sensíveis.
- **Metro Bundler**: Ferramenta de empacotamento utilizada pelo Expo para processar e servir arquivos.
- **HTTP Requests**: Consumo de APIs REST para operações CRUD.
- **Autenticação JWT**: Implementação de um sistema de autenticação seguro.

## Estrutura do Projeto

- **Splash Screen**: Personalização do layout de carregamento inicial.
- **Compatibilidade**:
  - Android: Suporte total, incluindo ícones adaptativos.
  - Web: Compatível, mas não é o foco principal.

## Requisitos de Instalação

1. Certifique-se de que o Node.js e o Expo CLI estão instalados no seu sistema.
2. Clone o repositório do projeto.
3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npx expo start
   ```

## Como Utilizar

1. Acesse o aplicativo pelo emulador ou dispositivo físico utilizando o QR Code gerado pelo Expo.
2. Crie uma conta utilizando seu email.
3. Para autenticação, use uma senha de 8 dígitos qualquer ou a senha de teste `12345678`.
4. Explore as funcionalidades de criar, editar e deletar tracks e usuários.

## Configurações Adicionais

- **Configuração de Splash e ícones**: Imagens personalizadas localizadas na pasta `assets/images/`.

## Licença

Este projeto está licenciado sob os termos da [Licença MIT](LICENSE).


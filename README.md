# Default-Backend-Project

Este projeto foi desenvolvido do absoluto zero por mim e tem como finalidade ser um CRUD completo com todas as configurações iniciais prontas. Possibilitando a qualquer desenvolvedor dar continuidade no projeto, possui sistemas como: autenticação JWT com midlewares, capturador de erros que dispensa a necessidade de try/cath, conta com uma documentação completa utilizando swagger, arquitetura limpa e moderna, eu a utilizada comercialmente nos projetos em que trabalho, Aqui reuni todo meu conhecimento para desenvolve-lo, utilizei das melhores técnicas e tecnologias da atualidade.

## 🚀 Clonando o repositório 🚀

Após clonar o repositório, partiremos para algumas informações básicas.

### 📋 O Projeto 📋

Os pacotes listados abaixo já estão configurados para facilitar e agilizar o desenvolvimento.

#### 📦 Pacotes 📦

- EditorConfig
- Eslint
- Prettier
- Husky
- LintStaged
- Prettier
- Swagger

#### 🖥️ Tecnologias 🖥️

- NodeJS
- Typescript
- Prisma
- Express
- Postgres
- Helmet

### ⚙️ Executando o projeto ⚙️

Qualquer configuração que necessite interferência do usuário acompanha o prefixo //CHANGE HERE

#### 🗂️ Estrutura de pastas 🗂️

```
> Grupo
  > Tipagens
  > Módulo
    > Controllers
      > Subgrupos
        > Funções
        > Rotas
  > Services
    > Classe de serviços
```

#### 🌎 Alterando .env 🌎

```
DATABASE_URL=postgresql://admin:admin@localhost:5432
JWT_SECRET=JWTSecret
AWS_ACCESS_KEY_ID=amazonKeyId
AWS_SECRET_ACCESS_KEY=amazonSecretAcessKey
AWS_S3_BUCKET=amazonBucket
```

#### 🧩 Configurando Cors 🧩

```
//CHANGE HERE
const allowedOrigins = [
  'urlDoSeuFrontEnd',
  'urlDoSeuFrontEnd'
];
```

## ✒️ Desenvolvido por

- [Carlos Pasquali](https://github.com/carlospasqualidev) 💀

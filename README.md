## Descrição do projeto:
 
Interface da aplicação exams-software, uma aplicação para realizar cadastro, deleção e atualização de exames e instituições de saúde, seguindo regras de negócios próprias. O design desse projeto foi desenvolvido por mim utilizando como referência os exemplos do material-ui.

Sumário
=================
<!--ts-->
   * [Descrição do Projeto](#descrição-do-projeto)
   * [Sumário](#sumário)
    * [Tecnologias utilizadas](#Tecnologias-utilizadas)
   * [Como instalar e rodar o projeto](#Como-instalar-e-rodar-o-projeto)
      * [Pré Requisitos](#pré-requisitos)
      * [Build do Projeto](#build-do-projeto)
* [Uso e Endpoints Liberados](#uso-e-endpoints-liberados)
        
* [Considerações Finais](#considerações-finais)
<!--te-->


## Estrutura do projeto
```
.
├── src/
|   ├── components/                
|   |   ├── header/
|   |   ├── institution-card/
|   |   ├── main-content/
|   |   ├── new-exam-form/
|   |   ├── new-institution-form/
|   |   ├── table/
|   |   ├── update-exam-form/
|   |   └── update-customer-form
|   |   
|   ├── models/                       
|   |   └── ...
|   ├── services/                      
|     ├── axios/
|     |    └── ...      
|     └── validation/
|          └── ...                        
├── pages/ 
|   └── App.tsx
├── public/
|   └── img/
|        └── ...
|
└── ...
```


## Tecnologias utilizadas: 

* TypeScript - JavaScript tipado.

* React - Biblioteca JavaScript criada pelo o facebook para criação de interfaces de usuários.

* Axios - Cliente Http baseado em promises para fazer requisições.

* React hook form - Biblioteca para lidar com formulários em React.

* Yup - Biblioteca para validações em React.

* MaterialUi - Biblioteca JavaScript criada pelo o Google para criação de interfaces de usuários.


# Como instalar e rodar o projeto: 

## Pré Requisitos:

Para poder rodar o projeto na sua máquina é necessário ter instalado [NodeJs](https://nodejs.org/en/).

## Build do projeto:

Após baixar o projeto, abra o terminal de comando na raíz do projeto e execute o seguinte comando:

```sh
npm install
```

Este comando irá instalar os módulos para que o node possa rodar o projeto. Após isso execute o seguinte comando:

```sh
yarn start
```
Após subir a aplicação, acesse http://localhost:3000 para poder utilizá-la.

# Experiências e dificuldades

* Essa foi minha segunda aplicação React, a primeira que eu desenvolvi além de utilizar o react utilizei também o next.js, e, após trabalhar neste projeto percebo que o next facilita muitas coisas, decidi utilizar o material-ui, que eu nunca tinha utilizado, fiquei espantado com o poder dele e quero estudar mais sobre o mesmo.
*Tive bastante dificuldades por conta do tempo e por ter utilizado coisas novas o que demanda mais tempo de estudo, o projeto está incompleto, tentei fazer o máximo que consegui, porém planejo finalizá-lo.
*Achei que seria mais simples desenvolver o projeto em apenas uma página, por ser uma aplicação mais simples que não demanda muitas requisições achei que seria melhor porém enfrentei novos desafios pois, já que não tinha várias páginas eu tinha que ter um controle maior das minhas variáveis e tive que passar muito mais props de um componente para o outro, inclusive meu maior aprendizado: passar propriedades de um componente filho para o componente pai.
*Tenho umas ideias de animação e design legais que não pude implementar pois não consegui finalizar o projeto.
*Tentei usar o swr para ter uma experiência mais agradável para o usuário, podendo usar o "mutate" mostrando sem dar reload na página a quantidade de moedas cobradas, podendo usar animações e deixando a aplicação muito mais fluida, porém tive diversos erros que apenas consertei utilizando o axios normalmente.
*Apesar de consertar as minhas requisições continuam dando problema e se encontram em loop, e quando eu uso um useEffect ou useCallback elas param de buscar dados, o primeiro passo para melhorar essa aplicação é trabalhar a integração com o backend.


# Considerações Finais

* Foi utilizado para mostrar notificações para o usuário a função alert, do próprio JavaScript, o próximo passo seria a criação de uma biblioteca de "Toasts" para realizar essas notificações de sucesso e erro.
* Uma maneira de deixa a aplicação mais viável seria criar novas páginas, assim temos menos requisições no backend na mesma página.

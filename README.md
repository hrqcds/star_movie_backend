# Meu Projeto

## Instalação

- Para instalar as dependências, execute o comando `npm install` ou `yarn` no diretório do projeto.

## Configuração

- Tenha o banco postgres instalado
- Crie um arquivo `.env` no diretório do projeto e copie o conteúdo do arquivo `.env.example` para ele.
- Edite o arquivo `.env` e configure as variáveis de ambiente de acordo com as necessidades do projeto.
- DATABASE_URL e SHADOW_DATABASE_URL

## Migrations

- Execute o comando para iniciar as migrations do banco.
- npx prisma migrate deploy ou yarn prisma migrate deploy

## Build do NestJS

- Para gerar o build do projeto NestJS, execute o comando `npm run build` ou `yarn build`.
- Esse comando irá compilar o código TypeScript em JavaScript e gerar os arquivos de saída no diretório de build configurado.

## Rodar o Build

- Após gerar o build do NestJS, execute o projeto a partir dos arquivos de saída gerados ou execute o comando:
- npm run start:prod ou yarn start:prod

## Alternativa docker
- Rode o comando `docker build -t nest-cloud-run .` para gerar o build da aplicação
- Rode o comando `docker run -p <PORT>:<PORT> nest-cloud-run
 

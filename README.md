# Balcão de Ofertas - API

## Desafio Técnico para Eclipseworks

Esta é uma RESTful API para o Balcão de Ofertas, um recurso do aplicativo voltado para uma blockchain. A API fornece serviços para listar ofertas, criar ofertas e deletar ofertas. Ela foi desenvolvida utilizando o framework Fastify e o banco de dados PostgreSQL.

## Configurações do ambiente

Siga as etapas abaixo para configurar o ambiente e executar a API localmente.

### Pré-requisitos

Certifique-se de ter os seguintes softwares instalados em seu sistema:

- [Node.js](https://nodejs.org/en/download) (versão 18 ou superior)
- [Docker](https://docs.docker.com/get-docker/)

### Passos

1. Com o terminal aberto, acesse o diretório do projeto:

```bash
cd desafio-eclipseworks
```

2. Instale as dependências do projeto:

```bash
npm install
```

3. Inicie o container do Docker com o banco de dados PostgreSQL, usando o Docker Compose:

```bash
docker compose up -d
```

4. Execute o script que preencherá o banco de dados com registros iniciais de Usuários, Carteiras e Moedas.

```bash
npm run seed
```

5. Inicie o servidor da API:

```bash
npm run start:dev
```

A API do Balcão de Ofertas estará disponível em `http://localhost:3333`.

## Endpoints

### Listagem de ofertas

Retorna todas as ofertas ativas do dia atual.

- URL: `/orders`
- Método: `GET`

#### Parâmetros de consulta opcionais

- `page`: número da página desejada para paginação (padrão 1).

#### Exemplo de requisição

```bash
GET /orders?page=1
```

#### Exemplo de resposta

```json
{
 "orders": [
  {
   "id": "e754d540-38b0-44c1-a844-e88abd4d5bc6",
   "price_usd": 3.4,
   "currency_amount": 20,
   "source_wallet_id": "cc952ebe-7e0c-4e7c-859d-fdd22ef57a3a",
   "created_at": "2023-07-14T04:57:13.900Z",
   "deleted_at": null,
   "user_id": "f0375c92-afc5-4ae9-8fd3-dd6829f6557f"
  },
  {
   "id": "d9ebc548-90c2-439e-96e4-f1933c2397f9",
   "price_usd": 2.4,
   "currency_amount": 2,
   "source_wallet_id": "b401073a-3e48-43d4-9e3b-52d74d712b6d",
   "created_at": "2023-07-14T04:56:34.027Z",
   "deleted_at": null,
   "user_id": "4fe6b487-ee07-4952-b6f1-bf597b26fd05"
  },
  ...
 ]
}
```

### Criar oferta

Cria uma nova oferta para uma determinada moeda em uma carteira específica do usuário.

- URL: `/orders`
- Método: `POST`

#### Cabeçalhos

- `x-user-id`: ID do usuário ativo.

#### Corpo da requisição

- `currencyAmount`: Quantidade ofertada da moeda.
- `priceUsd`: Preço unitário da moeda ofertada, em Dólar.
- `sourceWalletId`: ID da carteira movimentada.

#### Exemplo de requisição

```bash
POST /orders
Content-Type: application/json
x-user-id: 4fe6b487-ee07-4952-b6f1-bf597b26fd05

{
  "currencyAmount": 2.26,
  "priceUsd": 23,
  "sourceWalletId": "b401073a-3e48-43d4-9e3b-52d74d712b6d",
}
```

#### Exemplo de resposta

```json
{
 "id": "fbe49649-74ba-40a4-8e48-f66919cd1840",
 "price_usd": 2.26,
 "currency_amount": 23,
 "source_wallet_id": "b401073a-3e48-43d4-9e3b-52d74d712b6d",
 "created_at": "2023-07-14T13:19:01.968Z",
 "deleted_at": null,
 "user_id": "4fe6b487-ee07-4952-b6f1-bf597b26fd05"
}
```

### Deletar oferta

Exclui uma oferta existente.

- URL: `/orders/:orderId`
- Método: `DELETE`

#### Cabeçalhos

- `x-user-id`: ID do usuário ativo.

#### Parâmetros da rota

- `orderId`: ID da oferta a ser deletada.

#### Exemplo de solicitação

```bash
DELETE /orders/fbe49649-74ba-40a4-8e48-f66919cd1840
x-user-id: 4fe6b487-ee07-4952-b6f1-bf597b26fd05
```

## Dados de Exemplo

### Usuários

Os seguintes usuários foram pré-preenchidos no banco de dados:

- Usuário 1
  - ID: `536af849-05fa-45de-a7c0-765a394f223b`
  - Nome: Alexis White
  - E-mail: <edmond.anderson42@yahoo.com>
  - Data de criação: `2022-12-18T01:58:07.876Z`

- Usuário 2
  - ID: `4fe6b487-ee07-4952-b6f1-bf597b26fd05`
  - Nome: Melanie Murphy
  - E-mail: <rickie_koelpin30@yahoo.com>
  - Data de criação: `2022-12-31T14:37:01.368Z`

- Usuário 3
  - ID: `f0375c92-afc5-4ae9-8fd3-dd6829f6557f`
  - Nome: Santos Marks
  - E-mail: <jessie.marvin-boyle@gmail.com>
  - Data de criação: `2023-05-19T20:56:41.199Z`

- Usuário 4
  - ID: `b9fdcc28-9ee0-4ba8-9686-64754d77584c`
  - Nome: Patrick Gulgowski
  - E-mail: <angelina.welch49@yahoo.com>
  - Data de criação: `2023-06-04T12:15:24.299Z`

- Usuário 5
  - ID: `fa4e7a8d-feb2-426b-9f4e-de6f3fc183b9`
  - Nome: Elisa Murazik Sr.
  - E-mail: <jared.swaniawski88@gmail.com>
  - Data de criação: `2022-09-25T09:55:53.886Z`

### Carteiras

Cada usuário pode ter várias carteiras associadas à sua conta. Abaixo estão algumas das carteiras pré-preenchidas:

- Carteira 1
  - ID: `4e93d64f-6a9e-49f5-804b-9bb30e87790f`
  - Endereço: `1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2`
  - Saldo: 0.56234895
  - ID do usuário: `536af849-05fa-45de-a7c0-765a394f223b`
  - ID da moeda: `73c855a5-a9a6-4f4b-8fe5-28e91d7dd04d`
  - Data de criação: `2023-06-12T09:23:16.123Z`

- Carteira 2
  - ID: `b401073a-3e48-43d4-9e3b-52d74d712b6d`
  - Endereço: `0x742d35Cc6634C0532925a3b844Bc454e4438f44e`
  - Saldo: 5.82698215
  - ID do usuário: `4fe6b487-ee07-4952-b6f1-bf597b26fd05`
  - ID da moeda: `4c4802e4-7574-4014-8fb1-52d08e539dc0`
  - Data de criação: `2023-07-02T18:45:09.235Z`

- Carteira 3
  - ID: `cc952ebe-7e0c-4e7c-859d-fdd22ef57a3a`
  - Endereço: `DdzFFzCqrhsvUQBJhzaWnVXfE2ruVqfKYeQt3wLH4kchpeWpQvMkDzvnUycq7PdKoWQnRV2CnWJfxwYodskpkDR1yFTj8yTQFQe4MdAq`
  - Saldo: 100.5
  - ID do usuário: `f0375c92-afc5-4ae9-8fd3-dd6829f6557f`
  - ID da moeda: `8e01dec9-5836-43df-bae5-ccf427e70dc2`
  - Data de criação: `2023-06-20T14:10:35.891Z`

- Carteira 4
  - ID: `9c208c54-d8e4-43ef-8c76-62f3ea8683f7`
  - Endereço: `3Kj2sijqTxfGxEWJsy4BXvTsBJBQUdS6aH`
  - Saldo: 2.18953641
  - ID do usuário: `b9fdcc28-9ee0-4ba8-9686-64754d77584c`
  - ID da moeda: `73c855a5-a9a6-4f4b-8fe5-28e91d7dd04d`
  - Data de criação: `2023-06-29T07:51:19.445Z`

- Carteira 5
  - ID: `3d7c491b-83e2-4be7-91d3-d8f0667e3777`
  - Endereço: `0x4E599C6a8e6A9D22D33F13d75C140d9b2776e485`
  - Saldo: 10.78
  - ID do usuário: `fa4e7a8d-feb2-426b-9f4e-de6f3fc183b9`
  - ID da moeda: `73c855a5-a9a6-4f4b-8fe5-28e91d7dd04d`
  - Data de criação: `2023-07-09T11:27:53.713Z`

### Moedas

A seguir estão as moedas pré-preenchidas no banco de dados:

- Bitcoin (BTC)
  - ID: `73c855a5-a9a6-4f4b-8fe5-28e91d7dd04d`
  - Nome: Bitcoin
  - Código: BTC
  - Data de criação: `2022-01-15T10:30:00.000Z`

- Ethereum (ETH)
  - ID: `4c4802e4-7574-4014-8fb1-52d08e539dc0`
  - Nome: Ethereum
  - Código: ETH
  - Data de criação: `2022-04-05T16:45:00.000Z`

- Cardano (ADA)
  - ID: `60be5968-bfe8-4312-b126-c882306a33e5`
  - Nome: Cardano
  - Código: ADA
  - Data de criação: `2022-07-20T08:15:00.000Z`

- Litecoin (LTC)
  - ID: `8e01dec9-5836-43df-bae5-ccf427e70dc2`
  - Nome: Litecoin
  - Código: LTC
  - Data de criação: `2022-11-30T18:30:00.000Z`

### Utilizando os dados

Durante o teste da API, você pode utilizar os IDs de usuário, carteira e moeda fornecidos acima para criar, consultar e manipular os dados relacionados. Certifique-se de utilizar os IDs corretos nos cabeçalhos, URLs ou nos corpos de solicitação, conforme necessário.

Por exemplo, ao criar uma nova oferta associada a uma carteira específica, utilize o ID da carteira e o ID do usuário correspondentes. Da mesma forma, ao excluir uma oferta, verifique se o ID da oferta pertence ao usuário correto.

## Melhorias e considerações futuras

Durante o desenvolvimento do projeto e ao analisar sua arquitetura e implementação, identifiquei algumas melhorias e pontos de consideração para o futuro. De maneira geral, as melhorias aqui descritas visam aprimorar o desempenho, escalabilidade e manutenibilidade do projeto, seguindo boas práticas de desenvolvimento. Abaixo estão algumas das melhorias sugeridas:

### 1. Monitoramento e Logging

- Configuração de ferramentas para monitoramento e coleta de métricas importantes da API, como Sentry, ou Datadog. Isso facilitaria na identificação de possíveis problemas de desempenho.

- Aprimorar o logging, utilizando bibliotecas específicas para isso. Uma boa estrutura de logging também ajudaria na análise e solução de possíveis problemas na API.

### 2. Segurança e autenticação

- Adicionar um sistema de autenticação seguro, devido à natureza da aplicação, como JSON Web Token, que garantiria a proteção das rotas para que apenas usuários com autenticados e autorizados conseguissem acessar e manipular determinados recursos (*e.g.* verificar saldo, deletar ofertas, etc).

### 3. Melhorar a paginação

- Adicionar um parâmetro de limite na rota de listagem de ofertas, permitindo ao front-end que possa definir a quantidade de ordens retornadas dinamicamente.

### 4. Implementação de padrões de projeto e boas práticas

- Utilizar de padrões de projeto como Clean Architecture visando melhorar a possibilidade de manutenção do projeto por outros desenvolvedores.

- Garantir que boas práticas sejam utilizadas no desenvolvimento do código, como Clean Code, garantindo a legibilidade, separação concisa de responsabilidades.

- Implementação de testes end-to-end que garantem o funcionamento integrado dos componentes do projeto, atendendo aos requisitos do produto.

### 6. Otimização de desempenho

- Analisar a utilização do banco de dados e verificar consultas mais realizadas, o que permite a definição adequada de indices e outras técnicas de otimização.

- Utilização de mecanismos de cache, como Redis, para armazenar dados acessados com frequência, reduzindo a carga do banco de dados e o tempo de resposta da API. Deve-se considerar estratégias adequadas de invalidação do cache para garantir a consistência e atualização dos dados.

### 7. Validação e tratativas de erros

- Aprimorar a validação e respostas da API para requisições com dados incorretos ou ausentes no corpo, cabeçalho ou parâmetros de consulta, sendo mais específico.

### 8. Melhoria na documentação

- Adicionar Swagger (OpenAPI) ou ferramenta similar no projeto, visando melhorar o nível de documentação do projeto e facilitar a interação com os endpoints. Isso facilita a integração de novos desenvolvedores na equipe.

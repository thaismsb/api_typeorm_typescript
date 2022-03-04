# api_typescript_typeorm

Criar uma nova rota para criar um novo usuário: (POST: /api/user)
:: DETALHES ::
_ O payload deve composto por:
{
id: string // no formato uuid
name: string // obrigatorio e não pode ser menor que 3 caracteres
email: string // obrigatorio e deve ser um email num formato válido (não podendo ser "asdasdasdasd" por exemplo)
birthDate: Date // não obrigatorio
username: string // obrigatorio, não pode ser menor que 5 caracteres e não pode existir mais que um na tabela, deve então validar se já existe alguem usando o mesmo username
}
_ Use o celebrate como um middleware para validar os dados antes de chamar a controller.

Criar rota que busca usuários filtrando por nome e/ou email
:: DETALHES ::
* a rota recebe um parametro chamado 'query' que pode o começo de um nome, exemplo, se existir no banco os usuários (maria, marcos, marcelo, matheus, maycon, cleudimar, sidmar, ana, ...) e na query for passado 'mar' então deve retornar um array de usuários que tem em parte do seu nome a string 'mar'.


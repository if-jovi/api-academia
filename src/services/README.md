Nome do Projeto - Sistema de Gestão para Academia
📝 Descrição
API REST para gerenciamento completo de uma academia, permitindo o cadastro e controle de alunos, professores, planos, avaliações físicas, treinos, máquinas e pagamentos.

🚀 Tecnologias utilizadas
    • Node.js;

    • Express;

    • PostgreSQL;

    • dotenv;

    • pgAdmin 4;

    • Bibliotecas;
# Estrutura do projeto
src/
│
├── controllers/          # Lógica de resposta para as rotas
├── services/             # Lógica de negócio e acesso ao banco de dados
├── routers/              # Definição de rotas da API
├── middlewares/          # Middleware de autenticação, validação, etc
├── configs/              # Configurações de banco de dados e ambiente
└── index.js              # Ponto de entrada do app

🔧 Como executar
bash
# Clone o repositório
git clone https://github.com/usuario/nome-do-repositorio

# Acesse o diretório do projeto
cd nome-do-repositorio

# Instale as dependências
npm install


# Crie um arquivo .env com as variáveis de ambiente
# Exemplo:
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=academia

# Rode o script SQL com a estrutura das tabelas
# Inicie o servidor
npm run dev


📚 Documentação da API
👤 Pessoas
# Não implementado
GET /pessoas
Retorna a lista de todas as pessoas.
POST /pessoas
Cria uma nova pessoa.
json

{
  "nome_completo": "Ana Lima",
  "cpf": "12345678900",
  "email": "ana@email.com",
  "data_nascimento": "1990-05-20",
  "sexo": "F",
  "tipo_pessoa": "ALUNO"
}


# Não implementado
📱 Telefones
GET /telefones
Lista todos os telefones cadastrados.
POST /telefones
Adiciona um telefone para uma pessoa.
json
{
  "id_pessoa": 1,
  "numero_telefone": "(11) 91234-5678",
  "tipo_telefone": "Celular"
}

# Não implementado
🏠 Endereços
GET /enderecos
Lista todos os endereços cadastrados.
POST /enderecos
Adiciona um endereço a uma pessoa.
json
{
  "id_pessoa": 1,
  "rua": "Rua das Flores",
  "numero": "123",
  "cidade": "São Paulo",
  "estado": "SP",
  "cep": "01234-567",
  "complemento": "Apartamento 101"
}



🧑‍🏫 Professores
GET /professores
Retorna a lista de professores cadastrados.
GET /professores/id_professor
retorna dados de um professor com base no id informado
PUT /professores/id_professor
Atualiza dados de um professor com base no id informado
POST /professores
Cadastra um novo professor.
json
{
  "id_pessoa": 2,
  "cref": "123456-SP",
  "especialidade": "Musculação"
}


🧍‍♂️ Alunos
GET /alunos 
Lista todos os alunos.
GET /alunos/id_aluno
Retorna os dados de um aluno específico buscando pelo id.
PUT /alunos/id_aluno
Atualiza os dados de um aluno.
POST /alunos
Cadastra um novo aluno.
json
{
  "nome_completo": "João da Silva",
  "cpf": "12345678901",
  "email": "joao@example.com",
  "data_nascimento": "1995-05-10",
  "sexo": "M",
  "data_inicio": "2025-05-01",
  "objetivo": "Perder peso"
}




🏋️ Treinos
GET /treinos
Lista todos os treinos.
GET /treinos/id_treino
Lista o treino por ID
GET /treino-completo/id_aluno/:dia
Ira trazer todos os treinos do aluno informado pelo id, e com base no dia da semana informado
PUT /treinos/id_treino
atualiza dados do treino por id
POST /treinos
Cria um novo treino para um aluno.
json
{
  "id_professor": 1,
  "id_aluno":2,
  "nome_treino": "Treino de Resistência",
  "observacoes": "Foco em membros inferiores. Executar 3x por semana.",
  "data_treino": "terca",
  "data_inicio": "2025-05-10",
  "data_fim": "2025-06-10"
}


🦵 Exercícios do Treino
GET /treinos_exercicios
Lista os exercícios de todos os treinos.
GET /treinos_exercicios/id
Lista um unico exercicio pelo ID informado
PUT /treinos_exercicios/id
Atualiza um treino exercicio por id
DELETE /treinos_exercicios/id
Deleta exercicio do treino com base no id informado
POST /treinos_exercicios
Adiciona um exercício ao treino.
json
{
"id_treino" : "1",
"id_exercicio":"3", 
"series":"4", 
"repeticoes":"12", 
"carga_kg":"80", 
"descanso":"00:01:30"
}


🛠️ Máquinas
GET /maquinas
Lista todas as máquinas da academia.
POST /maquinas
Cadastra uma nova máquina.
json
{
  "tipo_maquina": "Cardio",
  "nome_maquina": "Esteira Eletrônica",
  "em_manutencao": false
}


🧱 Exercícios
GET /exercicios
Lista todos os exercícios disponíveis.
PUT /exercicios/id_exercicio
Atualiza dados dos exercicios por id
POST /exercicios
Cria um novo exercício.
json
{
"id_maquina": "1",
"grupo_muscular": "teste",
"equipamento": "fly"
}


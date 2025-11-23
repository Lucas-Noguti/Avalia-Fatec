# 🚀 Setup do Projeto Avalia FATEC

## 📋 Pré-requisitos

- **Java 17** ou superior
- **Node.js 18** ou superior
- **MySQL 8.0** via XAMPP
- **Maven** (incluído no projeto)

## 🗄️ Configuração do Banco de Dados

### 1. Iniciar o MySQL no XAMPP
- Abra o XAMPP Control Panel
- Clique em "Start" no módulo MySQL
- Aguarde até o status ficar verde

### 2. O banco será criado automaticamente
O Spring Boot criará automaticamente o banco `avalia_fatec` e todas as tabelas necessárias na primeira execução.

**Estrutura do Banco:**
- `questions` - Questões do banco
- `question_options` - Alternativas das questões
- `assessments` - Avaliações criadas
- `assessment_questions` - Relacionamento N:N
- `disciplines` - Disciplinas cadastradas
- `classes` - Turmas
- `professors` - Professores
- `professor_disciplines` - Relacionamento N:N

## 🔧 Configuração do Backend

### 1. Navegar até a pasta do backend
```bash
cd backend
```

### 2. Compilar o projeto
```bash
./mvnw clean install
```

### 3. Executar o backend
```bash
./mvnw spring-boot:run
```

O backend estará disponível em: `http://localhost:8080`

### 4. Testar a API
Acesse: `http://localhost:8080/api/questions`

Se retornar um array JSON (mesmo que vazio), está funcionando!

## 🎨 Configuração do Frontend

### 1. Navegar até a pasta do frontend
```bash
cd frontend
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Executar o frontend
```bash
npm run dev
```

O frontend estará disponível em: `http://localhost:5173`

## 📊 Dados Iniciais

O sistema já vem com dados de exemplo:
- ✅ 4 Disciplinas
- ✅ 3 Professores
- ✅ 3 Turmas
- ✅ 4 Questões de exemplo

## 🔗 Endpoints da API

### Questões
- `GET /api/questions` - Listar todas as questões
- `GET /api/questions/{id}` - Buscar questão por ID
- `GET /api/questions/filter?subject=&type=&difficulty=&keyword=` - Filtrar questões
- `POST /api/questions` - Criar nova questão
- `PUT /api/questions/{id}` - Atualizar questão
- `DELETE /api/questions/{id}` - Excluir questão

### Avaliações
- `GET /api/assessments` - Listar todas as avaliações
- `GET /api/assessments/{id}` - Buscar avaliação por ID
- `POST /api/assessments` - Criar nova avaliação
- `PUT /api/assessments/{id}` - Atualizar avaliação
- `DELETE /api/assessments/{id}` - Excluir avaliação

### PDF
- `POST /api/exams/generate-pdf` - Gerar PDF de uma avaliação
- `GET /api/exams/generate-sample-pdf` - Gerar PDF de exemplo

## 🛠️ Tecnologias Utilizadas

### Backend
- Spring Boot 3.5.6
- Spring Data JPA
- MySQL Connector
- Lombok
- ModelMapper
- OpenPDF
- Bean Validation

### Frontend
- React 18
- React Router DOM
- Vite
- CSS Modules

## ✨ Funcionalidades Implementadas

### ✅ Backend
- [x] Entidades JPA com relacionamentos
- [x] Repositories com queries customizadas
- [x] Services com lógica de negócio
- [x] Controllers REST
- [x] DTOs com validação
- [x] Exception handling global
- [x] CORS configurado
- [x] Geração de PDF

### ✅ Frontend
- [x] Banco de Questões com filtros
- [x] Modal de visualização
- [x] Integração com API
- [x] Loading e error states
- [x] CRUD completo de questões
- [x] Design responsivo
- [x] Tema dark

## 🐛 Troubleshooting

### Erro de conexão com o banco
- Verifique se o MySQL está rodando no XAMPP
- Confirme que a porta 3306 está livre
- Verifique o usuário/senha em `application.properties`

### Erro de CORS
- Verifique se o frontend está rodando na porta 5173
- Confirme a configuração em `CorsConfig.java`

### Erro ao compilar backend
- Verifique se o Java 17 está instalado: `java -version`
- Limpe o cache do Maven: `./mvnw clean`

### Erro ao instalar dependências do frontend
- Limpe o cache do npm: `npm cache clean --force`
- Delete `node_modules` e `package-lock.json`
- Execute `npm install` novamente

## 📝 Próximos Passos

1. Implementar autenticação JWT
2. Adicionar mais endpoints (Disciplinas, Turmas, Professores)
3. Implementar dashboard com estatísticas
4. Adicionar upload de imagens nas questões
5. Implementar sistema de correção automática
6. Adicionar relatórios em PDF

## 📧 Suporte

Para dúvidas ou problemas, consulte a documentação ou entre em contato com a equipe de desenvolvimento.

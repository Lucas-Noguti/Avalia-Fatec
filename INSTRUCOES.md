# 📚 Plataforma de Criação de Provas - Avalia FATEC

## 🎯 Sobre o Projeto

Sistema completo para criação e gerenciamento de avaliações acadêmicas com:
- ✅ Cadastro de questões de múltipla escolha
- ✅ Banco de questões com filtros avançados
- ✅ Criação de avaliações selecionando questões
- ✅ Geração de PDF das provas
- ✅ Interface moderna e responsiva

## 🚀 Como Executar

### 1️⃣ Iniciar o Backend

```bash
cd backend
./mvnw spring-boot:run
```

**Aguarde até ver**: `População do banco de dados concluída!`

O backend estará em: `http://localhost:8080`

### 2️⃣ Iniciar o Frontend

```bash
cd frontend
npm install  # Apenas na primeira vez
npm run dev
```

O frontend estará em: `http://localhost:5173`

## 📋 Fluxo de Uso

### 1. Cadastrar Questões

1. Acesse **"Banco de Questões"**
2. Clique em **"Cadastrar Nova Questão"**
3. Preencha:
   - **Matéria** (Ex: Cálculo I)
   - **Tópico** (Opcional - Ex: Derivadas)
   - **Dificuldade** (Fácil, Média ou Difícil)
   - **Pontuação** (0.5 a 10 pontos)
   - **Enunciado** (A pergunta)
   - **Alternativas** (Mínimo 2, máximo ilimitado)
   - **Marque a alternativa correta** (clique no círculo)
4. Clique em **"Salvar Questão"**

### 2. Gerenciar Questões

No **Banco de Questões** você pode:
- 👁️ **Visualizar** - Ver detalhes completos
- ✏️ **Editar** - Modificar questão existente
- 🗑️ **Excluir** - Remover questão (com confirmação)
- 🔍 **Filtrar** - Por matéria, dificuldade ou palavra-chave

### 3. Criar Avaliação

1. Vá em **"Minhas Avaliações"**
2. Clique em **"Criar Nova Avaliação"**
3. Preencha os dados da prova:
   - Título
   - Turma
   - Valor total
   - Datas de início e fim
   - Instruções
4. **Busque e adicione questões** do banco
5. Defina a pontuação de cada questão
6. Clique em **"Salvar e Publicar Avaliação"**

### 4. Gerar PDF

1. Na lista de avaliações, clique em **"Ver Resultados"**
2. Clique em **"Gerar PDF"**
3. O PDF será baixado automaticamente

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais:

- **questions** - Questões cadastradas
  - statement (enunciado)
  - type (sempre MULTIPLE_CHOICE)
  - subject (matéria)
  - topic (tópico)
  - difficulty (EASY, MEDIUM, HARD)
  - points (pontuação)
  - correctAnswer (resposta correta)

- **question_options** - Alternativas das questões
  - question_id (FK)
  - option_text (texto da alternativa)
  - option_order (ordem A, B, C, D...)

- **assessments** - Avaliações criadas
  - title (título)
  - course (turma)
  - examDate (data da prova)
  - totalPoints (pontuação total)
  - status (DRAFT, PUBLISHED, ARCHIVED)

- **assessment_questions** - Relacionamento N:N
  - assessment_id (FK)
  - question_id (FK)
  - question_order (ordem das questões)

## 📊 Dados de Exemplo

O sistema já vem com:
- ✅ 8 questões de exemplo
- ✅ 4 disciplinas (Cálculo I, Estrutura de Dados, POO, Banco de Dados)
- ✅ 3 professores
- ✅ 3 turmas

## 🔧 Endpoints da API

### Questões
```
GET    /api/questions              - Listar todas
GET    /api/questions/{id}         - Buscar por ID
GET    /api/questions/filter       - Filtrar (subject, difficulty, keyword)
POST   /api/questions              - Criar nova
PUT    /api/questions/{id}         - Atualizar
DELETE /api/questions/{id}         - Excluir
```

### Avaliações
```
GET    /api/assessments            - Listar todas
GET    /api/assessments/{id}       - Buscar por ID
POST   /api/assessments            - Criar nova
PUT    /api/assessments/{id}       - Atualizar
DELETE /api/assessments/{id}       - Excluir
```

### PDF
```
POST   /api/exams/generate-pdf     - Gerar PDF da avaliação
GET    /api/exams/generate-sample-pdf - PDF de exemplo
```

## ✨ Funcionalidades Implementadas

### Frontend
- [x] Cadastro de questões com validação
- [x] Banco de questões com filtros
- [x] Modal de visualização
- [x] Integração completa com API
- [x] Loading states e error handling
- [x] Confirmação antes de excluir
- [x] Design responsivo e moderno
- [x] Serviço de API centralizado

### Backend
- [x] Arquitetura em camadas (Controller → Service → Repository)
- [x] Entidades JPA com relacionamentos
- [x] DTOs com validação
- [x] Exception handling global
- [x] CORS configurado
- [x] DataLoader automático
- [x] Geração de PDF com OpenPDF

## 🎨 Tecnologias

### Backend
- Java 17
- Spring Boot 3.5.6
- Spring Data JPA
- MySQL 8.0
- Lombok
- ModelMapper
- OpenPDF

### Frontend
- React 18
- React Router DOM
- Vite
- CSS Modules
- Font Awesome

## 🐛 Troubleshooting

### Backend não inicia
- Verifique se o MySQL está rodando no XAMPP
- Confirme que a porta 8080 está livre
- Execute: `./mvnw clean install`

### Frontend com erro "Failed to fetch"
- Verifique se o backend está rodando
- Confirme que está acessando `http://localhost:5173`
- Limpe o cache do navegador (Ctrl + Shift + R)

### Erro ao criar questão
- Verifique se preencheu todos os campos obrigatórios (*)
- Certifique-se de marcar uma alternativa como correta
- Preencha pelo menos 2 alternativas

### PDF não gera
- Verifique se a avaliação tem questões associadas
- Confirme que o backend está rodando
- Veja os logs do backend para detalhes do erro

## 📝 Validações Implementadas

### Ao criar questão:
- ✅ Enunciado obrigatório
- ✅ Matéria obrigatória
- ✅ Mínimo 2 alternativas preenchidas
- ✅ Uma alternativa marcada como correta
- ✅ Alternativa correta deve ter texto
- ✅ Pontuação entre 0.5 e 10

### Ao criar avaliação:
- ✅ Título obrigatório
- ✅ Turma obrigatória
- ✅ Valor total obrigatório
- ✅ Pelo menos uma questão selecionada

## 🎯 Próximas Melhorias Sugeridas

1. Autenticação de usuários (JWT)
2. Upload de imagens nas questões
3. Editor de texto rico (WYSIWYG)
4. Estatísticas e relatórios
5. Importação/Exportação de questões (Excel/CSV)
6. Banco de imagens para questões
7. Correção automática de provas
8. Dashboard com gráficos

## 📧 Suporte

Para dúvidas ou problemas:
1. Verifique os logs do backend
2. Abra o console do navegador (F12)
3. Consulte esta documentação

---

**Desenvolvido para FATEC** 🎓

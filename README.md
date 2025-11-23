# FLAVALIA - Gerador de Provas 📝

Uma plataforma web para que professores possam criar, gerenciar e compartilhar provas e bancos de questões de forma simples e eficiente.

## Sobre o Projeto 📖

Este projeto foi desenvolvido em grupo para fins avaliativos na faculdade e tem como objetivo principal otimizar o tempo de professores na elaboração de avaliações. A plataforma permite a criação de um banco de questões reutilizáveis, a montagem de provas com diferentes questões e a exportação para formatos imprimíveis.

## Screenshots 

(adicionar prints do nosso projeto aqui)

| Tela de Login | Dashboard Principal |
| :---: | :---: |
| [Imagem da tela de login] | [Imagem do dashboard] |
| **Criação de Prova** | **Banco de Questões** |
| [Imagem da criação de prova] | [Imagem do banco de questões] |

---

## Funcionalidades Principais ⚙

### ✅ Implementadas
- 📝 **Cadastro de Questões** - Crie questões de múltipla escolha com alternativas
- 🗂️ **Banco de Questões** - Organize e gerencie todas as questões cadastradas
- 🔍 **Filtros Avançados** - Busque por matéria, dificuldade ou palavra-chave
- 👁️ **Visualização Detalhada** - Veja todos os detalhes de cada questão
- ✏️ **Edição** - Modifique questões existentes
- 🗑️ **Exclusão** - Remova questões com confirmação
- 📊 **Criação de Avaliações** - Monte provas selecionando questões do banco
- 📄 **Geração de PDF** - Exporte provas em formato PDF profissional
- 🎨 **Interface Moderna** - Design responsivo e intuitivo
- 🔄 **API REST** - Backend completo com Spring Boot

## 🚀 Como Executar

### Pré-requisitos
- Java 17+
- Node.js 18+
- MySQL 8.0 (via XAMPP)
- Maven

### Opção 1: Script Automático (Windows)
```bash
# Certifique-se que o MySQL está rodando no XAMPP
# Depois execute:
start.bat
```

### Opção 2: Manual

**1. Inicie o MySQL no XAMPP**

**2. Backend:**
```bash
cd backend
./mvnw spring-boot:run
```
Aguarde: `População do banco de dados concluída!`

**3. Frontend:**
```bash
cd frontend
npm install  # Apenas na primeira vez
npm run dev
```

**4. Acesse:** http://localhost:5173

## 📋 Fluxo de Uso

1. **Cadastre Questões** → Banco de Questões → Cadastrar Nova
2. **Gerencie** → Visualize, edite ou exclua questões
3. **Crie Avaliações** → Selecione questões e monte a prova
4. **Gere PDF** → Exporte a prova formatada

## 🛠️ Tecnologias

### Backend
- Java 17
- Spring Boot 3.5.6
- Spring Data JPA
- MySQL
- Lombok
- OpenPDF

### Frontend
- React 18
- React Router
- Vite
- CSS Modules

## 📚 Documentação

- [INSTRUCOES.md](INSTRUCOES.md) - Guia completo de uso
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Resolução de problemas
- [SETUP.md](SETUP.md) - Configuração detalhada


 ## Equipe do Projeto 👩‍💻

* **[Ilie Krishna]**
    * [GitHub](https://github.com/iliekrishna)
    * [LinkedIn](https://www.linkedin.com/in/ilie-krishna-4a9009231)

* **[Nicole Trujillano]**
    * [GitHub](https://github.com/NicoleTrujillano)
    * [LinkedIn](https://www.linkedin.com/in/nicoletrujillano)

* **[Lucas Noguti]**
    * [GitHub](https://github.com/Lucas-Noguti)
    * [LinkedIn](https://www.linkedin.com/in/lucasnoguti)
 
 * **[João Guilherme]**
    * [GitHub](https://github.com/o-guima)
    * [LinkedIn](https://www.linkedin.com/in/joão-guilherme-mendes-arquejada-149463257/)

* **[Maria Júlia]**
    * [GitHub](https://github.com/maju-cardoso)
    * [LinkedIn](https://linkedin.com/in/[usuario-linkedin])
 
* **[Manuela Gadelho]**
    * [GitHub](https://github.com/Manuela-Gadelho)
    * [LinkedIn](https://www.linkedin.com/in/manuela-moreira-gadelho/)

* **[Breno Santos]**
    * [GitHub](https://github.com/ZockinZ)
    * [LinkedIn](https://www.linkedin.com/in/breno-souza-santos-28a924306)

* **[Pedro Dienes]**
    * [GitHub](https://github.com/WLFGRL2014)
    * [LinkedIn](https://www.linkedin.com/in/pedrodienes)
   
* **[Ruryá Henri]**
    * [GitHub](https://github.com/[usuario-github])
    * [LinkedIn](https://www.linkedin.com/in/henri-oliveira-miranda-46658421a/)
      

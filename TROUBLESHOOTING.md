# 🔧 Guia de Resolução de Problemas

## ❌ Erro: "Failed to fetch" ao criar questão

### Causa Provável
O frontend não consegue se comunicar com o backend.

### Soluções:

#### 1️⃣ Verificar se o Backend está rodando

```bash
# Abra um terminal e execute:
cd backend
./mvnw spring-boot:run
```

**Aguarde até ver:**
```
Started Application in X seconds
População do banco de dados concluída!
```

#### 2️⃣ Testar a conexão manualmente

Abra o navegador e acesse:
```
http://localhost:8080/api/questions
```

**Resultado esperado:** Um array JSON (pode estar vazio `[]` ou com questões)

**Se der erro 404 ou não carregar:** O backend não está rodando.

#### 3️⃣ Verificar porta ocupada

Se o backend não inicia, pode ser que a porta 8080 esteja ocupada:

```bash
# Windows
netstat -ano | findstr :8080

# Se encontrar algo, mate o processo:
taskkill /PID <número_do_pid> /F
```

#### 4️⃣ Verificar MySQL

- Abra o XAMPP Control Panel
- Certifique-se que o MySQL está **verde** (Started)
- Se não estiver, clique em "Start"

#### 5️⃣ Limpar cache e recompilar

```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

---

## ❌ Erro: "Erro HTTP: 400" ou "Erro HTTP: 500"

### Causa Provável
Dados enviados estão incorretos ou faltando campos obrigatórios.

### Soluções:

#### 1️⃣ Verificar campos obrigatórios

Certifique-se de preencher:
- ✅ Enunciado
- ✅ Matéria
- ✅ Dificuldade
- ✅ Pontuação
- ✅ Pelo menos 2 alternativas
- ✅ Uma alternativa marcada como correta

#### 2️⃣ Verificar logs do backend

No terminal onde o backend está rodando, procure por:
```
ERROR ... Erro ao criar questão
```

Isso mostrará o erro exato.

#### 3️⃣ Verificar console do navegador

Pressione **F12** e vá na aba **Console**. Procure por:
```
API Request: ...
API Response: ...
Error Data: ...
```

---

## ❌ Erro: "Backend offline" aparece no topo

### Causa
O frontend detectou que o backend não está respondendo.

### Solução

1. Verifique se o backend está rodando (veja seção 1)
2. Recarregue a página (Ctrl + R)
3. Se persistir, reinicie o backend

---

## ❌ Alternativas não aparecem ou somem

### Causa
Problema no estado do React.

### Solução

1. Recarregue a página (Ctrl + Shift + R - hard reload)
2. Limpe o cache do navegador
3. Verifique se há erros no console (F12)

---

## ❌ Questão não aparece na lista após criar

### Causa Provável
Erro ao salvar no banco ou problema de sincronização.

### Soluções:

#### 1️⃣ Verificar se salvou no banco

Acesse:
```
http://localhost:8080/api/questions
```

Se a questão aparecer aqui mas não no frontend, recarregue a página.

#### 2️⃣ Verificar logs do backend

Procure por:
```
INFO ... Questão criada com sucesso: ID X
```

Se não aparecer, houve erro ao salvar.

#### 3️⃣ Verificar banco de dados

Abra o phpMyAdmin (http://localhost/phpmyadmin) e verifique:
- Banco: `avalia_fatec`
- Tabela: `questions`
- Se há registros

---

## ❌ Erro: "Cannot read property 'map' of undefined"

### Causa
Dados não carregaram corretamente do backend.

### Solução

1. Verifique se o backend está rodando
2. Recarregue a página
3. Verifique o console (F12) para erros de API

---

## 🔍 Como Debugar

### 1. Abra o Console do Navegador (F12)

Você verá logs como:
```javascript
API Request: http://localhost:8080/api/questions {method: 'POST', ...}
API Response: 201 Created
API Data: {id: 1, statement: "...", ...}
```

### 2. Verifique os Logs do Backend

No terminal do backend, você verá:
```
INFO ... Recebendo requisição para criar questão: QuestionDTO(...)
INFO ... Questão criada com sucesso: ID 1
```

### 3. Use o Network Tab (F12 → Network)

- Filtre por "Fetch/XHR"
- Clique na requisição para `/api/questions`
- Veja:
  - **Headers**: Método, URL, Status
  - **Payload**: Dados enviados
  - **Response**: Resposta do servidor

---

## 🚨 Erros Comuns e Soluções Rápidas

| Erro | Solução |
|------|---------|
| `Failed to fetch` | Backend não está rodando |
| `404 Not Found` | URL errada ou endpoint não existe |
| `400 Bad Request` | Dados inválidos ou faltando campos |
| `500 Internal Server Error` | Erro no backend, veja os logs |
| `CORS error` | Problema de CORS (já configurado) |
| Página em branco | Erro no React, veja console (F12) |
| Loading infinito | Requisição travada, recarregue |

---

## ✅ Checklist de Verificação

Antes de reportar um erro, verifique:

- [ ] MySQL está rodando no XAMPP
- [ ] Backend está rodando (`./mvnw spring-boot:run`)
- [ ] Frontend está rodando (`npm run dev`)
- [ ] Porta 8080 está livre
- [ ] Porta 5173 está livre
- [ ] Navegador está em `http://localhost:5173`
- [ ] Console do navegador não tem erros (F12)
- [ ] Logs do backend não têm erros

---

## 📞 Ainda com Problemas?

1. **Reinicie tudo:**
   ```bash
   # Pare o backend (Ctrl + C)
   # Pare o frontend (Ctrl + C)
   # Reinicie o MySQL no XAMPP
   # Inicie o backend novamente
   # Inicie o frontend novamente
   ```

2. **Limpe tudo:**
   ```bash
   # Backend
   cd backend
   ./mvnw clean
   
   # Frontend
   cd frontend
   rm -rf node_modules
   npm install
   ```

3. **Verifique os logs detalhados:**
   - Backend: Terminal onde está rodando
   - Frontend: Console do navegador (F12)
   - MySQL: XAMPP Control Panel → Logs

---

## 🎯 Teste de Conexão Rápido

Execute este teste no console do navegador (F12):

```javascript
fetch('http://localhost:8080/api/questions')
  .then(r => r.json())
  .then(data => console.log('✅ Backend OK:', data))
  .catch(err => console.error('❌ Backend ERRO:', err));
```

**Resultado esperado:** `✅ Backend OK: [...]`

# 🔧 Correção Rápida do Backend

## ❌ Problemas Identificados

1. **Erro SQL**: `Data truncated for column 'type' at row 2`
   - Causa: Banco de dados tem dados antigos incompatíveis com o novo schema
   
2. **Porta 8080 ocupada**: `Port 8080 was already in use`
   - Causa: Outra instância do backend está rodando

---

## ✅ Solução Rápida (3 passos)

### Passo 1: Limpar Banco de Dados

**Opção A - Pelo phpMyAdmin:**
1. Abra: http://localhost/phpmyadmin
2. Clique em "SQL" no topo
3. Cole e execute:
```sql
DROP DATABASE IF EXISTS avalia_fatec;
CREATE DATABASE avalia_fatec CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**Opção B - Pelo arquivo:**
1. Abra o arquivo `limpar-banco.sql`
2. Copie todo o conteúdo
3. Cole no phpMyAdmin → SQL → Executar

### Passo 2: Liberar Porta 8080

**Opção A - Script automático:**
```bash
# Execute o arquivo:
matar-porta-8080.bat
```

**Opção B - Manual:**
```bash
# Encontre o processo:
netstat -ano | findstr :8080

# Mate o processo (substitua XXXX pelo PID):
taskkill /F /PID XXXX
```

### Passo 3: Iniciar Backend

```bash
cd backend
./mvnw spring-boot:run
```

**Aguarde até ver:**
```
Started Application in X seconds
População do banco de dados concluída!
```

---

## 🚀 Solução Automática (1 clique)

Execute o script que faz tudo:
```bash
start.bat
```

Este script:
1. ✅ Verifica MySQL
2. ✅ Libera porta 8080
3. ✅ Inicia backend
4. ✅ Inicia frontend
5. ✅ Abre navegador

---

## 🔍 Verificar se Funcionou

### 1. Backend rodando?
Acesse: http://localhost:8080/api/questions

**Esperado:** Array JSON (pode estar vazio `[]`)

### 2. Logs do backend
No terminal, procure por:
```
INFO ... População do banco de dados concluída!
INFO ... Tomcat started on port 8080
```

### 3. Banco criado?
Abra phpMyAdmin e verifique:
- Banco: `avalia_fatec` existe
- Tabelas: `questions`, `assessments`, etc.

---

## 🐛 Se Ainda Não Funcionar

### Erro: "Communications link failure"
**Causa:** MySQL não está rodando

**Solução:**
1. Abra XAMPP Control Panel
2. Clique em "Start" no MySQL
3. Aguarde ficar verde
4. Reinicie o backend

### Erro: "Access denied for user 'root'"
**Causa:** Senha do MySQL está incorreta

**Solução:**
Edite `backend/src/main/resources/application.properties`:
```properties
spring.datasource.username=root
spring.datasource.password=SUA_SENHA_AQUI
```

### Erro: "Table doesn't exist"
**Causa:** Tabelas não foram criadas

**Solução:**
1. Limpe o banco (Passo 1)
2. Verifique que `spring.jpa.hibernate.ddl-auto=create-drop` está configurado
3. Reinicie o backend

### Erro: "Port 8080 was already in use"
**Causa:** Porta ainda ocupada

**Solução:**
```bash
# Mate TODOS os processos Java:
taskkill /F /IM java.exe

# Ou reinicie o computador
```

---

## 📋 Checklist Completo

Antes de iniciar, verifique:

- [ ] MySQL rodando no XAMPP (verde)
- [ ] Porta 8080 livre
- [ ] Banco `avalia_fatec` limpo
- [ ] Java 17 instalado (`java -version`)
- [ ] Maven funcionando (`./mvnw -version`)

---

## 🎯 Configuração Atual

O backend está configurado para:
- **Recriar tabelas** a cada inicialização (`create-drop`)
- **Popular dados** automaticamente via `DataLoader`
- **8 questões de exemplo** serão criadas

**Nota:** Após confirmar que está funcionando, você pode mudar para `update` em vez de `create-drop` para manter os dados entre reinicializações.

---

## 📞 Comandos Úteis

```bash
# Ver processos na porta 8080
netstat -ano | findstr :8080

# Matar processo específico
taskkill /F /PID <numero>

# Matar todos os Java
taskkill /F /IM java.exe

# Verificar Java
java -version

# Limpar e compilar backend
cd backend
./mvnw clean install

# Iniciar backend
./mvnw spring-boot:run
```

---

## ✅ Sucesso!

Se você ver:
```
INFO ... População do banco de dados concluída!
INFO ... Tomcat started on port 8080
```

**O backend está funcionando!** 🎉

Teste em: http://localhost:8080/api/questions

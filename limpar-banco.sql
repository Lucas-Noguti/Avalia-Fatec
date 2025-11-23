-- Execute este script no phpMyAdmin para limpar o banco

-- Remover banco antigo
DROP DATABASE IF EXISTS avalia_fatec;

-- Criar banco novo
CREATE DATABASE avalia_fatec CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar o banco
USE avalia_fatec;

-- Pronto! O Spring Boot criará as tabelas automaticamente

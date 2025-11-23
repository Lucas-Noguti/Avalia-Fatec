-- Script para popular o banco de dados com dados iniciais
-- Este script será executado automaticamente pelo Spring Boot

-- Inserir disciplinas
INSERT INTO disciplines (name, code, description, created_at, updated_at) VALUES
('Cálculo I', 'MAT001', 'Fundamentos de cálculo diferencial e integral', NOW(), NOW()),
('Estrutura de Dados', 'ADS002', 'Estruturas de dados fundamentais e algoritmos', NOW(), NOW()),
('Programação Orientada a Objetos', 'ADS003', 'Conceitos de POO e design patterns', NOW(), NOW()),
('Banco de Dados', 'ADS004', 'Modelagem e implementação de bancos de dados relacionais', NOW(), NOW());

-- Inserir professores
INSERT INTO professors (name, email, phone, role, active, created_at, updated_at) VALUES
('Prof. João Silva', 'joao.silva@fatec.sp.gov.br', '(11) 98765-4321', 'PROFESSOR', true, NOW(), NOW()),
('Prof. Maria Santos', 'maria.santos@fatec.sp.gov.br', '(11) 98765-4322', 'COORDINATOR', true, NOW(), NOW()),
('Prof. Carlos Oliveira', 'carlos.oliveira@fatec.sp.gov.br', '(11) 98765-4323', 'PROFESSOR', true, NOW(), NOW());

-- Inserir turmas
INSERT INTO classes (name, semester, shift, student_count, discipline_id, created_at, updated_at) VALUES
('ADS 3A', '2025.1', 'Manhã', 40, 2, NOW(), NOW()),
('ADS 3B', '2025.1', 'Noite', 35, 2, NOW(), NOW()),
('ADS 2A', '2025.1', 'Manhã', 38, 3, NOW(), NOW());

-- Inserir questões de exemplo
INSERT INTO questions (statement, type, subject, topic, difficulty, points, created_at, updated_at) VALUES
('Qual é a derivada de x²?', 'MULTIPLE_CHOICE', 'Cálculo I', 'Derivadas', 'EASY', 1.0, NOW(), NOW()),
('Explique o conceito de "Pilha" (Stack) em Estrutura de Dados, citando suas principais operações.', 'ESSAY', 'Estrutura de Dados', 'Estruturas Lineares', 'MEDIUM', 2.5, NOW(), NOW()),
('Em Java, uma interface pode conter métodos com implementação padrão?', 'TRUE_FALSE', 'Programação Orientada a Objetos', 'Interfaces', 'MEDIUM', 1.0, NOW(), NOW()),
('O que é polimorfismo em POO?', 'SHORT_ANSWER', 'Programação Orientada a Objetos', 'Conceitos Fundamentais', 'MEDIUM', 2.0, NOW(), NOW());

-- Inserir alternativas para questão de múltipla escolha
INSERT INTO question_options (question_id, option_text, option_order) VALUES
(1, '2x', 0),
(1, 'x³/3', 1),
(1, 'x', 2),
(1, '2', 3);

-- Atualizar resposta correta da questão 1
UPDATE questions SET correct_answer = 'A) 2x' WHERE id = 1;

-- Atualizar resposta correta da questão 3
UPDATE questions SET correct_answer = 'Verdadeiro' WHERE id = 3;

-- Atualizar resposta esperada da questão 2
UPDATE questions SET correct_answer = 'Pilha é uma estrutura de dados linear que segue o princípio LIFO (Last In, First Out). As principais operações são: push (inserir elemento no topo), pop (remover elemento do topo), peek (visualizar elemento do topo) e isEmpty (verificar se está vazia).' WHERE id = 2;

-- Atualizar resposta esperada da questão 4
UPDATE questions SET correct_answer = 'Polimorfismo é a capacidade de objetos de diferentes classes responderem à mesma mensagem de formas diferentes. Permite que uma interface seja usada para uma classe geral de ações, com comportamentos específicos determinados pela classe exata do objeto.' WHERE id = 4;

-- Associar professores com disciplinas
INSERT INTO professor_disciplines (professor_id, discipline_id) VALUES
(1, 1), -- João Silva - Cálculo I
(1, 2), -- João Silva - Estrutura de Dados
(2, 3), -- Maria Santos - POO
(2, 4), -- Maria Santos - Banco de Dados
(3, 2), -- Carlos Oliveira - Estrutura de Dados
(3, 3); -- Carlos Oliveira - POO

package br.com.avalia.config;

import br.com.avalia.entity.*;
import br.com.avalia.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataLoader implements CommandLineRunner {
    
    private final DisciplineRepository disciplineRepository;
    private final ProfessorRepository professorRepository;
    private final ClassRepository classRepository;
    private final QuestionRepository questionRepository;
    
    @Override
    public void run(String... args) {
        if (disciplineRepository.count() > 0) {
            log.info("Banco de dados já possui dados. Pulando inicialização.");
            return;
        }
        
        log.info("Iniciando população do banco de dados...");
        
        // Criar disciplinas
        DisciplineEntity calculo = DisciplineEntity.builder()
                .name("Cálculo I")
                .code("MAT001")
                .description("Fundamentos de cálculo diferencial e integral")
                .build();
        
        DisciplineEntity estrutura = DisciplineEntity.builder()
                .name("Estrutura de Dados")
                .code("ADS002")
                .description("Estruturas de dados fundamentais e algoritmos")
                .build();
        
        DisciplineEntity poo = DisciplineEntity.builder()
                .name("Programação Orientada a Objetos")
                .code("ADS003")
                .description("Conceitos de POO e design patterns")
                .build();
        
        DisciplineEntity bd = DisciplineEntity.builder()
                .name("Banco de Dados")
                .code("ADS004")
                .description("Modelagem e implementação de bancos de dados relacionais")
                .build();
        
        disciplineRepository.saveAll(Arrays.asList(calculo, estrutura, poo, bd));
        log.info("Disciplinas criadas com sucesso!");
        
        // Criar professores
        ProfessorEntity prof1 = ProfessorEntity.builder()
                .name("Prof. João Silva")
                .email("joao.silva@fatec.sp.gov.br")
                .phone("(11) 98765-4321")
                .role(ProfessorEntity.ProfessorRole.PROFESSOR)
                .active(true)
                .disciplines(Arrays.asList(calculo, estrutura))
                .build();
        
        ProfessorEntity prof2 = ProfessorEntity.builder()
                .name("Prof. Maria Santos")
                .email("maria.santos@fatec.sp.gov.br")
                .phone("(11) 98765-4322")
                .role(ProfessorEntity.ProfessorRole.COORDINATOR)
                .active(true)
                .disciplines(Arrays.asList(poo, bd))
                .build();
        
        ProfessorEntity prof3 = ProfessorEntity.builder()
                .name("Prof. Carlos Oliveira")
                .email("carlos.oliveira@fatec.sp.gov.br")
                .phone("(11) 98765-4323")
                .role(ProfessorEntity.ProfessorRole.PROFESSOR)
                .active(true)
                .disciplines(Arrays.asList(estrutura, poo))
                .build();
        
        professorRepository.saveAll(Arrays.asList(prof1, prof2, prof3));
        log.info("Professores criados com sucesso!");
        
        // Criar turmas
        ClassEntity turma1 = ClassEntity.builder()
                .name("ADS 3A")
                .semester("2025.1")
                .shift("Manhã")
                .studentCount(40)
                .discipline(estrutura)
                .build();
        
        ClassEntity turma2 = ClassEntity.builder()
                .name("ADS 3B")
                .semester("2025.1")
                .shift("Noite")
                .studentCount(35)
                .discipline(estrutura)
                .build();
        
        ClassEntity turma3 = ClassEntity.builder()
                .name("ADS 2A")
                .semester("2025.1")
                .shift("Manhã")
                .studentCount(38)
                .discipline(poo)
                .build();
        
        classRepository.saveAll(Arrays.asList(turma1, turma2, turma3));
        log.info("Turmas criadas com sucesso!");
        
        // Criar questões de múltipla escolha
        QuestionEntity q1 = QuestionEntity.builder()
                .statement("Qual é a derivada de x²?")
                .type(QuestionEntity.QuestionType.MULTIPLE_CHOICE)
                .options(Arrays.asList("2x", "x³/3", "x", "2"))
                .correctAnswer("A) 2x")
                .subject("Cálculo I")
                .topic("Derivadas")
                .difficulty(QuestionEntity.DifficultyLevel.EASY)
                .points(1.0)
                .build();
        
        QuestionEntity q2 = QuestionEntity.builder()
                .statement("Qual estrutura de dados segue o princípio LIFO (Last In, First Out)?")
                .type(QuestionEntity.QuestionType.MULTIPLE_CHOICE)
                .options(Arrays.asList("Fila", "Pilha", "Lista Encadeada", "Árvore Binária"))
                .correctAnswer("B) Pilha")
                .subject("Estrutura de Dados")
                .topic("Estruturas Lineares")
                .difficulty(QuestionEntity.DifficultyLevel.EASY)
                .points(1.0)
                .build();
        
        QuestionEntity q3 = QuestionEntity.builder()
                .statement("Em Java, qual palavra-chave é usada para herança?")
                .type(QuestionEntity.QuestionType.MULTIPLE_CHOICE)
                .options(Arrays.asList("implements", "extends", "inherits", "super"))
                .correctAnswer("B) extends")
                .subject("Programação Orientada a Objetos")
                .topic("Herança")
                .difficulty(QuestionEntity.DifficultyLevel.EASY)
                .points(1.0)
                .build();
        
        QuestionEntity q4 = QuestionEntity.builder()
                .statement("Qual é a complexidade de tempo da busca binária?")
                .type(QuestionEntity.QuestionType.MULTIPLE_CHOICE)
                .options(Arrays.asList("O(n)", "O(log n)", "O(n²)", "O(1)"))
                .correctAnswer("B) O(log n)")
                .subject("Estrutura de Dados")
                .topic("Algoritmos de Busca")
                .difficulty(QuestionEntity.DifficultyLevel.MEDIUM)
                .points(2.0)
                .build();
        
        QuestionEntity q5 = QuestionEntity.builder()
                .statement("Qual princípio SOLID estabelece que uma classe deve ter apenas uma razão para mudar?")
                .type(QuestionEntity.QuestionType.MULTIPLE_CHOICE)
                .options(Arrays.asList(
                    "Open/Closed Principle",
                    "Single Responsibility Principle",
                    "Liskov Substitution Principle",
                    "Interface Segregation Principle"
                ))
                .correctAnswer("B) Single Responsibility Principle")
                .subject("Programação Orientada a Objetos")
                .topic("Princípios SOLID")
                .difficulty(QuestionEntity.DifficultyLevel.MEDIUM)
                .points(2.0)
                .build();
        
        QuestionEntity q6 = QuestionEntity.builder()
                .statement("Em SQL, qual comando é usado para recuperar dados de uma tabela?")
                .type(QuestionEntity.QuestionType.MULTIPLE_CHOICE)
                .options(Arrays.asList("GET", "SELECT", "FETCH", "RETRIEVE"))
                .correctAnswer("B) SELECT")
                .subject("Banco de Dados")
                .topic("SQL Básico")
                .difficulty(QuestionEntity.DifficultyLevel.EASY)
                .points(1.0)
                .build();
        
        QuestionEntity q7 = QuestionEntity.builder()
                .statement("Qual é a integral de 2x?")
                .type(QuestionEntity.QuestionType.MULTIPLE_CHOICE)
                .options(Arrays.asList("x² + C", "2x² + C", "x²/2 + C", "2"))
                .correctAnswer("A) x² + C")
                .subject("Cálculo I")
                .topic("Integrais")
                .difficulty(QuestionEntity.DifficultyLevel.MEDIUM)
                .points(2.0)
                .build();
        
        QuestionEntity q8 = QuestionEntity.builder()
                .statement("Qual padrão de projeto garante que uma classe tenha apenas uma instância?")
                .type(QuestionEntity.QuestionType.MULTIPLE_CHOICE)
                .options(Arrays.asList("Factory", "Singleton", "Observer", "Strategy"))
                .correctAnswer("B) Singleton")
                .subject("Programação Orientada a Objetos")
                .topic("Padrões de Projeto")
                .difficulty(QuestionEntity.DifficultyLevel.HARD)
                .points(3.0)
                .build();
        
        questionRepository.saveAll(Arrays.asList(q1, q2, q3, q4, q5, q6, q7, q8));
        log.info("Questões criadas com sucesso!");
        
        log.info("População do banco de dados concluída!");
    }
}

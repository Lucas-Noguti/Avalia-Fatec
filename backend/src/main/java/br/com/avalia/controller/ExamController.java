package br.com.avalia.controller;

import br.com.avalia.model.Exam;
import br.com.avalia.model.Question;
import br.com.avalia.service.ExamPdfService;
import com.lowagie.text.DocumentException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/exams")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ExamController {

    private final ExamPdfService examPdfService;

    @PostMapping("/generate-pdf")
    public ResponseEntity<byte[]> generateExamPdf(@RequestBody Exam exam) {
        try {
            byte[] pdfBytes = examPdfService.generateExamPdf(exam);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "prova_" + 
                    (exam.getTitle() != null ? exam.getTitle().replaceAll("\\s+", "_") : "avaliacao") + ".pdf");
            headers.setContentLength(pdfBytes.length);
            
            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } catch (DocumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/generate-sample-pdf")
    public ResponseEntity<byte[]> generateSampleExamPdf() {
        try {
            Exam sampleExam = createSampleExam();
            byte[] pdfBytes = examPdfService.generateExamPdf(sampleExam);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "prova_exemplo.pdf");
            headers.setContentLength(pdfBytes.length);
            
            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } catch (DocumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/sample-exam")
    public ResponseEntity<Exam> getSampleExam() {
        return ResponseEntity.ok(createSampleExam());
    }

    private Exam createSampleExam() {
        List<Question> questions = Arrays.asList(
                Question.builder()
                        .id(1L)
                        .statement("Qual é o principal objetivo da Programação Orientada a Objetos (POO)?")
                        .type(Question.QuestionType.MULTIPLE_CHOICE)
                        .options(Arrays.asList(
                                "Facilitar a programação procedural",
                                "Organizar o código em torno de objetos que combinam dados e comportamentos",
                                "Eliminar completamente o uso de funções",
                                "Tornar o código mais difícil de manter",
                                "Aumentar o uso de variáveis globais"
                        ))
                        .correctAnswer("B) Organizar o código em torno de objetos que combinam dados e comportamentos")
                        .subject("Programação Orientada a Objetos")
                        .topic("Conceitos Fundamentais")
                        .difficulty(Question.DifficultyLevel.EASY)
                        .points(1.0)
                        .build(),

                Question.builder()
                        .id(2L)
                        .statement("Explique o conceito de herança em POO e cite pelo menos duas vantagens de seu uso.")
                        .type(Question.QuestionType.ESSAY)
                        .correctAnswer("Herança é um mecanismo que permite criar novas classes baseadas em classes existentes, " +
                                "herdando seus atributos e métodos. Vantagens: 1) Reutilização de código, 2) Facilita manutenção, " +
                                "3) Permite polimorfismo.")
                        .subject("Programação Orientada a Objetos")
                        .topic("Herança")
                        .difficulty(Question.DifficultyLevel.MEDIUM)
                        .points(2.5)
                        .build(),

                Question.builder()
                        .id(3L)
                        .statement("Em Java, uma interface pode conter métodos com implementação padrão (default methods)?")
                        .type(Question.QuestionType.TRUE_FALSE)
                        .options(Arrays.asList("Verdadeiro", "Falso"))
                        .correctAnswer("Verdadeiro")
                        .subject("Programação Java")
                        .topic("Interfaces")
                        .difficulty(Question.DifficultyLevel.MEDIUM)
                        .points(1.0)
                        .build(),

                Question.builder()
                        .id(4L)
                        .statement("Qual é a diferença entre os modificadores de acesso 'protected' e 'private' em Java?")
                        .type(Question.QuestionType.SHORT_ANSWER)
                        .correctAnswer("'private' permite acesso apenas dentro da própria classe, enquanto 'protected' " +
                                "permite acesso dentro da classe, subclasses e classes do mesmo pacote.")
                        .subject("Programação Java")
                        .topic("Modificadores de Acesso")
                        .difficulty(Question.DifficultyLevel.MEDIUM)
                        .points(1.5)
                        .build(),

                Question.builder()
                        .id(5L)
                        .statement("Qual dos seguintes NÃO é um princípio SOLID?")
                        .type(Question.QuestionType.MULTIPLE_CHOICE)
                        .options(Arrays.asList(
                                "Single Responsibility Principle",
                                "Open/Closed Principle",
                                "Liskov Substitution Principle",
                                "Interface Segregation Principle",
                                "Dynamic Programming Principle"
                        ))
                        .correctAnswer("E) Dynamic Programming Principle")
                        .subject("Engenharia de Software")
                        .topic("Princípios SOLID")
                        .difficulty(Question.DifficultyLevel.HARD)
                        .points(2.0)
                        .build(),

                Question.builder()
                        .id(6L)
                        .statement("Descreva o padrão de projeto Singleton e explique em que situações ele é mais apropriado.")
                        .type(Question.QuestionType.ESSAY)
                        .correctAnswer("Singleton é um padrão que garante que uma classe tenha apenas uma instância e " +
                                "fornece um ponto global de acesso a ela. É apropriado para gerenciadores de recursos, " +
                                "configurações globais, pools de conexão, etc.")
                        .subject("Padrões de Projeto")
                        .topic("Padrões Criacionais")
                        .difficulty(Question.DifficultyLevel.HARD)
                        .points(3.0)
                        .build(),

                Question.builder()
                        .id(7L)
                        .statement("O que é polimorfismo e quais são os dois tipos principais?")
                        .type(Question.QuestionType.SHORT_ANSWER)
                        .correctAnswer("Polimorfismo é a capacidade de objetos de diferentes classes responderem à mesma " +
                                "mensagem de formas diferentes. Os dois tipos são: polimorfismo de sobrecarga (overloading) " +
                                "e polimorfismo de sobrescrita (overriding).")
                        .subject("Programação Orientada a Objetos")
                        .topic("Polimorfismo")
                        .difficulty(Question.DifficultyLevel.MEDIUM)
                        .points(2.0)
                        .build(),

                Question.builder()
                        .id(8L)
                        .statement("Em um banco de dados relacional, uma chave estrangeira pode referenciar uma chave primária " +
                                "de outra tabela?")
                        .type(Question.QuestionType.TRUE_FALSE)
                        .options(Arrays.asList("Verdadeiro", "Falso"))
                        .correctAnswer("Verdadeiro")
                        .subject("Banco de Dados")
                        .topic("Chaves e Relacionamentos")
                        .difficulty(Question.DifficultyLevel.EASY)
                        .points(1.0)
                        .build()
        );

        return Exam.builder()
                .id(1L)
                .title("Avaliação de Programação Orientada a Objetos")
                .course("Análise e Desenvolvimento de Sistemas - 3º Semestre")
                .professor("Prof. Dr. João Silva Santos")
                .institution("FATEC - Faculdade de Tecnologia de São Paulo")
                .semester("2024.2")
                .examDate(LocalDate.now())
                .duration(LocalTime.of(2, 30))
                .instructions("• Leia atentamente cada questão antes de responder.\n" +
                        "• Para questões de múltipla escolha, marque apenas UMA alternativa.\n" +
                        "• Questões dissertativas devem ser respondidas de forma clara e objetiva.\n" +
                        "• É permitida a consulta ao material de apoio fornecido pelo professor.\n" +
                        "• Não é permitido o uso de dispositivos eletrônicos (celulares, tablets, etc.).\n" +
                        "• A prova deve ser respondida à caneta azul ou preta.\n" +
                        "• Boa prova!")
                .questions(questions)
                .totalPoints(14.0)
                .showAnswers(true)
                .build();
    }
}

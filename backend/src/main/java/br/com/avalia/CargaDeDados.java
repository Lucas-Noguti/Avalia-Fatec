package br.com.avalia;

import br.com.avalia.model.*;
import br.com.avalia.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class CargaDeDados implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final DisciplinaRepository disciplinaRepository;
    private final QuestaoRepository questaoRepository;

    public CargaDeDados(UsuarioRepository usuarioRepository, 
                        DisciplinaRepository disciplinaRepository,
                        QuestaoRepository questaoRepository) {
        this.usuarioRepository = usuarioRepository;
        this.disciplinaRepository = disciplinaRepository;
        this.questaoRepository = questaoRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (usuarioRepository.count() == 0) {
            
            Usuario prof = new Usuario("Professor Pardal", "prof@teste.com", "123456", "PROFESSOR");
            Usuario coord = new Usuario("Coordenador Chefe", "admin@teste.com", "admin", "COORDENADOR");
            usuarioRepository.saveAll(Arrays.asList(prof, coord));
            System.out.println("--- Usuários Criados ---");

            Disciplina matematica = new Disciplina("Matemática Básica");
            disciplinaRepository.save(matematica);

            Questao q1 = new Questao();
            q1.setEnunciado("Quanto é 2 + 2?");
            q1.setDificuldade("Fácil");
            q1.setDisciplina(matematica);

            Alternativa a1 = new Alternativa(); a1.setTexto("3"); a1.setCorreta(false); a1.setQuestao(q1);
            Alternativa a2 = new Alternativa(); a2.setTexto("4"); a2.setCorreta(true); a2.setQuestao(q1);
            Alternativa a3 = new Alternativa(); a3.setTexto("5"); a3.setCorreta(false); a3.setQuestao(q1);
            Alternativa a4 = new Alternativa(); a4.setTexto("0"); a4.setCorreta(false); a4.setQuestao(q1);

            q1.setAlternativas(Arrays.asList(a1, a2, a3, a4));

            questaoRepository.save(q1);
            
            System.out.println("--- Questão de Teste Criada ---");
        }
    }
}
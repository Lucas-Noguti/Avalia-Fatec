package br.com.avalia.controller;

import br.com.avalia.model.Disciplina;
import br.com.avalia.model.Questao;
import br.com.avalia.repository.DisciplinaRepository;
import br.com.avalia.repository.QuestaoRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam; // Import necessário para pegar o ID

import java.util.List;

@Controller
public class QuestaoController {

    private final QuestaoRepository questaoRepository;
    private final DisciplinaRepository disciplinaRepository;

    public QuestaoController(QuestaoRepository questaoRepository, DisciplinaRepository disciplinaRepository) {
        this.questaoRepository = questaoRepository;
        this.disciplinaRepository = disciplinaRepository;
    }

    // 1. Listar Questões (Página do Banco de Questões)
    @GetMapping("/banco-questoes")
    public String listarQuestoes(Model model) {
        List<Questao> lista = questaoRepository.findAll();
        model.addAttribute("questoes", lista);
        return "banco-questoes";
    }

    // 2. Mostrar Formulário de Criar (Carrega as disciplinas para o Select)
    @GetMapping("/criar-questao")
    public String mostrarFormularioCriar(Model model) {
        List<Disciplina> disciplinas = disciplinaRepository.findAll();
        model.addAttribute("disciplinas", disciplinas);
        return "criar-questao";
    }

    // 3. Salvar a Questão (Recebe os dados do formulário)
    @PostMapping("/salvar-questao")
    public String salvarQuestao(Questao questao, @RequestParam("disciplinaId") Long disciplinaId) {
        
        // Busca a disciplina selecionada pelo ID
        Disciplina disciplinaSelecionada = disciplinaRepository.findById(disciplinaId).orElse(null);
        
        // Associa a disciplina à questão
        questao.setDisciplina(disciplinaSelecionada);

        // Salva no banco de dados
        questaoRepository.save(questao);

        // Redireciona de volta para a lista
        return "redirect:/banco-questoes";
    }
}
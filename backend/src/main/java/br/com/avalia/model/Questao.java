package br.com.avalia.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Questao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT") // Permite textos longos no enunciado
    private String enunciado;

    private String dificuldade; // "Facil", "Media", "Dificil"

    // RELACIONAMENTO: Muitas questões pertencem a UMA disciplina
    @ManyToOne
    @JoinColumn(name = "disciplina_id") // Nome da coluna no banco (Foreign Key)
    private Disciplina disciplina;

    // RELACIONAMENTO: Uma questão tem MUITAS alternativas
    // 'mappedBy' diz que quem manda na relação é o campo 'questao' lá na classe Alternativa
    // CascadeType.ALL significa: se apagar a questão, apaga as alternativas juntas.
    @OneToMany(mappedBy = "questao", cascade = CascadeType.ALL)
    private List<Alternativa> alternativas;

    public Questao() {
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEnunciado() {
        return enunciado;
    }

    public void setEnunciado(String enunciado) {
        this.enunciado = enunciado;
    }

    public String getDificuldade() {
        return dificuldade;
    }

    public void setDificuldade(String dificuldade) {
        this.dificuldade = dificuldade;
    }

    public Disciplina getDisciplina() {
        return disciplina;
    }

    public void setDisciplina(Disciplina disciplina) {
        this.disciplina = disciplina;
    }

    public List<Alternativa> getAlternativas() {
        return alternativas;
    }

    public void setAlternativas(List<Alternativa> alternativas) {
        this.alternativas = alternativas;
    }
}
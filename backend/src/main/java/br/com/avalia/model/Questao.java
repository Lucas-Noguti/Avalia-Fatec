package br.com.avalia.model;

import java.util.Set;

public class Questao {
    public int id;
    public int idDisciplina;
    public String pergunta;
    public Set<Alternativa> alternativas;
}

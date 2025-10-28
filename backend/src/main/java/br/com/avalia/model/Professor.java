package br.com.avalia.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

@Entity
public class Professor {
    public int id;
    public String nomeProfessor;
    public String email;
    public String senha;
}

public Professor() {
}


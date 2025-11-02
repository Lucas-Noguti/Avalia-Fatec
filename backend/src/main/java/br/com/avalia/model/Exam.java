package br.com.avalia.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Exam {
    private Long id;
    private String title;
    private String course;
    private String professor;
    private String institution;
    private String semester;
    private LocalDate examDate;
    private LocalTime duration;
    private String instructions;
    private List<Question> questions;
    private Double totalPoints;
    private Boolean showAnswers;
}

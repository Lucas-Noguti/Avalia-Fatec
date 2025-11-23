package br.com.avalia.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "assessments")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AssessmentEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 200)
    private String title;
    
    @Column(nullable = false, length = 100)
    private String course;
    
    @Column(length = 100)
    private String professor;
    
    @Column(length = 100)
    private String institution;
    
    @Column(length = 20)
    private String semester;
    
    @Column
    private LocalDateTime examDate;
    
    @Column
    private Integer durationMinutes;
    
    @Column(columnDefinition = "TEXT")
    private String instructions;
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "assessment_questions",
        joinColumns = @JoinColumn(name = "assessment_id"),
        inverseJoinColumns = @JoinColumn(name = "question_id")
    )
    @OrderColumn(name = "question_order")
    @Builder.Default
    private List<QuestionEntity> questions = new ArrayList<>();
    
    @Column(nullable = false)
    private Double totalPoints;
    
    @Column(nullable = false)
    @Builder.Default
    private Boolean showAnswers = false;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private AssessmentStatus status = AssessmentStatus.DRAFT;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
    
    public enum AssessmentStatus {
        DRAFT,
        PUBLISHED,
        ARCHIVED
    }
}

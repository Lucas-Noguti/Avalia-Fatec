package br.com.avalia.service;

import br.com.avalia.model.Exam;
import br.com.avalia.model.Question;
import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import org.springframework.stereotype.Service;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;

@Service
public class ExamPdfService {

    private static final Color HEADER_COLOR = new Color(41, 128, 185);
    private static final Color SECONDARY_COLOR = new Color(52, 73, 94);
    private static final Color LIGHT_GRAY = new Color(236, 240, 241);
    private static final Color DARK_GRAY = new Color(127, 140, 141);

    public byte[] generateExamPdf(Exam exam) throws DocumentException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        
        // Create document with margins
        Document document = new Document(PageSize.A4, 50, 50, 50, 50);
        PdfWriter writer = PdfWriter.getInstance(document, outputStream);
        
        // Add page numbers and footer
        writer.setPageEvent(new PageNumberEvent(exam));
        
        document.open();
        
        // Add header
        addHeader(document, exam);
        
        // Add exam information section
        addExamInfo(document, exam);
        
        // Add instructions
        addInstructions(document, exam);
        
        // Add questions
        addQuestions(document, exam);
        
        // Add answer section if needed
        if (Boolean.TRUE.equals(exam.getShowAnswers())) {
            document.newPage();
            addAnswerKey(document, exam);
        }
        
        document.close();
        
        return outputStream.toByteArray();
    }

    private void addHeader(Document document, Exam exam) throws DocumentException {
        // Institution header with background
        PdfPTable headerTable = new PdfPTable(1);
        headerTable.setWidthPercentage(100);
        headerTable.setSpacingAfter(20);
        
        PdfPCell headerCell = new PdfPCell();
        headerCell.setBackgroundColor(HEADER_COLOR);
        headerCell.setPadding(15);
        headerCell.setBorder(Rectangle.NO_BORDER);
        
        // Institution name
        Font institutionFont = new Font(Font.HELVETICA, 18, Font.BOLD, Color.WHITE);
        Paragraph institution = new Paragraph(exam.getInstitution() != null ? exam.getInstitution() : "FATEC", institutionFont);
        institution.setAlignment(Element.ALIGN_CENTER);
        headerCell.addElement(institution);
        
        // Course name
        Font courseFont = new Font(Font.HELVETICA, 14, Font.NORMAL, Color.WHITE);
        Paragraph course = new Paragraph(exam.getCourse() != null ? exam.getCourse() : "", courseFont);
        course.setAlignment(Element.ALIGN_CENTER);
        course.setSpacingBefore(5);
        headerCell.addElement(course);
        
        headerTable.addCell(headerCell);
        document.add(headerTable);
        
        // Exam title
        Font titleFont = new Font(Font.HELVETICA, 20, Font.BOLD, SECONDARY_COLOR);
        Paragraph title = new Paragraph(exam.getTitle() != null ? exam.getTitle() : "Avaliação", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        title.setSpacingAfter(20);
        document.add(title);
    }

    private void addExamInfo(Document document, Exam exam) throws DocumentException {
        PdfPTable infoTable = new PdfPTable(2);
        infoTable.setWidthPercentage(100);
        infoTable.setWidths(new int[]{1, 1});
        infoTable.setSpacingAfter(15);
        
        Font labelFont = new Font(Font.HELVETICA, 10, Font.BOLD, SECONDARY_COLOR);
        Font valueFont = new Font(Font.HELVETICA, 10, Font.NORMAL, Color.BLACK);
        
        // Left column
        PdfPCell leftCell = new PdfPCell();
        leftCell.setBorder(Rectangle.NO_BORDER);
        leftCell.setPadding(8);
        leftCell.setBackgroundColor(LIGHT_GRAY);
        
        if (exam.getProfessor() != null) {
            Paragraph prof = new Paragraph();
            prof.add(new Chunk("Professor(a): ", labelFont));
            prof.add(new Chunk(exam.getProfessor(), valueFont));
            leftCell.addElement(prof);
        }
        
        if (exam.getSemester() != null) {
            Paragraph sem = new Paragraph();
            sem.add(new Chunk("Período: ", labelFont));
            sem.add(new Chunk(exam.getSemester(), valueFont));
            sem.setSpacingBefore(5);
            leftCell.addElement(sem);
        }
        
        if (exam.getExamDate() != null) {
            Paragraph date = new Paragraph();
            date.add(new Chunk("Data: ", labelFont));
            date.add(new Chunk(exam.getExamDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")), valueFont));
            date.setSpacingBefore(5);
            leftCell.addElement(date);
        }
        
        // Right column
        PdfPCell rightCell = new PdfPCell();
        rightCell.setBorder(Rectangle.NO_BORDER);
        rightCell.setPadding(8);
        rightCell.setBackgroundColor(LIGHT_GRAY);
        
        Paragraph studentName = new Paragraph();
        studentName.add(new Chunk("Nome: ", labelFont));
        studentName.add(new Chunk("_________________________________", valueFont));
        rightCell.addElement(studentName);
        
        if (exam.getDuration() != null) {
            Paragraph duration = new Paragraph();
            duration.add(new Chunk("Duração: ", labelFont));
            duration.add(new Chunk(exam.getDuration().toString() + " horas", valueFont));
            duration.setSpacingBefore(5);
            rightCell.addElement(duration);
        }
        
        if (exam.getTotalPoints() != null) {
            Paragraph points = new Paragraph();
            points.add(new Chunk("Pontuação Total: ", labelFont));
            points.add(new Chunk(String.format("%.1f pontos", exam.getTotalPoints()), valueFont));
            points.setSpacingBefore(5);
            rightCell.addElement(points);
        }
        
        infoTable.addCell(leftCell);
        infoTable.addCell(rightCell);
        
        document.add(infoTable);
    }

    private void addInstructions(Document document, Exam exam) throws DocumentException {
        if (exam.getInstructions() != null && !exam.getInstructions().isEmpty()) {
            Font instructionTitleFont = new Font(Font.HELVETICA, 12, Font.BOLD, SECONDARY_COLOR);
            Font instructionFont = new Font(Font.HELVETICA, 10, Font.NORMAL, Color.BLACK);
            
            Paragraph instructionTitle = new Paragraph("Instruções:", instructionTitleFont);
            instructionTitle.setSpacingAfter(8);
            document.add(instructionTitle);
            
            PdfPCell instructionCell = new PdfPCell();
            instructionCell.setBorder(Rectangle.BOX);
            instructionCell.setBorderColor(DARK_GRAY);
            instructionCell.setPadding(10);
            instructionCell.setBackgroundColor(new Color(250, 250, 250));
            
            Paragraph instruction = new Paragraph(exam.getInstructions(), instructionFont);
            instructionCell.addElement(instruction);
            
            PdfPTable instructionTable = new PdfPTable(1);
            instructionTable.setWidthPercentage(100);
            instructionTable.setSpacingAfter(20);
            instructionTable.addCell(instructionCell);
            
            document.add(instructionTable);
        }
    }

    private void addQuestions(Document document, Exam exam) throws DocumentException {
        if (exam.getQuestions() == null || exam.getQuestions().isEmpty()) {
            return;
        }
        
        Font questionNumberFont = new Font(Font.HELVETICA, 11, Font.BOLD, SECONDARY_COLOR);
        Font questionFont = new Font(Font.HELVETICA, 10, Font.NORMAL, Color.BLACK);
        Font optionFont = new Font(Font.HELVETICA, 10, Font.NORMAL, Color.BLACK);
        Font metaFont = new Font(Font.HELVETICA, 8, Font.ITALIC, DARK_GRAY);
        
        for (int i = 0; i < exam.getQuestions().size(); i++) {
            Question question = exam.getQuestions().get(i);
            
            // Question container
            PdfPTable questionTable = new PdfPTable(1);
            questionTable.setWidthPercentage(100);
            questionTable.setSpacingAfter(15);
            
            PdfPCell questionCell = new PdfPCell();
            questionCell.setBorder(Rectangle.BOX);
            questionCell.setBorderColor(DARK_GRAY);
            questionCell.setPadding(12);
            
            // Question number and metadata
            Paragraph questionHeader = new Paragraph();
            questionHeader.add(new Chunk("Questão " + (i + 1), questionNumberFont));
            
            if (question.getPoints() != null) {
                questionHeader.add(new Chunk(String.format(" (%.1f pontos)", question.getPoints()), metaFont));
            }
            
            if (question.getDifficulty() != null) {
                String difficultyText = switch (question.getDifficulty()) {
                    case EASY -> " [Fácil]";
                    case MEDIUM -> " [Média]";
                    case HARD -> " [Difícil]";
                };
                questionHeader.add(new Chunk(difficultyText, metaFont));
            }
            
            questionHeader.setSpacingAfter(8);
            questionCell.addElement(questionHeader);
            
            // Question statement
            Paragraph statement = new Paragraph(question.getStatement(), questionFont);
            statement.setSpacingAfter(10);
            questionCell.addElement(statement);
            
            // Options for multiple choice
            if (question.getType() == Question.QuestionType.MULTIPLE_CHOICE && 
                question.getOptions() != null && !question.getOptions().isEmpty()) {
                
                char optionLetter = 'A';
                for (String option : question.getOptions()) {
                    Paragraph optionPara = new Paragraph();
                    optionPara.add(new Chunk(optionLetter + ") ", new Font(Font.HELVETICA, 10, Font.BOLD)));
                    optionPara.add(new Chunk(option, optionFont));
                    optionPara.setSpacingBefore(3);
                    optionPara.setIndentationLeft(15);
                    questionCell.addElement(optionPara);
                    optionLetter++;
                }
            }
            
            // Answer space for essay and short answer questions
            if (question.getType() == Question.QuestionType.ESSAY) {
                questionCell.addElement(new Paragraph(" ", questionFont));
                for (int j = 0; j < 8; j++) {
                    Paragraph line = new Paragraph("_________________________________________________________________", 
                                                   new Font(Font.HELVETICA, 10, Font.NORMAL, DARK_GRAY));
                    line.setSpacingBefore(10);
                    questionCell.addElement(line);
                }
            } else if (question.getType() == Question.QuestionType.SHORT_ANSWER) {
                questionCell.addElement(new Paragraph(" ", questionFont));
                for (int j = 0; j < 3; j++) {
                    Paragraph line = new Paragraph("_________________________________________________________________", 
                                                   new Font(Font.HELVETICA, 10, Font.NORMAL, DARK_GRAY));
                    line.setSpacingBefore(10);
                    questionCell.addElement(line);
                }
            }
            
            questionTable.addCell(questionCell);
            document.add(questionTable);
        }
    }

    private void addAnswerKey(Document document, Exam exam) throws DocumentException {
        Font titleFont = new Font(Font.HELVETICA, 16, Font.BOLD, SECONDARY_COLOR);
        Paragraph title = new Paragraph("Gabarito", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        title.setSpacingAfter(20);
        document.add(title);
        
        Font questionFont = new Font(Font.HELVETICA, 10, Font.BOLD, Color.BLACK);
        Font answerFont = new Font(Font.HELVETICA, 10, Font.NORMAL, Color.BLACK);
        
        PdfPTable answerTable = new PdfPTable(3);
        answerTable.setWidthPercentage(100);
        answerTable.setWidths(new int[]{1, 3, 1});
        
        // Header
        PdfPCell headerCell1 = createHeaderCell("Questão");
        PdfPCell headerCell2 = createHeaderCell("Resposta");
        PdfPCell headerCell3 = createHeaderCell("Pontos");
        
        answerTable.addCell(headerCell1);
        answerTable.addCell(headerCell2);
        answerTable.addCell(headerCell3);
        
        // Answers
        for (int i = 0; i < exam.getQuestions().size(); i++) {
            Question question = exam.getQuestions().get(i);
            
            PdfPCell numCell = new PdfPCell(new Phrase(String.valueOf(i + 1), questionFont));
            numCell.setPadding(8);
            numCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            
            String answer = question.getCorrectAnswer() != null ? question.getCorrectAnswer() : "N/A";
            PdfPCell answerCell = new PdfPCell(new Phrase(answer, answerFont));
            answerCell.setPadding(8);
            
            String points = question.getPoints() != null ? String.format("%.1f", question.getPoints()) : "-";
            PdfPCell pointsCell = new PdfPCell(new Phrase(points, answerFont));
            pointsCell.setPadding(8);
            pointsCell.setHorizontalAlignment(Element.ALIGN_CENTER);
            
            answerTable.addCell(numCell);
            answerTable.addCell(answerCell);
            answerTable.addCell(pointsCell);
        }
        
        document.add(answerTable);
    }

    private PdfPCell createHeaderCell(String text) {
        Font headerFont = new Font(Font.HELVETICA, 10, Font.BOLD, Color.WHITE);
        PdfPCell cell = new PdfPCell(new Phrase(text, headerFont));
        cell.setBackgroundColor(HEADER_COLOR);
        cell.setPadding(8);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        return cell;
    }

    // Inner class for page numbers and footer
    private static class PageNumberEvent extends PdfPageEventHelper {
        private final Exam exam;
        
        public PageNumberEvent(Exam exam) {
            this.exam = exam;
        }
        
        @Override
        public void onEndPage(PdfWriter writer, Document document) {
            PdfContentByte cb = writer.getDirectContent();
            
            // Page number
            Font footerFont = new Font(Font.HELVETICA, 8, Font.NORMAL, DARK_GRAY);
            Phrase footer = new Phrase("Página " + writer.getPageNumber(), footerFont);
            
            ColumnText.showTextAligned(cb, Element.ALIGN_CENTER,
                    footer,
                    (document.right() - document.left()) / 2 + document.leftMargin(),
                    document.bottom() - 10,
                    0);
            
            // Exam title in footer
            if (exam.getTitle() != null) {
                Phrase examTitle = new Phrase(exam.getTitle(), new Font(Font.HELVETICA, 7, Font.ITALIC, DARK_GRAY));
                ColumnText.showTextAligned(cb, Element.ALIGN_LEFT,
                        examTitle,
                        document.leftMargin(),
                        document.bottom() - 10,
                        0);
            }
        }
    }
}

const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log('API Request:', url, config);
      const response = await fetch(url, config);
      console.log('API Response:', response.status, response.statusText);
      
      if (!response.ok) {
        let errorMessage = `Erro HTTP: ${response.status}`;
        try {
          const errorData = await response.json();
          console.error('Error Data:', errorData);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          console.error('Could not parse error response');
        }
        throw new Error(errorMessage);
      }

      // Handle 204 No Content
      if (response.status === 204) {
        return null;
      }

      const data = await response.json();
      console.log('API Data:', data);
      return data;
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      if (error.message === 'Failed to fetch') {
        throw new Error('Não foi possível conectar ao servidor. Verifique se o backend está rodando.');
      }
      throw error;
    }
  }

  // Questions
  async getQuestions() {
    return this.request('/questions');
  }

  async getQuestionById(id) {
    return this.request(`/questions/${id}`);
  }

  async filterQuestions(filters) {
    const params = new URLSearchParams();
    if (filters.subject) params.append('subject', filters.subject);
    if (filters.difficulty) params.append('difficulty', filters.difficulty);
    if (filters.keyword) params.append('keyword', filters.keyword);
    
    return this.request(`/questions/filter?${params}`);
  }

  async createQuestion(data) {
    return this.request('/questions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateQuestion(id, data) {
    return this.request(`/questions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteQuestion(id) {
    return this.request(`/questions/${id}`, {
      method: 'DELETE',
    });
  }

  // Assessments
  async getAssessments() {
    return this.request('/assessments');
  }

  async getAssessmentById(id) {
    return this.request(`/assessments/${id}`);
  }

  async createAssessment(data) {
    return this.request('/assessments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateAssessment(id, data) {
    return this.request(`/assessments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteAssessment(id) {
    return this.request(`/assessments/${id}`, {
      method: 'DELETE',
    });
  }

  // PDF Generation
  async generatePdf(examData) {
    const response = await fetch(`${API_BASE_URL}/exams/generate-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(examData),
    });

    if (!response.ok) {
      throw new Error('Erro ao gerar PDF');
    }

    return response.blob();
  }

  async generateSamplePdf() {
    const response = await fetch(`${API_BASE_URL}/exams/generate-sample-pdf`);
    
    if (!response.ok) {
      throw new Error('Erro ao gerar PDF de exemplo');
    }

    return response.blob();
  }
}

export default new ApiService();

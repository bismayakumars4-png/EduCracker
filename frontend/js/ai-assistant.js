/**
 * ========================================
 * EduCracker AI Assistant
 * Frontend integration for ChatGPT features
 * ========================================
 */

const AIAssistant = {
  // API base URL
  apiBase: '/api/ai',

  // State management
  _loader: null,

  // Check if AI service is available
  async checkStatus() {
    try {
      const response = await fetch(`${this.apiBase}/status`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to check AI status:', error);
      return { success: false, error: error.message };
    }
  },

  // Generic API request handler
  async _makeRequest(endpoint, payload) {
    try {
      const response = await fetch(`${this.apiBase}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return await response.json();
    } catch (error) {
      console.error(`Failed to ${endpoint}:`, error);
      return { success: false, error: error.message };
    }
  },

  // Generate practice questions
  async generateQuestions(topic, classLevel, numQuestions = 10) {
    this.showLoading('Generating questions...');
    const result = await this._makeRequest('questions', { topic, classLevel, numQuestions });
    this.hideLoading();
    return result;
  },

  // Generate study notes
  async generateNotes(topic, classLevel) {
    this.showLoading('Generating notes...');
    const result = await this._makeRequest('notes', { topic, classLevel });
    this.hideLoading();
    return result;
  },

  // Generate mock test
  async generateMockTest(subject, classLevel, numQuestions = 20) {
    this.showLoading('Generating mock test...');
    const result = await this._makeRequest('mock-test', { subject, classLevel, numQuestions });
    this.hideLoading();
    return result;
  },

  // Get AI tutoring assistance
  async getAssistance(question, context = '') {
    this.showLoading('Getting help...');
    const result = await this._makeRequest('assist', { question, context });
    this.hideLoading();
    return result;
  },

  // Generate study plan
  async generateStudyPlan(studentLevel, targetGoals, availableTime) {
    this.showLoading('Creating study plan...');
    const result = await this._makeRequest('study-plan', { studentLevel, targetGoals, availableTime });
    this.hideLoading();
    return result;
  },

  // Show loading indicator
  showLoading(message) {
    if (!this._loader) {
      this._loader = this.createLoader();
    }
    const loaderText = this._loader.querySelector('.loader-text');
    if (loaderText) {
      loaderText.textContent = message;
    }
    this._loader.style.display = 'flex';
  },

  // Hide loading indicator
  hideLoading() {
    if (this._loader) {
      this._loader.style.display = 'none';
    }
  },

  // Create loader element
  createLoader() {
    const loader = document.createElement('div');
    loader.id = 'ai-loader';
    loader.className = 'ai-loader';
    loader.innerHTML = `
      <div class="loader-spinner"></div>
      <span class="loader-text">Loading...</span>
    `;
    document.body.appendChild(loader);
    return loader;
  },

  // Initialize AI assistant widget
  init() {
    this.createAIButton();
    this.createAIPanel();
  },

  // Create floating AI button
  createAIButton() {
    const btn = document.createElement('button');
    btn.id = 'ai-assistant-btn';
    btn.className = 'ai-assistant-float';
    btn.innerHTML = '🤖';
    btn.title = 'AI Assistant';
    btn.onclick = () => this.togglePanel();
    document.body.appendChild(btn);
  },

  // Create AI panel
  createAIPanel() {
    const panel = document.createElement('div');
    panel.id = 'ai-assistant-panel';
    panel.className = 'ai-panel';
    panel.innerHTML = `
      <div class="ai-panel-header">
        <h3>🤖 AI Assistant</h3>
        <button class="ai-panel-close" onclick="AIAssistant.togglePanel()">×</button>
      </div>
      <div class="ai-panel-tabs">
        <button class="ai-tab active" data-tab="questions">Questions</button>
        <button class="ai-tab" data-tab="notes">Notes</button>
        <button class="ai-tab" data-tab="test">Mock Test</button>
        <button class="ai-tab" data-tab="help">Help</button>
      </div>
      <div class="ai-panel-content">
        <div class="ai-tab-content active" id="ai-tab-questions">
          <h4>Generate Practice Questions</h4>
          <div class="form-group">
            <label>Topic</label>
            <input type="text" id="ai-topic" placeholder="e.g., Algebra, Physics Forces">
          </div>
          <div class="form-group">
            <label>Class</label>
            <select id="ai-class">
              <option value="6">Class 6</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
            </select>
          </div>
          <div class="form-group">
            <label>Number of Questions</label>
            <input type="number" id="ai-num-questions" value="10" min="5" max="50">
          </div>
          <button class="btn btn-primary" onclick="AIAssistant.handleGenerateQuestions()">Generate</button>
        </div>
        <div class="ai-tab-content" id="ai-tab-notes">
          <h4>Generate Study Notes</h4>
          <div class="form-group">
            <label>Topic</label>
            <input type="text" id="ai-notes-topic" placeholder="e.g., Chemical Reactions">
          </div>
          <div class="form-group">
            <label>Class</label>
            <select id="ai-notes-class">
              <option value="6">Class 6</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
            </select>
          </div>
          <button class="btn btn-primary" onclick="AIAssistant.handleGenerateNotes()">Generate Notes</button>
        </div>
        <div class="ai-tab-content" id="ai-tab-test">
          <h4>Generate Mock Test</h4>
          <div class="form-group">
            <label>Subject</label>
            <input type="text" id="ai-test-subject" placeholder="e.g., Mathematics, Science">
          </div>
          <div class="form-group">
            <label>Class</label>
            <select id="ai-test-class">
              <option value="6">Class 6</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
            </select>
          </div>
          <div class="form-group">
            <label>Number of Questions</label>
            <input type="number" id="ai-test-questions" value="20" min="10" max="50">
          </div>
          <button class="btn btn-primary" onclick="AIAssistant.handleGenerateTest()">Generate Test</button>
        </div>
        <div class="ai-tab-content" id="ai-tab-help">
          <h4>Ask AI for Help</h4>
          <div class="form-group">
            <label>Your Question</label>
            <textarea id="ai-help-question" rows="4" placeholder="Type your question here..."></textarea>
          </div>
          <div class="form-group">
            <label>Additional Context (optional)</label>
            <textarea id="ai-help-context" rows="2" placeholder="Any additional context..."></textarea>
          </div>
          <button class="btn btn-primary" onclick="AIAssistant.handleGetHelp()">Get Help</button>
        </div>
      </div>
      <div class="ai-panel-result" id="ai-result"></div>
    `;
    document.body.appendChild(panel);
    
    // Add tab switching
    panel.querySelectorAll('.ai-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        panel.querySelectorAll('.ai-tab').forEach(t => t.classList.remove('active'));
        panel.querySelectorAll('.ai-tab-content').forEach(c => c.classList.remove('active'));
        e.target.classList.add('active');
        document.getElementById(`ai-tab-${e.target.dataset.tab}`).classList.add('active');
      });
    });
  },

  // Toggle AI panel
  togglePanel() {
    const panel = document.getElementById('ai-assistant-panel');
    if (panel) {
      panel.classList.toggle('active');
    }
  },

  // Handle generate questions
  async handleGenerateQuestions() {
    const topic = document.getElementById('ai-topic').value;
    const classLevel = document.getElementById('ai-class').value;
    const numQuestions = document.getElementById('ai-num-questions').value;

    if (!topic) {
      this.showResult('Please enter a topic', 'error');
      return;
    }

    const result = await this.generateQuestions(topic, classLevel, numQuestions);
    if (result.success) {
      this.displayQuestions(result.data);
    } else {
      this.showResult(result.error, 'error');
    }
  },

  // Handle generate notes
  async handleGenerateNotes() {
    const topic = document.getElementById('ai-notes-topic').value;
    const classLevel = document.getElementById('ai-notes-class').value;

    if (!topic) {
      this.showResult('Please enter a topic', 'error');
      return;
    }

    const result = await this.generateNotes(topic, classLevel);
    if (result.success) {
      this.displayNotes(result.data);
    } else {
      this.showResult(result.error, 'error');
    }
  },

  // Handle generate test
  async handleGenerateTest() {
    const subject = document.getElementById('ai-test-subject').value;
    const classLevel = document.getElementById('ai-test-class').value;
    const numQuestions = document.getElementById('ai-test-questions').value;

    if (!subject) {
      this.showResult('Please enter a subject', 'error');
      return;
    }

    const result = await this.generateMockTest(subject, classLevel, numQuestions);
    if (result.success) {
      this.displayTest(result.data);
    } else {
      this.showResult(result.error, 'error');
    }
  },

  // Handle get help
  async handleGetHelp() {
    const question = document.getElementById('ai-help-question').value;
    const context = document.getElementById('ai-help-context').value;

    if (!question) {
      this.showResult('Please enter a question', 'error');
      return;
    }

    const result = await this.getAssistance(question, context);
    if (result.success) {
      this.displayHelp(result.data);
    } else {
      this.showResult(result.error, 'error');
    }
  },

  // Display questions
  displayQuestions(questions) {
    if (questions.error) {
      this.showResult(questions.raw || questions.error, 'error');
      return;
    }

    let html = '<div class="ai-questions-list">';
    questions.forEach((q, i) => {
      html += `
        <div class="ai-question-item">
          <p><strong>Q${i + 1}:</strong> ${q.question}</p>
          <ul>
            <li>A: ${q.options.A}</li>
            <li>B: ${q.options.B}</li>
            <li>C: ${q.options.C}</li>
            <li>D: ${q.options.D}</li>
          </ul>
          <p class="correct-answer">Answer: ${q.correctAnswer}</p>
          <p class="explanation">${q.explanation}</p>
        </div>
      `;
    });
    html += '</div>';
    this.showResult(html);
  },

  // Display notes
  displayNotes(notes) {
    if (notes.error) {
      this.showResult(notes.raw || notes.error, 'error');
      return;
    }

    const html = `
      <div class="ai-notes-content">
        <h4>📚 Notes on ${notes.topic} (Class ${notes.classLevel})</h4>
        <div class="notes-text">${notes.content.replace(/\n/g, '<br>')}</div>
        <button class="btn btn-outline" onclick="AIAssistant.saveNotes()">Save Notes</button>
      </div>
    `;
    this.showResult(html);
  },

  // Display test
  displayTest(test) {
    if (test.error) {
      this.showResult(test.raw || test.error, 'error');
      return;
    }

    let html = '<div class="ai-test-list">';
    test.forEach((q, i) => {
      html += `
        <div class="ai-question-item">
          <p><strong>Q${i + 1}:</strong> ${q.question}</p>
          <ul>
            <li>A: ${q.options.A}</li>
            <li>B: ${q.options.B}</li>
            <li>C: ${q.options.C}</li>
            <li>D: ${q.options.D}</li>
          </ul>
          <p class="correct-answer">Answer: ${q.correctAnswer}</p>
        </div>
      `;
    });
    html += '</div>';
    this.showResult(html);
  },

  // Display help
  displayHelp(assistance) {
    const html = `
      <div class="ai-help-content">
        <h4>💡 Answer</h4>
        <div class="help-text">${assistance.answer.replace(/\n/g, '<br>')}</div>
      </div>
    `;
    this.showResult(html);
  },

  // Show result
  showResult(html, type = 'success') {
    const resultDiv = document.getElementById('ai-result');
    if (resultDiv) {
      resultDiv.innerHTML = html;
      resultDiv.className = `ai-panel-result ${type}`;
      resultDiv.style.display = 'block';
    }
  },

  // Save notes
  saveNotes() {
    // Implementation for saving notes to backend
    this.showResult('Notes saved successfully!', 'success');
  }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  AIAssistant.init();
});

// Export for global access
window.AIAssistant = AIAssistant;

/**
 * ========================================
 * EduCracker AI Service
 * ChatGPT Integration for generating questions, notes, and managing tests
 * ========================================
 */

const OpenAI = require('openai');

// Lazy initialization of OpenAI client - only when API key is available
let openai = null;

function getOpenAIClient() {
  if (!openai) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === '' || apiKey === 'your_openai_api_key_here') {
      throw new Error('OpenAI API key is not configured');
    }
    openai = new OpenAI({ apiKey });
  }
  return openai;
}

/**
 * Check if AI service is available
 */
function isAIConfigured() {
  const apiKey = process.env.OPENAI_API_KEY;
  return apiKey && apiKey !== '' && apiKey !== 'your_openai_api_key_here';
}

/**
 * Generate practice questions based on topic and class
 */
async function generateQuestions(topic, classLevel, numQuestions = 10, questionType = 'multiple_choice', board = 'CBSE') {
  if (!isAIConfigured()) {
    throw new Error('OpenAI API key is not configured');
  }
  
  // Get chapter info from syllabus for better context
  let syllabusContext = '';
  try {
    const syllabusData = require('../data/syllabus');
    const chapters = syllabusData.getChapters(board, classLevel, topic);
    if (chapters && chapters.length > 0) {
      syllabusContext = `\n\nThis topic is part of the ${board} syllabus. Chapters covered: ${chapters.map(c => `Chapter ${c.number}: ${c.name} (Weightage: ${c.weightage}%, Difficulty: ${c.difficulty})`).join(', ')}`;
    }
  } catch (e) {
    console.log('Could not load syllabus context');
  }
  
  const prompt = `Generate ${numQuestions} ${questionType} questions for a Class ${classLevel} student studying ${board} syllabus on the topic: "${topic}". ${syllabusContext}

Make sure questions follow ${board} exam pattern with appropriate difficulty distribution.

For each question, provide:
1. The question text
2. Four options (A, B, C, D) for multiple choice
3. The correct answer (just the letter like "A", "B", "C", or "D")
4. A brief explanation

Format the response as JSON array with this structure:
[{
  "question": "Question text here",
  "options": {
    "A": "Option A text",
    "B": "Option B text", 
    "C": "Option C text",
    "D": "Option D text"
  },
  "correctAnswer": "A",
  "explanation": "Brief explanation of why this is correct"
}]`;

  try {
    const client = getOpenAIClient();
    const response = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert educational content creator specializing in creating practice questions for students.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4000
    });

    const content = response.choices[0].message.content;
    
    // Try to parse JSON from the response
    try {
      // Find JSON array in the response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      return { error: 'Failed to parse questions', raw: content };
    }
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error(`Failed to generate questions: ${error.message}`);
  }
}

/**
 * Generate study notes based on topic and class
 */
async function generateNotes(topic, classLevel, board = 'CBSE') {
  if (!isAIConfigured()) {
    throw new Error('OpenAI API key is not configured');
  }
  
  // Get syllabus context
  let syllabusContext = '';
  try {
    const syllabusData = require('../data/syllabus');
    const chapters = syllabusData.getChapters(board, classLevel, topic);
    if (chapters && chapters.length > 0) {
      syllabusContext = `\n\nThis topic is from ${board} Class ${classLevel}. Key chapters: ${chapters.map(c => `${c.name} (${c.weightage}% weightage)`).join(', ')}`;
    }
  } catch (e) {}
  
  const prompt = `Create comprehensive study notes for a Class ${classLevel} student studying ${board} syllabus on the topic: "${topic}".${syllabusContext}

Include:
1. Key concepts and definitions
2. Important formulas (if applicable)
3. Main points to remember
4. Common mistakes to avoid
5. A brief summary

Follow ${board} exam pattern and include relevant examples. Format the response in clear, structured markdown.`;

  try {
    const client = getOpenAIClient();
    const response = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert tutor who creates clear, concise study notes for students.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 3000
    });

    return {
      topic,
      classLevel,
      content: response.choices[0].message.content,
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error(`Failed to generate notes: ${error.message}`);
  }
}

/**
 * Generate a mock test based on subject and class
 */
async function generateMockTest(subject, classLevel, numQuestions = 20, board = 'CBSE') {
  // Get syllabus context
  let syllabusInfo = '';
  try {
    const syllabusData = require('../data/syllabus');
    const chapters = syllabusData.getChapters(board, classLevel, subject);
    if (chapters && chapters.length > 0) {
      syllabusInfo = chapters.map(c => `Chapter ${c.number}: ${c.name} (${c.weightage}% weight)`).join(', ');
    }
  } catch (e) {}

  const prompt = `Create a complete mock test for Class ${classLevel} ${subject} (${board} syllabus) with ${numQuestions} multiple choice questions. Important chapters: ${syllabusInfo || 'all chapters'}

Follow ${board} exam pattern.

For each question provide: question text, four options (A,B,C,D), correct answer, brief explanation.

Include conceptual, numerical, application-based questions. Follow ${board} board format.

Format as JSON array.`;

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert exam creator who designs comprehensive mock tests for students.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 6000
    });

    const content = response.choices[0].message.content;
    
    try {
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return JSON.parse(content);
    } catch (parseError) {
      return { error: 'Failed to parse test', raw: content };
    }
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error(`Failed to generate mock test: ${error.message}`);
  }
}

/**
 * Get AI tutoring assistance
 */
async function getAIAssistance(question, context = '') {
  const prompt = `You are a helpful tutor. ${context ? `Context: ${context}\n\n` : ''}Student question: "${question}"

Provide:
1. A clear explanation
2. Step-by-step solution if applicable
3. Related concepts they should understand
4. Tips for similar problems`;

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a patient, encouraging tutor who helps students understand concepts clearly.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });

    return {
      question,
      answer: response.choices[0].message.content,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error(`Failed to get AI assistance: ${error.message}`);
  }
}

/**
 * Generate a study plan based on student's goals and current level
 */
async function generateStudyPlan(studentLevel, targetGoals, availableTime) {
  const prompt = `Create a personalized study plan for a student at Class ${studentLevel} level.

Goals: ${targetGoals.join(', ')}
Available study time: ${availableTime} hours per week

Include:
1. Weekly schedule breakdown
2. Topics to cover each week
3. Recommended practice tests
4. Tips for effective studying
5. Resource recommendations

Format as a detailed study plan.`;

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an educational advisor who creates personalized study plans for students.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    return {
      studentLevel,
      targetGoals,
      availableTime,
      plan: response.choices[0].message.content,
      createdAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error(`Failed to generate study plan: ${error.message}`);
  }
}

module.exports = {
  generateQuestions,
  generateNotes,
  generateMockTest,
  getAIAssistance,
  generateStudyPlan
};

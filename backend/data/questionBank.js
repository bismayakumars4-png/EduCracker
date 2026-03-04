/**
 * ========================================
 * EduCracker - Question Bank Data
 * Sample questions for different subjects and chapters
 * ========================================
 */

module.exports = {
  // Physics Class 12 Questions
  physics12: [
    {
      id: 1,
      chapter: 1,
      question: "Two point charges +q and -q are placed at a distance of 2a apart. The electric field at a point on the perpendicular bisector of the line joining the charges is:",
      options: {
        A: "Zero",
        B: "2kaq/a³",
        C: "kaq/a³",
        D: "kaq/2a³"
      },
      correctAnswer: 0,
      explanation: "At the perpendicular bisector, the horizontal components cancel out and vertical components add up. For equal and opposite charges, the field is zero at the midpoint.",
      difficulty: "MEDIUM",
      marks: 2
    },
    {
      id: 2,
      chapter: 1,
      question: "The force between two charges placed in air is F. If they are placed in a medium of dielectric constant K, the force becomes:",
      options: {
        A: "KF",
        B: "F/K",
        C: "K²F",
        D: "F"
      },
      correctAnswer: 1,
      explanation: "The force in a medium is reduced by the dielectric constant: F' = F/K",
      difficulty: "EASY",
      marks: 1
    },
    {
      id: 3,
      chapter: 3,
      question: "The resistivity of a wire depends on:",
      options: {
        A: "Length",
        B: "Area of cross-section",
        C: "Material",
        D: "Temperature"
      },
      correctAnswer: 2,
      explanation: "Resistivity (ρ) is a material property and depends on temperature, not on dimensions.",
      difficulty: "EASY",
      marks: 1
    },
    {
      id: 4,
      chapter: 4,
      question: "A charged particle enters a uniform magnetic field perpendicular to it. The path followed is:",
      options: {
        A: "Straight line",
        B: "Parabola",
        C: "Circle",
        D: "Helix"
      },
      correctAnswer: 2,
      explanation: "When velocity is perpendicular to magnetic field, the particle moves in a circular path due to constant magnetic force.",
      difficulty: "EASY",
      marks: 1
    },
    {
      id: 5,
      chapter: 6,
      question: "The self-inductance of a solenoid depends on:",
      options: {
        A: "Current through solenoid",
        B: "Voltage across solenoid",
        C: "Length and area only",
        D: "Length, area and number of turns"
      },
      correctAnswer: 3,
      explanation: "L = μ₀N²A/l, so it depends on number of turns (N), area (A), and length (l).",
      difficulty: "MEDIUM",
      marks: 2
    },
    {
      id: 6,
      chapter: 9,
      question: "The focal length of a convex lens in air is f. If placed in water, its focal length becomes:",
      options: {
        A: "f",
        B: "Greater than f",
        C: "Less than f",
        D: "Zero"
      },
      correctAnswer: 1,
      explanation: "In water, the refractive index difference decreases, so lens becomes less powerful and focal length increases.",
      difficulty: "HARD",
      marks: 2
    },
    {
      id: 7,
      chapter: 11,
      question: "The de Broglie wavelength of a particle of mass m and kinetic energy K is:",
      options: {
        A: "h/√(2mK)",
        B: "h/2mK",
        C: "√(2mK)/h",
        D: "2mh/K"
      },
      correctAnswer: 0,
      explanation: "λ = h/p = h/√(2mK) where K is kinetic energy.",
      difficulty: "MEDIUM",
      marks: 2
    },
    {
      id: 8,
      chapter: 14,
      question: "In an intrinsic semiconductor, the number of free electrons is:",
      options: {
        A: "Equal to number of holes",
        B: "Greater than number of holes",
        C: "Less than number of holes",
        D: "Zero"
      },
      correctAnswer: 0,
      explanation: "In intrinsic semiconductors, electrons and holes are generated in pairs, so their concentrations are equal.",
      difficulty: "EASY",
      marks: 1
    }
  ],

  // Chemistry Class 12 Questions
  chemistry12: [
    {
      id: 101,
      chapter: 1,
      question: "In a face centered cubic unit cell, the number of atoms is:",
      options: {
        A: "2",
        B: "4",
        C: "6",
        D: "8"
      },
      correctAnswer: 1,
      explanation: "FCC has 8 corners × 1/8 = 1 atom, and 6 face centers × 1/2 = 3 atoms. Total = 4 atoms.",
      difficulty: "MEDIUM",
      marks: 2
    },
    {
      id: 102,
      chapter: 2,
      question: "Which of the following has highest boiling point?",
      options: {
        A: "0.1M NaCl",
        B: "0.1M Glucose",
        C: "0.1M Urea",
        D: "0.1M K₂SO₄"
      },
      correctAnswer: 3,
      explanation: "K₂SO₄ dissociates into 3 ions, so it has the highest van't Hoff factor and thus highest boiling point.",
      difficulty: "MEDIUM",
      marks: 2
    },
    {
      id: 103,
      chapter: 4,
      question: "For a first order reaction, the time required for 99% completion is:",
      options: {
        A: "2 × t½",
        B: "4.6 × t½",
        C: "6.64 × t½",
        D: "10 × t½"
      },
      correctAnswer: 2,
      explanation: "t = 2.303/k × log(100/1) = 2.303/k × 2 = 4.6 × t½. For 99%, it's about 6.64 × t½.",
      difficulty: "HARD",
      marks: 3
    },
    {
      id: 104,
      chapter: 9,
      question: "The hybridisation of [Co(NH₃)₆]³⁺ is:",
      options: {
        A: "sp³d²",
        B: "d²sp³",
        C: "dsp²",
        D: "sp³"
      },
      correctAnswer: 1,
      explanation: "It is an octahedral complex with d²sp³ (inner orbital) hybridisation as Co³⁺ is a strong field ligand.",
      difficulty: "MEDIUM",
      marks: 2
    },
    {
      id: 105,
      chapter: 12,
      question: "Which of the following compounds gives Cannizzaro reaction?",
      options: {
        A: "Acetaldehyde",
        B: "Acetone",
        C: "Benzaldehyde",
        D: "Formaldehyde"
      },
      correctAnswer: 2,
      explanation: "Benzaldehyde does not have α-hydrogen, so it undergoes Cannizzaro reaction with NaOH.",
      difficulty: "MEDIUM",
      marks: 2
    }
  ],

  // Mathematics Class 12 Questions
  mathematics12: [
    {
      id: 201,
      chapter: 1,
      question: "If f: R → R is defined by f(x) = x³, then f is:",
      options: {
        A: "One-one but not onto",
        B: "Onto but not one-one",
        C: "Bijective",
        D: "Neither one-one nor onto"
      },
      correctAnswer: 2,
      explanation: "f(x) = x³ is strictly increasing, so one-one. Also, it is onto R, so it is bijective.",
      difficulty: "EASY",
      marks: 1
    },
    {
      id: 202,
      chapter: 3,
      question: "If A is a 3×3 matrix with |A| = 5, then |adj A| equals:",
      options: {
        A: "5",
        B: "25",
        C: "125",
        D: "15"
      },
      correctAnswer: 1,
      explanation: "For n×n matrix, |adj A| = |A|^(n-1) = 5^(3-1) = 25.",
      difficulty: "MEDIUM",
      marks: 2
    },
    {
      id: 203,
      chapter: 5,
      question: "The derivative of sin⁻¹(x) is:",
      options: {
        A: "1/√(1+x²)",
        B: "1/√(1-x²)",
        C: "-1/√(1-x²)",
        D: "-1/√(1+x²)"
      },
      correctAnswer: 1,
      explanation: "d/dx(sin⁻¹x) = 1/√(1-x²) for -1 < x < 1.",
      difficulty: "EASY",
      marks: 1
    },
    {
      id: 204,
      chapter: 7,
      question: "∫ eˣ sin x dx equals:",
      options: {
        A: "eˣ(sin x + cos x)/2 + C",
        B: "eˣ(sin x - cos x)/2 + C",
        C: "eˣ(cos x - sin x)/2 + C",
        D: "eˣ(sin x + cos x) + C"
      },
      correctAnswer: 1,
      explanation: "Using integration by parts twice, we get ∫eˣsin x dx = eˣ(sin x - cos x)/2 + C.",
      difficulty: "HARD",
      marks: 4
    },
    {
      id: 205,
      chapter: 10,
      question: "If a·b = 6 and |a×b| = 6, then the angle between a and b is:",
      options: {
        A: "30°",
        B: "45°",
        C: "60°",
        D: "90°"
      },
      correctAnswer: 1,
      explanation: "a·b = |a||b|cosθ and |a×b| = |a||b|sinθ. So tanθ = |a×b|/(a·b) = 6/6 = 1, θ = 45°.",
      difficulty: "MEDIUM",
      marks: 2
    }
  ],

  // Physics Class 10 Questions
  physics10: [
    {
      id: 301,
      chapter: 1,
      question: "The power of a convex lens is +2.5D. Its focal length is:",
      options: {
        A: "40 cm",
        B: "25 cm",
        C: "10 cm",
        D: "2.5 cm"
      },
      correctAnswer: 0,
      explanation: "P = 1/f (in meters), so f = 1/2.5 = 0.4m = 40cm.",
      difficulty: "EASY",
      marks: 1
    },
    {
      id: 302,
      chapter: 3,
      question: "When resistance in a circuit is doubled and voltage remains same, current becomes:",
      options: {
        A: "Doubled",
        B: "Halved",
        C: "Four times",
        D: "Same"
      },
      correctAnswer: 1,
      explanation: "From Ohm's law, I = V/R. If R doubles, I becomes half.",
      difficulty: "EASY",
      marks: 1
    },
    {
      id: 303,
      chapter: 4,
      question: "The direction of induced current is given by:",
      options: {
        A: "Fleming's Left Hand Rule",
        B: "Fleming's Right Hand Rule",
        C: "Maxwell's Right Hand Thumb Rule",
        D: "Both B and C"
      },
      correctAnswer: 3,
      explanation: "Fleming's Right Hand Rule and Maxwell's Right Hand Thumb Rule give the direction of induced current.",
      difficulty: "MEDIUM",
      marks: 2
    }
  ],

  // Chemistry Class 10 Questions
  chemistry10: [
    {
      id: 401,
      chapter: 1,
      question: "Which of the following is a decomposition reaction?",
      options: {
        A: "2Mg + O₂ → 2MgO",
        B: "CaCO₃ → CaO + CO₂",
        C: "NaOH + HCl → NaCl + H₂O",
        D: "Zn + H₂SO₄ → ZnSO₄ + H₂"
      },
      correctAnswer: 1,
      explanation: "Decomposition reaction is when one compound breaks into simpler substances. CaCO₃ decomposes to CaO and CO₂.",
      difficulty: "EASY",
      marks: 1
    },
    {
      id: 402,
      chapter: 3,
      question: "Metal which does not react with dilute HCl:",
      options: {
        A: "Zn",
        B: "Mg",
        C: "Cu",
        D: "Fe"
      },
      correctAnswer: 2,
      explanation: "Cu is less reactive than hydrogen, so it does not displace hydrogen from HCl.",
      difficulty: "EASY",
      marks: 1
    }
  ],

  // Mathematics Class 10 Questions
  mathematics10: [
    {
      id: 501,
      chapter: 2,
      question: "If one zero of polynomial x² + 3x + k is 2, then value of k is:",
      options: {
        A: "-10",
        B: "10",
        C: "-5",
        D: "5"
      },
      correctAnswer: 0,
      explanation: "Since 2 is a zero, f(2) = 4 + 6 + k = 0, so k = -10.",
      difficulty: "EASY",
      marks: 1
    },
    {
      id: 502,
      chapter: 8,
      question: "sin 60° cos 30° + cos 60° sin 30° equals:",
      options: {
        A: "0",
        B: "1",
        C: "√3/2",
        D: "1/2"
      },
      correctAnswer: 1,
      explanation: "This equals sin(60° + 30°) = sin 90° = 1.",
      difficulty: "EASY",
      marks: 1
    },
    {
      id: 503,
      chapter: 15,
      question: "A bag contains 3 red and 5 black balls. Probability of drawing a red ball is:",
      options: {
        A: "3/8",
        B: "5/8",
        C: "1/8",
        D: "1"
      },
      correctAnswer: 0,
      explanation: "Total balls = 8, red balls = 3. Probability = 3/8.",
      difficulty: "EASY",
      marks: 1
    }
  ],

  // Helper functions
  getQuestions: function(board, classLevel, subject) {
    const key = (subject || '').toLowerCase() + classLevel;
    return this[key] || [];
  },

  getQuestionsByChapter: function(board, classLevel, subject, chapter) {
    const questions = this.getQuestions(board, classLevel, subject);
    return questions.filter(q => q.chapter === chapter);
  },

  getQuestionsByDifficulty: function(board, classLevel, subject, difficulty) {
    const questions = this.getQuestions(board, classLevel, subject);
    return questions.filter(q => q.difficulty === difficulty);
  },

  getRandomQuestions: function(board, classLevel, subject, count = 10) {
    const questions = this.getQuestions(board, classLevel, subject);
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  },

  getMixedQuestions: function(board, classLevel, subject, easy = 5, medium = 8, hard = 2) {
    const questions = this.getQuestions(board, classLevel, subject);
    const easyQ = questions.filter(q => q.difficulty === 'EASY').slice(0, easy);
    const mediumQ = questions.filter(q => q.difficulty === 'MEDIUM').slice(0, medium);
    const hardQ = questions.filter(q => q.difficulty === 'HARD').slice(0, hard);
    return [...easyQ, ...mediumQ, ...hardQ];
  }
};

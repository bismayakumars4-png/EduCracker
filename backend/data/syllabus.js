/**
 * ========================================
 * EduCracker - Complete Syllabus Data
 * Contains syllabus for CBSE, HSE Odisha and more
 * ========================================
 */

module.exports = {
  // Board definitions
  boards: [
    { id: 1, name: "CBSE", code: "CBSE", description: "Central Board of Secondary Education", classes: [6, 7, 8, 9, 10, 11, 12] },
    { id: 2, name: "HSE Odisha", code: "HSE_ODISHA", description: "Council of Higher Secondary Education Odisha", classes: [11, 12] },
    { id: 3, name: "BSE Odisha", code: "BSE_ODISHA", description: "Board of Secondary Education Odisha", classes: [6, 7, 8, 9, 10] },
    { id: 4, name: "ICSE", code: "ICSE", description: "Indian Certificate of Secondary Education", classes: [6, 7, 8, 9, 10] }
  ],

  // Target exams
  targetExams: [
    { code: "CBSE_BOARD", name: "CBSE Board Exams", board: "CBSE" },
    { code: "HSE_ODISHA_BOARD", name: "HSE Odisha Board Exams", board: "HSE_ODISHA" },
    { code: "NEET", name: "NEET (Medical)", board: "CBSE" },
    { code: "JEE_MAIN", name: "JEE Main (Engineering)", board: "CBSE" },
    { code: "JEE_ADVANCED", name: "JEE Advanced", board: "CBSE" }
  ],

  // =====================
  // CBSE CLASS 6
  // =====================
  CBSEClass6: {
    Science: {
      chapters: [
        { number: 1, name: "Food: Where Does It Come From?", weightage: 10, difficulty: "EASY" },
        { number: 2, name: "Components of Food", weightage: 12, difficulty: "EASY" },
        { number: 3, name: "Fibre to Fabric", weightage: 8, difficulty: "EASY" },
        { number: 4, name: "Sorting Materials into Groups", weightage: 10, difficulty: "EASY" },
        { number: 5, name: "Separation of Substances", weightage: 10, difficulty: "MEDIUM" },
        { number: 6, name: "Changes Around Us", weightage: 10, difficulty: "MEDIUM" },
        { number: 7, name: "Getting to Know Plants", weightage: 12, difficulty: "EASY" },
        { number: 8, name: "Body Movements", weightage: 8, difficulty: "EASY" },
        { number: 9, name: "The Living Organisms and Their Surroundings", weightage: 10, difficulty: "MEDIUM" },
        { number: 10, name: "Motion and Measurement of Distances", weightage: 10, difficulty: "MEDIUM" }
      ],
      formulas: []
    },
    Mathematics: {
      chapters: [
        { number: 1, name: "Knowing Our Numbers", weightage: 10, difficulty: "EASY" },
        { number: 2, name: "Whole Numbers", weightage: 10, difficulty: "EASY" },
        { number: 3, name: "Playing with Numbers", weightage: 12, difficulty: "MEDIUM" },
        { number: 4, name: "Basic Geometrical Ideas", weightage: 10, difficulty: "EASY" },
        { number: 5, name: "Understanding Elementary Shapes", weightage: 12, difficulty: "MEDIUM" },
        { number: 6, name: "Integers", weightage: 10, difficulty: "MEDIUM" },
        { number: 7, name: "Fractions", weightage: 12, difficulty: "MEDIUM" },
        { number: 8, name: "Decimals", weightage: 10, difficulty: "MEDIUM" },
        { number: 9, name: "Data Handling", weightage: 8, difficulty: "EASY" },
        { number: 10, name: "Mensuration", weightage: 6, difficulty: "MEDIUM" }
      ],
      formulas: []
    }
  },

  // =====================
  // CBSE CLASS 7
  // =====================
  CBSEClass7: {
    Science: {
      chapters: [
        { number: 1, name: "Nutrition in Plants", weightage: 8, difficulty: "EASY" },
        { number: 2, name: "Nutrition in Animals", weightage: 10, difficulty: "MEDIUM" },
        { number: 3, name: "Fibre to Fabric", weightage: 8, difficulty: "EASY" },
        { number: 4, name: "Heat", weightage: 10, difficulty: "MEDIUM" },
        { number: 5, name: "Acids, Bases and Salts", weightage: 10, difficulty: "MEDIUM" },
        { number: 6, name: "Physical and Chemical Changes", weightage: 10, difficulty: "MEDIUM" },
        { number: 7, name: "Weather, Climate and Adaptations", weightage: 8, difficulty: "EASY" },
        { number: 8, name: "Winds, Storms and Cyclones", weightage: 8, difficulty: "EASY" },
        { number: 9, name: "Soil", weightage: 8, difficulty: "EASY" },
        { number: 10, name: "Respiration in Organisms", weightage: 8, difficulty: "MEDIUM" },
        { number: 11, name: "Transportation in Animals and Plants", weightage: 8, difficulty: "MEDIUM" },
        { number: 12, name: "Reproduction in Plants", weightage: 8, difficulty: "MEDIUM" },
        { number: 13, name: "Motion and Time", weightage: 8, difficulty: "MEDIUM" }
      ],
      formulas: []
    },
    Mathematics: {
      chapters: [
        { number: 1, name: "Integers", weightage: 10, difficulty: "MEDIUM" },
        { number: 2, name: "Fractions and Decimals", weightage: 12, difficulty: "MEDIUM" },
        { number: 3, name: "Data Handling", weightage: 10, difficulty: "EASY" },
        { number: 4, name: "Simple Equations", weightage: 10, difficulty: "MEDIUM" },
        { number: 5, name: "Lines and Angles", weightage: 10, difficulty: "MEDIUM" },
        { number: 6, name: "The Triangle and Its Properties", weightage: 12, difficulty: "MEDIUM" },
        { number: 7, name: "Congruence of Triangles", weightage: 8, difficulty: "MEDIUM" },
        { number: 8, name: "Comparing Quantities", weightage: 10, difficulty: "MEDIUM" },
        { number: 9, name: "Rational Numbers", weightage: 8, difficulty: "MEDIUM" },
        { number: 10, name: "Practical Geometry", weightage: 10, difficulty: "MEDIUM" }
      ],
      formulas: []
    }
  },

  // =====================
  // CBSE CLASS 8
  // =====================
  CBSEClass8: {
    Science: {
      chapters: [
        { number: 1, name: "Crop Production and Management", weightage: 8, difficulty: "EASY" },
        { number: 2, name: "Microorganisms: Friend and Foe", weightage: 8, difficulty: "MEDIUM" },
        { number: 3, name: "Synthetic Fibres and Plastics", weightage: 6, difficulty: "EASY" },
        { number: 4, name: "Materials: Metals and Non-metals", weightage: 10, difficulty: "MEDIUM" },
        { number: 5, name: "Coal and Petroleum", weightage: 6, difficulty: "EASY" },
        { number: 6, name: "Combustion and Flame", weightage: 8, difficulty: "MEDIUM" },
        { number: 7, name: "Conservation of Plants and Animals", weightage: 8, difficulty: "EASY" },
        { number: 8, name: "Cell: Structure and Functions", weightage: 10, difficulty: "MEDIUM" },
        { number: 9, name: "Reproduction in Animals", weightage: 8, difficulty: "MEDIUM" },
        { number: 10, name: "Reaching the Age of Adolescence", weightage: 6, difficulty: "EASY" },
        { number: 11, name: "Force and Pressure", weightage: 10, difficulty: "MEDIUM" },
        { number: 12, name: "Friction", weightage: 8, difficulty: "MEDIUM" },
        { number: 13, name: "Sound", weightage: 8, difficulty: "MEDIUM" },
        { number: 14, name: "Chemical Effects of Electric Current", weightage: 8, difficulty: "MEDIUM" },
        { number: 15, name: "Some Natural Phenomena", weightage: 6, difficulty: "EASY" },
        { number: 16, name: "Light", weightage: 8, difficulty: "MEDIUM" }
      ],
      formulas: []
    },
    Mathematics: {
      chapters: [
        { number: 1, name: "Rational Numbers", weightage: 10, difficulty: "MEDIUM" },
        { number: 2, name: "Linear Equations in One Variable", weightage: 10, difficulty: "MEDIUM" },
        { number: 3, name: "Understanding Quadrilaterals", weightage: 10, difficulty: "MEDIUM" },
        { number: 4, name: "Practical Geometry", weightage: 8, difficulty: "MEDIUM" },
        { number: 5, name: "Data Handling", weightage: 8, difficulty: "EASY" },
        { number: 6, name: "Squares and Square Roots", weightage: 10, difficulty: "MEDIUM" },
        { number: 7, name: "Cubes and Cube Roots", weightage: 8, difficulty: "MEDIUM" },
        { number: 8, name: "Comparing Quantities", weightage: 10, difficulty: "MEDIUM" },
        { number: 9, name: "Algebraic Expressions and Identities", weightage: 10, difficulty: "MEDIUM" },
        { number: 10, name: "Visualising Solid Shapes", weightage: 8, difficulty: "EASY" },
        { number: 11, name: "Mensuration", weightage: 10, difficulty: "MEDIUM" },
        { number: 12, name: "Exponents and Powers", weightage: 8, difficulty: "MEDIUM" },
        { number: 13, name: "Direct and Inverse Proportions", weightage: 8, difficulty: "MEDIUM" },
        { number: 14, name: "Factorisation", weightage: 8, difficulty: "MEDIUM" },
        { number: 15, name: "Introduction to Graphs", weightage: 8, difficulty: "EASY" },
        { number: 16, name: "Playing with Numbers", weightage: 8, difficulty: "MEDIUM" }
      ],
      formulas: []
    }
  },

  // =====================
  // CBSE CLASS 9
  // =====================
  CBSEClass9: {
    Science: {
      chapters: [
        { number: 1, name: "Matter in Our Surroundings", weightage: 8, difficulty: "EASY" },
        { number: 2, name: "Is Matter Around Us Pure?", weightage: 10, difficulty: "MEDIUM" },
        { number: 3, name: "Atoms and Molecules", weightage: 10, difficulty: "MEDIUM" },
        { number: 4, name: "Structure of the Atom", weightage: 10, difficulty: "MEDIUM" },
        { number: 5, name: "The Fundamental Unit of Life", weightage: 10, difficulty: "MEDIUM" },
        { number: 6, name: "Tissues", weightage: 8, difficulty: "MEDIUM" },
        { number: 7, name: "Diversity in Living Organisms", weightage: 10, difficulty: "MEDIUM" },
        { number: 8, name: "Motion", weightage: 10, difficulty: "MEDIUM" },
        { number: 9, name: "Force and Laws of Motion", weightage: 10, difficulty: "MEDIUM" },
        { number: 10, name: "Gravitation", weightage: 8, difficulty: "MEDIUM" },
        { number: 11, name: "Work and Energy", weightage: 8, difficulty: "MEDIUM" },
        { number: 12, name: "Sound", weightage: 8, difficulty: "MEDIUM" }
      ],
      formulas: []
    },
    Mathematics: {
      chapters: [
        { number: 1, name: "Number Systems", weightage: 8, difficulty: "MEDIUM" },
        { number: 2, name: "Polynomials", weightage: 10, difficulty: "MEDIUM" },
        { number: 3, name: "Coordinate Geometry", weightage: 8, difficulty: "EASY" },
        { number: 4, name: "Linear Equations in Two Variables", weightage: 10, difficulty: "MEDIUM" },
        { number: 5, name: "Introduction to Euclid's Geometry", weightage: 8, difficulty: "MEDIUM" },
        { number: 6, name: "Lines and Angles", weightage: 10, difficulty: "MEDIUM" },
        { number: 7, name: "Triangles", weightage: 10, difficulty: "MEDIUM" },
        { number: 8, name: "Quadrilaterals", weightage: 10, difficulty: "MEDIUM" },
        { number: 9, name: "Areas of Parallelograms and Triangles", weightage: 8, difficulty: "MEDIUM" },
        { number: 10, name: "Circles", weightage: 10, difficulty: "MEDIUM" },
        { number: 11, name: "Constructions", weightage: 8, difficulty: "MEDIUM" },
        { number: 12, name: "Heron's Formula", weightage: 8, difficulty: "MEDIUM" },
        { number: 13, name: "Surface Areas and Volumes", weightage: 10, difficulty: "MEDIUM" },
        { number: 14, name: "Statistics", weightage: 8, difficulty: "EASY" },
        { number: 15, name: "Probability", weightage: 8, difficulty: "EASY" }
      ],
      formulas: []
    },
    Chemistry: {
      chapters: [
        { number: 1, name: "The Solid State", weightage: 6, difficulty: "MEDIUM" },
        { number: 2, name: "Solutions", weightage: 6, difficulty: "MEDIUM" },
        { number: 3, name: "Electrochemistry", weightage: 6, difficulty: "HARD" },
        { number: 4, name: "Chemical Kinetics", weightage: 6, difficulty: "HARD" },
        { number: 5, name: "Surface Chemistry", weightage: 4, difficulty: "EASY" },
        { number: 6, name: "General Principles and Processes of Isolation of Elements", weightage: 4, difficulty: "MEDIUM" },
        { number: 7, name: "The p-Block Elements", weightage: 6, difficulty: "MEDIUM" },
        { number: 8, name: "The d and f Block Elements", weightage: 5, difficulty: "MEDIUM" },
        { number: 9, name: "Coordination Compounds", weightage: 5, difficulty: "HARD" },
        { number: 10, name: "Haloalkanes and Haloarenes", weightage: 5, difficulty: "MEDIUM" },
        { number: 11, name: "Alcohols, Phenols and Ethers", weightage: 5, difficulty: "MEDIUM" },
        { number: 12, name: "Aldehydes, Ketones and Carboxylic Acids", weightage: 6, difficulty: "HARD" },
        { number: 13, name: "Amines", weightage: 4, difficulty: "MEDIUM" },
        { number: 14, name: "Biomolecules", weightage: 4, difficulty: "EASY" },
        { number: 15, name: "Polymers", weightage: 3, difficulty: "EASY" },
        { number: 16, name: "Chemistry in Everyday Life", weightage: 3, difficulty: "EASY" }
      ],
      formulas: [
        { title: "Molarity", formula: "M = n/V (mol/L)" },
        { title: "Molality", formula: "m = n/mass of solvent (kg)" },
        { title: "Nernst Equation", formula: "E = E° - (RT/nF)lnQ" },
        { title: "Rate Law", formula: "Rate = k[A]^m[B]^n" },
        { title: "Half-life (1st order)", formula: "t½ = 0.693/k" }
      ]
    },
    Mathematics: {
      chapters: [
        { number: 1, name: "Relations and Functions", weightage: 5, difficulty: "EASY" },
        { number: 2, name: "Inverse Trigonometric Functions", weightage: 5, difficulty: "MEDIUM" },
        { number: 3, name: "Matrices", weightage: 5, difficulty: "MEDIUM" },
        { number: 4, name: "Determinants", weightage: 5, difficulty: "MEDIUM" },
        { number: 5, name: "Continuity and Differentiability", weightage: 7, difficulty: "HARD" },
        { number: 6, name: "Application of Derivatives", weightage: 6, difficulty: "HARD" },
        { number: 7, name: "Integrals", weightage: 8, difficulty: "HARD" },
        { number: 8, name: "Application of Integrals", weightage: 4, difficulty: "MEDIUM" },
        { number: 9, name: "Differential Equations", weightage: 5, difficulty: "HARD" },
        { number: 10, name: "Vector Algebra", weightage: 5, difficulty: "MEDIUM" },
        { number: 11, name: "Three Dimensional Geometry", weightage: 5, difficulty: "HARD" },
        { number: 12, name: "Linear Programming", weightage: 3, difficulty: "EASY" },
        { number: 13, name: "Probability", weightage: 5, difficulty: "MEDIUM" }
      ],
      formulas: [
        { title: "Derivative of sinx", formula: "d(sin x)/dx = cos x" },
        { title: "Derivative of cosx", formula: "d(cos x)/dx = -sin x" },
        { title: "Integration by parts", formula: "∫u·v dx = u∫v dx - ∫(u'∫v dx)dx" },
        { title: "Area under curve", formula: "A = ∫[a to b] y dx" },
        { title: "Dot Product", formula: "a·b = |a||b|cosθ" },
        { title: "Cross Product", formula: "a×b = |a||b|sinθ n̂" }
      ]
    },
    Biology: {
      chapters: [
        { number: 1, name: "Reproduction in Organisms", weightage: 3, difficulty: "EASY" },
        { number: 2, name: "Sexual Reproduction in Flowering Plants", weightage: 5, difficulty: "MEDIUM" },
        { number: 3, name: "Human Reproduction", weightage: 5, difficulty: "MEDIUM" },
        { number: 4, name: "Reproductive Health", weightage: 3, difficulty: "EASY" },
        { number: 5, name: "Principles of Inheritance and Variation", weightage: 7, difficulty: "HARD" },
        { number: 6, name: "Molecular Basis of Inheritance", weightage: 7, difficulty: "HARD" },
        { number: 7, name: "Evolution", weightage: 5, difficulty: "MEDIUM" },
        { number: 8, name: "Human Health and Disease", weightage: 5, difficulty: "MEDIUM" },
        { number: 9, name: "Strategies for Enhancement in Food Production", weightage: 3, difficulty: "EASY" },
        { number: 10, name: "Microbes in Human Welfare", weightage: 3, difficulty: "EASY" },
        { number: 11, name: "Biotechnology: Principles and Processes", weightage: 6, difficulty: "HARD" },
        { number: 12, name: "Biotechnology and its Applications", weightage: 5, difficulty: "MEDIUM" },
        { number: 13, name: "Organisms and Populations", weightage: 4, difficulty: "MEDIUM" },
        { number: 14, name: "Ecosystem", weightage: 4, difficulty: "MEDIUM" },
        { number: 15, name: "Biodiversity and Conservation", weightage: 3, difficulty: "EASY" },
        { number: 16, name: "Environmental Issues", weightage: 3, difficulty: "EASY" }
      ],
      formulas: []
    }
  },

  // =====================
  // CBSE CLASS 11 (Science)
  // =====================
  CBSEClass11: {
    Physics: {
      chapters: [
        { number: 1, name: "Units and Measurements", weightage: 4, difficulty: "EASY" },
        { number: 2, name: "Motion in a Straight Line", weightage: 5, difficulty: "MEDIUM" },
        { number: 3, name: "Motion in a Plane", weightage: 5, difficulty: "MEDIUM" },
        { number: 4, name: "Laws of Motion", weightage: 6, difficulty: "HARD" },
        { number: 5, name: "Work, Energy and Power", weightage: 6, difficulty: "HARD" },
        { number: 6, name: "System of Particles and Rotational Motion", weightage: 5, difficulty: "HARD" },
        { number: 7, name: "Gravitation", weightage: 5, difficulty: "MEDIUM" },
        { number: 8, name: "Mechanical Properties of Solids", weightage: 4, difficulty: "MEDIUM" },
        { number: 9, name: "Mechanical Properties of Fluids", weightage: 4, difficulty: "MEDIUM" },
        { number: 10, name: "Thermal Properties of Matter", weightage: 4, difficulty: "MEDIUM" },
        { number: 11, name: "Thermodynamics", weightage: 6, difficulty: "HARD" },
        { number: 12, name: "Kinetic Theory", weightage: 3, difficulty: "EASY" },
        { number: 13, name: "Oscillations", weightage: 4, difficulty: "MEDIUM" },
        { number: 14, name: "Waves", weightage: 5, difficulty: "MEDIUM" }
      ],
      formulas: [
        { title: "Kinematic Equation", formula: "v = u + at" },
        { title: "Newton's 2nd Law", formula: "F = ma" },
        { title: "Work Done", formula: "W = Fd cosθ" },
        { title: "Kinetic Energy", formula: "KE = ½mv²" },
        { title: "Potential Energy", formula: "PE = mgh" },
        { title: "Gravitational Force", formula: "F = Gm1m2/r²" },
        { title: "Pressure", formula: "P = F/A" },
        { title: "Heat", formula: "Q = mcΔT" }
      ]
    },
    Chemistry: {
      chapters: [
        { number: 1, name: "Some Basic Concepts of Chemistry", weightage: 4, difficulty: "EASY" },
        { number: 2, name: "Structure of Atom", weightage: 5, difficulty: "MEDIUM" },
        { number: 3, name: "Classification of Elements and Periodicity", weightage: 4, difficulty: "MEDIUM" },
        { number: 4, name: "Chemical Bonding and Molecular Structure", weightage: 5, difficulty: "HARD" },
        { number: 5, name: "Thermodynamics", weightage: 6, difficulty: "HARD" },
        { number: 6, name: "Equilibrium", weightage: 6, difficulty: "HARD" },
        { number: 7, name: "Redox Reactions", weightage: 3, difficulty: "MEDIUM" },
        { number: 8, name: "Hydrogen", weightage: 3, difficulty: "EASY" },
        { number: 9, name: "The s-Block Elements", weightage: 4, difficulty: "MEDIUM" },
        { number: 10, name: "The p-Block Elements", weightage: 5, difficulty: "MEDIUM" },
        { number: 11, name: "Organic Chemistry - Basic Principles", weightage: 5, difficulty: "MEDIUM" },
        { number: 12, name: "Hydrocarbons", weightage: 5, difficulty: "MEDIUM" },
        { number: 13, name: "Environmental Chemistry", weightage: 3, difficulty: "EASY" }
      ],
      formulas: [
        { title: "Mole Concept", formula: "n = m/M" },
        { title: "Avogadro's Number", formula: "N = 6.022×10²³" },
        { title: "Molarity", formula: "M = n/V" },
        { title: "Ideal Gas Equation", formula: "PV = nRT" }
      ]
    },
    Mathematics: {
      chapters: [
        { number: 1, name: "Sets", weightage: 4, difficulty: "EASY" },
        { number: 2, name: "Relations and Functions", weightage: 4, difficulty: "MEDIUM" },
        { number: 3, name: "Trigonometric Functions", weightage: 6, difficulty: "MEDIUM" },
        { number: 4, name: "Principle of Mathematical Induction", weightage: 3, difficulty: "MEDIUM" },
        { number: 5, name: "Complex Numbers and Quadratic Equations", weightage: 5, difficulty: "MEDIUM" },
        { number: 6, name: "Linear Inequalities", weightage: 4, difficulty: "EASY" },
        { number: 7, name: "Permutations and Combinations", weightage: 5, difficulty: "HARD" },
        { number: 8, name: "Binomial Theorem", weightage: 4, difficulty: "MEDIUM" },
        { number: 9, name: "Sequences and Series", weightage: 5, difficulty: "MEDIUM" },
        { number: 10, name: "Straight Lines", weightage: 4, difficulty: "MEDIUM" },
        { number: 11, name: "Conic Sections", weightage: 5, difficulty: "MEDIUM" },
        { number: 12, name: "Introduction to Three Dimensional Geometry", weightage: 4, difficulty: "MEDIUM" },
        { number: 13, name: "Limits and Derivatives", weightage: 6, difficulty: "HARD" },
        { number: 14, name: "Mathematical Reasoning", weightage: 3, difficulty: "EASY" },
        { number: 15, name: "Statistics", weightage: 4, difficulty: "MEDIUM" },
        { number: 16, name: "Probability", weightage: 4, difficulty: "MEDIUM" }
      ],
      formulas: [
        { title: "Permutation", formula: "P(n,r) = n!/(n-r)!" },
        { title: "Combination", formula: "C(n,r) = n!/r!(n-r)!" },
        { title: "Binomial Theorem", formula: "(a+b)^n = Σ C(n,r) a^(n-r) b^r" },
        { title: "AP nth term", formula: "a_n = a + (n-1)d" },
        { title: "GP nth term", formula: "a_n = ar^(n-1)" }
      ]
    },
    Biology: {
      chapters: [
        { number: 1, name: "The Living World", weightage: 3, difficulty: "EASY" },
        { number: 2, name: "Biological Classification", weightage: 4, difficulty: "MEDIUM" },
        { number: 3, name: "Plant Kingdom", weightage: 4, difficulty: "MEDIUM" },
        { number: 4, name: "Animal Kingdom", weightage: 5, difficulty: "MEDIUM" },
        { number: 5, name: "Morphology of Flowering Plants", weightage: 4, difficulty: "MEDIUM" },
        { number: 6, name: "Anatomy of Flowering Plants", weightage: 3, difficulty: "MEDIUM" },
        { number: 7, name: "Structural Organisation in Animals", weightage: 3, difficulty: "EASY" },
        { number: 8, name: "Cell: The Unit of Life", weightage: 5, difficulty: "HARD" },
        { number: 9, name: "Biomolecules", weightage: 5, difficulty: "HARD" },
        { number: 10, name: "Cell Cycle and Cell Division", weightage: 4, difficulty: "MEDIUM" },
        { number: 11, name: "Transport in Plants", weightage: 3, difficulty: "MEDIUM" },
        { number: 12, name: "Mineral Nutrition", weightage: 3, difficulty: "MEDIUM" },
        { number: 13, name: "Photosynthesis in Higher Plants", weightage: 5, difficulty: "HARD" },
        { number: 14, name: "Respiration in Plants", weightage: 4, difficulty: "MEDIUM" },
        { number: 15, name: "Plant Growth and Development", weightage: 4, difficulty: "MEDIUM" }
      ],
      formulas: []
    }
  },

  // =====================
  // CBSE CLASS 10
  // =====================
  CBSEClass10: {
    Science: {
      chapters: [
        { number: 1, name: "Chemical Reactions and Equations", weightage: 6, difficulty: "MEDIUM", topic: "Chemistry" },
        { number: 2, name: "Acids, Bases and Salts", weightage: 5, difficulty: "MEDIUM", topic: "Chemistry" },
        { number: 3, name: "Metals and Non-Metals", weightage: 6, difficulty: "MEDIUM", topic: "Chemistry" },
        { number: 4, name: "Carbon and Its Compounds", weightage: 6, difficulty: "HARD", topic: "Chemistry" },
        { number: 5, name: "Periodic Classification of Elements", weightage: 4, difficulty: "MEDIUM", topic: "Chemistry" },
        { number: 6, name: "Life Processes", weightage: 7, difficulty: "HARD", topic: "Biology" },
        { number: 7, name: "Control and Coordination", weightage: 5, difficulty: "MEDIUM", topic: "Biology" },
        { number: 8, name: "How do Organisms Reproduce?", weightage: 5, difficulty: "MEDIUM", topic: "Biology" },
        { number: 9, name: "Heredity and Evolution", weightage: 5, difficulty: "MEDIUM", topic: "Biology" },
        { number: 10, name: "Light - Reflection and Refraction", weightage: 7, difficulty: "HARD", topic: "Physics" },
        { number: 11, name: "Human Eye and Colourful World", weightage: 4, difficulty: "MEDIUM", topic: "Physics" },
        { number: 12, name: "Electricity", weightage: 7, difficulty: "HARD", topic: "Physics" },
        { number: 13, name: "Magnetic Effects of Electric Current", weightage: 6, difficulty: "HARD", topic: "Physics" },
        { number: 14, name: "Sources of Energy", weightage: 4, difficulty: "EASY", topic: "Physics" },
        { number: 15, name: "Our Environment", weightage: 4, difficulty: "EASY", topic: "Biology" },
        { number: 16, name: "Management of Natural Resources", weightage: 3, difficulty: "EASY", topic: "Biology" }
      ],
      formulas: [
        { title: "Mirror Formula", formula: "1/f = 1/u + 1/v" },
        { title: "Lens Formula", formula: "1/f = 1/v - 1/u" },
        { title: "Ohm's Law", formula: "V = IR" },
        { title: "Power", formula: "P = VI" },
        { title: "Resistance", formula: "R = ρl/A" },
        { title: "Force on conductor", formula: "F = BIl sinθ" }
      ]
    },
    Mathematics: {
      chapters: [
        { number: 1, name: "Real Numbers", weightage: 4, difficulty: "EASY" },
        { number: 2, name: "Polynomials", weightage: 4, difficulty: "MEDIUM" },
        { number: 3, name: "Pair of Linear Equations in Two Variables", weightage: 5, difficulty: "MEDIUM" },
        { number: 4, name: "Quadratic Equations", weightage: 5, difficulty: "MEDIUM" },
        { number: 5, name: "Arithmetic Progressions", weightage: 4, difficulty: "EASY" },
        { number: 6, name: "Triangles", weightage: 6, difficulty: "HARD" },
        { number: 7, name: "Coordinate Geometry", weightage: 5, difficulty: "MEDIUM" },
        { number: 8, name: "Introduction to Trigonometry", weightage: 5, difficulty: "MEDIUM" },
        { number: 9, name: "Some Applications of Trigonometry", weightage: 4, difficulty: "HARD" },
        { number: 10, name: "Circles", weightage: 5, difficulty: "HARD" },
        { number: 11, name: "Constructions", weightage: 3, difficulty: "MEDIUM" },
        { number: 12, name: "Areas Related to Circles", weightage: 4, difficulty: "MEDIUM" },
        { number: 13, name: "Surface Areas and Volumes", weightage: 5, difficulty: "MEDIUM" },
        { number: 14, name: "Statistics", weightage: 5, difficulty: "MEDIUM" },
        { number: 15, name: "Probability", weightage: 4, difficulty: "EASY" }
      ],
      formulas: [
        { title: "Quadratic Formula", formula: "x = (-b ± √(b²-4ac))/2a" },
        { title: "AP nth term", formula: "a_n = a + (n-1)d" },
        { title: "Distance Formula", formula: "d = √((x2-x1)² + (y2-y1)²)" },
        { title: "Section Formula", formula: "((mx2+nx1)/(m+n), (my2+ny1)/(m+n))" },
        { title: "sin²θ + cos²θ = 1", formula: "sin²θ + cos²θ = 1" },
        { title: "Mean", formula: "Σfᵢxᵢ / Σfᵢ" }
      ]
    }
  },

  // =====================
  // CBSE CLASS 9
  // =====================
  CBSEClass9: {
    Science: {
      chapters: [
        { number: 1, name: "Matter in Our Surroundings", weightage: 4, difficulty: "EASY" },
        { number: 2, name: "Is Matter Around Us Pure?", weightage: 5, difficulty: "MEDIUM" },
        { number: 3, name: "Atoms and Molecules", weightage: 5, difficulty: "MEDIUM" },
        { number: 4, name: "Structure of the Atom", weightage: 5, difficulty: "MEDIUM" },
        { number: 5, name: "The Fundamental Unit of Life", weightage: 5, difficulty: "MEDIUM" },
        { number: 6, name: "Tissues", weightage: 5, difficulty: "MEDIUM" },
        { number: 7, name: "Diversity in Living Organisms", weightage: 4, difficulty: "EASY" },
        { number: 8, name: "Motion", weightage: 5, difficulty: "MEDIUM" },
        { number: 9, name: "Force and Laws of Motion", weightage: 6, difficulty: "HARD" },
        { number: 10, name: "Gravitation", weightage: 5, difficulty: "MEDIUM" },
        { number: 11, name: "Work and Energy", weightage: 5, difficulty: "MEDIUM" },
        { number: 12, name: "Sound", weightage: 4, difficulty: "MEDIUM" },
        { number: 13, name: "Why Do We Fall Ill?", weightage: 3, difficulty: "EASY" },
        { number: 14, name: "Natural Resources", weightage: 3, difficulty: "EASY" },
        { number: 15, name: "Improvement in Food Resources", weightage: 3, difficulty: "EASY" }
      ],
      formulas: [
        { title: "Density", formula: "ρ = m/V" },
        { title: "Velocity", formula: "v = d/t" },
        { title: "Acceleration", formula: "a = (v-u)/t" },
        { title: "Force", formula: "F = ma" },
        { title: "Momentum", formula: "p = mv" },
        { title: "Work", formula: "W = Fd" }
      ]
    },
    Mathematics: {
      chapters: [
        { number: 1, name: "Number Systems", weightage: 4, difficulty: "EASY" },
        { number: 2, name: "Polynomials", weightage: 4, difficulty: "MEDIUM" },
        { number: 3, name: "Coordinate Geometry", weightage: 3, difficulty: "EASY" },
        { number: 4, name: "Linear Equations in Two Variables", weightage: 4, difficulty: "MEDIUM" },
        { number: 5, name: "Introduction to Euclid's Geometry", weightage: 3, difficulty: "EASY" },
        { number: 6, name: "Lines and Angles", weightage: 4, difficulty: "MEDIUM" },
        { number: 7, name: "Triangles", weightage: 5, difficulty: "MEDIUM" },
        { number: 8, name: "Quadrilaterals", weightage: 4, difficulty: "MEDIUM" },
        { number: 9, name: "Areas of Parallelograms and Triangles", weightage: 4, difficulty: "MEDIUM" },
        { number: 10, name: "Circles", weightage: 4, difficulty: "MEDIUM" },
        { number: 11, name: "Constructions", weightage: 3, difficulty: "MEDIUM" },
        { number: 12, name: "Heron's Formula", weightage: 4, difficulty: "MEDIUM" },
        { number: 13, name: "Surface Areas and Volumes", weightage: 5, difficulty: "MEDIUM" },
        { number: 14, name: "Statistics", weightage: 4, difficulty: "MEDIUM" },
        { number: 15, name: "Probability", weightage: 3, difficulty: "EASY" }
      ],
      formulas: [
        { title: "Heron's Formula", formula: "A = √[s(s-a)(s-b)(s-c)]" },
        { title: "Area of Triangle", formula: "A = ½ × base × height" },
        { title: "Volume of Cube", formula: "V = a³" }
      ]
    }
  },

  // =====================
  // CBSE CLASS 12 (Science)
  // =====================
  CBSEClass12: {
    Physics: {
      chapters: [
        { number: 1, name: "Electric Charges and Fields", weightage: 6, difficulty: "MEDIUM" },
        { number: 2, name: "Electrostatic Potential and Capacitance", weightage: 5, difficulty: "MEDIUM" },
        { number: 3, name: "Current Electricity", weightage: 7, difficulty: "HARD" },
        { number: 4, name: "Moving Charges and Magnetism", weightage: 6, difficulty: "HARD" },
        { number: 5, name: "Magnetism and Matter", weightage: 4, difficulty: "MEDIUM" },
        { number: 6, name: "Electromagnetic Induction", weightage: 5, difficulty: "HARD" },
        { number: 7, name: "Alternating Current", weightage: 6, difficulty: "HARD" },
        { number: 8, name: "Electromagnetic Waves", weightage: 3, difficulty: "EASY" },
        { number: 9, name: "Ray Optics and Optical Instruments", weightage: 7, difficulty: "HARD" },
        { number: 10, name: "Wave Optics", weightage: 5, difficulty: "MEDIUM" },
        { number: 11, name: "Dual Nature of Radiation and Matter", weightage: 5, difficulty: "MEDIUM" },
        { number: 12, name: "Atoms", weightage: 4, difficulty: "EASY" },
        { number: 13, name: "Nuclei", weightage: 4, difficulty: "EASY" },
        { number: 14, name: "Semiconductor Electronics", weightage: 7, difficulty: "MEDIUM" }
      ],
      formulas: [
        { title: "Coulomb's Law", formula: "F = k*q1*q2/r²" },
        { title: "Electric Field", formula: "E = F/q = k*Q/r²" },
        { title: "Electric Potential", formula: "V = k*Q/r" },
        { title: "Capacitance", formula: "C = Q/V" },
        { title: "Ohm's Law", formula: "V = IR" },
        { title: "Power", formula: "P = VI = I²R" },
        { title: "Magnetic Force", formula: "F = qvB sinθ" },
        { title: "Faraday's Law", formula: "ε = -dΦ/dt" },
        { title: "Lens Formula", formula: "1/f = 1/v + 1/u" },
        { title: "de Broglie Wavelength", formula: "λ = h/p" }
      ]
    },
    Chemistry: {
      chapters: [
        { number: 1, name: "Solid State", weightage: 5, difficulty: "MEDIUM" },
        { number: 2, name: "Solutions", weightage: 6, difficulty: "MEDIUM" },
        { number: 3, name: "Electrochemistry", weightage: 5, difficulty: "HARD" },
        { number: 4, name: "Chemical Kinetics", weightage: 5, difficulty: "MEDIUM" },
        { number: 5, name: "Surface Chemistry", weightage: 4, difficulty: "EASY" },
        { number: 6, name: "General Principles and Processes of Isolation of Elements", weightage: 4, difficulty: "MEDIUM" },
        { number: 7, name: "The p-Block Elements", weightage: 6, difficulty: "MEDIUM" },
        { number: 8, name: "The d and f Block Elements", weightage: 5, difficulty: "MEDIUM" },
        { number: 9, name: "Coordination Compounds", weightage: 5, difficulty: "HARD" },
        { number: 10, name: "Haloalkanes and Haloarenes", weightage: 4, difficulty: "MEDIUM" },
        { number: 11, name: "Alcohols, Phenols and Ethers", weightage: 5, difficulty: "MEDIUM" },
        { number: 12, name: "Aldehydes, Ketones and Carboxylic Acids", weightage: 5, difficulty: "MEDIUM" },
        { number: 13, name: "Amines", weightage: 4, difficulty: "MEDIUM" },
        { number: 14, name: "Biomolecules", weightage: 4, difficulty: "EASY" }
      ],
      formulas: [
        { title: "Molarity", formula: "M = n/V" },
        { title: "Rate Law", formula: "Rate = k[A]^m[B]^n" },
        { title: "Half-life", formula: "t½ = 0.693/k" }
      ]
    },
    Mathematics: {
      chapters: [
        { number: 1, name: "Relations and Functions", weightage: 5, difficulty: "EASY" },
        { number: 2, name: "Inverse Trigonometric Functions", weightage: 5, difficulty: "MEDIUM" },
        { number: 3, name: "Matrices", weightage: 5, difficulty: "MEDIUM" },
        { number: 4, name: "Determinants", weightage: 5, difficulty: "MEDIUM" },
        { number: 5, name: "Continuity and Differentiability", weightage: 7, difficulty: "HARD" },
        { number: 6, name: "Application of Derivatives", weightage: 6, difficulty: "HARD" },
        { number: 7, name: "Integrals", weightage: 8, difficulty: "HARD" },
        { number: 8, name: "Application of Integrals", weightage: 4, difficulty: "MEDIUM" },
        { number: 9, name: "Differential Equations", weightage: 5, difficulty: "HARD" },
        { number: 10, name: "Vector Algebra", weightage: 5, difficulty: "MEDIUM" },
        { number: 11, name: "Three Dimensional Geometry", weightage: 5, difficulty: "HARD" },
        { number: 12, name: "Linear Programming", weightage: 3, difficulty: "EASY" },
        { number: 13, name: "Probability", weightage: 4, difficulty: "MEDIUM" }
      ],
      formulas: [
        { title: "Derivative of sin x", formula: "d(sin x)/dx = cos x" },
        { title: "Derivative of cos x", formula: "d(cos x)/dx = -sin x" },
        { title: "Integration by parts", formula: "∫u·v dx = u∫v dx - ∫(du/dx)∫v dx dx" }
      ]
    },
    Biology: {
      chapters: [
        { number: 1, name: "Reproduction in Organisms", weightage: 4, difficulty: "EASY" },
        { number: 2, name: "Sexual Reproduction in Flowering Plants", weightage: 6, difficulty: "MEDIUM" },
        { number: 3, name: "Human Reproduction", weightage: 6, difficulty: "MEDIUM" },
        { number: 4, name: "Reproductive Health", weightage: 4, difficulty: "EASY" },
        { number: 5, name: "Principles of Inheritance and Variation", weightage: 7, difficulty: "HARD" },
        { number: 6, name: "Molecular Basis of Inheritance", weightage: 7, difficulty: "HARD" },
        { number: 7, name: "Evolution", weightage: 5, difficulty: "MEDIUM" },
        { number: 8, name: "Human Health and Diseases", weightage: 5, difficulty: "MEDIUM" },
        { number: 9, name: "Strategies for Enhancement in Food Production", weightage: 4, difficulty: "EASY" },
        { number: 10, name: "Microbes in Human Welfare", weightage: 4, difficulty: "EASY" },
        { number: 11, name: "Biotechnology: Principles and Processes", weightage: 5, difficulty: "HARD" },
        { number: 12, name: "Biotechnology and its Applications", weightage: 5, difficulty: "MEDIUM" },
        { number: 13, name: "Organisms and Populations", weightage: 4, difficulty: "MEDIUM" },
        { number: 14, name: "Ecosystem", weightage: 4, difficulty: "EASY" },
        { number: 15, name: "Biodiversity and Conservation", weightage: 3, difficulty: "EASY" },
        { number: 16, name: "Environmental Issues", weightage: 4, difficulty: "EASY" }
      ],
      formulas: []
    }
  },

  // =====================
  // HSE ODISHA CLASS 12 (Science)
  // =====================
  HSE_ODISHAClass12: {
    Physics: {
      chapters: [
        { number: 1, name: "Electric Charges and Fields", weightage: 6, difficulty: "MEDIUM" },
        { number: 2, name: "Electrostatic Potential and Capacitance", weightage: 5, difficulty: "MEDIUM" },
        { number: 3, name: "Current Electricity", weightage: 7, difficulty: "HARD" },
        { number: 4, name: "Moving Charges and Magnetism", weightage: 6, difficulty: "HARD" },
        { number: 5, name: "Magnetism and Matter", weightage: 4, difficulty: "MEDIUM" },
        { number: 6, name: "Electromagnetic Induction", weightage: 6, difficulty: "HARD" },
        { number: 7, name: "Alternating Current", weightage: 6, difficulty: "HARD" },
        { number: 8, name: "Electromagnetic Waves", weightage: 3, difficulty: "EASY" },
        { number: 9, name: "Ray Optics", weightage: 7, difficulty: "HARD" },
        { number: 10, name: "Wave Optics", weightage: 5, difficulty: "MEDIUM" },
        { number: 11, name: "Dual Nature of Radiation and Matter", weightage: 5, difficulty: "MEDIUM" },
        { number: 12, name: "Atoms", weightage: 4, difficulty: "EASY" },
        { number: 13, name: "Nuclei", weightage: 4, difficulty: "EASY" },
        { number: 14, name: "Electronic Devices", weightage: 6, difficulty: "MEDIUM" }
      ],
      formulas: [
        { title: "Coulomb's Law", formula: "F = k*q1*q2/r²" },
        { title: "Ohm's Law", formula: "V = IR" },
        { title: "Magnetic Force", formula: "F = qvB sinθ" },
        { title: "Faraday's Law", formula: "ε = -dΦ/dt" },
        { title: "Lens Formula", formula: "1/f = 1/v + 1/u" }
      ]
    },
    Chemistry: {
      chapters: [
        { number: 1, name: "Solid State", weightage: 5, difficulty: "MEDIUM" },
        { number: 2, name: "Solutions", weightage: 6, difficulty: "MEDIUM" },
        { number: 3, name: "Electrochemistry", weightage: 6, difficulty: "HARD" },
        { number: 4, name: "Chemical Kinetics", weightage: 5, difficulty: "HARD" },
        { number: 5, name: "Surface Chemistry", weightage: 4, difficulty: "EASY" },
        { number: 6, name: "General Principles of Metallurgy", weightage: 4, difficulty: "MEDIUM" },
        { number: 7, name: "p-Block Elements", weightage: 6, difficulty: "MEDIUM" },
        { number: 8, name: "d and f-Block Elements", weightage: 5, difficulty: "MEDIUM" },
        { number: 9, name: "Coordination Compounds", weightage: 5, difficulty: "HARD" },
        { number: 10, name: "Haloalkanes and Haloarenes", weightage: 5, difficulty: "MEDIUM" },
        { number: 11, name: "Alcohols, Phenols and Ethers", weightage: 5, difficulty: "MEDIUM" },
        { number: 12, name: "Aldehydes, Ketones and Carboxylic Acids", weightage: 6, difficulty: "HARD" },
        { number: 13, name: "Amines", weightage: 4, difficulty: "MEDIUM" },
        { number: 14, name: "Biomolecules", weightage: 4, difficulty: "EASY" }
      ],
      formulas: [
        { title: "Molarity", formula: "M = n/V" },
        { title: "Rate Law", formula: "Rate = k[A]^m[B]^n" },
        { title: "Half-life", formula: "t½ = 0.693/k" }
      ]
    },
    Mathematics: {
      chapters: [
        { number: 1, name: "Relations and Functions", weightage: 5, difficulty: "EASY" },
        { number: 2, name: "Inverse Trigonometric Functions", weightage: 5, difficulty: "MEDIUM" },
        { number: 3, name: "Matrices", weightage: 5, difficulty: "MEDIUM" },
        { number: 4, name: "Determinants", weightage: 5, difficulty: "MEDIUM" },
        { number: 5, name: "Continuity and Differentiability", weightage: 7, difficulty: "HARD" },
        { number: 6, name: "Application of Derivatives", weightage: 6, difficulty: "HARD" },
        { number: 7, name: "Integrals", weightage: 8, difficulty: "HARD" },
        { number: 8, name: "Application of Integrals", weightage: 4, difficulty: "MEDIUM" },
        { number: 9, name: "Differential Equations", weightage: 5, difficulty: "HARD" },
        { number: 10, name: "Vector Algebra", weightage: 5, difficulty: "MEDIUM" },
        { number: 11, name: "Three Dimensional Geometry", weightage: 5, difficulty: "HARD" },
        { number: 12, name: "Linear Programming", weightage: 3, difficulty: "EASY" },
        { number: 13, name: "Probability", weightage: 5, difficulty: "MEDIUM" }
      ],
      formulas: [
        { title: "Derivative of sinx", formula: "d/dx(sin x) = cos x" },
        { title: "Integration by parts", formula: "∫uv dx = u∫v dx - ∫(u'∫v dx)dx" },
        { title: "Dot Product", formula: "a·b = |a||b|cosθ" }
      ]
    },
    Botany: {
      chapters: [
        { number: 1, name: "Reproduction in Organisms", weightage: 4, difficulty: "EASY" },
        { number: 2, name: "Sexual Reproduction in Plants", weightage: 5, difficulty: "MEDIUM" },
        { number: 3, name: "Principles of Inheritance and Variation", weightage: 7, difficulty: "HARD" },
        { number: 4, name: "Molecular Basis of Inheritance", weightage: 7, difficulty: "HARD" },
        { number: 5, name: "Evolution", weightage: 5, difficulty: "MEDIUM" },
        { number: 6, name: "Strategies for Enhancement in Food Production", weightage: 4, difficulty: "EASY" },
        { number: 7, name: "Microbes in Human Welfare", weightage: 4, difficulty: "EASY" },
        { number: 8, name: "Biotechnology: Principles and Processes", weightage: 6, difficulty: "HARD" },
        { number: 9, name: "Biotechnology and its Applications", weightage: 5, difficulty: "MEDIUM" },
        { number: 10, name: "Organisms and Populations", weightage: 4, difficulty: "MEDIUM" },
        { number: 11, name: "Ecosystem", weightage: 4, difficulty: "MEDIUM" },
        { number: 12, name: "Biodiversity and Conservation", weightage: 3, difficulty: "EASY" }
      ],
      formulas: []
    },
    Zoology: {
      chapters: [
        { number: 1, name: "Reproduction in Human", weightage: 5, difficulty: "MEDIUM" },
        { number: 2, name: "Reproductive Health", weightage: 3, difficulty: "EASY" },
        { number: 3, name: "Principles of Inheritance and Variation", weightage: 7, difficulty: "HARD" },
        { number: 4, name: "Molecular Basis of Inheritance", weightage: 7, difficulty: "HARD" },
        { number: 5, name: "Evolution", weightage: 5, difficulty: "MEDIUM" },
        { number: 6, name: "Human Health and Disease", weightage: 5, difficulty: "MEDIUM" },
        { number: 7, name: "Enhancement of Food Production", weightage: 4, difficulty: "EASY" },
        { number: 8, name: "Microbes in Human Welfare", weightage: 4, difficulty: "EASY" },
        { number: 9, name: "Biotechnology: Principles and Processes", weightage: 6, difficulty: "HARD" },
        { number: 10, name: "Biotechnology and its Applications", weightage: 5, difficulty: "MEDIUM" },
        { number: 11, name: "Organisms and Populations", weightage: 4, difficulty: "MEDIUM" },
        { number: 12, name: "Ecosystem", weightage: 4, difficulty: "MEDIUM" },
        { number: 13, name: "Biodiversity and Conservation", weightage: 3, difficulty: "EASY" }
      ],
      formulas: []
    }
  },

  // =====================
  // HSE ODISHA CLASS 11 (Science)
  // =====================
  HSE_ODISHAClass11: {
    Physics: {
      chapters: [
        { number: 1, name: "Units and Measurements", weightage: 4, difficulty: "EASY" },
        { number: 2, name: "Motion in a Straight Line", weightage: 5, difficulty: "MEDIUM" },
        { number: 3, name: "Motion in a Plane", weightage: 5, difficulty: "MEDIUM" },
        { number: 4, name: "Laws of Motion", weightage: 6, difficulty: "HARD" },
        { number: 5, name: "Work, Energy and Power", weightage: 6, difficulty: "HARD" },
        { number: 6, name: "System of Particles and Rotational Motion", weightage: 5, difficulty: "HARD" },
        { number: 7, name: "Gravitation", weightage: 5, difficulty: "MEDIUM" },
        { number: 8, name: "Mechanical Properties of Solids", weightage: 4, difficulty: "MEDIUM" },
        { number: 9, name: "Mechanical Properties of Fluids", weightage: 4, difficulty: "MEDIUM" },
        { number: 10, name: "Thermal Properties of Matter", weightage: 4, difficulty: "MEDIUM" },
        { number: 11, name: "Thermodynamics", weightage: 6, difficulty: "HARD" },
        { number: 12, name: "Kinetic Theory", weightage: 3, difficulty: "EASY" },
        { number: 13, name: "Oscillations", weightage: 4, difficulty: "MEDIUM" },
        { number: 14, name: "Waves", weightage: 5, difficulty: "MEDIUM" }
      ],
      formulas: [
        { title: "Kinematic Equation", formula: "v = u + at" },
        { title: "Newton's 2nd Law", formula: "F = ma" },
        { title: "Work Done", formula: "W = Fd cosθ" },
        { title: "Kinetic Energy", formula: "KE = ½mv²" },
        { title: "Gravitational Force", formula: "F = Gm1m2/r²" }
      ]
    },
    Chemistry: {
      chapters: [
        { number: 1, name: "Some Basic Concepts of Chemistry", weightage: 4, difficulty: "EASY" },
        { number: 2, name: "Structure of Atom", weightage: 5, difficulty: "MEDIUM" },
        { number: 3, name: "Classification of Elements", weightage: 4, difficulty: "MEDIUM" },
        { number: 4, name: "Chemical Bonding", weightage: 5, difficulty: "HARD" },
        { number: 5, name: "Thermodynamics", weightage: 6, difficulty: "HARD" },
        { number: 6, name: "Equilibrium", weightage: 6, difficulty: "HARD" },
        { number: 7, name: "Redox Reactions", weightage: 3, difficulty: "MEDIUM" },
        { number: 8, name: "Hydrogen", weightage: 3, difficulty: "EASY" },
        { number: 9, name: "The s-Block Elements", weightage: 4, difficulty: "MEDIUM" },
        { number: 10, name: "The p-Block Elements", weightage: 5, difficulty: "MEDIUM" },
        { number: 11, name: "Organic Chemistry", weightage: 5, difficulty: "MEDIUM" },
        { number: 12, name: "Hydrocarbons", weightage: 5, difficulty: "MEDIUM" }
      ],
      formulas: [
        { title: "Mole Concept", formula: "n = m/M" },
        { title: "Molarity", formula: "M = n/V" },
        { title: "Ideal Gas Equation", formula: "PV = nRT" }
      ]
    },
    Mathematics: {
      chapters: [
        { number: 1, name: "Sets", weightage: 4, difficulty: "EASY" },
        { number: 2, name: "Relations and Functions", weightage: 4, difficulty: "MEDIUM" },
        { number: 3, name: "Trigonometric Functions", weightage: 6, difficulty: "MEDIUM" },
        { number: 4, name: "Complex Numbers", weightage: 5, difficulty: "MEDIUM" },
        { number: 5, name: "Linear Inequalities", weightage: 4, difficulty: "EASY" },
        { number: 6, name: "Permutations and Combinations", weightage: 5, difficulty: "HARD" },
        { number: 7, name: "Binomial Theorem", weightage: 4, difficulty: "MEDIUM" },
        { number: 8, name: "Sequences and Series", weightage: 5, difficulty: "MEDIUM" },
        { number: 9, name: "Straight Lines", weightage: 4, difficulty: "MEDIUM" },
        { number: 10, name: "Conic Sections", weightage: 5, difficulty: "MEDIUM" },
        { number: 11, name: "3D Geometry", weightage: 4, difficulty: "MEDIUM" },
        { number: 12, name: "Limits and Derivatives", weightage: 6, difficulty: "HARD" },
        { number: 13, name: "Statistics", weightage: 4, difficulty: "MEDIUM" },
        { number: 14, name: "Probability", weightage: 4, difficulty: "MEDIUM" }
      ],
      formulas: [
        { title: "Permutation", formula: "P(n,r) = n!/(n-r)!" },
        { title: "Combination", formula: "C(n,r) = n!/r!(n-r)!" },
        { title: "AP nth term", formula: "a_n = a + (n-1)d" }
      ]
    },
    Botany: {
      chapters: [
        { number: 1, name: "The Living World", weightage: 3, difficulty: "EASY" },
        { number: 2, name: "Biological Classification", weightage: 4, difficulty: "MEDIUM" },
        { number: 3, name: "Plant Kingdom", weightage: 4, difficulty: "MEDIUM" },
        { number: 4, name: "Morphology of Plants", weightage: 4, difficulty: "MEDIUM" },
        { number: 5, name: "Anatomy of Plants", weightage: 3, difficulty: "EASY" },
        { number: 6, name: "Cell: Unit of Life", weightage: 5, difficulty: "HARD" },
        { number: 7, name: "Biomolecules", weightage: 5, difficulty: "HARD" },
        { number: 8, name: "Cell Cycle and Division", weightage: 4, difficulty: "MEDIUM" },
        { number: 9, name: "Transport in Plants", weightage: 3, difficulty: "MEDIUM" },
        { number: 10, name: "Mineral Nutrition", weightage: 3, difficulty: "MEDIUM" },
        { number: 11, name: "Photosynthesis", weightage: 5, difficulty: "HARD" },
        { number: 12, name: "Respiration", weightage: 4, difficulty: "MEDIUM" },
        { number: 13, name: "Plant Growth", weightage: 4, difficulty: "MEDIUM" }
      ],
      formulas: []
    },
    Zoology: {
      chapters: [
        { number: 1, name: "The Living World", weightage: 3, difficulty: "EASY" },
        { number: 2, name: "Biological Classification", weightage: 4, difficulty: "MEDIUM" },
        { number: 3, name: "Animal Kingdom", weightage: 5, difficulty: "MEDIUM" },
        { number: 4, name: "Tissues", weightage: 4, difficulty: "MEDIUM" },
        { number: 5, name: "Structural Organisation", weightage: 3, difficulty: "EASY" },
        { number: 6, name: "Cell: Unit of Life", weightage: 5, difficulty: "HARD" },
        { number: 7, name: "Biomolecules", weightage: 5, difficulty: "HARD" },
        { number: 8, name: "Cell Cycle and Division", weightage: 4, difficulty: "MEDIUM" },
        { number: 9, name: "Digestion and Absorption", weightage: 4, difficulty: "MEDIUM" },
        { number: 10, name: "Breathing and Exchange of Gases", weightage: 4, difficulty: "MEDIUM" },
        { number: 11, name: "Body Fluids and Circulation", weightage: 4, difficulty: "MEDIUM" },
        { number: 12, name: "Excretory Products", weightage: 3, difficulty: "EASY" },
        { number: 13, name: "Locomotion and Movement", weightage: 3, difficulty: "EASY" },
        { number: 14, name: "Neural Control and Coordination", weightage: 4, difficulty: "MEDIUM" },
        { number: 15, name: "Chemical Coordination", weightage: 4, difficulty: "MEDIUM" }
      ],
      formulas: []
    }
  },

  // =====================
  // BSE ODISHA CLASS 10
  // =====================
  BSE_ODISHAClass10: {
    Mathematics: {
      chapters: [
        { number: 1, name: "Real Numbers", weightage: 4, difficulty: "EASY" },
        { number: 2, name: "Polynomials", weightage: 4, difficulty: "MEDIUM" },
        { number: 3, name: "Linear Equations", weightage: 5, difficulty: "MEDIUM" },
        { number: 4, name: "Quadratic Equations", weightage: 5, difficulty: "MEDIUM" },
        { number: 5, name: "Arithmetic Progression", weightage: 4, difficulty: "EASY" },
        { number: 6, name: "Triangles", weightage: 6, difficulty: "HARD" },
        { number: 7, name: "Coordinate Geometry", weightage: 5, difficulty: "MEDIUM" },
        { number: 8, name: "Trigonometry", weightage: 5, difficulty: "MEDIUM" },
        { number: 9, name: "Applications of Trigonometry", weightage: 4, difficulty: "HARD" },
        { number: 10, name: "Circles", weightage: 5, difficulty: "HARD" },
        { number: 11, name: "Constructions", weightage: 3, difficulty: "MEDIUM" },
        { number: 12, name: "Areas Related to Circles", weightage: 4, difficulty: "MEDIUM" },
        { number: 13, name: "Surface Areas and Volumes", weightage: 5, difficulty: "MEDIUM" },
        { number: 14, name: "Statistics", weightage: 5, difficulty: "MEDIUM" },
        { number: 15, name: "Probability", weightage: 4, difficulty: "EASY" }
      ],
      formulas: [
        { title: "Quadratic Formula", formula: "x = (-b ± √(b²-4ac))/2a" },
        { title: "AP nth term", formula: "a_n = a + (n-1)d" },
        { title: "Distance Formula", formula: "d = √((x2-x1)² + (y2-y1)²)" }
      ]
    },
    Science: {
      chapters: [
        { number: 1, name: "Chemical Reactions", weightage: 6, difficulty: "MEDIUM" },
        { number: 2, name: "Acids and Bases", weightage: 5, difficulty: "MEDIUM" },
        { number: 3, name: "Metals and Non-Metals", weightage: 6, difficulty: "MEDIUM" },
        { number: 4, name: "Carbon Compounds", weightage: 6, difficulty: "HARD" },
        { number: 5, name: "Periodic Classification", weightage: 4, difficulty: "MEDIUM" },
        { number: 6, name: "Life Processes", weightage: 7, difficulty: "HARD" },
        { number: 7, name: "Control and Coordination", weightage: 5, difficulty: "MEDIUM" },
        { number: 8, name: "Reproduction", weightage: 5, difficulty: "MEDIUM" },
        { number: 9, name: "Heredity", weightage: 5, difficulty: "MEDIUM" },
        { number: 10, name: "Light", weightage: 7, difficulty: "HARD" },
        { number: 11, name: "Electricity", weightage: 7, difficulty: "HARD" },
        { number: 12, name: "Magnetism", weightage: 6, difficulty: "HARD" },
        { number: 13, name: "Sources of Energy", weightage: 4, difficulty: "EASY" },
        { number: 14, name: "Environment", weightage: 4, difficulty: "EASY" }
      ],
      formulas: [
        { title: "Ohm's Law", formula: "V = IR" },
        { title: "Power", formula: "P = VI" },
        { title: "Mirror Formula", formula: "1/f = 1/u + 1/v" }
      ]
    }
  },

  // Helper functions
  getSyllabus: function(board, classLevel) {
    const key = board + "Class" + classLevel;
    return this[key] || null;
  },

  getSubjects: function(board, classLevel) {
    const syllabus = this.getSyllabus(board, classLevel);
    if (!syllabus) return [];
    return Object.keys(syllabus);
  },

  getChapters: function(board, classLevel, subject) {
    const syllabus = this.getSyllabus(board, classLevel);
    if (!syllabus || !syllabus[subject]) return [];
    return syllabus[subject].chapters;
  },

  getFormulas: function(board, classLevel, subject) {
    const syllabus = this.getSyllabus(board, classLevel);
    if (!syllabus || !syllabus[subject]) return [];
    return syllabus[subject].formulas || [];
  }
};

/**
 * ========================================
 * EduCracker - Flashcards Data
 * Quick revision flashcards for important concepts
 * ========================================
 */

module.exports = {
  // Physics Flashcards - Class 12
  physics12: [
    {
      chapter: 1,
      topic: "Electric Charges",
      question: "What is Coulomb's Law?",
      answer: "The force between two point charges is directly proportional to the product of their charges and inversely proportional to the square of the distance between them. F = k(q1q2)/r²",
      hint: "Relates force to charge and distance"
    },
    {
      chapter: 1,
      topic: "Electric Field",
      question: "What is Electric Field Intensity?",
      answer: "Electric field intensity at a point is the force experienced by a unit positive charge placed at that point. E = F/q = kQ/r²",
      hint: "Force per unit charge"
    },
    {
      chapter: 2,
      topic: "Capacitance",
      question: "What is the formula for capacitance of a parallel plate capacitor?",
      answer: "C = ε₀εᵣA/d, where A is area of plates, d is separation, εᵣ is relative permittivity",
      hint: "Related to area and separation"
    },
    {
      chapter: 3,
      topic: "Ohm's Law",
      question: "State Ohm's Law",
      answer: "At constant temperature, the current flowing through a conductor is directly proportional to the potential difference across its ends. V = IR",
      hint: "V equals I times R"
    },
    {
      chapter: 4,
      topic: "Magnetic Force",
      question: "What is the force on a charged particle moving in a magnetic field?",
      answer: "F = qvB sinθ, where θ is the angle between velocity and magnetic field",
      hint: "Depends on velocity and field strength"
    },
    {
      chapter: 6,
      topic: "EMI",
      question: "State Faraday's Law of Electromagnetic Induction",
      answer: "The magnitude of induced EMF is equal to the rate of change of magnetic flux. ε = -dΦ/dt",
      hint: "Related to change in flux"
    },
    {
      chapter: 9,
      topic: "Lens Formula",
      question: "What is the lens formula?",
      answer: "1/f = 1/v + 1/u, where f is focal length, v is image distance, u is object distance",
      hint: "Relates focal length to object and image distances"
    },
    {
      chapter: 11,
      topic: "Dual Nature",
      question: "What is de Broglie wavelength?",
      answer: "λ = h/p = h/(mv), where h is Planck's constant, m is mass, v is velocity",
      hint: "Matter wave wavelength"
    }
  ],

  // Chemistry Flashcards - Class 12
  chemistry12: [
    {
      chapter: 1,
      topic: "Solid State",
      question: "What is the difference between crystalline and amorphous solids?",
      answer: "Crystalline solids have definite geometric shape and anisotropic properties. Amorphous solids have no definite shape and are isotropic.",
      hint: "Arrangement of particles"
    },
    {
      chapter: 2,
      topic: "Solutions",
      question: "What is Raoult's Law?",
      answer: "The partial vapour pressure of each component is directly proportional to its mole fraction. P = P° × χ",
      hint: "Related to vapour pressure"
    },
    {
      chapter: 4,
      topic: "Kinetics",
      question: "What is the half-life of a first-order reaction?",
      answer: "t½ = 0.693/k, where k is the rate constant",
      hint: "Independent of initial concentration"
    },
    {
      chapter: 9,
      topic: "Coordination",
      question: "What is Werner's theory of coordination compounds?",
      answer: "Metals show two types of linkages: primary (ionic) and secondary (covalent). Secondary linkages are satisfied by ligands.",
      hint: "About metal-ligand bonds"
    },
    {
      chapter: 12,
      topic: "Carbonyls",
      question: "What is the mechanism of nucleophilic addition reactions in aldehydes/ketones?",
      answer: "Nucleophile attacks the carbonyl carbon → Tetrahedral intermediate forms → Protonation gives alcohol",
      hint: "Three steps"
    }
  ],

  // Mathematics Flashcards - Class 12
  mathematics12: [
    {
      chapter: 5,
      topic: "Derivatives",
      question: "What is the derivative of eˣ?",
      answer: "d(eˣ)/dx = eˣ",
      hint: "Same as original"
    },
    {
      chapter: 5,
      topic: "Derivatives",
      question: "What is the derivative of sin x?",
      answer: "d(sin x)/dx = cos x",
      hint: "Trigonometric"
    },
    {
      chapter: 5,
      topic: "Derivatives",
      question: "What is the derivative of log x?",
      answer: "d(log x)/dx = 1/x",
      hint: "Natural logarithm"
    },
    {
      chapter: 7,
      topic: "Integrals",
      question: "What is the integration by parts formula?",
      answer: "∫u·v dx = u∫v dx - ∫(du/dx × ∫v dx)dx",
      hint: "LIATE rule"
    },
    {
      chapter: 10,
      topic: "Vectors",
      question: "What is the dot product formula?",
      answer: "a·b = |a||b|cosθ, where θ is angle between vectors",
      hint: "Scalar product"
    },
    {
      chapter: 11,
      topic: "3D Geometry",
      question: "What is the distance formula in 3D?",
      answer: "d = √[(x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²]",
      hint: "Three coordinates"
    }
  ],

  // Biology Flashcards - Class 12
  biology12: [
    {
      chapter: 5,
      topic: "Inheritance",
      question: "What is Mendel's Law of Independent Assortment?",
      answer: "Allele pairs separate independently during gamete formation. Each pair segregates independently of other pairs.",
      hint: "Related to gamete formation"
    },
    {
      chapter: 6,
      topic: "DNA",
      question: "What is the central dogma of molecular biology?",
      answer: "DNA → RNA → Protein (Replication → Transcription → Translation)",
      hint: "Flow of genetic information"
    },
    {
      chapter: 7,
      topic: "Evolution",
      question: "What is Darwin's theory of natural selection?",
      answer: "Survival of the fittest. Organisms with beneficial variations survive and reproduce, passing on these traits.",
      hint: "Survival of fittest"
    },
    {
      chapter: 8,
      topic: "Immunity",
      question: "What is the difference between innate and adaptive immunity?",
      answer: "Innate: Non-specific, immediate response, first line of defense. Adaptive: Specific, memory, takes time to develop.",
      hint: "Non-specific vs specific"
    }
  ],

  // Physics Flashcards - Class 10
  physics10: [
    {
      chapter: 1,
      topic: "Light",
      question: "What is the mirror formula?",
      answer: "1/f = 1/u + 1/v (for mirrors)",
      hint: "Relates focal length to distances"
    },
    {
      chapter: 1,
      topic: "Refraction",
      question: "What is Snell's Law?",
      answer: "n₁ sinθ₁ = n₂ sinθ₂ or sin i / sin r = n₂/n₁",
      hint: "Relates angles and refractive indices"
    },
    {
      chapter: 3,
      topic: "Electricity",
      question: "What is Ohm's Law?",
      answer: "V = IR (Voltage = Current × Resistance)",
      hint: "Relates V, I, R"
    },
    {
      chapter: 3,
      topic: "Power",
      question: "What are the formulas for electric power?",
      answer: "P = VI = I²R = V²/R",
      hint: "Three equivalent forms"
    },
    {
      chapter: 4,
      topic: "Magnetism",
      question: "What is Fleming's Left Hand Rule?",
      answer: "Thumb = Motion, Forefinger = Magnetic Field, Middle Finger = Current",
      hint: "For motors"
    }
  ],

  // Chemistry Flashcards - Class 10
  chemistry10: [
    {
      chapter: 1,
      topic: "Chemical Reactions",
      question: "What are the types of chemical reactions?",
      answer: "Combination, Decomposition, Displacement, Double Displacement, Redox, Precipitation",
      hint: "Five main types"
    },
    {
      chapter: 3,
      topic: "Metals",
      question: "What is the reactivity series?",
      answer: "K > Na > Ca > Mg > Al > Zn > Fe > Pb > H > Cu > Ag > Au",
      hint: "Most reactive to least"
    },
    {
      chapter: 4,
      topic: "Carbon",
      question: "What are the allotropes of carbon?",
      answer: "Diamond, Graphite, Fullerenes, Graphene, Carbon Nanotubes",
      hint: "Different forms of carbon"
    },
    {
      chapter: 5,
      topic: "Periodic Table",
      question: "What are the trends in a group?",
      answer: "Atomic size increases, metallic character increases, ionization energy decreases, electronegativity decreases",
      hint: "Going down a group"
    }
  ],

  // Mathematics Flashcards - Class 10
  mathematics10: [
    {
      chapter: 2,
      topic: "Polynomials",
      question: "What is the relationship between zeros and coefficients?",
      answer: "For quadratic ax² + bx + c: α + β = -b/a, αβ = c/a",
      hint: "Sum and product of roots"
    },
    {
      chapter: 8,
      topic: "Trigonometry",
      question: "What are the basic trigonometric identities?",
      answer: "sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ, 1 + cot²θ = cosec²θ",
      hint: "Pythagorean identities"
    },
    {
      chapter: 7,
      topic: "Coordinate Geometry",
      question: "What is the distance formula?",
      answer: "d = √[(x₂-x₁)² + (y₂-y₁)²]",
      hint: "Between two points"
    },
    {
      chapter: 14,
      topic: "Statistics",
      question: "What is the formula for mean in grouped data?",
      answer: "x̄ = Σfᵢxᵢ / Σfᵢ",
      hint: "Sum of frequency times value divided by total frequency"
    }
  ],

  // Helper functions
  getFlashcards: function(board, classLevel, subject) {
    const key = (subject || '').toLowerCase() + classLevel;
    return this[key] || [];
  },

  getFlashcardsByChapter: function(board, classLevel, subject, chapter) {
    const flashcards = this.getFlashcards(board, classLevel, subject);
    return flashcards.filter(card => card.chapter === chapter);
  },

  getRandomFlashcards: function(board, classLevel, subject, count = 10) {
    const flashcards = this.getFlashcards(board, classLevel, subject);
    const shuffled = [...flashcards].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
};

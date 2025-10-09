// DIIMUN 2025 - Content Constants
// All content extracted from guide.md and organized for easy access

// Event Schedule & Timeline
export const EVENT_SCHEDULE = {
  date: "November 4th, 2025",
  venue: "GHMC Trivandrum, Kerala",
  registrationDeadline: "October 25th, 2025",
  committeeChangeDeadline: "October 29th, 2025",
  timeline: [
    { 
      time: "8:00 AM", 
      title: "Registration & Reporting", 
      description: "All delegates must report to the registration desk. Carry valid college ID card and Aadhar card along with MUN registration confirmation.",
      icon: "Users",
      duration: "1 hour"
    },
    { 
      time: "9:00 AM", 
      title: "Event Start", 
      description: "Opening ceremony and procedural workshop. All delegates and reporters must adhere to standard MUN Rules of Procedure.",
      icon: "Play",
      duration: "1.5 hours"
    },
    { 
      time: "10:30 AM", 
      title: "Tea Break", 
      description: "10-15 minutes break for refreshments. Network and engage with fellow delegates during breaks.",
      icon: "Coffee",
      duration: "15 minutes"
    },
    { 
      time: "10:45 AM", 
      title: "Committee Sessions Resume", 
      description: "Continued committee sessions with parliamentary procedure, motion protocols, and debate formats.",
      icon: "Users",
      duration: "1.75 hours"
    },
    { 
      time: "12:30 PM", 
      title: "Lunch Break", 
      description: "Lunch and refreshments provided by the organizing committee. Designated dining area will be communicated during registration.",
      icon: "Utensils",
      duration: "1 hour"
    },
    { 
      time: "1:30 PM", 
      title: "Afternoon Sessions", 
      description: "Continued committee sessions with caucusing, resolution writing, and debate.",
      icon: "Users",
      duration: "1.5 hours"
    },
    { 
      time: "3:00 PM", 
      title: "IP Submissions & Results Finalization", 
      description: "International Press submissions due. Results for other committees finalized.",
      icon: "FileText",
      duration: "1 hour"
    },
    { 
      time: "4:00 PM", 
      title: "Event End", 
      description: "Committee sessions conclude. All delegates must be present during the closing ceremony.",
      icon: "Flag",
      duration: "1 hour"
    },
    { 
      time: "5:00 PM", 
      title: "Awards Ceremony", 
      description: "Winners announced and prizes awarded at the conclusion session at the seminar stage.",
      icon: "Award",
      duration: "30 minutes",
      note: "Timing may be subject to change as we share the main stage with Esperanza. Please stay updated for any schedule adjustments."
    },
    { 
      time: "7:00 PM", 
      title: "Cultural Programs & DJ Night", 
      description: "MUN delegates are invited to join the Esperanza audience for an evening of cultural performances and DJ program. A great opportunity to network and celebrate!",
      icon: "Music",
      duration: "Evening",
      note: "Start time may be delayed if Esperanza National Conference speakers are running late. Updates will be communicated on-site."
    }
  ]
}

// Dress Code Guidelines
export const DRESS_CODE = {
  mandatory: "Formal Western Business Attire is MANDATORY for all participants",
  male: {
    title: "Male Delegates",
    requirements: [
      "Full formal suit with tie, OR",
      "Formal shirt with tie, dress trousers, and formal shoes",
      "Blazer/coat (recommended)",
      "Well-groomed appearance"
    ],
    examples: [
      "Dark suit with white/light blue shirt and tie",
      "Blazer with dress trousers and formal shoes",
      "Traditional formal attire representing assigned country (if applicable)"
    ]
  },
  female: {
    title: "Female Delegates",
    requirements: [
      "Formal pantsuit, OR",
      "Formal business dress/skirt suit, OR",
      "Formal saree with formal blouse",
      "Closed formal footwear",
      "Professional grooming"
    ],
    examples: [
      "Business pantsuit with blouse",
      "Formal dress with blazer",
      "Traditional formal saree with formal blouse"
    ]
  },
  prohibited: [
    "Casual wear including jeans",
    "T-shirts and casual tops",
    "Sneakers and casual footwear",
    "Ethnic casual wear",
    "Revealing or inappropriate clothing"
  ],
  special: {
    note: "Traditional formal attire representing your assigned country is permitted but must maintain formal standards.",
    recognition: "There will be appreciation and recognition for BEST DRESSED DELEGATE."
  }
}

// Technology Policy
export const TECHNOLOGY_POLICY = {
  allowed: [
    "Laptops and mobile phones for research and documentation purposes",
    "Recording devices (subject to approval by Executive Board)",
    "Camera (optional, for photography - IPC members)"
  ],
  restrictions: [
    "All devices must be on SILENT mode during committee sessions",
    "Use of devices for personal entertainment, social media, or gaming is strictly prohibited",
    "Recording (audio/video) of committee proceedings by delegates without Executive committees approval is NOT permitted"
  ],
  consequences: "Violation of technology policy will result in immediate confiscation of devices and ban from the event.",
  official: "Official recording, if any, will be done only by the organizing committee"
}

// Committee Information
export const COMMITTEES = {
  who: {
    name: "World Health Organization (WHO)",
    description: "Focus on global health issues, policy development, and international health cooperation.",
    requirements: [
      "Thorough research on assigned country's health policies",
      "Position papers on health-related topics",
      "Understanding of WHO procedures and protocols"
    ],
    skills: [
      "Diplomatic negotiation",
      "Policy analysis",
      "Public speaking",
      "Resolution writing"
    ]
  },
  tgah: {
    name: "The Great Assembly Of Homoeopaths (TGAH)",
    description: "Specialized committee focusing on homoeopathic medicine, research, and international standards.",
    requirements: [
      "Knowledge of homoeopathic principles",
      "Research on assigned country's homoeopathic practices",
      "Understanding of international medical standards"
    ],
    skills: [
      "Medical knowledge",
      "Research and analysis",
      "International cooperation",
      "Policy development"
    ]
  },
  ipc: {
    name: "International Press Corps (IPC)",
    description: "Media coverage and reporting on all committee proceedings with journalistic integrity.",
    requirements: [
      "Laptop/tablet for essay writing and article writing (compulsory)",
      "Camera (optional, for photography)",
      "Basic stationery and research materials"
    ],
    skills: [
      "Journalistic writing",
      "Photography",
      "Essay writing",
      "Interview techniques"
    ],
    special: {
      access: "IPC delegates have access to all committee rooms for coverage",
      format: "Articles need to be drafted digitally and NOT written on paper",
      submission: "Required to submit one document in PDF form/JPEG with allotted chest Numbers as file name",
      formatting: "The document shall be in TIMES NEW ROMAN, Size 12, Line Spacing: 1.15 and with word limit of 500-700 words",
      coordination: "Must coordinate with the Executive Board before conducting interviews during sessions"
    }
  }
}

// Awards & Recognition
export const AWARDS = {
  categories: [
    {
      title: "Best Delegate - WHO",
      prize: "₹1500",
      description: "Awarded to the delegate who demonstrates exceptional performance in WHO committee debates, research, diplomacy, and adherence to rules.",
      criteria: [
        "Quality of debate and argumentation",
        "Resolution writing skills",
        "Caucusing and negotiation abilities",
        "Overall participation and engagement",
        "Adherence to MUN procedures and decorum"
      ]
    },
    {
      title: "Best Delegate - GHA",
      prize: "₹1500",
      description: "Awarded to the delegate who demonstrates exceptional performance in Great Homoeopathic Assembly debates, research, diplomacy, and adherence to rules.",
      criteria: [
        "Quality of debate and argumentation",
        "Resolution writing skills",
        "Caucusing and negotiation abilities",
        "Overall participation and engagement",
        "Adherence to MUN procedures and decorum"
      ]
    },
    {
      title: "High Commendation - WHO",
      prize: "₹1000",
      description: "Awarded to WHO delegates who demonstrate outstanding performance but fall just short of the best delegate award.",
      criteria: [
        "Strong performance in multiple areas",
        "Consistent engagement throughout sessions",
        "Positive contribution to committee work",
        "Respectful conduct and diplomacy"
      ]
    },
    {
      title: "High Commendation - GHA",
      prize: "₹1000",
      description: "Awarded to GHA delegates who demonstrate outstanding performance but fall just short of the best delegate award.",
      criteria: [
        "Strong performance in multiple areas",
        "Consistent engagement throughout sessions",
        "Positive contribution to committee work",
        "Respectful conduct and diplomacy"
      ]
    },
    {
      title: "Best Essay - IPC",
      prize: "₹1000",
      description: "Awarded to the International Press Corps member who demonstrates exceptional journalistic skills and essay writing.",
      criteria: [
        "Article quality and journalistic integrity",
        "Coverage of committee proceedings",
        "Creativity and professionalism",
        "Timely submission of reports",
        "Unbiased and comprehensive reporting"
      ]
    },
    {
      title: "Best Photographer - IPC",
      prize: "₹1000",
      description: "Awarded to the IPC member who captures the best photographs of the event without disrupting proceedings.",
      criteria: [
        "Photographic quality and composition",
        "Coverage of key moments",
        "Professional conduct during photography",
        "Creativity and artistic merit",
        "Adherence to photography guidelines"
      ]
    }
  ],
  evaluation: {
    delegates: [
      "Quality of debate and argumentation",
      "Resolution writing and policy development",
      "Caucusing skills and negotiation",
      "Overall participation and engagement",
      "Adherence to rules and procedures"
    ],
    ipc: [
      "Essay quality and journalistic skills",
      "Coverage of committees and proceedings",
      "Photography skills and composition",
      "Creativity and professionalism",
      "Timely submission and formatting"
    ]
  },
  prizePool: "₹7000",
  totalAwards: 6
}

// Registration Requirements
export const REGISTRATION_REQUIREMENTS = {
  mandatory: {
    title: "Mandatory Requirements for All Delegates",
    items: [
      "Valid College ID Card (compulsory)",
      "MUN Delegate ID (will be provided at registration) - must be always worn",
      "Stationery (notepads, pens for note-passing and working papers) - will be provided but delegates can bring according to their convenience",
      "Portfolio research and position papers (if applicable)",
      "Country placard (will be provided by the organizing committee)"
    ]
  },
  ipc: {
    title: "Special Requirements for International Press Corps (IPC) Members",
    items: [
      "Press pass (will be provided at registration)",
      "Laptop/tablet for essay writing and article writing (compulsory)",
      "Camera (optional, for photography)",
      "Recording devices (subject to approval by Executive Board)",
      "Basic stationery (will be provided but reporters can bring according to their convenience)",
      "Write up should be in PDF format"
    ]
  },
  reporting: {
    time: "8:00 AM",
    note: "All delegates must report to the registration desk by 8:00 AM",
    documents: [
      "Valid college ID card",
      "Aadhar card",
      "MUN registration confirmation"
    ],
    warning: "Late arrivals may not be permitted entry into committee sessions"
  }
}

// Conduct & Discipline
export const CONDUCT_RULES = {
  venue: [
    "Delegates must remain within the designated conference venue during sessions",
    "Respect the conference venue and infrastructure",
    "Delegates must not leave the venue without informing the organizing committee"
  ],
  behavior: [
    "Maintain decorum during debates and respect fellow delegates",
    "Unparliamentary language, personal attacks, or disruptive behavior will not be tolerated",
    "Decisions made by the Executive Board, Chairs, and Organizing Committee are FINAL and BINDING"
  ],
  sessions: [
    "Caucusing will be permitted only during moderated/unmoderated caucus sessions",
    "No delegate may leave the committee room during roll call or voting procedures without permission",
    "Delegated cannot consume food during an ongoing committee session"
  ],
  prohibited: [
    "Smoking, alcohol, and substance abuse are strictly prohibited",
    "Use of devices for personal entertainment, social media, or gaming",
    "Recording without Executive Board approval"
  ],
  consequences: "Any violation of rules will result in disciplinary action, including expulsion from the conference"
}

// Meals & Refreshments
export const MEALS = {
  provided: [
    "Lunch and refreshments will be provided by the organizing committee",
    "Meal timings will be announced by the respective committee chairs"
  ],
  restrictions: [
    "Delegates must not bring outside food into committee rooms",
    "Designated dining area will be communicated during registration",
    "Delegated cannot consume food during an ongoing committee session"
  ],
  schedule: {
    tea: "10:30 AM (10-15 minutes)",
    lunch: "12:30 PM (1 hour)"
  }
}

// Terms & Conditions
export const TERMS_CONDITIONS = {
  registration: [
    "No registrations after 25th October 2025",
    "No changes in committee and teams after 29th of October 2025"
  ],
  refunds: [
    "No refunds after 25th October 2025"
  ],
  fees: [
    "The Fee only includes Participation along with food and refreshments alone",
    "Travel and stay are not included"
  ],
  communication: [
    "By agreeing you also agree to be notified about the event via mail, whatsapp, calls from DNA",
    "You agree to be notified about the further events conducted by DNA"
  ],
  participation: [
    "You also agree that you participate by will and not as forced by any person or institutional body",
    "You hereby agree to comply by the rules and decisions taken by the executive board before during and after the event"
  ]
}

// General Guidelines
export const GENERAL_GUIDELINES = {
  arrival: [
    "Arrive at least 30 minutes before the scheduled start time",
    "Keep your MUN Delegate ID visible at all times"
  ],
  preparation: [
    "Be prepared with thorough research on your portfolio",
    "Carry multiple pens and notepads for note-passing",
    "Stay hydrated and take care of your health"
  ],
  engagement: [
    "Network and engage with fellow delegates during breaks",
    "Enjoy the experience and learn from every interaction",
    "Follow the rules and respect the spirit of Model UN"
  ],
  support: [
    "In case of any queries, approach the organizing committee desk",
    "For any clarifications, please contact the organizing committee before the day of the conference"
  ]
}

// Contact Information
export const CONTACT_INFO = {
  email: "dna@aghosh.in",
  phone: "+91 94423 08824",
  venue: "GHMC Trivandrum, Kerala",
  date: "November 4th, 2025"
}

// FAQ Content
export const FAQ_CONTENT = [
  {
    question: "What is the registration deadline for DIIMUN 2025?",
    answer: "The registration deadline is October 25th, 2025. No registrations will be accepted after this date."
  },
  {
    question: "Can I change my committee or team after registration?",
    answer: "No changes in committee and teams are allowed after October 29th, 2025. Please make your selection carefully during registration."
  },
  {
    question: "What is the dress code for the event?",
    answer: "Formal Western Business Attire is MANDATORY for all participants. This includes formal suits with ties for male delegates and formal pantsuits or business dresses for female delegates. Traditional formal attire representing your assigned country is also permitted."
  },
  {
    question: "Are laptops and mobile phones allowed?",
    answer: "Yes, laptops and mobile phones are permitted for research and documentation purposes. However, all devices must be on SILENT mode during committee sessions, and use for personal entertainment, social media, or gaming is strictly prohibited."
  },
  {
    question: "What happens if I violate the technology policy?",
    answer: "Violation of technology policy will result in immediate confiscation of devices and ban from the event. Please ensure you follow all technology guidelines."
  },
  {
    question: "What are the meal arrangements?",
    answer: "Lunch and refreshments will be provided by the organizing committee. Meal timings will be announced by the respective committee chairs. Delegates must not bring outside food into committee rooms."
  },
  {
    question: "What awards are available?",
    answer: "Awards include Best Delegate (₹1500 each for WHO & GHA), High Commendation (₹1000 each for WHO & GHA), Best Essay - IPC (₹1000), and Best Photographer - IPC (₹1000). Total prize pool is ₹7000. Awards are based on performance, research, diplomacy, and adherence to rules."
  },
  {
    question: "What are the requirements for International Press Corps members?",
    answer: "IPC members must have a laptop/tablet for essay writing and article writing (compulsory), camera (optional), and must submit articles in PDF format with specific formatting requirements (Times New Roman, Size 12, Line Spacing 1.15, 500-700 words)."
  },
  {
    question: "Can I get a refund if I cancel my registration?",
    answer: "No refunds are available after October 25th, 2025. Please consider this carefully before registering."
  },
  {
    question: "What should I bring to the event?",
    answer: "Bring a valid college ID card, Aadhar card, MUN registration confirmation, stationery (though some will be provided), and portfolio research. IPC members should also bring laptops/tablets and cameras as required."
  },
  {
    question: "What time should I arrive?",
    answer: "All delegates must report to the registration desk by 8:00 AM. It's recommended to arrive at least 30 minutes before the scheduled start time. Late arrivals may not be permitted entry into committee sessions."
  },
  {
    question: "Is recording allowed during committee sessions?",
    answer: "Recording (audio/video) of committee proceedings by delegates without Executive Board approval is NOT permitted. Official recording, if any, will be done only by the organizing committee."
  }
]

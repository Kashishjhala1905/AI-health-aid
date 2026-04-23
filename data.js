export const diseases = [
  {
    id: "flu",
    name: "Influenza (Flu)",
    symptoms: ["fever", "cough", "fatigue", "body_aches"],
    description: "A common viral infection that can be deadly, especially in high-risk groups.",
    severity: "Moderate",
    recommendation: "Rest, hydrate, and consult a doctor if symptoms worsen."
  },
  {
    id: "cold",
    name: "Common Cold",
    symptoms: ["sneezing", "sore_throat", "runny_nose", "mild_cough"],
    description: "A viral infection of your nose and throat (upper respiratory tract).",
    severity: "Low",
    recommendation: "Over-the-counter remedies and plenty of fluids."
  },
  {
    id: "covid19",
    name: "COVID-19",
    symptoms: ["fever", "dry_cough", "loss_of_taste", "shortness_of_breath"],
    description: "An infectious disease caused by the SARS-CoV-2 virus.",
    severity: "High",
    recommendation: "Isolate and seek medical testing immediately."
  },
  {
    id: "migraine",
    name: "Migraine",
    symptoms: ["headache", "nausea", "sensitivity_to_light", "blurred_vision"],
    description: "A neurological condition that can cause multiple symptoms, most notably a severe headache.",
    severity: "Moderate",
    recommendation: "Rest in a dark, quiet room and take prescribed medication."
  },
  {
    id: "allergy",
    name: "Seasonal Allergies",
    symptoms: ["sneezing", "itchy_eyes", "runny_nose"],
    description: "An immune system reaction to pollen or other allergens.",
    severity: "Low",
    recommendation: "Antihistamines and avoiding triggers."
  }
];

export const symptomList = [
  { id: "fever", label: "Fever" },
  { id: "cough", label: "Cough" },
  { id: "dry_cough", label: "Dry Cough" },
  { id: "fatigue", label: "Fatigue" },
  { id: "body_aches", label: "Body Aches" },
  { id: "sneezing", label: "Sneezing" },
  { id: "sore_throat", label: "Sore Throat" },
  { id: "runny_nose", label: "Runny Nose" },
  { id: "loss_of_taste", label: "Loss of Taste/Smell" },
  { id: "shortness_of_breath", label: "Shortness of Breath" },
  { id: "headache", label: "Headache" },
  { id: "nausea", label: "Nausea" },
  { id: "sensitivity_to_light", label: "Sensitivity to Light" },
  { id: "itchy_eyes", label: "Itchy Eyes" }
];

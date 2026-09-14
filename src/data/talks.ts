/**
 * Invited talks, transcribed from the "Invited Talks" section of the CV
 * (public/assets/pdf/Andrew_H_Song_CV.pdf). Newest first; the Talks page groups
 * entries by year and keeps this order within each year.
 */
export interface Talk {
  year: number;
  /** 1–12 */
  month: number;
  /** The seminar, conference, or host — not the talk title. */
  event: string;
  location: string;
}

export const talks: Talk[] = [
  // 2026
  { year: 2026, month: 8, event: 'MD Anderson Cancer Center Department of Epidemiology Seminar', location: 'USA' },
  { year: 2026, month: 6, event: 'Ataraxis AI Invited Seminar', location: 'USA' },
  { year: 2026, month: 5, event: 'MD Anderson Cancer Center Department of Biostatistics Seminar', location: 'USA' },
  { year: 2026, month: 5, event: 'International Anesthesia Research Society - Plenary Session', location: 'Canada' },
  {
    year: 2026,
    month: 4,
    event: 'James P. Allison Institute and Institute for Data Science in Oncology Colin Stroud Hackathon',
    location: 'USA',
  },
  { year: 2026, month: 4, event: 'Optica Biophotonics Congress', location: 'USA' },
  { year: 2026, month: 3, event: 'Western Bioinformatics Research Seminar', location: 'Canada' },
  {
    year: 2026,
    month: 3,
    event: 'Division of Pathology and Laboratory Medicine Grand Rounds at MD Anderson Cancer Center',
    location: 'USA',
  },
  { year: 2026, month: 3, event: '3D Spatial Summit @ Alpenglow Biosciences', location: 'USA' },
  { year: 2026, month: 3, event: 'MD Anderson Cancer Center Department of Systems Biology Seminar', location: 'USA' },
  { year: 2026, month: 2, event: 'Updates on Advanced Breast Cancer Conference Keynote', location: 'USA' },
  {
    year: 2026,
    month: 2,
    event: 'MD Anderson Cancer Center Translational Molecular Pathology Distinguished Speaker Seminar Series',
    location: 'USA',
  },

  // 2025
  { year: 2025, month: 11, event: 'LG AI Research', location: 'South Korea' },
  {
    year: 2025,
    month: 11,
    event: 'IFEZ × K-BioX AI Biohealthcare Drug Discovery Summit 2025',
    location: 'South Korea',
  },
  {
    year: 2025,
    month: 11,
    event: 'International Conference of the Genetics Society of Korea 2025',
    location: 'South Korea',
  },
  { year: 2025, month: 10, event: 'Vanderbilt Symposium on AI, Spatial & Systems Biology 2025', location: 'USA' },
  { year: 2025, month: 9, event: 'Yale School of Medicine', location: 'USA' },
  {
    year: 2025,
    month: 8,
    event: 'Yonsei University College of Medicine Department of Pathology Seminar',
    location: 'South Korea',
  },
  {
    year: 2025,
    month: 8,
    event: 'Seoul National University Institute of New Media and Communications Seminar',
    location: 'South Korea',
  },
  {
    year: 2025,
    month: 8,
    event: 'Yonsei University College of Medicine Radiation Oncology Seminar',
    location: 'South Korea',
  },
  { year: 2025, month: 8, event: '22nd Avison Biomedical Symposium', location: 'South Korea' },
  {
    year: 2025,
    month: 6,
    event: 'MD Anderson Imaging Physics & Translational Molecular Pathology Seminar',
    location: 'USA',
  },
  { year: 2025, month: 5, event: 'MGH Molecular Pathology Seminar', location: 'USA' },
  {
    year: 2025,
    month: 4,
    event: 'Massachusetts Society of Pathologists & New England Society of Pathologists Joint Meeting',
    location: 'USA',
  },
  {
    year: 2025,
    month: 3,
    event: 'United States and Canadian Academy of Pathology & Alpenglow Dinner Presentation',
    location: 'USA',
  },
  { year: 2025, month: 3, event: 'Penn Medicine Research Seminar', location: 'USA' },
  { year: 2025, month: 3, event: 'MGH Clinical & Translational Epidemiology Unit Research Seminar', location: 'USA' },
  { year: 2025, month: 3, event: 'AbbVie CVRT Imaging Seminar', location: 'USA' },

  // 2024
  {
    year: 2024,
    month: 11,
    event: 'Johns Hopkins University Electrical and Computer Engineering Department Seminar',
    location: 'USA',
  },
  {
    year: 2024,
    month: 10,
    event: '1st Annual Congress of the Asian Society of Digital Pathology',
    location: 'South Korea',
  },
  { year: 2024, month: 10, event: '3D Spatial Summit @ Alpenglow Biosciences', location: 'USA' },
  { year: 2024, month: 7, event: 'NRG Oncology Summer Meeting 2024', location: 'USA' },
  {
    year: 2024,
    month: 7,
    event: 'AI×Med Seminar @ Center for Advanced Medical Computing and Analysis, MGH',
    location: 'USA',
  },
  { year: 2024, month: 6, event: 'Charles River Laboratories', location: 'USA' },
  { year: 2024, month: 5, event: 'AI in Pathology Seminar @ University of California', location: 'USA' },
  {
    year: 2024,
    month: 3,
    event: 'Advanced Biomedical Computation (ABC) Seminar @ Harvard Medical School',
    location: 'USA',
  },
  { year: 2024, month: 3, event: 'Electrical Engineering Colloquium @ KAIST', location: 'South Korea' },
  {
    year: 2024,
    month: 3,
    event: 'Emerging Technology in Electrical and Computer Engineering Talks @ Seoul National University',
    location: 'South Korea',
  },

  // 2023
  { year: 2023, month: 12, event: 'Computational Pathology Journal Club @ AstraZeneca', location: 'UK' },
  {
    year: 2023,
    month: 12,
    event: 'TIA Centre Seminar Series @ Tissue Imaging Analysis Centre, University of Warwick',
    location: 'UK',
  },
  {
    year: 2023,
    month: 11,
    event: 'NCI Cancer Systems Biology Consortium @ National Cancer Institute',
    location: 'USA',
  },
  { year: 2023, month: 10, event: 'X-ray in Microscopy in Life Sciences Hybrid Meeting @ ZEISS', location: 'UK' },
  { year: 2023, month: 9, event: '3D Spatial Summit @ Alpenglow Biosciences', location: 'USA' },
  { year: 2023, month: 8, event: 'AI Seminar @ PathAI', location: 'USA' },
];

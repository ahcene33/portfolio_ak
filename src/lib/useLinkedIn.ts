// src/lib/useLinkedIn.ts
import { useEffect, useState } from 'react';

export interface LinkedInData {
  identity: {
    name: string;
    headline: string;
    location: string;
    email: string;
    phone: string;
  };
  profiles: {
    linkedin: string;
    github: string;
    freelance_profile: string;
  };
  media: {
    profile_picture: string;
    pdf_documents: string[];
  };
  profile_summary: string;
  services: {
    data_delivery: string[];
  };
  business_value: string[];
  professional_experience: {
    company: string;
    role: string;
    period: string;
    location?: string;
    description?: string;
    responsibilities?: string[];
  }[];
  projects: {
    title: string;
    description: string;
    stack: string[];
    domain: string;
    pdf?: string;
    github?: string | null;
    streamlit?: string | null;
  }[];
  technical_skills: string[];
  industry_expertise: string[];
  education: {
    school: string;
    degree: string;
    year: number;
  }[];
  languages: Record<string, string>;
  keywords: string[];
}

/**
 * Hook that fetches the JSON file once and returns the parsed object.
 * Returns `null` while loading or if an error occurs.
 */
export const useLinkedIn = (): LinkedInData | null => {
  const [data, setData] = useState<LinkedInData | null>(null);

  useEffect(() => {
    fetch('/assets/linkedin.json')
      .then((r) => r.json())
      .then((json) => setData(json as LinkedInData))
      .catch((e) => {
        console.error('Unable to load linkedin.json', e);
        setData(null);
      });
  }, []);

  return data;
};

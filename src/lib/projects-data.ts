// This file's content has been removed as part of portfolio feature removal.
// If Project interface was defined here and used elsewhere, it might need to be moved or also removed.
// For now, assuming it's self-contained.
export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  imageUrl: string;
  imageAiHint: string;
  tags: string[];
  caseStudyMarkdown: string;
  client?: string;
  date?: string;
  services?: string[];
}

export const projectsData: Project[] = [];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return undefined;
};

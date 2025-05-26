import type { Metadata } from 'next';
import PageContainer from '@/components/shared/PageContainer';
import ProjectCard from '@/components/features/portfolio/ProjectCard';
import { projectsData } from '@/lib/projects-data';

export const metadata: Metadata = {
  title: 'Our Portfolio',
  description: 'Discover a selection of our past projects and case studies, showcasing our expertise and capabilities.',
};

export default function PortfolioPage() {
  return (
    <PageContainer>
      <section className="text-center py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Work</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          We take pride in the solutions we deliver. Explore our portfolio to see how we've helped businesses like yours achieve their digital goals.
        </p>
      </section>

      <section className="py-8">
        {projectsData.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">Our project gallery is currently being updated. Check back soon!</p>
        )}
      </section>
    </PageContainer>
  );
}

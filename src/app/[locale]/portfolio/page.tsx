
import type { Metadata } from 'next';
import PageContainer from '@/components/shared/PageContainer';
import ProjectCard from '@/components/features/portfolio/ProjectCard';
import { projectsData } from '@/lib/projects-data'; // Assuming this data is not localized
import { getI18n } from '@/locales/server'; 

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getI18n(locale);
  return {
    title: t('portfolio_page.meta_title'),
    description: t('portfolio_page.meta_description'),
  };
}

export default async function PortfolioPage({ params: { locale } }: { params: { locale: string }}) {
  const t = await getI18n(locale);

  return (
    <PageContainer>
      <section className="text-center py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t('portfolio_page.page_title')}</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('portfolio_page.subtitle')}
        </p>
      </section>

      <section className="py-8">
        {/* TODO: projectsData needs to be localized if content is translated */}
        {projectsData.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project) => (
              <ProjectCard key={project.id} project={project} /> // ProjectCard itself uses data, button text needs to be passed or handled internally
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">{t('portfolio_page.no_projects')}</p>
        )}
      </section>
    </PageContainer>
  );
}

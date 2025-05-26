
import type { Metadata } from 'next';
import PageContainer from '@/components/shared/PageContainer';
import TransformationStepCard from '@/components/features/transformation/TransformationStepCard';
import { ClipboardList, ListChecks, DraftingCompass, Rocket, Repeat } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Digital Transformation Guide',
  description: 'Understand our step-by-step digital transformation workflow: Assess, Plan, Prototype, Deploy, and Iterate.',
};

const transformationSteps = [
  {
    title: 'Assess & Discover',
    description: 'We begin by thoroughly understanding your current processes, challenges, and goals. This involves workshops, stakeholder interviews, and market analysis to identify key opportunities for digital transformation.',
    icon: <ClipboardList className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Plan & Strategize',
    description: 'Based on the assessment, we develop a comprehensive digital transformation roadmap. This includes defining clear objectives, selecting appropriate technologies, and outlining a phased implementation plan with measurable milestones.',
    icon: <ListChecks className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Prototype & Design',
    description: 'We create interactive prototypes and detailed designs to visualize the proposed solution. This iterative process ensures alignment with your vision and allows for early feedback before full-scale development.',
    icon: <DraftingCompass className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Deploy & Integrate',
    description: 'Our expert team develops and deploys the solution, ensuring seamless integration with your existing systems. We follow agile methodologies for efficient development and rigorous testing for quality assurance.',
    icon: <Rocket className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Iterate & Optimize',
    description: 'Post-launch, we continuously monitor performance, gather user feedback, and provide ongoing support. We believe in iterative improvement to ensure your digital solution evolves with your business and market demands.',
    icon: <Repeat className="h-8 w-8 text-primary" />,
  },
];

export default function TransformationGuidePage() {
  return (
    <PageContainer>
      <section className="text-center py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Your Journey to Digital Excellence</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Navigating digital transformation can be complex. Our proven workflow ensures a smooth and effective process, guiding you from initial assessment to ongoing optimization.
        </p>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-12">
            {transformationSteps.map((step, index) => (
              <div key={step.title} className="flex items-start gap-x-6 sm:gap-x-8">
                {/* Left Column: Progress Indicator */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 border-primary bg-primary text-primary-foreground font-semibold text-lg sm:text-xl z-10"
                  >
                    {index + 1}
                  </div>
                  {index < transformationSteps.length - 1 && (
                    <div className="mt-1 w-0.5 flex-grow bg-border"></div>
                  )}
                </div>

                {/* Right Column: Card Content */}
                <div className="flex-grow mt-0 sm:mt-1"> {/* Adjusted mt for better alignment */}
                  <TransformationStepCard
                    title={step.title}
                    description={step.description}
                    icon={step.icon}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center bg-secondary/30 p-8 md:p-12 rounded-lg shadow-lg">
          <div>
            <h2 className="text-3xl font-bold mb-6">Partner with Us for Transformation</h2>
            <p className="text-muted-foreground mb-6">
              At Ciaodigi Navigator, we're committed to being more than just a service provider. We're your trusted partner in navigating the ever-evolving digital landscape. Our structured approach, combined with our technical expertise and creative thinking, ensures your digital transformation initiatives are successful and sustainable.
            </p>
            <p className="text-muted-foreground">
              Ready to embark on your transformation journey? Let's discuss how we can tailor our process to meet your unique business needs and aspirations.
            </p>
          </div>
          <div>
            <Image
              src="https://placehold.co/600x450.png"
              alt="Digital transformation concept"
              width={600}
              height={450}
              className="rounded-lg shadow-xl"
              data-ai-hint="digital transformation"
            />
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

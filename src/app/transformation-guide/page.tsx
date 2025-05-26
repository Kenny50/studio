
import type { Metadata } from 'next';
import PageContainer from '@/components/shared/PageContainer';
import TransformationStepCard from '@/components/features/transformation/TransformationStepCard';
import { ClipboardList, ListChecks, DraftingCompass, Rocket, Repeat, ArrowDown } from 'lucide-react';
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
        <div className="relative max-w-4xl mx-auto">
          {/* Desktop Timeline - now starts at lg */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-border/50 transform -translate-x-1/2"></div>
          
          {/* space-y-16 applies up to lg, then lg:space-y-0 */}
          <div className="space-y-16 lg:space-y-0">
            {transformationSteps.map((step, index) => (
              // grid, grid-cols-2, gap-8 now apply from lg. mb-8 applies up to lg.
              <div key={step.title} className="lg:grid lg:grid-cols-2 lg:gap-8 items-center relative mb-8 lg:mb-0">
                {/* Icon and Line for Mobile/Tablet - now hidden from lg upwards */}
                {index < transformationSteps.length -1 && (
                  <div className="lg:hidden flex justify-center my-4">
                     <ArrowDown className="h-8 w-8 text-primary/50" />
                  </div>
                )}

                {/* Content Card - col-start and row-start now apply from lg */}
                {/* Odd steps (index 0, 2, 4 -> stepNumber 1, 3, 5) go to col-start-1 (left) */}
                {/* Even steps (index 1, 3 -> stepNumber 2, 4) go to col-start-2 (right) */}
                <div className={`lg:col-start-${index % 2 === 0 ? 1 : 2} lg:row-start-1`}>
                  <TransformationStepCard
                    stepNumber={index + 1}
                    title={step.title}
                    description={step.description}
                    icon={step.icon}
                  />
                </div>

                {/* Connecting Dot for Desktop - now shown from lg upwards */}
                <div className="hidden lg:flex absolute top-1/2 left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 border-4 border-background"></div>
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

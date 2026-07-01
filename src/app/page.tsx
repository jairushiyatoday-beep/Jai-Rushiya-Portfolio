import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/hero/HeroSection';

// Dynamic imports for below-the-fold sections (code splitting)
const StorySection = dynamic(() => import('@/components/story/StorySection'));
const StatsSection = dynamic(() => import('@/components/stats/StatsSection'));
const ProjectsSection = dynamic(() => import('@/components/projects/ProjectsSection'));
const SkillsSection = dynamic(() => import('@/components/skills/SkillsSection'));
const AchievementsSection = dynamic(() => import('@/components/achievements/AchievementsSection'));
const ExperienceSection = dynamic(() => import('@/components/experience/ExperienceSection'));
const EducationSection = dynamic(() => import('@/components/education/EducationSection'));
const CertificationsSection = dynamic(() => import('@/components/certifications/CertificationsSection'));
const GitHubSection = dynamic(() => import('@/components/github/GitHubSection'));
const TestimonialsSection = dynamic(() => import('@/components/testimonials/TestimonialsSection'));
const ContactSection = dynamic(() => import('@/components/contact/ContactSection'));
const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#030014]">
      <Navbar />
      <HeroSection />
      <StorySection />
      <StatsSection />
      <ProjectsSection />
      <SkillsSection />
      <AchievementsSection />
      <ExperienceSection />
      <EducationSection />
      <CertificationsSection />
      <GitHubSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

import { Metadata } from "next"
import { PageTransition } from "@/components/shared/PageTransition"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { Hero } from "@/components/home/Hero"
import { StatsBar } from "@/components/home/StatsBar"
import { ResearchFocusGrid } from "@/components/home/ResearchFocusGrid"
import { FeaturedContent } from "@/components/home/FeaturedContent"
import { VideoPreview } from "@/components/home/VideoPreview"
import { NewsletterSignup } from "@/components/home/NewsletterSignup"
import { BooksShowcase } from "@/components/home/BooksShowcase"
import { SpeakingMedia } from "@/components/home/SpeakingMedia"
import homeConfig from "@/config/pages/home.json"

export function generateMetadata(): Metadata {
  return {
    title: homeConfig.seo.title,
    description: homeConfig.seo.description,
    openGraph: {
      title: homeConfig.seo.title,
      description: homeConfig.seo.description,
      images: homeConfig.seo.ogImage ? [{ url: homeConfig.seo.ogImage }] : [],
    },
  }
}

export default function HomePage() {
  return (
    <PageTransition>
      {/* 1. Hero — Introduction & identity */}
      <Hero config={homeConfig.hero} />

      {/* 2. Stats — Credibility at a glance */}
      <AnimatedSection>
        <StatsBar items={homeConfig.stats} />
      </AnimatedSection>

      {/* 3. Research Focus — What I study */}
      <ResearchFocusGrid
        sectionLabel={homeConfig.researchFocus.sectionLabel}
        sectionTitle={homeConfig.researchFocus.sectionTitle}
        items={homeConfig.researchFocus.items}
      />

      {/* 4. Featured Publications — Scholarly output */}
      <FeaturedContent
        sectionTitle={homeConfig.featuredContent.sectionTitle}
        description={homeConfig.featuredContent.description}
        items={homeConfig.featuredContent.items}
      />

      {/* 5. Books Showcase — Published works */}
      <BooksShowcase
        sectionTitle={homeConfig.booksShowcase.sectionTitle}
        items={homeConfig.booksShowcase.items}
      />

      {/* 6. Speaking & Media — Reach and presence */}
      <SpeakingMedia
        sectionTitle={homeConfig.speakingMedia.sectionTitle}
        description={homeConfig.speakingMedia.description}
        items={homeConfig.speakingMedia.items}
      />

      {/* 7. Video Library — Multimedia content */}
      <VideoPreview
        sectionTitle={homeConfig.latestVideos.sectionTitle}
        description={homeConfig.latestVideos.description}
        items={homeConfig.latestVideos.items}
      />

      {/* 8. Newsletter — Connect & subscribe */}
      <NewsletterSignup
        title={homeConfig.newsletterCta.title}
        description={homeConfig.newsletterCta.description}
        buttonLabel={homeConfig.newsletterCta.buttonLabel}
        href={homeConfig.newsletterCta.href}
      />
    </PageTransition>
  )
}

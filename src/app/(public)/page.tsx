import { Metadata } from "next"
import homeConfig from "@/config/pages/home.json"
import { SiteHeader } from "@/components/home/SiteHeader"
import { HeroSection } from "@/components/home/HeroSection"
import { QuoteSection } from "@/components/home/QuoteSection"
import { EssaysSection } from "@/components/home/EssaysSection"
import { BooksSection } from "@/components/home/BooksSection"
import { VideosPodcastSection } from "@/components/home/VideosPodcastSection"
import { ArchiveCtaSection } from "@/components/home/ArchiveCtaSection"
import { SiteFooter } from "@/components/home/SiteFooter"

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
    <main className="min-h-screen bg-cream text-dark">
      <SiteHeader />
      <div className="pt-24" /> {/* Offset for fixed header */}
      <HeroSection />
      <QuoteSection />
      <EssaysSection />
      <BooksSection />
      <VideosPodcastSection />
      <ArchiveCtaSection />
      <SiteFooter />
    </main>
  )
}

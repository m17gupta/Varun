import Image from "next/image"
import Link from "next/link"
import { videos, podcasts } from "@/data/home"

export function VideosPodcastSection() {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto grid max-w-[1400px] lg:grid-cols-2">
        {/* Video side */}
        <div className="px-6 py-20 sm:py-28 lg:border-r lg:border-border/60 lg:px-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">
            03 / The lectures
          </p>
          <h2 className="mt-3 font-serif text-4xl text-dark sm:text-5xl">
            Video
          </h2>
          <div className="mt-10 space-y-6">
            {videos.map((video) => (
              <Link
                key={video.title}
                href={video.href}
                className="group grid grid-cols-[88px_1fr] items-center gap-5"
              >
                <div className="relative aspect-[1.25/1] overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={video.image}
                    alt=""
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="88px"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    {video.meta}
                  </p>
                  <p className="mt-1.5 font-serif text-lg leading-snug text-dark transition-colors duration-300 group-hover:text-tan">
                    {video.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/videos"
            className="mt-10 inline-flex text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 hover:text-dark"
          >
            All lectures
          </Link>
        </div>

        {/* Podcast side */}
        <div className="bg-muted px-6 py-20 sm:py-28 lg:px-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">
            04 / The conversations
          </p>
          <h2 className="mt-3 font-serif text-4xl text-dark sm:text-5xl">
            The Podcast
          </h2>
          <div className="mt-10 space-y-6">
            {podcasts.map((title, index) => (
              <Link
                key={title}
                href="/podcast"
                className="group grid grid-cols-[52px_1fr] items-center gap-5"
              >
                <span className="flex aspect-square items-center justify-center rounded-full bg-dark text-sm text-cream transition-all duration-300 group-hover:scale-105">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    Episode {index + 1}
                  </span>
                  <span className="mt-1.5 block font-serif text-lg leading-snug text-dark transition-colors duration-300 group-hover:text-tan">
                    {title}
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/podcast"
            className="mt-10 inline-flex text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 hover:text-dark"
          >
            All episodes
          </Link>
        </div>
      </div>
    </section>
  )
}

import Image from "next/image"
import Link from "next/link"
import { videos, podcasts } from "@/data/home"

export function VideosPodcastSection() {
  return (
    <section className="border-b border-[#ded6ca]">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        <div className="px-5 py-16 sm:px-8 lg:border-r lg:border-[#ded6ca] lg:px-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8c8478]">
            03 / The lectures
          </p>
          <h2 className="mt-3 font-serif text-4xl text-[#2a2722] sm:text-5xl">
            Video
          </h2>
          <div className="mt-8 space-y-5">
            {videos.map((video) => (
              <Link
                key={video.title}
                href={video.href}
                className="group grid grid-cols-[76px_1fr] items-center gap-5"
              >
                <div className="relative aspect-[1.25/1] overflow-hidden bg-[#e4ded3]">
                  <Image
                    src={video.image}
                    alt=""
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="76px"
                  />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8c8478]">
                    {video.meta}
                  </p>
                  <p className="mt-1 font-serif text-lg leading-snug text-[#3a352e]">
                    {video.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/videos"
            className="mt-8 inline-flex text-[10px] font-bold uppercase tracking-[0.2em] text-[#7f766b]"
          >
            All lectures
          </Link>
        </div>

        <div className="bg-[#efebe3] px-5 py-16 sm:px-8 lg:px-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8c8478]">
            04 / The conversations
          </p>
          <h2 className="mt-3 font-serif text-4xl text-[#2a2722] sm:text-5xl">
            The Podcast
          </h2>
          <div className="mt-8 space-y-5">
            {podcasts.map((title, index) => (
              <Link
                key={title}
                href="/podcast"
                className="group grid grid-cols-[46px_1fr] items-center gap-5"
              >
                <span className="flex aspect-square items-center justify-center bg-[#191714] text-sm text-[#e5d8bd]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-[#8c8478]">
                    Episode {index + 1}
                  </span>
                  <span className="mt-1 block font-serif text-lg leading-snug text-[#3a352e]">
                    {title}
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/podcast"
            className="mt-8 inline-flex text-[10px] font-bold uppercase tracking-[0.2em] text-[#7f766b]"
          >
            All episodes
          </Link>
        </div>
      </div>
    </section>
  )
}

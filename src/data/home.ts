export interface Essay {
  title: string
  category: string
  readTime: string
  image: string
  href: string
  excerpt: string
}

export interface Book {
  title: string
  label: string
  image: string
  href: string
  excerpt: string
}

export interface Video {
  title: string
  meta: string
  image: string
  href: string
}

export const essays: Essay[] = [
  {
    title: "The Dice Game and the Nature of Dharma",
    category: "Narrative Analysis",
    readTime: "12 min",
    image: "/images/home/article-1.png",
    href: "/articles/dice-game-dharma",
    excerpt:
      "A close reading of the Sabha Parva and the moral pressure that turns duty into a living question.",
  },
  {
    title: "Dharma's Many Faces",
    category: "Philosophy",
    readTime: "9 min",
    image: "/images/home/article-2.png",
    href: "/articles/dharma-philosophical-inquiry",
    excerpt:
      "How the epic refuses simple rules, and why its ethical framework still speaks to modern dilemmas.",
  },
  {
    title: "Kurukshetra: War, Memory and Consequence",
    category: "History",
    readTime: "14 min",
    image: "/images/home/article-3.png",
    href: "/articles/kurukshetra-war-memory",
    excerpt:
      "Reading the war as history, memory, and a meditation on the cost of rightful action.",
  },
  {
    title: "Women in the Mahabharata: Beyond the Silences",
    category: "Character Studies",
    readTime: "11 min",
    image: "/images/home/article-4.png",
    href: "/articles/women-mahabharata",
    excerpt:
      "Draupadi, Kunti, and Gandhari as shapers of the epic's moral and political imagination.",
  },
  {
    title: "Geographical Correlates of the Epic",
    category: "Research",
    readTime: "16 min",
    image: "/images/home/article-5.png",
    href: "/articles/geographical-correlates",
    excerpt:
      "A multidisciplinary map of rivers, kingdoms, journeys, and remembered landscapes.",
  },
  {
    title: "Krishna: Strategist, Teacher, Witness",
    category: "Meaning",
    readTime: "10 min",
    image: "/images/home/article-6.png",
    href: "/articles/krishna-divine-strategist",
    excerpt:
      "The many roles of Krishna, from diplomat and charioteer to the voice of the Gita.",
  },
]

export const books: Book[] = [
  {
    title: "The Mahabharata: A Modern Reader's Companion",
    label: "Book 01",
    image: "/images/book-companion.png",
    href: "/books/mahabharata-companion",
    excerpt:
      "A guide to the epic's characters, philosophical themes, and layered narrative structure.",
  },
  {
    title: "Dharma in Dialogue",
    label: "Book 02",
    image: "/images/book-dharma.png",
    href: "/books/dharma-in-dialogue",
    excerpt:
      "Ethical frameworks from the Mahabharata and their relevance to contemporary moral life.",
  },
  {
    title: "Women in the Mahabharata",
    label: "Essay Series",
    image: "/images/article-openbook.png",
    href: "/research/women-mahabharata",
    excerpt:
      "Agency, grief, defiance, and the women who redirect the epic's deepest questions.",
  },
  {
    title: "Geography of the Epic Imagination",
    label: "Research",
    image: "/images/article-architecture.png",
    href: "/research/geographical-correlates",
    excerpt:
      "A study of place, memory, routes, and cultural landscapes inside the Mahabharata.",
  },
]

export const videos: Video[] = [
  {
    title: "The Mahabharata War: Myth or Reality?",
    meta: "Lecture / 45 min",
    image: "/images/article-manuscript.png",
    href: "/videos",
  },
  {
    title: "Understanding Dharma: Lessons from the Epic",
    meta: "Practice / 38 min",
    image: "/images/article-openbook.png",
    href: "/videos",
  },
  {
    title: "The Women of the Mahabharata",
    meta: "Talk / 52 min",
    image: "/images/article-landscape.png",
    href: "/videos",
  },
]

export const podcasts: string[] = [
  "Decoding the Mahabharata for modern readers",
  "Dharma, leadership, and difficult choices",
  "Memory, place, and the architecture of the epic",
]

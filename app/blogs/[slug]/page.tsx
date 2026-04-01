import { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlogPostContent } from "./content"

// Mock blog post data
const posts: Record<string, {
  title: string
  excerpt: string
  category: string
  author: { name: string; role: string; bio: string; initials: string }
  date: string
  readTime: string
  content: string[]
}> = {
  "10-tips-grow-creator-brand": {
    title: "10 Tips to Grow Your Creator Brand in 2024",
    excerpt: "Discover proven strategies that top creators use to build their personal brand.",
    category: "Creator Tips",
    author: { name: "Maya Thompson", role: "Head of Marketing", bio: "Maya has 10+ years of experience in digital marketing and creator economy strategy.", initials: "MT" },
    date: "Mar 28, 2024",
    readTime: "5 min",
    content: [
      "Building a successful creator brand in 2024 requires more than just great content. It demands strategy, consistency, and the right tools to amplify your reach.",
      "## 1. Define Your Niche Clearly",
      "The most successful creators aren't trying to appeal to everyone. They've carved out a specific niche where they can become the go-to authority. Whether it's sustainable fashion, indie game reviews, or plant-based cooking — specificity wins.",
      "## 2. Invest in Your Bio Page",
      "Your bio page is often the first impression brands and followers get. Make it count with a professional, customizable page that showcases your best work, stats, and personality. Tools like ProVibe make this effortless.",
      "## 3. Engage Authentically",
      "Respond to comments, host live sessions, and create community-driven content. Authentic engagement builds loyalty that algorithms can't replicate.",
      "## 4. Diversify Your Platforms",
      "Don't put all your eggs in one basket. Cross-post content, adapt it for different platforms, and build an email list as your owned audience.",
      "## 5. Track Your Analytics",
      "What gets measured gets improved. Regularly review your engagement rates, follower growth, and content performance to understand what resonates.",
      "## 6. Collaborate with Other Creators",
      "Collaborations expose you to new audiences and build relationships within the creator community. Look for creators with complementary niches.",
      "## 7. Be Consistent with Posting",
      "Consistency builds trust. Create a content calendar and stick to it. Quality matters more than quantity, but regularity matters too.",
      "## 8. Optimize for Discovery",
      "Use relevant hashtags, SEO-friendly titles, and trend-aware content to increase your discoverability across platforms.",
      "## 9. Build Brand Partnerships Early",
      "Don't wait until you have millions of followers to approach brands. Micro-creators with engaged audiences are highly valued. Platforms like ProVibe connect you with brands matching your niche.",
      "## 10. Stay True to Your Voice",
      "Ultimately, your unique perspective is what sets you apart. Don't chase trends at the expense of authenticity. Your audience follows you for YOU.",
    ],
  },
  "brand-partnership-guide": {
    title: "The Ultimate Guide to Brand Partnerships",
    excerpt: "Everything you need to know about landing your first brand deal.",
    category: "Brand Partnerships",
    author: { name: "Alex Rivera", role: "CEO & Co-founder", bio: "Alex founded ProVibe to bridge the gap between creators and brands.", initials: "AR" },
    date: "Mar 25, 2024",
    readTime: "8 min",
    content: [
      "Brand partnerships are one of the most lucrative opportunities for creators. Here's your complete guide to getting started.",
      "## Understanding Brand Partnerships",
      "A brand partnership is a collaboration between a content creator and a company. The brand gets authentic promotion to your engaged audience, and you get compensated — often significantly.",
      "## How to Prepare",
      "Before reaching out to brands, make sure your creator profile is polished. Have clear analytics, a professional bio page, and examples of previous collaborations or high-quality content.",
      "## Where to Find Opportunities",
      "Platforms like ProVibe use smart matching to connect you with brands that align with your niche. This removes the awkward cold-outreach phase and puts relevant opportunities in front of you.",
      "## Negotiating Your First Deal",
      "Know your worth. Research industry rates for your follower count and engagement level. Don't undervalue your work, but be realistic about expectations for first partnerships.",
    ],
  },
}

// Generate static params for all known posts
export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  // Note: In Next.js 16, params is a Promise
  const { slug } = await params
  const post = posts[slug]
  if (!post) return { title: "Post Not Found" }
  return {
    title: `${post.title} - ProVibe Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts[slug]

  if (!post) {
    notFound()
  }

  return <BlogPostContent post={post} slug={slug} />
}

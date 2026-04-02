import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const categories = [
    { name: "Monetization", slug: "monetization" },
    { name: "Growth", slug: "growth" },
    { name: "Brand Deals", slug: "brand-deals" },
    { name: "Tools & Tips", slug: "tools-tips" },
    { name: "Platform Updates", slug: "platform-updates" },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }

  console.log("Seeded default categories")

  // Look up category IDs
  const growthCat = await prisma.category.findUnique({ where: { slug: "growth" } })
  const brandDealsCat = await prisma.category.findUnique({ where: { slug: "brand-deals" } })
  const toolsTipsCat = await prisma.category.findUnique({ where: { slug: "tools-tips" } })
  const platformUpdatesCat = await prisma.category.findUnique({ where: { slug: "platform-updates" } })
  const monetizationCat = await prisma.category.findUnique({ where: { slug: "monetization" } })

  const blogPosts = [
    {
      slug: "10-tips-grow-creator-brand",
      title: "10 Tips to Grow Your Creator Brand in 2024",
      excerpt: "Discover proven strategies that top creators use to build their personal brand and attract loyal followers.",
      category_id: growthCat!.id,
      status: "PUBLISHED" as const,
      cover_image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=400&fit=crop",
      read_time: "5 min",
      featured: true,
      published_at: new Date("2024-03-28"),
      content: `<p>Building a successful creator brand in 2024 requires more than just great content. It demands strategy, consistency, and the right tools to amplify your reach.</p>
<h2>1. Define Your Niche Clearly</h2>
<p>The most successful creators aren't trying to appeal to everyone. They've carved out a specific niche where they can become the go-to authority. Whether it's sustainable fashion, indie game reviews, or plant-based cooking — specificity wins.</p>
<h2>2. Invest in Your Bio Page</h2>
<p>Your bio page is often the first impression brands and followers get. Make it count with a professional, customizable page that showcases your best work, stats, and personality. Tools like ProVibe make this effortless.</p>
<h2>3. Engage Authentically</h2>
<p>Respond to comments, host live sessions, and create community-driven content. Authentic engagement builds loyalty that algorithms can't replicate.</p>
<h2>4. Diversify Your Platforms</h2>
<p>Don't put all your eggs in one basket. Cross-post content, adapt it for different platforms, and build an email list as your owned audience.</p>
<h2>5. Track Your Analytics</h2>
<p>What gets measured gets improved. Regularly review your engagement rates, follower growth, and content performance to understand what resonates.</p>
<h2>6. Collaborate with Other Creators</h2>
<p>Collaborations expose you to new audiences and build relationships within the creator community. Look for creators with complementary niches.</p>
<h2>7. Be Consistent with Posting</h2>
<p>Consistency builds trust. Create a content calendar and stick to it. Quality matters more than quantity, but regularity matters too.</p>
<h2>8. Optimize for Discovery</h2>
<p>Use relevant hashtags, SEO-friendly titles, and trend-aware content to increase your discoverability across platforms.</p>
<h2>9. Build Brand Partnerships Early</h2>
<p>Don't wait until you have millions of followers to approach brands. Micro-creators with engaged audiences are highly valued. Platforms like ProVibe connect you with brands matching your niche.</p>
<h2>10. Stay True to Your Voice</h2>
<p>Ultimately, your unique perspective is what sets you apart. Don't chase trends at the expense of authenticity. Your audience follows you for YOU.</p>`,
    },
    {
      slug: "brand-partnership-guide",
      title: "The Ultimate Guide to Brand Partnerships",
      excerpt: "Everything you need to know about landing your first brand deal and building long-term partnerships.",
      category_id: brandDealsCat!.id,
      status: "PUBLISHED" as const,
      cover_image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
      read_time: "8 min",
      featured: false,
      published_at: new Date("2024-03-25"),
      content: `<p>Brand partnerships are one of the most lucrative opportunities for creators. Here's your complete guide to getting started.</p>
<h2>Understanding Brand Partnerships</h2>
<p>A brand partnership is a collaboration between a content creator and a company. The brand gets authentic promotion to your engaged audience, and you get compensated — often significantly.</p>
<h2>How to Prepare</h2>
<p>Before reaching out to brands, make sure your creator profile is polished. Have clear analytics, a professional bio page, and examples of previous collaborations or high-quality content.</p>
<h2>Where to Find Opportunities</h2>
<p>Platforms like ProVibe use smart matching to connect you with brands that align with your niche. This removes the awkward cold-outreach phase and puts relevant opportunities in front of you.</p>
<h2>Negotiating Your First Deal</h2>
<p>Know your worth. Research industry rates for your follower count and engagement level. Don't undervalue your work, but be realistic about expectations for first partnerships.</p>`,
    },
    {
      slug: "bio-page-optimization",
      title: "Optimize Your Bio Page for Maximum Conversions",
      excerpt: "Learn how to design a bio page that converts visitors into followers, subscribers, and customers.",
      category_id: toolsTipsCat!.id,
      status: "PUBLISHED" as const,
      cover_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      read_time: "6 min",
      featured: false,
      published_at: new Date("2024-03-22"),
      content: `<p>Your bio page is the single most important piece of real estate you own as a creator. Here's how to make it work harder for you.</p>
<h2>First Impressions Matter</h2>
<p>Visitors decide within seconds whether to stay or leave. A clean, professional layout with a clear value proposition keeps them engaged.</p>
<h2>Optimize Your Call-to-Action</h2>
<p>Every bio page needs a clear primary action — whether that's subscribing, following, or purchasing. Make it prominent and compelling.</p>`,
    },
    {
      slug: "creator-events-networking",
      title: "How Creator Events Can Transform Your Career",
      excerpt: "From local meetups to industry conferences — why in-person networking is still king for creators.",
      category_id: growthCat!.id,
      status: "PUBLISHED" as const,
      cover_image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
      read_time: "4 min",
      featured: false,
      published_at: new Date("2024-03-18"),
      content: `<p>In an increasingly digital world, in-person creator events remain one of the most powerful ways to grow your career and build meaningful connections.</p>
<h2>Why In-Person Still Wins</h2>
<p>Digital connections are great, but nothing replaces the depth of an in-person conversation. Creator events accelerate relationship-building in ways that DMs simply can't.</p>`,
    },
    {
      slug: "monetization-strategies",
      title: "5 Monetization Strategies Beyond Sponsorships",
      excerpt: "Diversify your income with these proven revenue streams that top creators swear by.",
      category_id: monetizationCat!.id,
      status: "PUBLISHED" as const,
      cover_image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=400&fit=crop",
      read_time: "7 min",
      featured: false,
      published_at: new Date("2024-03-15"),
      content: `<p>Sponsorships are great, but relying on a single revenue stream is risky. Here are five proven ways to diversify your creator income.</p>
<h2>1. Digital Products</h2>
<p>E-books, templates, presets, and courses let you monetize your expertise at scale with minimal ongoing effort.</p>
<h2>2. Membership Communities</h2>
<p>Platforms like Patreon or Discord-based communities offer recurring revenue from your most engaged fans.</p>
<h2>3. Affiliate Marketing</h2>
<p>Recommend products you genuinely use and earn a commission on every sale. It's passive income that compounds over time.</p>
<h2>4. Consulting & Coaching</h2>
<p>Your expertise is valuable. Offer one-on-one coaching or group consulting sessions for aspiring creators or businesses.</p>
<h2>5. Merchandise</h2>
<p>Print-on-demand services make it easy to create and sell branded merchandise with zero inventory risk.</p>`,
    },
    {
      slug: "provibe-spring-update",
      title: "ProVibe Spring 2024 Update: What's New",
      excerpt: "Exciting new features including AI-powered brand matching, event hosting tools, and redesigned analytics.",
      category_id: platformUpdatesCat!.id,
      status: "PUBLISHED" as const,
      cover_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      read_time: "3 min",
      featured: false,
      published_at: new Date("2024-03-12"),
      content: `<p>We've been hard at work building features that make ProVibe even more powerful for creators. Here's what's new this spring.</p>
<h2>AI-Powered Brand Matching</h2>
<p>Our new matching algorithm uses AI to connect you with brands that perfectly align with your content, audience, and values.</p>
<h2>Event Hosting Tools</h2>
<p>Create, promote, and manage creator events directly from your ProVibe dashboard — from intimate meetups to large conferences.</p>
<h2>Redesigned Analytics</h2>
<p>A completely refreshed analytics experience with clearer insights, custom date ranges, and exportable reports.</p>`,
    },
    {
      slug: "content-calendar-template",
      title: "Free Content Calendar Template for Creators",
      excerpt: "Stay organized and consistent with our free content planning template used by 1000+ creators.",
      category_id: toolsTipsCat!.id,
      status: "PUBLISHED" as const,
      cover_image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&h=400&fit=crop",
      read_time: "4 min",
      featured: false,
      published_at: new Date("2024-03-08"),
      content: `<p>Consistency is one of the most important factors in creator success. A content calendar helps you plan ahead and never miss a beat.</p>
<h2>Why You Need a Content Calendar</h2>
<p>Without a plan, it's easy to fall into the trap of sporadic posting. A calendar gives you structure while leaving room for spontaneity.</p>`,
    },
    {
      slug: "brand-collaboration-mistakes",
      title: "7 Brand Collaboration Mistakes to Avoid",
      excerpt: "Common pitfalls that new creators face when working with brands and how to navigate them.",
      category_id: brandDealsCat!.id,
      status: "PUBLISHED" as const,
      cover_image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&h=400&fit=crop",
      read_time: "6 min",
      featured: false,
      published_at: new Date("2024-03-05"),
      content: `<p>Brand collaborations can be incredibly rewarding, but they can also go wrong if you're not careful. Here are seven mistakes to avoid.</p>
<h2>1. Not Reading the Contract</h2>
<p>Always read every word of a brand deal contract. Pay attention to exclusivity clauses, usage rights, and payment terms.</p>
<h2>2. Undervaluing Your Work</h2>
<p>New creators often accept lowball offers. Research market rates and negotiate confidently.</p>`,
    },
    {
      slug: "building-community-online",
      title: "Building a Loyal Community from Scratch",
      excerpt: "The secrets behind creators who've built engaged, passionate communities around their content.",
      category_id: growthCat!.id,
      status: "PUBLISHED" as const,
      cover_image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop",
      read_time: "5 min",
      featured: false,
      published_at: new Date("2024-03-01"),
      content: `<p>A loyal community is the foundation of a sustainable creator career. Here's how to build one from the ground up.</p>
<h2>Start with Your Why</h2>
<p>People rally around purpose, not just content. Define what your community stands for and communicate it clearly.</p>
<h2>Create Spaces for Connection</h2>
<p>Whether it's a Discord server, comment section, or live stream — give your audience places to connect with you and each other.</p>`,
    },
    {
      slug: "analytics-guide-creators",
      title: "Understanding Your Analytics: A Creator's Guide",
      excerpt: "Which metrics actually matter and how to use data to grow your audience strategically.",
      category_id: toolsTipsCat!.id,
      status: "PUBLISHED" as const,
      cover_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      read_time: "8 min",
      featured: false,
      published_at: new Date("2024-02-26"),
      content: `<p>Analytics can feel overwhelming, but understanding the right metrics is key to strategic growth as a creator.</p>
<h2>Vanity Metrics vs. Actionable Metrics</h2>
<p>Follower count looks impressive, but engagement rate, click-through rate, and conversion rate tell you what's actually working.</p>
<h2>Setting Up Proper Tracking</h2>
<p>Use UTM parameters, link tracking, and platform-native analytics to understand where your traffic and conversions come from.</p>`,
    },
  ]

  for (const post of blogPosts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        category_id: post.category_id,
        status: post.status,
        cover_image: post.cover_image,
        read_time: post.read_time,
        featured: post.featured,
        published_at: post.published_at,
        content: post.content,
      },
      create: post,
    })
  }

  console.log("Seeded blog posts")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())

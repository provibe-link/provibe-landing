import Link from "next/link"
import { GrainOverlay } from "@/components/shared/grain-overlay"

const LAST_UPDATED = "April 10, 2026"

export function TermsContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/4 h-[420px] w-[520px] rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute right-0 top-20 h-[260px] w-[360px] rounded-full bg-primary/5 blur-[100px]" />
        </div>
        <GrainOverlay className="-z-10" />

        <div className="container mx-auto max-w-4xl px-6 text-center">
          <p className="mb-3 font-mono text-sm font-medium uppercase tracking-widest text-primary">
            Legal
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Terms &amp; <span className="gradient-text">Conditions</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            These Terms govern your use of ProVibe — the all-in-one creator
            business platform that helps creators monetize, helps brands
            discover verified talent, and helps event organizers connect with
            creators and sponsors.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto max-w-3xl px-6">
          <article className="space-y-10 text-[15px] leading-relaxed text-muted-foreground">
            <Block title="1. Agreement to Terms">
              <p>
                By creating an account or otherwise using ProVibe, you agree
                to these Terms &amp; Conditions and our{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-primary hover:underline"
                >
                  Privacy Policy
                </Link>
                . If you do not agree, please do not use the platform.
              </p>
            </Block>

            <Block title="2. Who Can Use ProVibe">
              <p>
                You must be at least 13 years old (or the minimum age required
                in your country) and legally able to enter into a contract.
                If you use ProVibe on behalf of a brand, agency, or
                organization, you confirm you have the authority to bind that
                entity to these Terms.
              </p>
            </Block>

            <Block title="3. Your Account">
              <p>
                You are responsible for your account, the information you
                provide, and all activity that happens under it. Keep your
                login credentials secure and notify us immediately if you
                suspect unauthorized access.
              </p>
            </Block>

            <Block title="4. How You Can Use ProVibe">
              <p>ProVibe supports three types of users:</p>
              <List>
                <li>
                  <strong className="text-foreground">Creators</strong> can
                  build a creator storefront, add promotional content, sell
                  products, offer paid sessions and bookings, manage brand
                  deals and collaborations, and promote events and meetups.
                </li>
                <li>
                  <strong className="text-foreground">Brands</strong> can
                  discover creators, filter by category, language, followers,
                  niche and location, review fake-follower risk and audience
                  quality, run campaigns, collect responses and leads, and
                  manage collaborations.
                </li>
                <li>
                  <strong className="text-foreground">
                    Event organizers
                  </strong>{" "}
                  can host events and meetups, invite creators, find sponsors
                  and brand partners, and manage creator-driven event growth.
                </li>
              </List>
              <p>
                You agree to use ProVibe only for lawful, honest business
                activities consistent with the product plan and these Terms.
              </p>
            </Block>

            <Block title="5. Acceptable Use">
              <p>You must not:</p>
              <List>
                <li>
                  Post content that is illegal, misleading, harmful,
                  infringing, hateful, or sexually exploitative.
                </li>
                <li>
                  Misrepresent your identity, audience, engagement, or
                  affiliation with any brand or creator.
                </li>
                <li>
                  Use bots, fake followers, fraudulent engagement, or any
                  technique that undermines ProVibe’s verification and
                  audience-quality checks.
                </li>
                <li>
                  Scrape, reverse engineer, or interfere with the security or
                  integrity of the platform.
                </li>
                <li>
                  Use ProVibe to spam, harass, or send unsolicited messages to
                  other users.
                </li>
                <li>
                  Circumvent ProVibe to complete paid deals, bookings, or
                  sponsorships introduced through the platform in ways that
                  violate these Terms.
                </li>
              </List>
            </Block>

            <Block title="6. Creator Content">
              <p>
                You keep ownership of the content you upload — profile
                information, products, promotional media, session details,
                event listings. By publishing it on ProVibe, you grant us a
                worldwide, non-exclusive, royalty-free license to host,
                display, distribute, and promote that content solely to
                operate, improve, and market the platform and your public
                pages.
              </p>
              <p>
                You are responsible for making sure you have the rights to
                everything you publish, and that it complies with applicable
                laws and third-party terms (including the social platforms you
                connect).
              </p>
            </Block>

            <Block title="7. Sales, Bookings & Payments">
              <p>
                Creators can sell products, offer paid sessions, and accept
                bookings through ProVibe. Payments are processed by
                third-party payment providers. You agree to:
              </p>
              <List>
                <li>
                  Provide accurate pricing, descriptions, availability, and
                  delivery terms.
                </li>
                <li>
                  Fulfill orders, bookings, and sessions you accept, and
                  handle refunds in line with your published policy and
                  applicable law.
                </li>
                <li>
                  Pay any applicable fees, taxes, and payment processor
                  charges.
                </li>
                <li>
                  Comply with the payment provider’s terms in addition to
                  these Terms.
                </li>
              </List>
              <p>
                ProVibe is not a party to transactions between creators and
                their customers, brands, or event organizers. We are a
                facilitator, not a buyer, seller, or employer.
              </p>
            </Block>

            <Block title="8. Brand Campaigns & Collaborations">
              <p>
                Brands may discover creators, invite them to campaigns, and
                collect responses, leads, and inputs through ProVibe. Creators
                and brands are responsible for agreeing on deliverables,
                deadlines, usage rights, disclosures (including any required
                “ad” or “sponsored” labels), and compensation. ProVibe may
                provide tooling to manage collaborations, but the legal
                agreement sits between the creator and the brand.
              </p>
            </Block>

            <Block title="9. Events & Meetups">
              <p>
                Event organizers are responsible for their events — including
                safety, permits, ticketing, attendee communications, sponsor
                commitments, and honoring creator invitations. Creators are
                responsible for showing up as agreed and fulfilling promotion
                commitments. ProVibe is not responsible for the conduct or
                outcome of any offline or online event.
              </p>
            </Block>

            <Block title="10. Verification & Audience Quality">
              <p>
                ProVibe may run verification checks and audience-quality
                signals (including fake-follower risk) to help brands discover
                trustworthy talent. These signals are provided as-is and are
                intended as one of several inputs into a brand’s decision — not
                as a guarantee of performance or audience behavior.
              </p>
            </Block>

            <Block title="11. Fees">
              <p>
                Some ProVibe features may be free, while others may require a
                paid plan or take a small fee on transactions, bookings, or
                brand deals. We will clearly show any fees before you commit
                to a paid feature. We may change fees going forward with
                reasonable notice.
              </p>
            </Block>

            <Block title="12. Intellectual Property">
              <p>
                ProVibe, including the platform, branding, design, and
                software, is owned by us and protected by applicable laws.
                These Terms do not grant you any rights in ProVibe’s
                intellectual property beyond the limited right to use the
                platform as intended.
              </p>
            </Block>

            <Block title="13. Suspension & Termination">
              <p>
                We may suspend or terminate access to ProVibe — in whole or in
                part — if you violate these Terms, if required by law, or if
                your use harms other users, brands, organizers, or the
                platform. You can stop using ProVibe at any time by closing
                your account.
              </p>
            </Block>

            <Block title="14. Disclaimers">
              <p>
                ProVibe is provided “as is” and “as available”. To the fullest
                extent permitted by law, we disclaim all warranties, express
                or implied, including fitness for a particular purpose,
                merchantability, and non-infringement. We do not guarantee
                specific earnings, audience growth, brand deals, or event
                outcomes from your use of the platform.
              </p>
            </Block>

            <Block title="15. Limitation of Liability">
              <p>
                To the fullest extent permitted by law, ProVibe and its team
                will not be liable for any indirect, incidental, special, or
                consequential damages, or for loss of profits, revenue, data,
                or goodwill arising from your use of the platform. Our total
                liability for any claim relating to ProVibe will not exceed
                the amount you paid us in the 12 months before the claim, or
                USD 100, whichever is greater.
              </p>
            </Block>

            <Block title="16. Indemnity">
              <p>
                You agree to indemnify and hold ProVibe harmless from any
                claims, damages, or expenses arising out of your content, your
                use of the platform, your transactions with other users, or
                your breach of these Terms.
              </p>
            </Block>

            <Block title="17. Changes to the Service & Terms">
              <p>
                ProVibe is being built in phases — starting with creator
                monetization, then brand discovery, then events and meetups.
                Features will evolve over time. We may also update these
                Terms. When we make material changes, we’ll notify you through
                the product or by email. Continued use of ProVibe after changes
                means you accept the updated Terms.
              </p>
            </Block>

            <Block title="18. Contact">
              <p>
                Questions about these Terms? Reach out through our{" "}
                <Link
                  href="/contact"
                  className="font-medium text-primary hover:underline"
                >
                  contact page
                </Link>
                .
              </p>
            </Block>
          </article>
        </div>
      </section>
    </>
  )
}

function Block({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section>
      <h2 className="mb-3 font-heading text-xl font-bold text-foreground sm:text-2xl">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

function List({ children }: { children: React.ReactNode }) {
  return (
    <ul className="ml-5 list-disc space-y-2 marker:text-primary">{children}</ul>
  )
}

import Link from "next/link"
import { GrainOverlay } from "@/components/shared/grain-overlay"

const LAST_UPDATED = "April 10, 2026"

export function PrivacyContent() {
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
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Your trust powers ProVibe. This policy explains what we collect, why
            we collect it, and the choices you have as a creator, brand, or
            event organizer on our platform.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto max-w-3xl px-6">
          <article className="prose-legal space-y-10 text-[15px] leading-relaxed text-muted-foreground">
            <Block title="1. Who We Are">
              <p>
                ProVibe is a creator business platform that helps creators
                monetize their audience, helps brands discover verified talent,
                and helps event organizers connect with creators and sponsors
                in one place. This Privacy Policy applies to everyone who uses
                ProVibe — creators, brands, event organizers, and visitors of
                public creator pages.
              </p>
            </Block>

            <Block title="2. Information We Collect">
              <p>We collect information in three ways:</p>
              <List>
                <li>
                  <strong className="text-foreground">
                    Information you provide:
                  </strong>{" "}
                  name, email, phone number, profile details, storefront content,
                  products you list, session and booking details, event
                  details, payment details, brand deal information, and any
                  content you upload or publish on ProVibe.
                </li>
                <li>
                  <strong className="text-foreground">
                    Information collected automatically:
                  </strong>{" "}
                  device type, browser, IP address, pages viewed, clicks on
                  your storefront page, product views, booking flows, campaign
                  responses, and general usage analytics.
                </li>
                <li>
                  <strong className="text-foreground">
                    Information from third parties:
                  </strong>{" "}
                  data from social platforms you connect (to help verify
                  creators and assess audience quality), payment processors,
                  and integration partners.
                </li>
              </List>
            </Block>

            <Block title="3. How We Use Your Information">
              <p>We use your information to:</p>
              <List>
                <li>
                  Run your creator profile, storefront, bookings, promotional
                  content, and brand collaborations.
                </li>
                <li>
                  Power brand discovery — including filters by category,
                  language, followers, niche, and location, plus fake-follower
                  risk and audience quality checks.
                </li>
                <li>
                  Enable event organizers to host events, invite creators,
                  discover sponsors, and manage creator-driven growth.
                </li>
                <li>
                  Process payments, orders, and payouts securely through
                  trusted payment providers.
                </li>
                <li>
                  Improve the product, prevent fraud and abuse, and comply with
                  legal obligations.
                </li>
                <li>
                  Send important updates, transactional messages, and (with
                  your consent) product and marketing communications.
                </li>
              </List>
            </Block>

            <Block title="4. Verification & Audience Quality Checks">
              <p>
                To help brands discover verified talent, ProVibe may analyze
                public social metrics, engagement patterns, and follower signals
                connected to a creator profile. These checks are designed to
                surface authentic creators and reduce fake-follower risk. We do
                not sell this data — it is only used inside ProVibe to power
                discovery, verification, and campaign matching.
              </p>
            </Block>

            <Block title="5. How We Share Information">
              <p>
                We share information only where it is necessary to run
                ProVibe:
              </p>
              <List>
                <li>
                  <strong className="text-foreground">Publicly:</strong> Content
                  you publish on your creator storefront, events, or public
                  listings is visible to anyone with the link.
                </li>
                <li>
                  <strong className="text-foreground">With brands:</strong> When
                  you accept a campaign, deal, or collaboration, relevant
                  profile and campaign data is shared with that brand.
                </li>
                <li>
                  <strong className="text-foreground">With organizers:</strong>{" "}
                  When you join an event or respond to an invitation, the
                  organizer receives the information required to manage the
                  event.
                </li>
                <li>
                  <strong className="text-foreground">
                    With service providers:
                  </strong>{" "}
                  payment processors, hosting, email delivery, analytics, and
                  fraud prevention — bound by confidentiality obligations.
                </li>
                <li>
                  <strong className="text-foreground">For legal reasons:</strong>{" "}
                  to comply with law, enforce our terms, or protect the rights
                  and safety of users and the public.
                </li>
              </List>
              <p>
                We do not sell your personal information to advertisers or data
                brokers.
              </p>
            </Block>

            <Block title="6. Payments & Orders">
              <p>
                Payments on ProVibe — including product sales, bookings, paid
                sessions, and brand deal settlements — are processed by
                third-party payment providers. We do not store full card
                numbers. We retain order, invoice, and payout records to
                operate the platform and meet tax and accounting requirements.
              </p>
            </Block>

            <Block title="7. Your Choices & Rights">
              <p>
                Depending on your location, you may have rights to access,
                correct, delete, export, or object to the processing of your
                personal information. You can:
              </p>
              <List>
                <li>Edit or remove profile and storefront content at any time.</li>
                <li>Unsubscribe from marketing emails from the email footer.</li>
                <li>
                  Disconnect connected social accounts from your settings.
                </li>
                <li>
                  Request account deletion by contacting us at the email below.
                </li>
              </List>
            </Block>

            <Block title="8. Data Retention">
              <p>
                We retain your information for as long as your account is
                active, as needed to provide ProVibe, and as required for
                legal, tax, and fraud-prevention purposes. When information is
                no longer needed, we delete or anonymize it.
              </p>
            </Block>

            <Block title="9. Security">
              <p>
                We use reasonable technical and organizational measures to
                protect your information, including encryption in transit,
                access controls, and secure infrastructure. No system is 100%
                secure, so we encourage strong passwords and caution when
                sharing sensitive information.
              </p>
            </Block>

            <Block title="10. Children">
              <p>
                ProVibe is not directed to children under 13 (or the minimum
                age required in your country). We do not knowingly collect
                personal information from children. If you believe a child has
                provided us data, please contact us so we can remove it.
              </p>
            </Block>

            <Block title="11. International Users">
              <p>
                ProVibe may process and store information in countries other
                than your own. By using the platform you agree to this
                cross-border processing, subject to applicable legal
                protections.
              </p>
            </Block>

            <Block title="12. Changes to This Policy">
              <p>
                We may update this Privacy Policy as ProVibe evolves through
                its creator monetization, brand discovery, and events phases.
                When we make material changes, we will notify you through the
                product or by email. The “Last updated” date at the top always
                reflects the current version.
              </p>
            </Block>

            <Block title="13. Contact Us">
              <p>
                If you have questions about this Privacy Policy or want to
                exercise your rights, reach out via our{" "}
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

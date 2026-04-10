import Link from "next/link"
import Image from "next/image"
import { getTranslations } from "next-intl/server"

const FacebookIcon = () => (
  <svg
    className="h-4 w-4"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.408.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V7.86c0-3.08 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.732 0 1.325-.593 1.325-1.325V1.325C24 .593 23.408 0 22.675 0Z" />
  </svg>
)

const InstagramIcon = () => (
  <svg
    className="h-4 w-4"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
      clipRule="evenodd"
    />
  </svg>
)

const LinkedinIcon = () => (
  <svg
    className="h-4 w-4"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
      clipRule="evenodd"
    />
  </svg>
)

// TODO: Replace with your real ProVibe social account URLs
const socialLinks = [
  {
    icon: FacebookIcon,
    href: "https://facebook.com/provibe.link",
    label: "Facebook",
  },
  {
    icon: InstagramIcon,
    href: "https://instagram.com/provibe.link",
    label: "Instagram",
  },
  {
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/showcase/provibe-link",
    label: "LinkedIn",
  },
]

export async function Footer() {
  const t = await getTranslations("footer")

  const footerColumns = [
    {
      title: t("product"),
      links: [
        { label: t("features"), href: "/#features" },
        { label: t("roadmap"), href: "/#roadmap" },
      ],
    },
    {
      title: t("creatorsTitle"),
      links: [
        { label: t("creatorHub"), href: "/creators" },
        { label: t("digitalStore"), href: "/creators" },
        { label: t("analytics"), href: "/creators" },
      ],
    },
    {
      title: t("brandsTitle"),
      links: [
        { label: t("brandPortal"), href: "/brands" },
        { label: t("campaignManager"), href: "/brands" },
      ],
    },
    {
      title: t("resources"),
      links: [
        // { label: "Blog", href: "/blogs" },
        { label: t("helpCenter"), href: "/contact" },
      ],
    },
    {
      title: t("company"),
      links: [{ label: t("contact"), href: "/contact" }],
    },
    {
      title: t("legal"),
      links: [
        { label: t("privacy"), href: "/privacy" },
        { label: t("terms"), href: "/terms" },
      ],
    },
  ]

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto max-w-7xl px-6 py-16">
        {/* Top: Brand + Columns */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-8">
          {/* Brand — spans 2 cols on lg */}
          <div className="col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/logo.webp"
                alt="ProVibe"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>

            <p className="max-w-[260px] text-sm leading-relaxed text-muted-foreground">
              {t("tagline")}
            </p>

            <Link
              href="/"
              className="inline-flex items-center text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              {t("joinWaitlist")}
            </Link>

            <div className="flex gap-3 pt-1">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    aria-label={social.label}
                  >
                    <IconComponent />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Link Columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="mb-4 text-sm font-semibold">{column.title}</h4>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              {t("privacy")}
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

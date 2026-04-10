import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { JoinEarlyContent } from "./content"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("earlyJoin.page")
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  }
}

export default function JoinEarlyPage() {
  return <JoinEarlyContent />
}

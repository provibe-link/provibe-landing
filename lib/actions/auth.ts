"use server"

import { redirect } from "next/navigation"
import { validateCredentials, signToken, setAdminToken, clearAdminToken } from "@/lib/auth"

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  if (!email || !password) return { error: "Email and password are required" }
  const valid = await validateCredentials(email, password)
  if (!valid) return { error: "Invalid email or password" }
  const token = await signToken(email)
  await setAdminToken(token)
  redirect("/admin")
}

export async function logoutAction() {
  await clearAdminToken()
  redirect("/admin/login")
}

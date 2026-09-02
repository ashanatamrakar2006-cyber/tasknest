import { auth, signOut } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Welcome, {session.user?.name}!</h1>
        <p className="text-gray-600">{session.user?.email}</p>
        <form
          action={async () => {
            "use server"
            await signOut({ redirectTo: "/login" })
          }}
        >
          <button className="bg-black text-white px-4 py-2 rounded">
            Logout
          </button>
        </form>
      </div>
    </div>
  )
}
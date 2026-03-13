export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  birthDate: string
  age: number
}

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  birthDate: string
  age: number
}

export async function getUsers(): Promise<User[]> {
  try {
    const res = await fetch("https://dummyjson.com/users?limit=50", {
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error("Failed to fetch users")
    }

    const { users } = await res.json()
    return users
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}


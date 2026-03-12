export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  birthDate: string
  age: number
}

export interface TableData {
  id: number
  header: string
  type: string
  status: string
  target: string
  limit: string
  reviewer: string
}

export async function getUsers(): Promise<User[]> {
  try {
    const res = await fetch("https://dummyjson.com/users?limit=100", {
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

export async function transformUsersToTableData(
  users: User[]
): Promise<TableData[]> {
  return users.map((user) => ({
    id: user.id,
    header: `${user.firstName} ${user.lastName}`,
    type: "User",
    status: "Active",
    target: user.age.toString(),
    limit: "0",
    reviewer: user.email,
  }))
}

export async function getTableData(): Promise<TableData[]> {
  const users = await getUsers()
  return transformUsersToTableData(users)
}

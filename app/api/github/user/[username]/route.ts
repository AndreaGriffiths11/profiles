import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  const username = params.username

  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}
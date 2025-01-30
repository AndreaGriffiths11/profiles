import fetch from 'node-fetch';

export default async function handler(username: string) {
  if (!username || typeof username !== 'string') {
    console.error('Invalid username');
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      console.error('Failed to fetch user data');
      return;
    }

    const userData = await response.json();
    console.log(userData);
  } catch (error) {
    console.error('Internal server error');
  }
}
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
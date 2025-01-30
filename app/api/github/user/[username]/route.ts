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

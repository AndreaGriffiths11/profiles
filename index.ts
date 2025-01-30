import { createInterface } from 'readline';
import fetch from 'node-fetch';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

async function fetchGitHubUserData(username: string) {
  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (!userRes.ok) throw new Error('User not found');
    const userData = await userRes.json();

    const activitiesRes = await fetch(`https://api.github.com/users/${username}/events`);
    const activitiesData = await activitiesRes.json();

    return { userData, activitiesData };
  } catch (err) {
    console.error(err instanceof Error ? err.message : 'An error occurred');
    return null;
  }
}

function displayUserData(userData: any, activitiesData: any) {
  console.log(`\nGitHub User: ${userData.login}`);
  console.log(`Name: ${userData.name}`);
  console.log(`Bio: ${userData.bio}`);
  console.log(`Public Repos: ${userData.public_repos}`);
  console.log(`Followers: ${userData.followers}`);
  console.log(`Following: ${userData.following}`);
  console.log(`\nRecent Activities:`);
  activitiesData.slice(0, 5).forEach((activity: any) => {
    console.log(`- ${activity.type} at ${activity.repo.name} on ${new Date(activity.created_at).toLocaleString()}`);
  });
}

function handleUserInput() {
  rl.question('Enter GitHub username: ', async (username) => {
    const data = await fetchGitHubUserData(username);
    if (data) {
      displayUserData(data.userData, data.activitiesData);
    }
    rl.close();
  });
}

handleUserInput();

import { RepoMetadata } from '../types';

const BASE_URL = 'https://api.github.com/repos';

// Helper to handle rate limits or errors gracefully
async function fetchGithub(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("GitHub API rate limit exceeded. Please try again later or use a different IP.");
    }
    if (response.status === 404) {
      throw new Error("Repository not found. Please check the URL.");
    }
    throw new Error(`GitHub API Error: ${response.statusText}`);
  }
  return response.json();
}

export const parseRepoUrl = (url: string): { owner: string; name: string } | null => {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname !== 'github.com') return null;
    const parts = urlObj.pathname.split('/').filter(Boolean);
    if (parts.length < 2) return null;
    return { owner: parts[0], name: parts[1] };
  } catch (e) {
    return null;
  }
};

export const fetchRepoData = async (owner: string, name: string): Promise<RepoMetadata> => {
  // 1. Fetch Basic Info
  const repoData = await fetchGithub(`${BASE_URL}/${owner}/${name}`);

  // 2. Fetch Languages
  const languagesData = await fetchGithub(`${BASE_URL}/${owner}/${name}/languages`);

  // 3. Fetch Root Content (for file structure)
  // We only fetch the root level to save bandwidth/tokens, Gemini can infer a lot from top-level structure (e.g., src, tests, package.json presence)
  const contentsData = await fetchGithub(`${BASE_URL}/${owner}/${name}/contents`);
  
  // Construct a simplified file tree string
  const fileStructure = Array.isArray(contentsData) 
    ? contentsData.map((item: any) => `/${item.name} (${item.type})`).join('\n')
    : 'Unable to fetch file structure.';

  // 4. Fetch README
  let readmeContent = '';
  try {
    // Attempt to find a standard readme file in the file list
    const readmeFile = Array.isArray(contentsData) 
      ? contentsData.find((f: any) => f.name.toLowerCase().startsWith('readme'))
      : null;

    if (readmeFile && readmeFile.download_url) {
        const readmeRes = await fetch(readmeFile.download_url);
        if(readmeRes.ok) {
             const text = await readmeRes.text();
             // Truncate Readme if too long to save context window
             readmeContent = text.slice(0, 8000); 
        }
    }
  } catch (e) {
    console.warn("Failed to fetch README", e);
    readmeContent = "No README found or could not be fetched.";
  }

  return {
    owner: repoData.owner.login,
    name: repoData.name,
    description: repoData.description,
    stars: repoData.stargazers_count,
    forks: repoData.forks_count,
    openIssues: repoData.open_issues_count,
    defaultBranch: repoData.default_branch,
    updatedAt: repoData.updated_at,
    languages: languagesData,
    fileStructure,
    readmeContent
  };
};

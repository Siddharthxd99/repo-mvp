let currentDescription = '';

function showError(message) {
    const errorDiv = document.getElementById('errorMsg');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

function parseGithubUrl(url) {
    const pattern = /github\.com\/([^\/]+)\/([^\/]+)/;
    const match = url.match(pattern);
    if (match) {
        return {
            owner: match[1],
            repo: match[2].replace('.git', '').split('?')[0].split('#')[0]
        };
    }
    return null;
}

async function describeMVP() {
    const input = document.getElementById('repoInput').value.trim();
    
    if (!input) {
        showError('Please enter a GitHub repository URL');
        return;
    }

    if (!input.includes('github.com')) {
        showError('Please enter a valid GitHub URL');
        return;
    }

    const parsed = parseGithubUrl(input);
    if (!parsed) {
        showError('Invalid GitHub URL format');
        return;
    }

    const btn = document.getElementById('describeBtn');
    const loading = document.getElementById('loading');
    const result = document.getElementById('result');

    btn.disabled = true;
    loading.style.display = 'block';
    result.style.display = 'none';

    try {
        const repoResponse = await fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`);
        if (!repoResponse.ok) {
            throw new Error('Repository not found');
        }
        const repoData = await repoResponse.json();

        let readme = null;
        try {
            const readmeResponse = await fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}/readme`);
            if (readmeResponse.ok) {
                const readmeData = await readmeResponse.json();
                readme = atob(readmeData.content);
            }
        } catch (e) {
            console.log('README not found');
        }

        const response = await fetch('http://localhost:3000/api/describe-mvp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                repoUrl: input,
                repoData,
                readme
            })
        });

        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.error || 'Failed to generate description');
        }

        currentDescription = data.description;
        document.getElementById('description').textContent = currentDescription;
        result.style.display = 'block';
        loading.style.display = 'none';

    } catch (error) {
        showError(error.message);
        loading.style.display = 'none';
    } finally {
        btn.disabled = false;
    }
}

function copyDescription() {
    const btn = event.target;
    const originalText = btn.textContent;
    
    // Create temporary textarea
    const textarea = document.createElement('textarea');
    textarea.value = currentDescription;
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    
    // Select and copy
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile
    
    try {
        document.execCommand('copy');
        btn.textContent = '✅ Copied!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    } catch (err) {
        btn.textContent = '❌ Failed';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }
    
    document.body.removeChild(textarea);
}

// Enter key support
document.getElementById('repoInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        describeMVP();
    }
});
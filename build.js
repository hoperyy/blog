

require('generate-docs-by-github-issue')({
    username: 'hoperyy', 
    repo: 'blog', 
    targetDir: require('path').join(process.cwd(), 'docs'),
    preWriting(issueItem) {
        issueItem.title = issueItem.title.replace(/\//g, '-').replace(/(\[)|(\])/g, '-');

        console.log(`[${issueItem.title}](./docs/${issueItem.title}.md)`);
    } 
});

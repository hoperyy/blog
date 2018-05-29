

require('generate-docs-by-github-issue')({
    username: 'hoperyy', 
    repo: 'blog', 
    targetDir: require('path').join(process.cwd(), 'docs'),
    preWriting(issueItem) {
        const oldTitle = issueItem.title;
        issueItem.title = issueItem.title.replace(/\//g, '-').replace(/\s/g, '');

        console.log(`+  [${oldTitle.replace(/(\[)|(\])/g, '-')}](./docs/${issueItem.title}.md)`);
    } 
});

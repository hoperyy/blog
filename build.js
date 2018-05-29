

require('generate-docs-by-github-issue')({
    username: 'hoperyy', 
    repo: 'blog', 
    targetDir: require('path').join(process.cwd(), 'cacheDocs'),
    preWriting(issueItem) {
        issueItem.title = issueItem.title.replace(/\//g, '-').replace(/(\[)|(\])/g, '-');
        return issueItem;
    } 
});

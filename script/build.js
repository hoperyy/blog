

const path = require('path');
const cwd = process.cwd();

const sortedDirArr = [];

require('generate-docs-by-github-issue')({
    username: 'hoperyy',
    repo: 'blog',
    targetDir: path.join(cwd, 'cached-docs'),
    beforeSort(issues) {
        issues.forEach(issueItem => {
            // 去掉标题中的 / 字符和空格
            issueItem.title = issueItem.title.replace(/\//g, '-').replace(/\s/g, '').replace(/(\[)|(\])/g, '-'); 
        });
    },

    afterSort(issues) {
        issues.forEach(issueItem => {
            console.log(`+  [${issueItem.title}](${issueItem.html_url})`);
        });
    }
});
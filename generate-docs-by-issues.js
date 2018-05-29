const request = require('request');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

class Utils {
    writeFileSync(filePath, content) {
        fse.ensureFileSync(filePath);
        const fd = fs.openSync(filePath, 'w+');
        fs.writeFileSync(filePath, content);
        fs.close(fd);
    }
}

class Generate {
    constructor({ targetDir, username, repo }) {
        if (!username || !repo) {
            console.log('username and repo required');
            return;
        }

        if (!targetDir) {
            console.log('targetDir required (absolute path)');
            return;
        }

        this.utiles = new Utils();

        this.targetDir = path.join(root, 'testDocs');

        this.options = {
            url: `https://api.github.com/repos/${username}/${repo}/issues`,
            headers: {
                'User-Agent': 'request'
            }
        };

        this.request()
            .then(sortedIssues => {
                // fse.removeSync(this.targetDir);
                sortedIssues.forEach(this.createMarkdownByIssueItem.bind(this));
            })
            .catch(err => {
                throw Error(err);
            });
    }

    createMarkdownByIssueItem(issueItem) {
        const title = issueItem.title;
        const targetMarkdown = path.join(this.targetDir, title) + '.md';
        this.utiles.writeFileSync(targetMarkdown, issueItem.body);
    }

    request() {
        return new Promise((resolve, reject) => {
            request(this.options, (error, response, body) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (!response || response.statusCode !== 200) {
                    reject('response code not 200');
                    return;
                }

                // sort by title
                const sortedIssues = this.sortByTitle(JSON.parse(body));

                resolve(sortedIssues);
                // console.log('body:', sortedIssues); // Print the HTML for the Google homepage.
            });
        });  
    }

    sortByTitle(issues) {
        const result = [];

        const titleMap = {}; // key: title, value: issueItem

        issues.forEach(issueItem => {
            if (!titleMap[issueItem.title]) {
                titleMap[issueItem.title] = issueItem;
            }
        });

        // sortedTitle
        const sortedTitle = issues.map(issueItem => issueItem.title).sort();

        sortedTitle.forEach(title => {
            result.push(titleMap[title]);
        });

        return result;
    }
}

new Generate({ username: 'hoperyy', repo: 'home', targetDir: path.join(process.cwd(), 'testDocs') });



console.log('还是手动来吧');

// const path = require('path');
// const cwd = process.cwd();

// require('child_process').execSync(`cd ${cwd} && rm -rf docs`);

// const sortedDirArr = [];

// require('generate-docs-by-github-issue')({
//     username: 'hoperyy', 
//     repo: 'blog', 
//     targetDir: path.join(cwd, 'docs'),
//     beforeSort(issues) {
//         issues.forEach(issueItem => {
//             // 获取 label
//             const labels = issueItem.labels;

//             // 获取 时间 标签
//             let time = '';
//             let dir = '';
//             labels.forEach(label => {
//                 if (/20\d\d/.test(label.name)) {
//                     time = label.name;
//                 } else {
//                     dir = label.name;
//                 }
//             });

//             // 去掉标题中的 [ ] 字符，便于生成 markdown 链接
//             const titleWithoutSquare = issueItem.title.replace(/(\[)|(\])/g, '-');

//             // 去掉标题中的 / 字符和空格
//             issueItem.title = issueItem.title.replace(/\//g, '-').replace(/\s/g, '');
//             // 添加文件夹（由 label 生成）
//             issueItem.title = (dir ? `${dir}/` : '') + issueItem.title;

//             sortedDirArr.push(`+  ${(dir ? `${dir}/` : '')}[${titleWithoutSquare}](${issueItem.html_url})${time ? '(' + time + ')' : ''}`);
//         });

//         const arr = sortedDirArr.sort();
//         console.log(arr.join('\n'));
//     },
// });

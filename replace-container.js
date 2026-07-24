/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

function replaceContainer(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace container mx-auto with max-w-7xl mx-auto w-full
    content = content.replace(/\bcontainer mx-auto\b/g, 'max-w-7xl mx-auto w-full');

    if (original !== content) {
        fs.writeFileSync(filePath, content);
        console.log('Updated container in', filePath);
    }
}

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./app').concat(walk('./components'));
files.forEach(replaceContainer);

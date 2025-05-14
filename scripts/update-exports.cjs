const fs = require('fs');
const path = require('path');

const componentsDir = path.resolve(__dirname, '../src/stories');
const pkgJsonPath = path.resolve(__dirname, '../package.json');
const distDir = path.resolve(__dirname, '../dist');

const files = fs.readdirSync(componentsDir).filter((file) => {
    return (
        file.endsWith('.tsx') &&
        !file.endsWith('.stories.tsx') &&
        !file.includes('.stories') &&
        file !== 'index.tsx'
    )
}).map((file) => file.replace(/\.tsx$/, ''));

const exportsMap = {};

for (const file of files) {
    exportsMap[`./${file}`] = {
        "import": `./dist/${file}.js`,
        "types": `./dist/${file}.d.ts`,
    }
}

const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
pkg.exports = exportsMap;

fs.writeFileSync(pkgJsonPath, JSON.stringify(pkg, null, 4));
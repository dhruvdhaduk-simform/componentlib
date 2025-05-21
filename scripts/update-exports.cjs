const fs = require('fs');
const path = require('path');

const componentsDir = path.resolve(__dirname, '../src/components');
const pkgJsonPath = path.resolve(__dirname, '../package.json');
const distDir = path.resolve(__dirname, '../dist');

const components = fs.readdirSync(componentsDir)

const exportsMap = {};

for (const component of components) {
    exportsMap[`./${component}`] = {
        "import": `./dist/components/${component}/${component}.js`,
        "types": `./dist/components/${component}/${component}.d.ts`,
    }
}

const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
pkg.exports = exportsMap;

fs.writeFileSync(pkgJsonPath, JSON.stringify(pkg, null, 4));
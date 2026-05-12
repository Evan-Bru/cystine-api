const fs = require('fs');
const path = require('path');

const VAULT_PATH = path.join(__dirname, '../../vault');

const files = fs.readdirSync(VAULT_PATH);
const vaultData = [];

files.forEach(file => {
    const filePath = path.join(VAULT_PATH, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile() && file.endsWith('.md')) {
        const content = fs.readFileSync(filePath, 'utf-8');
        vaultData.push({
            title: file,
            path: filePath,
            content: content
        });
    }
});

console.log(vaultData);
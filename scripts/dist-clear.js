const del = require('del');
const dir = './dist/';
(async () => {
    try {
        await del(dir);
        console.log(`dist:clear: ${dir} cleared.`);
    } catch (err) {
        console.error(`dist:clear: Error processing ${dir}.`);
    }
})();

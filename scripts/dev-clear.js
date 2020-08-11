const del = require('del');
const dir = './dev/';
(async () => {
    try {
        await del(dir);
        console.log(`dev:clear: ${dir} cleared.`);
    } catch (err) {
        console.error(`dev:clear: Error processing ${dir}.`);
    }
})();

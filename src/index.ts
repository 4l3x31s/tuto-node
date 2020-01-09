/*import express from 'express';

const app = express();
app.listen(3000, () => {
    console.log('servidor inicializado')
})*/

import { App } from './app';

async function main() {
    const app = new App(3000);
    await app.listenAsync();
}

main();
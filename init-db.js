const readline = require('readline');

const Product = require('./models/Products');

async function main() {
    const approval = await questionYesNo('You will delete everything from the database, restart the connection and create new data. Are you sure you want to continue? [n]')
    if (!approval) {
        process.exit();
    }

    const connection = require('./lib/connectMongoose')

    await initProducts();

    connection.close();
}

main().catch(err => console.log('There was an error', err));

async function initProducts() {
    const result = await Product.deleteMany();
    console.log(`Deleted ${result.deletedCount} products.`);

    const inserted = await Product.insertMany([
        { name: 'Snake Plant', sell: true, price: 24, photo: './public/snake-plant.jpg', tags: [] },
        { name: 'Peace Lily', sell: true, price: 36, photo: './public/peace-lily.jpg', tags: [] },
        { name: 'Monstera', sell: true, price: 59, photo: './public/monstera.jpg', tags: [] },
        { name: 'ZZ Plant', sell: true, price: 10, photo: './public/zz-plant.jpg', tags: [] },
    ]);
    console.log(`Created ${inserted.legth} products`)

}

function questionYesNo(text) {
    return new Promise((resolve, reject) => {
        const interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        interface.question(text, answer => {
            interface.close();
            if (answer.toLowerCase() === 'yes') {
                resolve(true);
                return;
            }
            resolve(false);
        })
    })
}
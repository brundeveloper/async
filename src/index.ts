import async from 'async';
import axios from 'axios';

const data = ['01001000', '01002000', '01003000', '01004000', '01005000', '01006000', '01007000', '01008000', '01009000', '01010000'];

async function run(){
    await async.eachOfLimit(data, 1, async (item, index, callback) => {
        try {
            await async.retry({ times: 3, interval: 5000}, async () => {
                console.log(item);

                let url = `https://viacep.com.br/ws/${item}/json/`;

                if (item === '01004000'){
                    url = `http://www.google.com:81/`;
                }

                const address = await axios.get(url);

                console.log(address.data);
            }, () => {
                console.log('callback');
            });

            callback?.();
        }
        catch (err) {
            console.error(`Error processing item ${item}:`, err);
            callback?.(err as Error | null | undefined);
        }
    });
}

await run();
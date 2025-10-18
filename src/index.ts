import async from 'async';

const data = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

await async.eachOfLimit(data, 2, async (item, index, callback) => {
    try {
        console.log(item);

        await async.retry({ times: 3, interval: 30000}, async () => {
            if (item == 'e'){
                console.log('item e');
                return;
            }
        });

        callback?.();
    }
    catch (err) {
        console.error(`Error processing item ${item}:`, err);
        callback?.(err as Error | null | undefined);
    }
});

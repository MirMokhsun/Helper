const candles = {
    'Hour': [{ H: 0, L: 0, O: 0, C: 0, T: 0 }],
    'Minute30': [{ H: 0, L: 0, O: 0, C: 0, T: 0 }],
};

export default function sendReqeust(farme) {
    return new Promise((resolve, reject) => {
        process.nextTick(() =>
            candles[farme]
                ? resolve(candles[farme])
                : reject({
                    error: 'Wrong frame: ' + farme,
                }),
        );
    });
}
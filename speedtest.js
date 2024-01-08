// Contenido de speedtest.js (descargado desde https://github.com/sindresorhus/speed-test)

(function () {
    'use strict';

    const pingTest = async () => {
        const img = new Image();
        const start = new Date();

        return new Promise((resolve, reject) => {
            img.onload = img.onerror = () => {
                const end = new Date();
                const duration = end - start;
                resolve(duration);
            };

            img.src = 'https://www.google.com/images/phd/px.gif?t=' + (Math.random() * 1e9 | 0);
        });
    };

    const downloadTest = async () => {
        const sizes = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000];
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
        const url = `https://www.google.com/images/phd/px.gif?size=${randomSize}&t=${Math.random() * 1e9 | 0}`;

        const img = new Image();
        const start = new Date();

        return new Promise((resolve, reject) => {
            img.onload = img.onerror = () => {
                const end = new Date();
                const duration = end - start;
                const bitsLoaded = randomSize * 8;
                const speedBps = (bitsLoaded / duration) * 1000;
                const speedKbps = speedBps / 1024;
                const speedMbps = speedKbps / 1024;
                resolve(speedMbps);
            };

            img.src = url;
        });
    };

    const uploadTest = async () => {
        const sizes = [200000, 400000, 600000, 800000, 1000000, 1200000, 1400000, 1600000, 1800000, 2000000];
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
        const url = 'https://httpbin.org/post';

        const data = new Array(randomSize).fill('0').join('');

        const xhr = new XMLHttpRequest();
        const start = new Date();

        return new Promise((resolve, reject) => {
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    const end = new Date();
                    const duration = end - start;
                    const bitsLoaded = randomSize * 8;
                    const speedBps = (bitsLoaded / duration) * 1000;
                    const speedKbps = speedBps / 1024;
                    const speedMbps = speedKbps / 1024;
                    resolve(speedMbps);
                }
            };

            xhr.open('POST', url, true);
            xhr.send(data);
        });
    };

    class Speedtest {
        async download() {
            return await downloadTest();
        }

        async upload() {
            return await uploadTest();
        }

        async ping() {
            return await pingTest();
        }
    }

    window.Speedtest = Speedtest;
})();

module.exports = {
    presets: [
        "@babel/typescript",
        [
            "@babel/env",
            {
                targets: {
                    chrome: "67",
                    edge: "17",
                    firefox: "60",
                    ie: "11",
                    safari: "11.1",
                },
                useBuiltIns: "usage",
                corejs: "3.0.0",
            },
        ],
    ]
};

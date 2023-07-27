const mix = require("laravel-mix");
const path = require("path");
mix.ts("resources/js/app.ts", "public/js")
    .vue()
    .sass("resources/sass/app.scss", "public/css");

mix.webpackConfig({
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "sass-loader",
                        options: {
                            additionalData: `
                            @use "sass:math";
                            @import "@/_variables.scss";`,
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        alias: {
            "@": path.resolve("resources/sass"),
        },
    },
});

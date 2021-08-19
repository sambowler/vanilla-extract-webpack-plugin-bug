const { VanillaExtractPlugin } = require("@vanilla-extract/webpack-plugin");
const {
    getGlobalCssLoader,
} = require("next/dist/build/webpack/config/blocks/css/loaders");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    reactStrictMode: true,
    webpack5: true,
    webpack(config, options) {
        const { dev, isServer } = options;

        config.module.rules.push({
            test: /\.css$/i,
            sideEffects: true,
            use: dev
                ? getGlobalCssLoader(
                    {
                        assetPrefix: options.config.assetPrefix,
                        isClient: !isServer,
                        isServer,
                        isDevelopment: dev,
                    },
                    [],
                    []
                )
                : [MiniCssExtractPlugin.loader, "css-loader"],
        });

        const plugins = [];

        plugins.push(new VanillaExtractPlugin({}));

        if (!dev) {
            plugins.push(
                new MiniCssExtractPlugin({
                    filename: "static/css/[contenthash].css",
                    chunkFilename: "static/css/[contenthash].css",
                    ignoreOrder: true,
                })
            );
        }

        config.plugins.push(...plugins);

        return config;
    },
};

import * as path from "path";
import { Configuration, optimize } from "webpack";
const nodeExternals = require("webpack-node-externals");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const config: Configuration = {
    target: "node",
    entry: {
        server: "./src/app.ts"
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "awesome-typescript-loader"
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    output: {
        path: path.resolve("dist"),
        filename: "[name].js"
    },
    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new optimize.UglifyJsPlugin()
    ]
};

export default config;

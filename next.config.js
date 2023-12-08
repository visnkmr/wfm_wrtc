/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
      },
      eslint: {
        ignoreDuringBuilds: true,
      },
      experimental: {
        serverComponentsExternalPackages: ["wrtc"],
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
          },
        ],
      },
      externals: {
        "wrtc": "commonjs wrtc",
      },
}

module.exports = nextConfig

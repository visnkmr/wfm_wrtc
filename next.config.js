/** @type {import('next').NextConfig} */

const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
      },
      eslint: {
        ignoreDuringBuilds: true,
      },
      experimental: {
        esmExternals: false,
        // legacyBrowsers: false,
        // browsersListForSwc: true,
      //   serverComponentsExternalPackages: ["wrtc"],
      }
      ,
      // assetPrefix: '/',
        // resolve: {
        //   mainFields: ["browser", "module", "main"]
        // }
      // ,
      webpack: (config, { isServer }) => {
        // config.resolve.mainFields=["browser", "module", "main"]
        config.externals.push("module");
        // config.externals['module'] = 'commonjs node:module';
        // config.externals['node:path'] = 'commonjs node:path';
    
        // Existing font loader
        // config.module.rules.push({
        //   test: /\.(woff|woff2|eot|ttf|otf)$/,
        //   use: {
        //     loader: 'file-loader',
        //     options: {
        //       name: '[name].[ext]',
        //       outputPath: 'static/fonts/',
        //       publicPath: '/static/fonts/',
        //     },
        //   },
        // });
        
        // Add loader for .node files
        config.module.rules.push({
          test: /\.node$/,
          use: 'node-loader',
        });
    
        // Stub fs module
        // if (!isServer) {
        //   config.resolve.fallback = {
        //     ...config.resolve.fallback,
        //     fs: false,
        //     net: false,
        //     tls: false,
        //     canvas: false
        //   };
        // }
    
        // Your added configuration
        config.resolve.alias.canvas = false;
    
        return config;
      },
      // externals: {
      //   "wrtc": "commonjs wrtc",
      // },
      
}

module.exports = nextConfig

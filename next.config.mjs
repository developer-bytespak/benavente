/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  webpack: (config) => {
    // @sanity/ui imports `motion` from 'motion/react'. That subpath's CJS build
    // (motion/dist/cjs/react.js) defines its exports dynamically via
    // Object.defineProperty + Object.keys().forEach, which webpack cannot
    // statically analyze — so the server graph sees "module has no exports".
    // The ESM build is just `export * from 'framer-motion'`, so point the
    // subpath straight at framer-motion, which resolves cleanly in both graphs.
    config.resolve.alias = {
      ...config.resolve.alias,
      'motion/react$': 'framer-motion',
    }
    return config
  },
}

export default nextConfig

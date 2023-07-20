/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'res.cloudinary.com',
      'placekitten.com',
      'example.com',
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "scss")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stastiem-orders.s3.amazonaws.com",
        port: "",
      },
    ],
  },
  // experimental: {
  //   appDir: true,
  // },
  reactStrictMode: false,
};

module.exports = nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the local network host to connect for mobile testing
  // @ts-ignore: Sometimes missing from NextConfig type definition
  allowedDevOrigins: ['192.168.68.77'],
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.tina.io',
      }
    ],
  },
};

export default nextConfig;

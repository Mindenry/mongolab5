/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

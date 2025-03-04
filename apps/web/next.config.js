/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@uket/ui", "@uket/util"],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "img1.kakaocdn.net",
      },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@uket/ui", "@uket/util"],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "img1.kakaocdn.net",
      },
      {
        protocol: "https",
        hostname: "uket-image-bucket.s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "http",
        hostname: "k.kakaocdn.net",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;

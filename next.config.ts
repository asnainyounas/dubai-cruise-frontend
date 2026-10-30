import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d1vqfl8cu8qgdj.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "www.dhowcruiseindubai.com",
      },
    ],
  },
};

export default nextConfig;

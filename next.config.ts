import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/blog/what-is-spirituality-a-simple-bhagavad-gita-guide-to-a-meaningful-life',
        destination: '/blog/what-is-spirituality',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;

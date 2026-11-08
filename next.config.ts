import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/blog/what-is-spirituality-a-simple-bhagavad-gita-guide-to-a-meaningful-life',
        destination: '/blog/what-is-spirituality',
        permanent: true,
      },
      {
        source: '/blog/the-disease-of-envy',
        destination: '/blog/overcoming-envy-through-devotional-service',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;

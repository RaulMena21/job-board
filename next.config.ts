import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: { 
    dynamicIO: true, // Enable dynamic I/O support
  }
};

export default nextConfig;

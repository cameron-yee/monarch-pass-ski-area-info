const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  fallbacks: {
    document: "/offline"
  }
})
/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = withPWA(nextConfig)

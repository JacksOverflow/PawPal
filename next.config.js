/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    mongodburl:process.env.MONGO_URL,
  },
  images: {
    domains:[ "res.cloudinary.com" ]
  }
}

module.exports = nextConfig

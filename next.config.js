/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    mongodburl:"mongodb+srv://admin:admin@cluster0.5wm5i.mongodb.net/pawpal-db?retryWrites=true&w=majority",
  }
}

module.exports = nextConfig

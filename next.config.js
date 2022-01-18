module.exports = {
  reactStrictMode: true,
  images: {
    // loader: 'cloudinary',
    // path: 'https://res.cloudinary.com/brandonzhang/',
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
  },
  generateBuildId: () => 'build',
  swcMinify: true,
}

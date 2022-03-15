module.exports = {
  reactStrictMode: true,
  images: {
    // loader: 'cloudinary',
    // path: 'https://res.cloudinary.com/brandonzhang/',
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
  },
  generateBuildId: () => 'build',
  swcMinify: true,

  // redirects => https://nextjs.org/docs/api-reference/next.config.js/redirects
  async redirects() {
    return [
      {
        source: '/cloudways', 
        destination: 'https://www.cloudways.com/en/?id=783182',
        permanent: true,
      },
    ]
  },
}

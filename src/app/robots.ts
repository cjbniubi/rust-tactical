import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Replace with the actual deployed domain from EdgeOne
  const baseUrl = 'https://your-edgeone-domain.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'], // Hide API routes from crawlers to save bandwidth
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

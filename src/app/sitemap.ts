import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Replace with the actual deployed domain from EdgeOne
  const baseUrl = 'https://your-edgeone-domain.com';

  // Core tactical pages
  const routes = [
    '',
    '/home',
    '/servers',
    '/simulator',
    '/budget',
    '/builder',
    '/monuments',
    '/scrap',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' || route === '/home' ? 1 : 0.8,
  }));
}

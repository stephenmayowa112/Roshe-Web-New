import type { MetadataRoute } from 'next';

const BASE = 'https://roshestudios.co.uk';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`,                       lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE}/films/remember-me`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/films/new-age`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/films/seasonlings`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/licensing`,              lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/create-with-us`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/philosophy`,             lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.6 },
    { url: `${BASE}/shop`,                   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/about`,                  lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${BASE}/contact`,                lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.5 },
  ];
}

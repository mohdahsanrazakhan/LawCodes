import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/about', changefreq: 'monthly' },
    { url: '/history', changefreq: 'monthly' },
    { url: '/bookmarks', changefreq: 'monthly' },
    { url: '/blog', changefreq: 'weekly' },
    { url: '/contact-us', changefreq: 'yearly' },
    { url: '/privacy-policy', changefreq: 'yearly' },
    { url: '/terms-and-conditions', changefreq: 'yearly' }
  ];

  const sitemap = new SitemapStream({ hostname: 'https://www.legalcodes.in' });
  const writeStream = createWriteStream(resolve(__dirname, 'public', 'sitemap.xml'));

  sitemap.pipe(writeStream);
  links.forEach(link => sitemap.write(link));
  sitemap.end();

  await streamToPromise(sitemap);
  console.log('✅ sitemap.xml has been generated!');
})();

import axios from 'axios';
import * as cheerio from 'cheerio';

class WebScraperService {
  private visitedUrls: Set<string> = new Set();

  async scrapeWebsite(url: string): Promise<string[]> {
    this.visitedUrls.clear();
    return this.crawl(url, new URL(url).origin);
  }

  private async crawl(url: string, baseUrl: string): Promise<string[]> {
    if (this.visitedUrls.has(url)) return [];
    this.visitedUrls.add(url);

    try {
      const response = await axios.get(url);
      const contentType = response.headers['content-type'];
      if (!contentType || !contentType.includes('text/html')) return [];

      const $ = cheerio.load(response.data);
      const links = $('a[href]')
        .map((_, element) => $(element).attr('href'))
        .get()
        .filter((link) => link && this.isInternalLink(link, baseUrl))
        .map((link) => new URL(link, baseUrl).href);

      const uniqueLinks = Array.from(new Set(links));
      const subpagePromises = uniqueLinks.map((link) => this.crawl(link, baseUrl));
      const subpages = await Promise.all(subpagePromises);

      return [url, ...subpages.flat()];
    } catch (error) {
      console.error(`Failed to crawl ${url}:`, error);
      return [];
    }
  }

  private isInternalLink(link: string, baseUrl: string): boolean {
    try {
      const url = new URL(link, baseUrl);
      return url.origin === baseUrl;
    } catch {
      return false;
    }
  }
}

export default new WebScraperService();

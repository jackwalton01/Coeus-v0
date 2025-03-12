import { NextApiRequest, NextApiResponse } from 'next';
import webScraperService from '@/lib/webscraper.service';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log(JSON.stringify(req));
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ message: 'Invalid URL parameter' });
  }

  try {
    const pages = await webScraperService.scrapeWebsite(url);
    return res.status(200).json(pages);
  } catch (error) {
    console.error('Error scraping website:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

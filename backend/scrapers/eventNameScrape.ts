import puppeteer from 'puppeteer';
import db from '../src/db/index.ts';
import { eventsTable } from '../src/db/schema.ts';

const scrapeEvents = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://thebazaar.wiki.gg/wiki/Category:Event`, {
    waitUntil: 'domcontentloaded',
  });
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const modalFrame = page
    .frames()
    .find((frame) => frame.url().includes('cdn.privacy-mgmt.com'));

  if (modalFrame) {
    const button = await modalFrame.$('button[title="Accept"]');
    if (button) {
      await button.click();
    } else {
      console.log('Button not found in the iframe.');
    }
  }

  await page.waitForSelector(
    '#mw-content-text > div.mw-content-ltr.mw-parser-output > table > tbody',
    { visible: true }
  );

  const content = await page.evaluate(() => {
    const sections = document.querySelectorAll(
      '#mw-content-text > div.mw-content-ltr.mw-parser-output > table > tbody > tr'
    );
    if (!content) {
      throw new Error('No content');
    }

    return Array.from(sections)
      .map((section) => {
        const cells = section.querySelectorAll('td');

        if (!cells || cells.length < 5) {
          throw new Error('No cells');
        }

        const link = cells[0].querySelector('a')?.getAttribute('href');
        const name = cells[0].querySelector('a')?.getAttribute('title');
        const img = cells[1]
          .querySelector('center > a > img')
          ?.getAttribute('src');
        const rarity = cells[2].textContent;
        const isHeroEvent = cells[3].textContent;
        const occurance = cells[4].textContent;
        return {
          link: link ? `https://thebazaar.wiki.gg${link.trim()}` : 'No link',
          name: name ? name.trim() : 'No name',
          img: img ? `https://thebazaar.wiki.gg${img.trim()}` : 'No img',
          rarity: rarity ? rarity.trim() : 'No rarity',
          isHeroEvent: isHeroEvent ? isHeroEvent.trim() : 'No isHeroEvent',
          occurance: occurance ? occurance.trim() : 'No occurance',
        };
      })
      .flat();
  });

  try {
    await db.insert(eventsTable).values(content);
    console.log('inserted');
  } catch (error) {
    console.log('Caught error', error);
  }

  await browser.close();
};

await db.delete(eventsTable);
await scrapeEvents();

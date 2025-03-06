import puppeteer from 'puppeteer';
import db from '../src/db/index.ts';
import { monstersTable } from '../src/db/schema.ts';
import { MonsterDetails } from './scraper.ts';

const scrapeMonsters = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://thebazaar.wiki.gg/wiki/Monsters`, {
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

  await page.waitForSelector('div.mw-parser-output', { visible: true });

  const content = await page.evaluate((): MonsterDetails[] => {
    const sections = document.querySelectorAll('h3');
    if (!content) {
      return [
        {
          name: 'No name',
          link: 'No link',
          img: 'No image',
          rank: 'Bronze',
          appearsOn: 'No data',
        },
      ];
    }

    return Array.from(sections)
      .map((section) => {
        const day = section.textContent?.trim();
        const contentDiv = section.nextElementSibling;
        if (!contentDiv || !contentDiv.classList.contains('mw-collapsible')) {
          return [];
        }

        const monsters = contentDiv.querySelectorAll(
          'div.mw-collapsible-content > ul.gallery > li.gallerybox'
        );

        return Array.from(monsters).map((monster) => {
          const nameEle = monster.querySelector('div > div.thumb > div > a');
          const linkEle = monster.querySelector('div > div.gallerytext > a');
          const imgEle = nameEle?.querySelector('img');
          const rankEle =
            monster.parentElement?.previousElementSibling?.querySelector(
              'ul > li'
            );

          return {
            name: nameEle ? nameEle.getAttribute('title')?.trim() : 'No name',
            link: linkEle
              ? `https://thebazaar.wiki.gg${linkEle
                  .getAttribute('href')
                  ?.trim()}`
              : 'No link',
            img: imgEle ? imgEle.src : 'No image',
            rank: rankEle ? rankEle.textContent?.trim() : 'No rank',
            appearsOn: day,
          } as MonsterDetails;
        });
      })
      .flat();
  });

  try {
    await db.insert(monstersTable).values(content);
    console.log('inserted');
  } catch (error) {
    console.log('Caught error', error);
  }

  await browser.close();
};

await scrapeMonsters();

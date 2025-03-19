import puppeteer from 'puppeteer';
import db from '../src/db/index.ts';
import { monstersTable } from '../src/db/schema.ts';
import { MonsterDetails } from './monsterDetail.ts';

const monsterNames = async () => {
  const ua =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.3';
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setUserAgent(ua);
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
    const sections = document.querySelectorAll('h2:has(+div)');
    if (!sections.length) {
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
        const contentDiv =
          section.nextElementSibling?.querySelector('table > tbody');
        if (!contentDiv) {
          return [];
        }

        const monsters = contentDiv.querySelectorAll('tr > td');

        return Array.from(monsters).map((monster) => {
          const nameEle = monster.querySelector('p > a');
          const linkEle = monster.querySelector('p > a');
          const imgEle = monster.querySelector(
            'div > div.floatnone > a > img'
          ) as HTMLImageElement;
          const rankEle = monster.querySelector('div')?.getAttribute('style');

          return {
            name: nameEle ? nameEle.getAttribute('title')?.trim() : 'No name',
            link: linkEle
              ? `https://thebazaar.wiki.gg${linkEle
                  .getAttribute('href')
                  ?.trim()}`
              : 'No link',
            img: imgEle ? imgEle.src : 'No image',
            rank: rankEle
              ? rankEle.includes('#B87333')
                ? 'Bronze'
                : rankEle.includes('D8D8D8')
                ? 'Silver'
                : 'Gold+'
              : 'No rank',
            appearsOn: day,
          } as MonsterDetails;
        });
      })
      .flat();
  });

  try {
    await db.insert(monstersTable).values(content);
    console.log(content);
    console.log('inserted');
  } catch (error) {
    console.log('Caught error', error);
  }

  await browser.close();
};

await db.delete(monstersTable);
await monsterNames();

import puppeteer from 'puppeteer';
import db from '../src/db/index.ts';
import { itemTable } from '../src/db/schema.ts';

type Items = {
  name: string;
  img: string;
  effect: string;
  cooldown: string;
  ammo: string;
  types: string;
  size: 'Small' | 'Medium' | 'Large';
  hero: string;
};

type MultipleItems = {
  smallItems: Items[];
  mediumItems: Items[];
  largeItems: Items[];
};

const itemScraper = async (hero: string) => {
  const ua =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.3';
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent(ua);
  await page.goto(`https://thebazaar.wiki.gg/wiki/${hero}`, {
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
    '#mw-content-text > div.mw-content-ltr.mw-parser-output > h2 > span.mw-headline',
    { visible: true }
  );

  const items = await page.evaluate((hero): MultipleItems => {
    const content = document.querySelector(
      '#mw-content-text > div.mw-content-ltr.mw-parser-output'
    );
    if (!content) {
      throw new Error('No content');
    }
    const small = content
      .querySelector('#Small_Items')
      ?.parentElement?.nextElementSibling?.querySelectorAll('tbody > tr');
    const medium = content
      .querySelector('#Medium_Items')
      ?.parentElement?.nextElementSibling?.querySelectorAll('tbody > tr');
    const large = content
      .querySelector('#Large_Items')
      ?.parentElement?.nextElementSibling?.querySelectorAll('tbody > tr');

    if (!small || !medium || !large) {
      throw new Error('Items not found');
    }

    const smallItems = Array.from(small).map((section): Items => {
      const data = section.querySelectorAll('td');

      const name = data[0].querySelector('div > a')?.getAttribute('title');
      const img = data[0].querySelector<HTMLImageElement>('div > a > img');
      const effect = data[1].textContent?.trim().replaceAll('.', '. ');
      const cooldown = data[2].textContent?.trim();
      const ammo = data[3].textContent?.trim();
      const types = data[4].textContent?.trim();

      return {
        name: name ? name : 'No name',
        img: img ? img.src : 'No image',
        effect: effect ? effect : 'No effect',
        cooldown: cooldown ? cooldown : 'No cooldown',
        ammo: ammo ? ammo : 'No ammo',
        types: types ? types : 'No types',
        size: 'Small',
        hero: hero ? hero : 'No hero',
      };
    });

    const mediumItems = Array.from(medium).map((section): Items => {
      const data = section.querySelectorAll('td');

      const name = data[0].querySelector('div > a')?.getAttribute('title');
      const img = data[0].querySelector<HTMLImageElement>('div > a > img');
      const effect = data[1].textContent?.trim().replaceAll('.', '. ');
      const cooldown = data[2].textContent?.trim();
      const ammo = data[3].textContent?.trim();
      const types = data[4].textContent?.trim();

      return {
        name: name ? name : 'No name',
        img: img ? img.src : 'No image',
        effect: effect ? effect : 'No effect',
        cooldown: cooldown ? cooldown : 'No cooldown',
        ammo: ammo ? ammo : 'No ammo',
        types: types ? types : 'No types',
        size: 'Medium',
        hero: hero ? hero : 'No hero',
      };
    });

    const largeItems = Array.from(large).map((section): Items => {
      const data = section.querySelectorAll('td');

      const name = data[0].querySelector('div > a')?.getAttribute('title');
      const img = data[0].querySelector<HTMLImageElement>('div > a > img');
      const effect = data[1].textContent?.trim().replaceAll('.', '. ');
      const cooldown = data[2].textContent?.trim();
      const ammo = data[3].textContent?.trim();
      const types = data[4].textContent?.trim();

      return {
        name: name ? name : 'No name',
        img: img ? img.src : 'No image',
        effect: effect ? effect : 'No effect',
        cooldown: cooldown ? cooldown : 'No cooldown',
        ammo: ammo ? ammo : 'No ammo',
        types: types ? types : 'No types',
        size: 'Large',
        hero: hero ? hero : 'No hero',
      };
    });

    return {
      smallItems,
      mediumItems,
      largeItems,
    };
  }, hero);

  try {
    await db.insert(itemTable).values(items.smallItems);

    await db.insert(itemTable).values(items.mediumItems);

    await db.insert(itemTable).values(items.largeItems);
    console.log('inserted');
  } catch (error) {
    console.log('Caught error', error);
  }

  await browser.close();
};

const iterateHeroesItems = async () => {
  await db.delete(itemTable);
  console.log('Starting');
  const heroes = [
    'Dooley_Items',
    'Mak_Items',
    'Stelle_Items',
    'Pygmalien_Items',
    'Jules_Items',
    'Vanessa_Items',
    'Monster_Items',
  ];

  for (const hero of heroes) {
    try {
      console.log('hero:', hero);
      await itemScraper(hero);
    } catch (error) {
      console.log('error in iteration', error);
    }
  }
};

await iterateHeroesItems();
process.exit(1);

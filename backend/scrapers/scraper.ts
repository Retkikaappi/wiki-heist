import puppeteer from 'puppeteer';
import fs from 'fs';

export type SkillData = {
  sprite: string;
  name: string;
  effects: string;
  startingTier: string;
  types: string;
};

export type itemsData = {
  sprite: string;
  name: string;
  effects: string;
  cooldown: string;
  ammo: string;
  types: string;
  size: string;
};

export type MonsterDetails = {
  name: string;
  link: string;
  img: string;
  rank: 'Bronze' | 'Silver' | 'Gold+';
  appearsOn: string;
};
const fetchSkillsItems = async (monster: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(monster, {
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

  const tablesLength = await page.evaluate(() => {
    const tables = document.querySelectorAll('.wikitable.sortable');
    return Object.entries(tables).length || 0;
  });

  if (!tablesLength) {
    throw new Error('No tables to extract, monster: ' + monster);
  }

  let skillsData: SkillData[] = [];
  if (tablesLength === 2) {
    skillsData = await page.evaluate(() => {
      const skillsTable = document.querySelector('.wikitable.sortable');
      if (!skillsTable) return [];
      const skillRows = skillsTable.querySelectorAll('tbody tr');
      return Array.from(skillRows).map((row) => {
        const columns = row.querySelectorAll('td');
        return {
          sprite: columns[0]?.querySelector('img')?.src || 'No sprite',
          name: columns[1]?.innerText.trim(),
          effects: columns[2]?.innerText.trim(),
          startingTier: columns[3]?.innerText.trim(),
          types: columns[4]?.innerText.trim(),
        };
      });
    });
  }

  const itemsData: itemsData[] = await page.evaluate((length) => {
    const tables = document.querySelectorAll('.wikitable.sortable');
    const itemsTable = length > 1 ? tables[1] : tables[0];
    const itemRows = itemsTable.querySelectorAll('tbody tr');
    return Array.from(itemRows).map((row) => {
      const columns = row.querySelectorAll('td');
      return {
        sprite: columns[0]?.querySelector('img')?.src || 'No sprite',
        name: columns[1]?.innerText.trim(),
        effects: columns[2]?.innerText.trim(),
        cooldown: columns[3]?.innerText.trim(),
        ammo: columns[4]?.innerText.trim(),
        types: columns[5]?.innerText.trim(),
        size: columns[6]?.innerText.trim(),
      };
    });
  }, tablesLength);

  const monsterImage = await page.evaluate(() => {
    const img = document.querySelector<HTMLImageElement>(
      'img.pi-image-thumbnail'
    );
    return img ? img.src : 'No image found';
  });

  const boardImage = await page.evaluate(() => {
    const img = document.querySelector<HTMLImageElement>(
      'div.mw-parser-output > p > a > img'
    );
    return img ? img.src : 'No board found';
  });

  const monsterName = await page.evaluate(() => {
    const name = document.querySelector('h1.firstHeading');
    return name ? name.textContent : 'No name';
  });

  const data = {
    name: monsterName,
    link: monster,
    image: monsterImage,
    skills: skillsData,
    items: itemsData,
    boardImage,
  };

  await browser.close();
  return data;
};

const fetchAllMonsterData = async () => {
  const allMonsterData = [];

  const data = fs.readFileSync('./data/monsterDetails.json', 'utf-8');
  const monstersData = (await JSON.parse(data)) as MonsterDetails[];
  const monsters = monstersData.map((e) => e.link);

  for (const monster of monsters) {
    try {
      console.log('monster: ', monster);
      const data = await fetchSkillsItems(monster);
      allMonsterData.push(data);
    } catch (error) {
      console.log('error', error);
    }
  }

  console.log('all data', allMonsterData.length);

  fs.writeFileSync(
    './data/allMonsterData.json',
    JSON.stringify(allMonsterData, null, 2)
  );
};

await fetchAllMonsterData();
process.exit();

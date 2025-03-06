import puppeteer from 'puppeteer';
import db from '../src/db/index.ts';
import {
  monsterDetailsTable,
  monsterItems,
  monsterSkills,
  monstersTable,
} from '../src/db/schema.ts';

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

export type MonsterDetailTableEntry = {
  name: string;
  boardImage: string;
  skills: SkillData[];
  items: itemsData[];
};

export type MonsterDetails = {
  name: string;
  link: string;
  img: string;
  rank: 'Bronze' | 'Silver' | 'Gold+';
  appearsOn: string;
};
const fetchSkillsItems = async (
  monster: string
): Promise<MonsterDetailTableEntry> => {
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
    return name?.textContent ? name.textContent?.trim() : 'No name';
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
  const monsters = await db
    .select({ link: monstersTable.link })
    .from(monstersTable);

  await db.delete(monsterSkills);
  await db.delete(monsterItems);
  await db.delete(monsterDetailsTable);

  for (const monster of monsters) {
    try {
      console.log('monster: ', monster.link);
      const data = await fetchSkillsItems(monster.link);
      const [{ monsterId }] = await db
        .insert(monsterDetailsTable)
        .values({ name: data.name, boardImage: data.boardImage })

        .returning({ monsterId: monsterDetailsTable.id });

      for (const skill of data.skills) {
        await db.insert(monsterSkills).values({
          ...skill,
          monsterId,
        });
      }

      for (const item of data.items) {
        await db.insert(monsterItems).values({
          ...item,
          monsterId,
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  }
};

await fetchAllMonsterData();
process.exit();

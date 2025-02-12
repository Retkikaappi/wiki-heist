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
const fetchSkillsItems = async (monster: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://thebazaar.wiki.gg/wiki/${monster}`, {
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

  const itemsData: itemsData[] = await page.evaluate(() => {
    const tables = Object.entries(
      document.querySelectorAll('.wikitable.sortable')
    ).length;
    const itemsTable =
      tables > 1
        ? document.querySelectorAll('.wikitable.sortable')[1]
        : document.querySelectorAll('.wikitable.sortable')[0];
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
  });

  const monsterImage = await page.evaluate(() => {
    const img = document.querySelector<HTMLImageElement>(
      'img.pi-image-thumbnail'
    );
    return img ? img.src : 'No image found';
  });

  const data = {
    name: monster,
    image: monsterImage,
    skills: skillsData,
    items: itemsData,
  };

  await browser.close();
  return data;
};

const fetchAllMonsterData = async (monsters: string[]) => {
  const allMonsterData = [];

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

await fetchAllMonsterData([
  'Banannabal',
  'Fanged Inglet',
  'Haunted Kimono',
  'Coconut Crab',
  'Giant Mosquito',
  'Covetous Thief',
  'Boarrior',
  'Rogue Scrapper',
  'Dabbling Apprentice',
  'Tempest Flamedancer',
  'Frost Street Challenger',
  'Eccentric Etherwright',
  'Scout Trooper',
  'Boilerroom Brawler',
  'Outlands Dervish',
  'Bloodreef Raider',
  'Retiree',
  'Deadly Crooner',
  'Flame Juggler',
  'Techno Virus',
  'Hydrodude',
  'Preening Duelist',
  'Sabretooth',
  'Hakurvian Rocket Trooper',
  'Infernal Envoy',
  'Gorgon Noble',
  'Mod Squad',
  'Trashtown Mayor',
  'Dire Inglet',
  'Dire Mosquito',
  'Zookeeper',
  'Foreman',
  'Trash Golem',
  'Enclave Weeper',
  'Loan Shark',
  'Infernal',
  'Lich',
  'Sergeant Suds',
  'Viper Tyrant',
  'Cosmic Roc',
  'Joyful Jack',
  'Thug',
  'Chilly Charles',
  'Shock Trooper',
  'Treasure Turtle',
  'Radiant Corsair',
  'Infernal Frigate',
  'Oasis Guardian',
  'Car Conductor',
  'Burninator Bot',
  'Dr. Vortex',
  'Robo-Bouncer',
  'Wandering Shoal',
  'Bloodreef Captain',
  'Elite Duelist',
  'Ferros Khan',
  'Roaming Isle',
  'Weapons Platform',
  'Enclave Revenant',
  'Death Knight Reaper',
  'Boss Harrow',
  'Hulking Experiment',
  'Master Alchemist',
  'Property Baron',
  'Trash Titan',
  'Frost Street Champion',
  'Volkas Enforcer',
  'Lord of the Wastes',
  'Void Golem',
  'Awakened District',
  'Lord Arken',
  'Veteran Octopus',
  'Void Colossus',
]);
process.exit();

import puppeteer from 'puppeteer';
import fs from 'fs';

type EventData = {
  image: string;
  description: string;
  functions: string[];
};

const scrapeEvents = async (event: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://thebazaar.wiki.gg/wiki/${event}`, {
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

  const content: EventData = await page.evaluate(() => {
    const content = document.querySelector('div.mw-parser-output');
    if (!content) {
      return {
        image: 'No image',
        description: 'No description',
        functions: ['No functions'],
      };
    }

    const img = content.querySelector<HTMLImageElement>('img.thumbimage');
    const image = img ? img.src : 'No image';

    const desc = content.querySelectorAll('p');
    const description = desc[1] ? desc[1].innerText.trim() : 'No description';

    const list = content.querySelectorAll<HTMLDataListElement>('ul > li');
    const listItems = list
      ? Array.from(list).map((e) => e.innerText.trim())
      : ['No functions'];

    const data = {
      image,
      description,
      functions: listItems,
    };

    return data;
  });

  const retval = {
    ...content,
    name: event,
  };
  await browser.close();
  console.log(content.description, event);
  return retval;
};

const fetchEvents = async (events: string[]) => {
  const eventData = [];
  for (const event of events) {
    try {
      const data = await scrapeEvents(event);
      eventData.push(data);
    } catch (error) {
      console.log('error scraping', error);
    }
  }
  console.log('done');

  fs.writeFileSync('./data/eventData.json', JSON.stringify(eventData, null, 2));
};

await fetchEvents([
  'A_Strange_Mushroom',
  'Aerodrome',
  'Artisan_Dunes',
  'BazaarCON',
  'Bounty_Hunters_Event',
  'Candy_Stash',
  'Dabora',
  'Dooley’s_Workshop',
  'Eating_Contest',
  'Economic_Seminar',
  "Finn's_Big_Bite",
  'Form',
  'Genie_Lamp_Event',
  'Gumball_Machine_Event',
  'Haddy',
  'Invest_in_Yourself',
  'Investment_Pitch',
  'Jule’s_Cafe',
  'Jungle_Ruins',
  'Likit',
  'Mountain_Pass',
  'Mysterious_Portal',
  'Shrouded_Figure',
  'Street_Festival',
  'Study',
  'The_Cult',
  'The_Docks',
  'The_Lost_Crate',
  'Thieves_Guild_Medallion_Event',
  'Treasure_Chest',
  'Utility_Box',
]);

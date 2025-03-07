import puppeteer from 'puppeteer';
import db from '../src/db/index.ts';
import { eventDetailsTable } from '../src/db/schema.ts';

type EventData = {
  name: string;
  img: string;
  description: string;
  functions: string;
};

const scrapeEvents = async (link: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(link, {
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
    const nameSpan = document.querySelector('#firstHeading > span');
    if (!content || !nameSpan) {
      return {
        name: 'No name',
        img: 'No image',
        description: 'No description',
        functions: 'No functions',
      };
    }

    const image = content.querySelector<HTMLImageElement>('img.thumbimage');
    const img = image ? image.src : 'No image';

    const desc = content.querySelectorAll('p');
    const description = desc[1] ? desc[1].innerText.trim() : 'No description';

    const list = content.querySelectorAll<HTMLDataListElement>('ul > li');
    const listItems = list
      ? Array.from(list)
          .map((e) => e.innerText.trim())
          .join('--')
      : 'No functions';

    const name = nameSpan.textContent?.trim()
      ? nameSpan.textContent?.trim()
      : 'No name';

    const data = {
      name,
      img,
      description,
      functions: listItems,
    };

    return data;
  });

  await browser.close();
  return content;
};

const fetchEvents = async () => {
  const events = await db.query.eventsTable.findMany({
    columns: {
      link: true,
    },
  });
  await db.delete(eventDetailsTable);
  try {
    const eventData = [];
    for (const event of events) {
      try {
        console.log(event.link);

        const data = await scrapeEvents(event.link);
        eventData.push(data);
      } catch (error) {
        console.log('error scraping', error);
      }
    }
    await db.insert(eventDetailsTable).values(eventData);
    console.log('done');
  } catch (error) {
    console.log(error);
  }
};

await fetchEvents();

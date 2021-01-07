
const puppeteer = require('puppeteer');


async function scrapeLazadaProduct() {
const obj = {}
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });
  const page = await browser.newPage();
  await page.goto('https://www.lazada.com.ph/products/shockproof-armor-case-for-oppo-a52-a92-a12-a12e-a7-a5-a5s-a3s-a9-2020-a5-2020-soft-frame-clear-hard-pc-cover-phone-case-i1389432301-s5147118212.html?spm=a2o4l.home.flashSale.2.45d8359dI1ziTm&search=1&mp=1&c=fs&clickTrackInfo=%7B%22rs%22%3A%220.06791884572697003%22%2C%22prior_score%22%3A%220%22%2C%22submission_discount%22%3A%2257%25%22%2C%22iss%22%3A%220.06791884572697003%22%2C%22type%22%3A%22entrance%22%2C%22prior_type%22%3A%22racing%22%2C%22userid%22%3A%22%22%2C%22sca%22%3A%224%22%2C%22hourtonow%22%3A%2215%22%2C%22abid%22%3A%22196393%22%2C%22itemid%22%3A%221389432301_0_racing_0.06791884572697003_0.06791884572697003%22%2C%22pvid%22%3A%228699669b-e3dd-4016-ae62-4316ca81b226%22%2C%22pos%22%3A%220%22%2C%22rms%22%3A%220.0%22%2C%22scm%22%3A%221007.17760.196393.%22%2C%22ss%22%3A%220.06791884572697003%22%2C%22i2i%22%3A%220.0%22%2C%22ms%22%3A%220.06791884572697003%22%2C%22itr%22%3A%220.08235294117647059%22%2C%22mt%22%3A%22racing%22%2C%22its%22%3A%22680%22%2C%22promotion_price%22%3A%2289.00%22%2C%22anonid%22%3A%22a1006c7b-d5a9-463a-b557-c7fa90f0a63b%22%2C%22FinalScore%22%3A%220.060645200312137604%22%2C%22isc%22%3A%2256%22%2C%22iss2%22%3A%220.5851223774623883%22%2C%22data_type%22%3A%22flashsale%22%2C%22iss1%22%3A%220.056%22%2C%22config%22%3A%22%22%2C%22HP_score%22%3A%220.060645200312137604%22%2C%22channel_id%22%3A%220000%22%7D&scm=1007.17760.196393.0');

  try {
    const [mainImg] = await page.$x(`//*[@id="module_item_gallery_1"]/div/div[1]/div/img`);
    const mainImgRaw = await mainImg.getProperty('src');
    const mainImgFinal = await mainImgRaw.jsonValue();

    console.log(mainImgFinal);
  } catch (error) {
console.log(error);
  }
  //browser.close();
}

scrapeLazadaProduct();


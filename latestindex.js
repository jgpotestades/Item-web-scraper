const express = require('express');
const {send} = require('process');
const puppeteer = require('puppeteer');
const app=express();
app.use(express.urlencoded({extended: false}));

async function scrapeLazada(url) {

  var flashSale = []; //array
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });
  const page = await browser.newPage();
  
  await page.goto(url/*'https://www.lazada.com.ph/'*/);

  const imgs = await page.$$eval('.card-fs-content-body-unit hp-mod-card-hover J_FSItemUnit', imgs => imgs.map(img => img.getAttribute('src')));
  console.log(imgs);

  var loopNumber = (await page.$$('.card-fs-content-body-unit')).length;
  for (var i = 1; i < loopNumber; i++) {
    const obj = {};

//console.log(loopNumber);

    try {
   
      const [imgSrc] = await page.$x(`//*[@id="hp-flash-sale"]/div[2]/div[2]/a[${i}]/div[1]/img`);
      const src = await imgSrc.getProperty('src');
      const imageLink = await src.jsonValue();
      obj.imgLink = imageLink;

      const [productName] = await page.$x(`//*[@id="hp-flash-sale"]/div[2]/div[2]/a[${i}]/div[2]/div[1]/text()`);
      const rawProductName = await productName.getProperty('textContent');
      const productNameFinal = await rawProductName.jsonValue();
      obj.productName = productNameFinal;

      const [productPrice] = await page.$x(` //*[@id="hp-flash-sale"]/div[2]/div[2]/a[${i}]/div[2]/div[2]/span[2]`);
      const rawProductPrice = await productPrice.getProperty('textContent');
      const productPriceFinal = await rawProductPrice.jsonValue();
      obj.productPrice = productPriceFinal;


      flashSale.push(obj)
    } catch (error) {
      console.log(error);
    }
  }

  const lazadaLandingPage = {
    'flash-sale': flashSale
  }

  console.log(lazadaLandingPage);
  
//  browser.close();

}
//scrapeLazada();

app.listen(process.env.PORT || 3000, ()=>{
  console.log('Listening to Port 3000..')
});

app.get('/',(req,res) => {
  async function getData(){
    var url = 'https://www.lazada.com.ph/';
    await scrapeLazada(url);

   // await res.send(lazadaLandingPage);
   // browser.close();
  }
  getData();
})
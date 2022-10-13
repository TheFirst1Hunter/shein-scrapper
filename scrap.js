const puppeteer = require("puppeteer");
const url = "";
module.exports.fetchD = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(10000000);

  await page.goto(url);

  const f = await page.$("[class='original']");
  let text;
  //obtain text
  if (f) {
    text = await (await f.getProperty("textContent")).jsonValue();
    console.log("price: " + text);
  }

  const discountedPrice = await page.$("[class='discount']");

  if (discountedPrice) {
    text = await (await discountedPrice.getProperty("textContent")).jsonValue();
    console.log("price: " + text);
  }

  await page.waitForSelector("[class='j-verlok-lazy loaded']");
  const imgSrc = await page.$eval("[class='j-verlok-lazy loaded']", (el) =>
    el.getAttribute("src")
  );

  const imageLink = imgSrc.slice(2);
  console.log("image:" + imageLink);

  const product = await page.$("[class='product-intro__head-name']");
  const productName = await (
    await product.getProperty("textContent")
  ).jsonValue();

  console.log("product name:" + productName);

  const sku = await page.$("[class = product-intro__head-sku]");
  const skuName = await (await sku.getProperty("textContent")).jsonValue();

  console.log("sku" + skuName);
  //   console.log(await image.getProperty("src"));
  await browser.close();

  return {
    skuName,
    imageLink,
    productName,
    price: text,
  };
};

const puppeteer = require('puppeteer');
const URL = 'https://www.google.com/maps/d/u/0/viewer?mid=1L2l1EnQJhCNlm_Xxkp9RTjIj68Q&ll';
(async() => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(URL), {waitUntil: "domcontentloaded"};

    // 対象のリンクを取得（全拠点のdomを取得）
    const positonBase = [];
    const baseSelector = await page.$$('.HzV7m-pbTTYe-ibnC6b-V67aGc');
    for (const individualBase of baseSelector) {
        positonBase.push(await individualBase.$('.suEOdc'));
    }

    // 最初に隠れている拠点箇所を表示
    await page.click('.HzV7m-pbTTYe-bN97Pc-ti6hGc-z5C9Gb');
    await page.waitFor(500);

    // 拠点数を取得
    const baseLength = (await page.$$('.pbTTYe-ibnC6b-Bz112c')).length
    for(var i = 0; i < baseLength; i++){

      // オブジェクトを作成する
      let data_obj = new Object();

      // 対象のリンクをクリック
      await positonBase[i].click();

      // 画像パスを取得
      var image = await page.$eval('.pbTTYe-ibnC6b-Bz112c > img', item => {
          return item.getAttribute('src');
      });
      // console.log(image);
      data_obj.image = image;
  
      // 名前取得
      var nameText = await page.$eval('.qqvbed-p83tee-lTBxed', item => {
          return item.textContent;
      });
      // console.log(nameText);
      data_obj.name = nameText;


      // サブウィンドウを閉じる処理
      await page.waitFor(500);
      // 緯度と経度
      let position = await page.url().match(/(\d+\.\d+)/g);
      // console.log(position[0]);
      // console.log(position[1]);
      data_obj.longitude = position[0];
      data_obj.latitude = position[1];
      
      const buttonSelectors = await page.$$('.HzV7m-tJHJj-LgbsSe-haAclf.qqvbed-a4fUwd-LgbsSe-haAclf');
      for (const buttonSelector of buttonSelectors) {
          const button = await buttonSelector.$('span.Ce1Y1c');
          const buttonHTML = await buttonSelector.getProperty('innerHTML');
          const buttonValue = await buttonHTML.jsonValue();
          if (buttonValue.indexOf('aria-label="戻る"') !== -1) {
              await button.click();
              break;
          }
      }
      console.log(data_obj);
      console.log(',');
      await page.waitFor(500);
    }
    browser.close();
})();
import puppetteer from 'puppeteer';
describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  jest.setTimeout(30000);
  
  beforeAll(async () => {
    browser = await puppetteer.launch({
      headless: false, // show gui
      //slowMo: 250,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
    

  });

  afterEach(async () => {
    await browser.close();
});

  test('Valid', async ()=>{
    await page.goto('http://localhost:9000');
    const input = await page.$('#cardNumber');
    await input.click({ clickCount: 3 }); // выделить весь текст
    await input.type('4111111111111111');
    const button = await page.$('#validateBtn');
    await button.click();
    const resultDiv = await page.$('#validationResult');
    const message = await (await resultDiv.getProperty('textContent')).jsonValue();
    console.log(`Сообщение: ${message}`);
    if (message.includes('Карта валидна')) {
            console.log(`Тест для номера 4111111111111111 прошёл успешно`);
    } else {
            console.error(`Тест для номера 4111111111111111 не прошёл`);
    }

    await input.click({ clickCount: 3 }); // выделить весь текст
    await input.type('41111111111111');
    await button.click();
    const message2 = await (await resultDiv.getProperty('textContent')).jsonValue();
    console.log(`Сообщение: ${message2}`);
    if (message2.includes('Неверный номер')) {
            console.log(`Тест для номера 41111111111111 прошёл успешно`);
    } else {
            console.error(`Тест для номера 41111111111111 не прошёл`);
    }

  })


});
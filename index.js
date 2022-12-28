const puppeteer = require("puppeteer");
const express = require("express");
const path = require('path')
require('dotenv').config()
let ejs = require('ejs');
const app = express();

app.get("/", async (req, res) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const filePath = path.join(__dirname, "views", "table.ejs")
        const html = await ejs.renderFile(filePath);
        // await page.setContent('Hi, বাংলাাদেশ স্বাধীন রাষ্ট্র');
        await page.setContent(html);


        const headerTemplate = `<section style=" width: 100%; "><div style="font-size: 8px;  width: 100%;" class="date"></div><div style="font-size: 30px; width: 100%; text-align:center; height: 200px; background-color: black; color: white; margin: 20px;">মাদ্রাসা উমর (রাঃ)</div></section>`;
        const pdf = await page.pdf({
            //   path: "output_express.pdf",   // save file to file system
            format: "A4",
            margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
            displayHeaderFooter: true,
            headerTemplate,
            footerTemplate: '<div style="font-size: 30px; width: 200px; height: 200px; background-color: black; color: white; margin: 20px;" class="nbPages">Page <span class="pageNumber"></span>/ <span class="totalPages"></span></div>'
            //   ,printBackground: true
        });

        console.log("done pdf");
        await browser.close();
        res.writeHead(200, { 'Content-Type': 'application/pdf' })
        res.end(pdf);
        // process.exit();
    } catch (error) { console.log(error) }
});

app.listen(process.env.Port, () => {
    console.log('server in 3000')
});

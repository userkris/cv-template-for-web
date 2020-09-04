# CV Template for Web
Simple **CV**(Curriculum Vitae) template for Web. Supports multiple languages.
Please see [demo here.](https://kodekris.com/demo/cv-template-for-web/)

## How to Use
[Node.js](https://nodejs.org/en/) required.
- Run ```npm install``` in **package.json** directory to install dependencies
- Make your **data.json** file with your CV content. Use **./data/data.json** as a template
- Run ```npm run dev``` and check your CV on **localhost:1234** via browser to make sure it looks OK
- Run ```npm run dist``` to build minified version
- Copy everything from **./dist/** in your web server's directory

You can also add your assets in **./data/assets.json** or update template's HTML and CSS to your preference

## Data JSON
**./data/data.json** has all the content and settings for the application.

```settings:```
- ```siteName: 'My Site'``` : part of the title for the page e.g. **Jon | *My Site***
- ```multiLang: true/false``` : toggle multilingual mode, **false** - shows default language option only
- ```langDefault: 'en'``` : sets default language
- ```langAvailable: [ { flag: '🇬🇧', name: 'English', code: 'en' } ]``` : array of available languages
- ```backToSite: { url: 'http://example.com', text: { en: 'Back to site' } }``` : basically anchor directs to e.g your homepage

## Assets JSON
**./data/assets.json** contains *skills* to demonstrate in CV.\
Designed to setup asset as a reference in a file and use it multiple times.

```languages``` : contains programming languages, URLs, and colors. Inspired by [ozh/github-colors](https://github.com/ozh/github-colors)

```systems``` : contains URLs and images encoded in base64 e.g. Node.js, MySQL etc.\
Images are 64x64 PNG files.

## Template
**./data/template/** contains **template.html** and **style.css** files. HTML has Vue.js syntax.


## NPM commands
```npm run dist``` : makes new directory **./dist** with all files minified, ready for Web Server\
```npm run dist:clear``` : removes **./dist** directory\
```npm run dev``` : makes new directory **./dev** and run HTTP server on **localhost:1234**\
```npm run dev:clear``` : removes **./dev** directory\
```npm run dev:createHtmlOnly``` : makes **./src/index.html** without starting HTTP server

## Dependencies
- ```parcel": ^1.12.4```
- ```nodemon": ^2.0.4```
- ```vue: ^2.6.11```
- ```del: ^5.1.0```

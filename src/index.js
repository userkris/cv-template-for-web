const fs = require('fs');
const buildIndexHtmlString = require('./build-index-html-string.js');
const Data = require('../data/data.json');

function title() {
  let name = '';
  let siteName = '';
  let lang = 'en';
  if (Data && Data.settings && Data.settings.langDefault) {
    lang = Data.settings.langDefault ? Data.settings.langDefault : 'en';
  }
  if (Data && Data.name) {
    name = Data.name ? Data.name[lang] : '';
  }
  if (Data && Data.settings && Data.settings.siteName) {
    siteName = Data.settings.siteName ? ' | ' + Data.settings.siteName : '';
  }
  return name + siteName;
}
function description() {
  let description = '';
  let lang = 'en';
  if (Data && Data.settings && Data.settings.langDefault) {
    lang = Data.settings.langDefault;
  }
  if (Data && Data.profile && Data.profile.text) {
    description = Data.profile.text[lang];
  }
  return description;
}

const index = buildIndexHtmlString({
  lang: Data && Data.settings ? Data.settings.langDefault || 'en' : 'en',
  title: title(),
  favicon: './favicon/',
  meta: [
    { name: 'description',    content: description(), },
  ],
  og: [
    { property: 'og:title',       content: title() },
    { property: 'og:description', content: description() },
    { property: 'og:type',        content: 'website' },
    { property: 'og:image',       content: './favicon/android-chrome-256x256.png' },
  ],
  style: [
    'https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap',
  ],
  body: {
    class: 'no-scroll',
    noscript: 'JavaScript required to run this application.',
    innerHTML: [
      '<div id="load"></div>',
      '<div id="app"></div>',
    ],
    scriptBottom: [
      { src: './main.js', minimizedAttributes: 'defer' },
    ],
  },
});

fs.writeFile('./src/index.html', index, (err) => {
  if (err) throw err;
});

import './css/minimal-css-reset.css';
import '../data/template/style.css';
import Vue from 'vue/dist/vue.min.js';
import Data from '../data/data.json';
import Assets from '../data/assets.json';
import Template from '../data/template/template.html';

const content = Data;
if (!content.settings || typeof(content.settings) !== 'object') {
  content.settings = {};
  content.settings.siteName = 'CV Template for Web';
  content.settings.langDefault = 'en';
}
content.assets = Assets;
content.lang = '';
content.show = true;
Vue.component('main-component', {
  data() { return content },
  mounted() {
    this.setLanguage();
  },
  methods: {
    setTitle(value = '- ') {
      let title = document.querySelector('title');
      if (!title) {
        title = document.createElement('title');
        document.querySelector('meta').appendChild(title);
      }
      title.innerHTML = this.settings.siteName ? `${value} | ${this.settings.siteName}` : value;
    },
    setLanguage(lang = this.settings.langDefault) {
      this.show = false;
      let available = false;
      if (this.settings.langAvailable) {
        this.settings.langAvailable.find((item) => {
          if (item.code === lang) {
            available = true;
          }
        })
      }
      if (!this.settings.langDefault) this.settings.langDefault = 'en';
      if (available === false) lang = this.settings.langDefault;
      this.lang = lang;
      document.querySelector('html').setAttribute('lang', lang);
      document.querySelector('main').classList.add('fade-in');
      if (this.name) this.setTitle(this.name[this.lang]);
      setTimeout(() => this.show = true, 300);
    },
    date(obj = {}) {
      if (obj.date) {
        if (obj.date[this.lang]) return obj.date[this.lang]
        if (obj.date[this.settings.langDefault]) return obj.date[this.settings.langDefault]
      }
      return null
    },
    renderAssets(arr = [], type = 'languages') {
      const assets = [];
      arr.forEach((item, i) => {
        let match = null;
        Object.keys(this.assets[type]).forEach((key, i) => {
          if (key === item) match = this.assets[type][key]
        });
        if (match) {
          match.name = item
          assets.push(match)
        } else {
          assets.push({ name: item, icon: null, color: 'var(--col-main)' })
        }

      });
      return assets
    },
    linkIcon(linkKey) {
      let icon = null
      Object.keys(this.assets.systems).forEach((key, i) => {
        if (key === linkKey) {
          icon = this.assets.systems[key].icon
        }
      });
      return icon
    },
    renderLang(obj = null) {
      if (obj) return obj[this.lang] ? obj[this.lang] : obj[this.settings.langDefault]
      return obj
    }
  },
  template: Template
});

const load = document.getElementById('load');
load.classList.add('transparent');
setTimeout( () => {
  document.getElementById('app').innerHTML = '<main-component/>';
  new Vue({ el: '#app' });
  load.style.display = 'none';
  document.querySelectorAll('body').forEach(body => {
    body.classList.remove('no-scroll');
  });

}, 500);

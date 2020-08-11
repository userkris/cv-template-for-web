module.exports = function buildIndexHtmlString(obj = {}) {
  function procArray(arr = [], template = '') {
    let res = '';
    arr.forEach((item) => {
      if (typeof(item) === 'string') {
        res = res + template.replace('%val', item);
      } else if (typeof(item) === 'object') {
        placeholders = template.match(/"%\..*?"/g);
        let keys = [];
        if (placeholders !== null) {
          placeholders.forEach((placeholder) => {
            keys.push(placeholder.replace(/["%.]/g, ''));
          });
        }
        let str = template;
        if (template.match('%.-minimizedAttributes') && item.minimizedAttributes) {
          str = template.replace('%.-minimizedAttributes', item.minimizedAttributes);
        } else {
          str = template.replace(' %.-minimizedAttributes', '');
        }
        keys.forEach((key) => {
          str = str.replace(`"%.${key}"`, `"${item[key]}"`);
        });
        res = res + str;
      }
    });
    return res;
  }
  function setScripts(scripts = []) {
    return procArray(scripts, '<script src="%.src" %.-minimizedAttributes></script>');
  }
  function def(val, def) {
    return val ? val : def;
  }
  function setCharset(val = 'utf-8') {
    return `<meta charset="${val}">`;
  }
  function setViewport(val = 'width=device-width, initial-scale=1.0') {
    return `<meta name="viewport" content="${val}">`;
  }
  function setTitle(val = null) {
    if (val) return `<title>${val}</title>`;
  }
  function setMeta(metas = []) {
    return procArray(metas, '<meta name="%.name" content="%.content">');
  }
  function setStyle(styles = []) {
    return procArray(styles, '<link rel="stylesheet" href="%val">');
  }
  function bodyStart(body = {}) {
    if (body.class) {
      return `<body class="${body.class}">`;
    } else {
      return `<body>`;
    }
  }
  function setNoScript(val = '') {
    if (val) return `<noscript>${val}</noscript>`;
    else return '';
  }
  function setInnerHtml(innerHTML = []) {
    return procArray(innerHTML, '%val');
  }
  function setScriptsTop(scripts = []) {
    return setScripts(scripts)
  }
  function setScriptsBottom(scripts = []) {
    return setScripts(scripts);
  }
  function setOg(og = []) {
    return procArray(og, '<meta property="%.property" content="%.content">');
  }
  function favicon(path = '/') {
    const order = [
      `<link rel="apple-touch-icon" sizes="180x180" href="${path}apple-touch-icon.png">`,
      `<link rel="icon" type="image/png" sizes="32x32" href="${path}favicon-32x32.png">`,
      `<link rel="icon" type="image/png" sizes="16x16" href="${path}favicon-16x16.png">`,
      `<link rel="manifest" href="${path}site.webmanifest">`,
      `<link rel="mask-icon" href="${path}safari-pinned-tab.svg" color="#5bbad5">`,
      `<meta name="msapplication-TileColor" content="#2b5797">`,
      `<meta name="theme-color" content="#ffffff">`,
    ]
    let res = '';
    order.forEach((item) => {
      res = res + item;
    });
    return res;
  }

  const order = [
    def(obj.doctype, '<!DOCTYPE html>'),
    `<html lang="${def(obj.lang, 'en')}" dir="${obj.dir, 'ltr'}">`,
    '<head>',
    setCharset(obj.charset),
    setViewport(obj.viewport),
    setMeta(obj.meta),
    setOg(obj.og),
    setTitle(obj.title),
    setStyle(obj.style),
    favicon(obj.favicon),
    '</head>',
    bodyStart(obj.body),
    setNoScript(obj.body.noscript),
    setScriptsTop(obj.body.scriptTop),
    setInnerHtml(obj.body.innerHTML),
    setScriptsBottom(obj.body.scriptBottom),
    '</body>',
    '</html>'
  ];

  let html = '';
  order.forEach((item) => {
    html = html + item;
  });
  return html;
}

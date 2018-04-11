// eslint-disable-next-line no-unused-vars
const removeCSS = type => {
  const elm = document.getElementById('show-youtube-' + type);
  elm && elm.parentNode.removeChild(elm);

  chrome.storage.sync.set({[type]: 'HIDE'});
};

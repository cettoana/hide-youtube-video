const hide = type => {
  chrome.tabs.executeScript({
    code: `removeCSS("${type}")`,
  });
};

const show = type => {
  // prevent duplicated insertCSS
  chrome.tabs.executeScript({
    code: `removeCSS("${type}")`,
  });
  chrome.tabs.executeScript({
    code: `insertCSS("${type}")`,
  });
};

const getClickHandler = type => () => {
  const btn = document.querySelector(`#btn-${type}`);
  const status = btn.innerHTML;

  if (status === 'HIDE') {
    show(type);
    btn.classList.add('show');
    btn.innerHTML = 'SHOW';
    return;
  }

  hide(type);
  btn.classList.remove('show');
  btn.innerHTML = 'HIDE';
};

const initBtn = type => {
  const btn = document.querySelector(`#btn-${type}`);

  chrome.storage.sync.get([type], result => {
    if (result[type] === 'SHOW') {
      btn.classList.add('show');
    }
    btn.innerHTML = result[type] || 'HIDE';
  });

  btn.addEventListener('click', getClickHandler(type));
};

document.addEventListener('DOMContentLoaded', () => {
  initBtn('video');
  initBtn('thumbnail');
});

const bypassCSS = {
  video: `
    video.video-stream {
      opacity: 1 !important;
    }

    .ytp-cued-thumbnail-overlay-image {
      opacity: 1;
    }

    .ytp-ce-covering-image {
      opacity: 1;
    }
  `,
  thumbnail: `
    ytd-thumbnail {
      opacity: 1;
    }

    ytd-playlist-video-thumbnail-renderer {
      opacity: 1;
    }

    .ytp-videowall-still-image {
      opacity: 1;
    }

    .ytp-videowall-still-info-content {
      opacity: 0 !important;
    }
  `,
};

// eslint-disable-next-line no-unused-vars
const insertCSS = type => {
  const style = document.createElement("style");
  style.id = 'show-youtube-' + type;
  style.innerHTML = bypassCSS[type];

  document.head.appendChild(style);

  chrome.storage.sync.set({[type]: 'SHOW'});
};

const MAX_STACKED_WIDTH = 700;
const MAX_TOTAL_WIDTH = 1200;
const ASPECT_RATIO = 630 / 1120;
const VIDEO_CHAT_RATIO = 3 / 4;
const MIN_CHAT_WIDTH = 295; // I think this is the point at which is starts to squish...

window.addEventListener("load", () => {
  const video = document.querySelector(".video-frame");
  const chat = document.querySelector(".chat");

  const fn = resize(video, chat);

  fn();

  window.addEventListener("resize", fn);
});

const resize = (video, chat) => () => {
  const window_width = window.innerWidth;

  const MAX = Math.min(MAX_TOTAL_WIDTH, window_width - 100);

  let vw;
  let vh;
  let cw;
  let ch;

  if (window_width <= 900) {
    vw = Math.min(window_width, MAX_STACKED_WIDTH);
    vh = vw * ASPECT_RATIO;
    cw = vw;
    ch = vh;
  } else {
    const totalWidth = Math.min(window_width - 30, MAX);
    vw = totalWidth * VIDEO_CHAT_RATIO;
    cw = totalWidth - vw;

    if (cw < MIN_CHAT_WIDTH) {
      cw = MIN_CHAT_WIDTH;
      vw = totalWidth - cw;
    }

    vh = vw * ASPECT_RATIO;
    ch = vh;
  }

  video.width = vw;
  video.height = vh;
  chat.width = cw;
  chat.height = ch;
}
const MAX_WIDTH = 1120;
const RATIO = 630 / 1120;

window.addEventListener("load", () => {
  const video = document.querySelector(".video");
  const chat = document.querySelector(".chat");

  const fn = resize(video, chat);

  fn();

  window.addEventListener("resize", fn);
});

const resize = (video, chat) => () => {
  const window_width = window.innerWidth;

  const w = Math.min(window_width, MAX_WIDTH);
  const h = RATIO * w;

  video.width = w;
  video.height = h;

  const cw = Math.min(window_width, 720);
  const ch = cw / 2;

  chat.width = cw;
  chat.height = ch;
}
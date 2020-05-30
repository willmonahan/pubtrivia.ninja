// these are constants that are used to calculate widths/heights for the video and the chat
const MAX_STACKED_WIDTH = 700;
const MAX_TOTAL_WIDTH = 1200;
const ASPECT_RATIO = 630 / 1120;
const VIDEO_CHAT_RATIO = 3 / 4;
const MIN_CHAT_WIDTH = 295; // I think this is the point at which is starts to squish...

// once the page loads, we start resizing the video and the chat
window.addEventListener("load", () => {
  const video = document.querySelector(".video-frame");
  const chat = document.querySelector(".chat");

  const fn = resize(video, chat); // pass the items we want to resize

  fn(); // resize on first load

  // add listener to resize on subsequent loads
  window.addEventListener("resize", fn);
});

const resize = (video, chat) => () => {
  // honestly i don't remember much of what i did in this function
  // so hopefully i don't have to modify it much in the future
  const window_width = document.documentElement.clientWidth || window.innerWidth;
  console.log(window_width);

  const MAX = Math.min(MAX_TOTAL_WIDTH, window_width - 100);

  let vw;
  let vh;
  let cw;
  let ch;

  // if the window width is small, we stack them
  // in this case, chat and video have the exact same dimensions
  if (window_width <= 900) {
    vw = Math.min(window_width, MAX_STACKED_WIDTH);
    console.log(vw);
    vh = vw * ASPECT_RATIO;
    cw = vw;
    ch = vh;
  } else {
    // otherwise, we figure out the total width
    // and in this case, the chat takes up 1/4 of the width
    // this is based on VIDEO_CHAT_RATIO
    // the 30 below is for the buffer between them
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
  console.log(video.width);
  video.height = vh;
  chat.width = cw;
  chat.height = ch;
}
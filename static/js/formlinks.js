const sock = io();

sock.on('links', (data) => {
  const classes = Object.keys(data);

  classes.forEach(function (c) {
    const link = document.getElementsByClassName(c)[0];
    const url = data[c] || '#';
    link.href = url;

    if (url === '#') {
      link.classList.remove('active');
      link.classList.add('inactive');
    } else {
      link.classList.remove('inactive');
      link.classList.add('active');
    }
  });
});
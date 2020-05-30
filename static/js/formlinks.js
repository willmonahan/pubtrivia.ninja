const sock = io();

// this handles the event where the socket receives a new set of links
// the server has a behavior which will sent this event the very first time the socket connects
sock.on('links', (data) => {
  const classes = Object.keys(data); // these are the classes of the links to update

  // we iterate through all the class names
  classes.forEach(function (c) {
    // get the appropriate element with the class name
    const link = document.getElementsByClassName(c)[0];
    const url = data[c] || '#'; // the url will be set to either the link, or (if it's blank) a # target
    link.href = url;

    // if the link is blank, we style it as "inactive" and remove the "target" (which opens in new tab)
    // otherwise, we do the opposite
    if (url === '#') {
      link.classList.remove('active');
      link.classList.add('inactive');
      link.removeAttribute('target');
    } else {
      link.classList.remove('inactive');
      link.classList.add('active');
      link.target = "_blank";
    }
  });
});
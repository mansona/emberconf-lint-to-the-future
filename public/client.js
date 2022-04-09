(function () {
  // don't emit events from inside the previews themselves
  if (window.location.search.match(/receiver/gi)) {
    return;
  }

  console.log('window.location.origin', window.location.origin);

  const socket = io.connect('http://localhost:1947');

  // var socket = io.connect( 'localhost:1947' );
  const socketId = Math.floor(Math.random() * 90000) + 10000;

  debugger;
  console.log(
    'View slide notes at ' + window.location.origin + '/notes/' + socketId
  );

  // window.open( window.location.origin + '/notes/' + socketId, 'notes-' + socketId );

  /**
   * Posts the current slide data to the notes window
   */
  function post() {
    var slideElement = Reveal.getCurrentSlide(),
      notesElement = slideElement.querySelector('aside.notes');

    var messageData = {
      notes: '',
      markdown: false,
      socketId: socketId,
      state: Reveal.getState(),
    };

    // Look for notes defined in a slide attribute
    if (slideElement.hasAttribute('data-notes')) {
      messageData.notes = slideElement.getAttribute('data-notes');
    }

    // Look for notes defined in an aside element
    if (notesElement) {
      messageData.notes = notesElement.innerHTML;
      messageData.markdown =
        typeof notesElement.getAttribute('data-markdown') === 'string';
    }

    console.log('about to statechanged', messageData);

    socket.emit('statechanged', messageData);
  }

  // When a new notes window connects, post our current state
  socket.on('new-subscriber', function (data) {
    post();
  });

  // When the state changes from inside of the speaker view
  socket.on('statechanged-speaker', function (data) {
    Reveal.setState(data.state);
  });

  // Monitor events that trigger a change in state
  Reveal.on('slidechanged', post);
  Reveal.on('fragmentshown', post);
  Reveal.on('fragmenthidden', post);
  Reveal.on('overviewhidden', post);
  Reveal.on('overviewshown', post);
  Reveal.on('paused', post);
  Reveal.on('resumed', post);

  // Post the initial state
  post();
})();

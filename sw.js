// importScripts('./templates.js');
// importScripts('./caches-polyfill.js');

var api = 'http://127.0.0.1:3000/bankapi/services/product';
var templates = this.templates;

this.oninstall = function(e) {
  e.waitUntil(Promise.all([
    updateContent(), updateApplication()
  ]));
};
this.onactivate = function() {
  setInterval(updateContent, 3*60*1000);
};

this.onfetch = function(e) {
  var url = e.request.url;
  var path = url.replace(location.origin, '');
  var guidMatches = path.match(/^\/article\/([0-9]+)\/?$/);
  var promise;

  if (path === '/') {
    promise = caches.match(new Request(api))
      .then(function(response) {
        return response.json();
      }).then(function(stories) {
        return new Response(templates.list(stories), { headers: { "Content-Type": "text/html" } });
      });
  } else if (guidMatches) {
    promise = caches.match(new Request(api))
      .then(function(response) {
        return response.json();
      }).then(function(stories) {
        var story = stories.filter(function(story) {
          return guidMatches[1] === story.guid;
        });
        var body = templates.article(story[0]);
        return new Response(body, { headers: { "Content-Type": "text/html" } });
      });
  } else {
    promise = caches.match(e.request);
  }
  e.respondWith(promise);
};

function updateContent() {
  return caches.open('news-content-cache').then(function(cache) {
    return cache.addAll([api]);
  });
}

function updateApplication() {
  return caches.open('news-static-cache').then(function(cache) {
    return cache.addAll([
      '/css/style.css',
      '/js/app.js'
    ]);
  });
}

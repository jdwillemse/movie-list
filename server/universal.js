const path = require('path');
const fs = require('fs');

const React = require('react');
const { Provider } = require('react-redux');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');

const { default: configureStore } = require('../src/store');
const { default: App } = require('../src/containers/App');

let manifest = {};
const filePath = path.resolve(__dirname, '../build', 'asset-manifest.json');
fs.readFile(filePath, 'utf8', (err, htmlData) => {
  if (err) {
    console.error('read err', err);
    return;
  }

  try {
    manifest = JSON.parse(htmlData);
  } catch (error) {
    console.error('Manifest file is not in JSON format');
  }
});

module.exports = function universalLoader (req, res) {
  let status = 200;
  const context = {};
  const store = configureStore();
  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App />
      </StaticRouter>
    </Provider>
    );

    // context.url will contain the URL to redirect to if a <Redirect> was used
  if (context.url) {
    return res.redirect(302, context.url);
  }

  if (context.is404) {
    status = 404;
  }

  return res.status(status).render('index', {
    markup,
    manifest,
    state: JSON.stringify(store.getState()),
  });
};


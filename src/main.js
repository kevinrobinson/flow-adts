/* @flow */
var React = require('react');
var App = require('./app');

function main() {
  React.render(React.createElement(App, {}), document.querySelector('.content'));
}

main();
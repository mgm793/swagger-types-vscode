const fetch = require("node-fetch");

async function getData(url) {
  const response = await fetch(`${url}/swagger-ui-init.js`);
  return await response.text();
}

function getPaths(data) {
  const regExp = new RegExp("var options = ({\n(.+\n)*})", "gm");
  const {
    swaggerDoc: { paths },
  } = JSON.parse(data.match(regExp)[0].replace("var options = ", ""));
  return paths;
}

async function getDataToPrint(url) {
  const data = await getData(url);
  const paths = getPaths(data);

  return paths;
}

module.exports = { getDataToPrint };

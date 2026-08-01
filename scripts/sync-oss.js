#!/usr/bin/env node
const http = require('http');
const package = require('../packages/engine/package.json');
const { version, name } = package;
const options = {
  method: 'PUT',
  hostname: 'uipaas-node.alibaba-inc.com',
  path: '/staticAssets/cdn/packages',
  headers: {
    'Content-Type': 'application/json',
    Cookie: 'locale=en-us',
  },
  maxRedirects: 20,
};

const onResponse = function (res) {
  const chunks = [];
  res.on('data', (chunk) => {
    chunks.push(chunk);
  });

  res.on('end', () => {
    const body = Buffer.concat(chunks);
    console.table(JSON.stringify(JSON.parse(body.toString()), null, 2));
  });

  res.on('error', (error) => {
    console.error(error);
  });
};

const req = http.request(options, onResponse);

const postData = JSON.stringify({
  packages: [
    {
      packageName: name,
      version,
    },
  ],
  // Allows publishing an npm package from a specific registry; defaults to the public npm registry
  useTnpm: true,
});

req.write(postData);

req.end();

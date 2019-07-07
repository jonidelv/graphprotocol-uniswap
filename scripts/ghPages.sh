#!/usr/bin/env bash

sed -i "" "/graphprotocol/ a\\
   \"homepage\" : \"https://jonidelv.github.io/graphprotocol-uniswap\",
" package.json;

yarn run buildDev;

cd build;

echo "<!DOCTYPE html> <html> <head> <meta charset='utf-8'> <title>Metrica Sports</title> <script type='text/javascript'> var pathPrefix = true; var l = window.location; l.replace( l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') + l.pathname.split('/').slice(0, 2 * pathPrefix).join('/') + '/?p=/' + l.pathname.slice(1).split('/').slice(pathPrefix).join('/').replace(/&/g, '~and~') + (l.search ? '&q=' + l.search.slice(1).replace(/&/g, '~and~') : '') + l.hash ); </script> </head> <body> </body> </html>" > 404.html;

sed '/<div id="root"></div>/a \  <script type="text/javascript"> (function (l) { if (l.search) { var q = {}; l.search.slice(1).split("&"").forEach(function (v) { var a = v.split("="); q[a[0]] = a.slice(1).join("=").replace(/~and~/g, "&"); }); if (q.p !== undefined) { window.history.replaceState(null, null, l.pathname.slice(0, -1) + (q.p || "") + (q.q ? ("?" + q.q) : "") + l.hash ); } } }(window.location)) </script>' index.html

cd ..;

sed -i".bak" '/homepage/d' package.json;

rm package.json.bak;

gh-pages -d build;

git commit -am "Save local changes";

git checkout -B gh-pages;

git add -f build;

git commit -am "Rebuild website";

git filter-branch -f --prune-empty --subdirectory-filter build;

git push -f origin gh-pages;

git checkout -;
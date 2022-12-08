cd "$(dirname "$0")"

npm run build

rm -r ../../server/static/vite
cp -r ../server/static/vite ../../server/static/
cp ../server/templates/index.html ../../server/templates/
## Usage

After installation, run `npm install` and then run `gulp dev` which will open up a preview of the template in your default browser, watch for changes to core template files, and live reload the browser when changes are saved. You can view the `gulpfile.js` to see which tasks are included with the dev environment.

#### Gulp Tasks

- `gulp` the default task that builds everything into dist
- `gulp dev` browserSync opens the project in your default browser and live reloads when changes are made
- `gulp sass` compiles SCSS files into CSS
- `gulp minify-css` minifies the compiled CSS file
- `gulp minify-js` minifies the themes JS file
- `gulp copy` copies dependencies from node_modules to the vendor directory

#### Firebase deploy
- `firebase serve` to check if the changes worked and run the website built in dist in the browser
- `firebase deploy` to deploy the website built in the folder dist

## Copyright and License

Copyright 2013-2018 Blackrock Digital LLC. Code released under the [MIT](https://github.com/BlackrockDigital/startbootstrap-creative/blob/gh-pages/LICENSE) license.

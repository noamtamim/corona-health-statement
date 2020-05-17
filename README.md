# Corona Health Statement

Corona Health Statement is a simple React web application useful for rendering forms suitable for sharing kindergardens / schools during the COVID-19 pandemic.

## Tech

Corona Health Statement uses a number of awesome open source projects to work properly:

* [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap) - Bootstrap 4 components built with React. We are using this library to render the form components that are powering this application.
* [html-to-image](https://github.com/bubkoo/html-to-image) - Generates an image from a HTML node using HTML5 canvas. We are using the capabilities of this library to take a screenshot of the screen and download it as an image, available for sharing.
* [react-signature-pad-wrapper](https://github.com/michaeldzjap/react-signature-pad-wrapper) - A React wrapper for signature pad. We are using this technology to capture the user signature straight on the form instead of importing it from external source.

## Development

After cloning this git repository, in the project directory, you can run the following commands:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `yarn deploy`

This app is using `gh-pages` to deploy the production build files to the `gh-pages` branch. That allows the application to be deployed statically on GitHub Pages.
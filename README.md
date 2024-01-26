# Europeana feedback widget

Widget for sending feedback from, and about, [Europeana](https://www.europeana.eu/)
websites.

Implemented as a [Vue 3](https://vuejs.org/) component and embeddable as an HTML
[custom element](https://developer.mozilla.org/en-US/docs/Web/API/Web_components#custom_elements).


## Usage

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@europeana/feedback-widget/dist/europeana-feedback-widget.css" />
  </head>
  <body>
    <div id="europeana-feedback-widget"></div>
    <script type="module" src="https://cdn.jsdelivr.net/npm/@europeana/feedback-widget/dist/europeana-feedback-widget.js"></script>
  </body>
</html>
```


## Development

* Install: `pnpm install`
* Run development server: `pnpm dev`
* Test: `pnpm test:unit`
* Check code formatting: `pnpm format`
* Check code quality: `pnpm lint`
* Build library: `pnpm build`
* Publish library to NPM: `pnpm publish --access public`


## License

Licensed under the [EUPL v1.2](./LICENSE.md).

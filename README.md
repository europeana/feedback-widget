# Europeana feedback widget

Widget for sending feedback from, and about, [Europeana](https://www.europeana.eu/)
websites.


## Usage

### In an existing Vue 3 app

Install the package:
```shell
npm install --save @europeana/feedback-widget
```

Import into your Vue component:
```vue
<script setup>
import EuropeanaFeedbackWidget from "@europeana/feedback-widget";
import "@europeana/feedback-widget/css";
</script>
```

Render:
```vue
<template>
  <EuropeanaFeedbackWidget />
</template>

### Elsewhere

To embed the feedback widget in your web page, add the stylesheet link, JS
script, and a target element with id `europeana-feedback-widget`:

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@europeana/feedback-widget@0.4.1-0/dist/europeana-feedback-widget.css">
  </head>
  <body>
    <div id="europeana-feedback-widget"></div>
    <script
      type="module"
      src="https://cdn.jsdelivr.net/npm/@europeana/feedback-widget@0.4.1-0/dist/europeana-feedback-widget.app.js"
      integrity="sha384-323Vd3CwtH6tRpgRCi9egn+e7ny8pKlwA7eklyM/J9J0+VT2pIyK3+la4h5lWenQ"
    ></script>
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
* Version library: `pnpm version patch`
* Publish library to NPM: `pnpm publish --access public`


## License

Licensed under the [EUPL v1.2](./LICENSE.md).

# Europeana feedback widget

Widget for sending feedback from, and about, [Europeana](https://www.europeana.eu/)
websites.


## Usage

To embed the feedback widget in your web page, add the stylesheet link, JS
script, and a target element with id `europeana-feedback-widget`:

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@europeana/feedback-widget@0.3.0-rc.1/dist/europeana-feedback-widget.css">
  </head>
  <body>
    <div id="europeana-feedback-widget"></div>
    <script
      type="module"
      src="https://cdn.jsdelivr.net/npm/@europeana/feedback-widget@0.3.0-rc.1/dist/europeana-feedback-widget.js"
      integrity="sha384-u9uk9KOvOrG5X4yAGn1xMj1P5YmrJWanSqij7tvI4eZTjI/UQGK98lq3e/I6XfuP"
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

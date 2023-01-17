<h1 align="center">@partivo/template</h1>
Simple Cookie Parse And Serialize - Node.js

## Example Code
JavaScript File
```js
import template from '@partivo/template';
const page = template.renderFile('/usr/local/bin/template/404.html', {
  hostname: "partivo.net"
}); // 404.html
```

HTML File
```html
<html>
    <head>
        <title>404 Not Found</title>
    </head>
    <body>
        <center><h1>404 Not Found</h1></center>
        <hr>
        <center>{{ hostname }}</center>
    </body>
</html>
```

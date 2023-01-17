<h1 align="center">@partivo/cookie</h1>
Simple Cookie Parse And Serialize - Node.js

## Example Code
JavaScript File
```js
import cookie from '@partivo/cookie';
const parse = cookie.parse(req.headers.cookie);
console.log(parse['X-Real-IP']); // 127.0.0.1
```

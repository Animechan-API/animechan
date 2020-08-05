<p align="center"><img src="https://github.com/RocktimSaikia/anime-chan/blob/develop/.github/deku_headbang.gif?raw=true" height="160px"/></p>

<h1 align="center">Anime-chan</h1>
<h4 align="center">An api with the the largest database of anime quotes :zap:</h4>

<p align="center"><img alt="David" src="https://img.shields.io/david/rocktimsaikia/anime-chan?style=for-the-badge"/> <img alt="Travis (.com) branch" src="https://img.shields.io/travis/com/rocktimsaikia/anime-chan/master?style=for-the-badge"/> <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/rocktimsaikia/anime-chan?style=for-the-badge"/></p>

## :cloud: Routes

- `/api/quotes` : returns 10 quotes by default

- `/api/quotes?page=<number>` : paginate with any numer between 1 to 10
- `/api/quotes?anime=<anime-name>` : query quotes by the name of the anime
- `/api/quotes?char=<character-name>` : query quotes by a anime character name

## :clipboard: Usage

```js
//you can use any http library you want
const axios = require("axios");
const uri = "https://anime-chan.herokuapp.com/api/quotes/random";

//returns one random quote
axios.get(uri).then((res) => {
  console.log(res.data);
});

//using Destructuring
axios.get(uri).then(({ data }) => {
  console.log(data);
});

//outputs
/* 
[{
    quote: 'Charm is reserved for dealing with people with more power than you.',
    character: 'Chihayafuru 2',
    anime: 'Chihayafuru 2'
}]
*/
```

## :rocket: How to contribute

Have an idea? Found a bug? Create [a new issue](https://github.com/RocktimSaikia/anime-chan/issues) with detailed explanation.

## :zap: Support

<a href="https://www.buymeacoffee.com/7BdaxfI" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" height="35px" alt="Buy Me A Coffee" id="coffee"></a>
<a href='https://ko-fi.com/Q5Q81MAMU' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi2.png?v=2' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

> If you are using the API for your app, your online tutorials or your coding challenges, please consider supporting to help keep the project alive. :)

## :scroll: License

[MIT][license] © [Rocktim Saikia][website]

[license]: /LICENSE
[website]: https://github.com/rocktimsaikia
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md

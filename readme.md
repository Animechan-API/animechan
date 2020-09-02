<p align="center"><img src="/.github/logo.png" height="50px"></p>

<h1 align="center">Anime-chan</h1>
<p align="center">An api with the the largest database of anime quotes :zap:</p>

<p align="center">
<img alt="Travis (.com) branch" src="https://travis-ci.com/RocktimSaikia/anime-chan.svg?branch=production"/> 
<img alt="Twitter URL" src="https://img.shields.io/twitter/url?url=https%3A%2F%2Fanimechan.xyz"/>
</p><br/>

<p align="center"><img src="/.github/banner.png" alt="github-readme-template" border="0"></p>

Check the **[Frotend Repository](https://github.com/RocktimSaikia/anime-chan-website)** for the API

## Routes

- `/api/quotes` : returns 10 quotes by default

- `/api/quotes?page=<number>` : paginate with any numer between 1 to 10
- `/api/quotes?anime=<anime-name>` : query quotes by the name of the anime
- `/api/quotes?char=<character-name>` : query quotes by a anime character name

## Usage

```js
//you can use any http library you want
const axios = require("axios");
const uri = "https://animechanapi.xyz/api/quotes/random";

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

## Contribute

Have an idea? Found a bug? Create [a new issue](https://github.com/RocktimSaikia/anime-chan/issues) with detailed explanation.

## Support

<a href="https://www.buymeacoffee.com/7BdaxfI"><img src="https://user-images.githubusercontent.com/33410545/91206759-48d5d180-e725-11ea-93b5-754d98c007af.png" height="70px"/></a>

> If you are using the API for your app, your online tutorials or your coding challenges, please consider supporting to help keep the project alive. :)

## License

[MIT][license] © [Rocktim Saikia][website]

[license]: /LICENSE
[website]: https://rocktim.xyz

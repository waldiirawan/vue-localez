# vue-localez
Vue-localez is an addon to add support for multiple languages.

## Installation

Installing Vue Localization is a pretty simple process

### Npm install
```bash
npm install vue-localez
```

### Yarn install
```bash
yarn add vue-localez
```

## Setup
```js
var Vue = require('vue');
var vueLocalez = require('vue-localez');

vueLocalez.requireAll(require.context(`./lang`, true, /\.json$/))

Vue.use(vueLocalez, { // Options
    lang: 'en',         // lang
    extension: 'json',  // language resource
})
```

### Lang Folder
```js
└── lang
    ├── en
    |   ├──error.json
    |   └──messages.json
    ├── id
    |   ├──error.json
    |   └──messages.json
    └── fr
        ├──error.json
        └──messages.json

```

### Lang file
`lang/id/messages.json`
```json
{
  "greeting": "Halo {name}"
}
```
`lang/en/messages.json`
```json
{
  "greeting": "Hello {name}"
}
```
`lang/fr/messages.json`
```json
{
  "greeting": "Bonjour {name}"
}
```

### Usage
```js
$locale.message('message.greeting', { name : "Waldi Irawan" })

// returns
// id -> Halo Waldi Irawan
// en -> Hello Waldi Irawan
// fr -> Bonjour Waldi Irawan
```

`yourcomponent.vue`
```html
<h1>{{ $locale.message('message.greeting', { name : "Waldi Irawan" }) }}</h1>
```
Results :
```html
<!-- id -->
<h1>Halo Waldi Irawan</h1>
<!-- en -->
<h1>Halo Waldi Irawan</h1>
<!-- fr -->
<h1>Halo Waldi Irawan</h1>
```

### Change localez
```js
// inside vue instance
this.$locale.for('id') // 'id' is iso code country
```

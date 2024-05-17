# SpaceAPI

This is a module made to easily interact with hacker/maker spaces that uses [SpaceAPI](https://spaceapi.io/).

## Usage

```js
const { Space } = require("@f2ville/spaceapi");

// Create a new Space with the URL 
const urlab = new Space("https://urlab.be/spaceapi.json");

// Fetch the endpoint 
urlab
  .fetch()
  .then(() => {
    console.log(urlab)
  })
  .catch(console.error);
```
This code will log the following :
```js
Space {
  url: 'https://urlab.be/spaceapi.json',
  data: {
    api: '0.13',
    space: 'UrLab',
    logo: 'https://urlab.be/static/img/space-invaders.png',
    url: 'https://urlab.be',
    location: {
      lat: 50.812915,
      lon: 4.384396,
      address: '131, avenue Buyl, 1050, Bruxelles, Belgium'
    },
    state: { open: false, lastchange: 1715029588, icon: [Object] },
    contact: {
      issue_mail: 'contact@urlab.be',
      ml: 'hackulb@cerkinfo.be',
      twitter: '@UrLabBxl',
      facebook: 'https://www.facebook.com/urlabbxl',
      irc: 'irc://irc.libera.chat#urlab',
      email: 'contact@urlab.be',
      phone: '+3226504967',
      keymasters: [Array]
    },
    issue_report_channels: [ 'issue_mail', 'twitter' ],
    sensors: { people_now_present: [Array] },
    projects: [ 'https://urlab.be/projects/', 'https://github.com/UrLab' ]
  }
}
```

## Disclaimer

*I am not related with anything of SpaceAPI, this is just a project made to help with the interaction of the api.*
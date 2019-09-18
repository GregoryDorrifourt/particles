![npm (scoped)](https://img.shields.io/npm/v/@gregorydorrifourt/particles) ![npm bundle size](https://img.shields.io/bundlephobia/min/@gregorydorrifourt/particles?label=size)

# @gregorydorrifourt/particles
Interactive particles background generator.

## Install

Using *npm*
```
$ npm install @gregorydorrifourt/particles
```

Using *yarn*
```
$ yarn add @gregorydorrifourt/particles
```

## Usage

```html
<canvas id="particles-background"></canvas>
```

```js
window.onload = function(){
    var particles = new Particles();
    particles.render();
}
```

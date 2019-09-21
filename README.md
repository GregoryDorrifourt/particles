![npm (scoped)](https://img.shields.io/npm/v/@gregorydorrifourt/particles) ![npm bundle size](https://img.shields.io/bundlephobia/min/@gregorydorrifourt/particles?label=size)

# @gregorydorrifourt/particles
Interactive particles background generator.

## Install

Using *npm*
```
npm install @gregorydorrifourt/particles
```

Using *yarn*
```
yarn add @gregorydorrifourt/particles
```

## Hosting / CDN

File hosted at JSDelivr. Simply add this script before the closing ```body``` tag. 
```html
<script type="text" src="https://cdn.jsdelivr.net/npm/@gregorydorrifourt/particles@latest/lib/particles.min.js"></script>
```

## Usage

Create a ```canvas``` tag in your html. Default id is ```particles-background```.
```html
<canvas id="particles-background"></canvas>
```

Now in javascript, on window load, create a new instance of ```Particles``` class then call ```render()```.
```js
window.onload = function(){
    var particles = new Particles();
    particles.render();
}
```

##Configuration

<a href="https://www.gregorydorrifourt.fr/particles" title="Go to générator"><img src="https://www.gregorydorrifourt.fr/particles/assets/md-screenshot.png" alt="Particles generator"></a>

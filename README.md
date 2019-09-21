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
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@gregorydorrifourt/particles@latest/lib/particles.min.js"></script>
```

## Usage

Create a ```<canvas>``` tag in your html. Default id is ```particles-background```.
```html
<canvas id="particles-background"></canvas>
```

Now in javascript, on window load, create a new instance of ```Particles``` class then call ```render()```.
```js
<script type="text-javascript">
    window.onload = function(){
        var particles = new Particles();
        particles.render();
    }
</script>
```

## Configuration

<a href="https://www.gregorydorrifourt.fr/particles" title="Go to générator"><img src="https://www.gregorydorrifourt.fr/particles/assets/md-screenshot.png" alt="Particles generator"></a>

-------------------------
Attribute | Type | Description | Default
----|---|-----------|----
addParticleOnClick | `Boolean` | Add a new particle on click | `false`
bubble | `Boolean` | Particles grow when mouse is approching | `true`
color | `String` | Color of particles and strokes | `#404040`
contain | `Boolean` | Particles stay within canvas boundaries. Affect density on small sizes | `false`
element | `String` | Id of canvas tag | `particles-background`
fullscreen | `Boolean` | Canvas element take all the screen and checks `window.resize` event | `false`
particlesForScreenWidths | `object` | Set the number of particles for screens sizes | `{ small: 70, medium: 100, large: 150 }`
threshold | `Number` | Set the maximum distance to draw a line between 2 dots. `0` => no lines | `150`
-------------------------
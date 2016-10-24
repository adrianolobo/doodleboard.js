Doodleboard.js
==============

A Basic drawing board that you can set the colors and line widths.
JQuery not required


## How to use

Include doodleboard.js.
```html
<script src="doodleboard.js"></script>
```

Create the DoodleBoard object and pass the ID of the container element (without #);

```js
var doodleBoard = new DoodleBoard(elementId,configObject);
```


## Configuration


```json
{
	"colors" : ["#FFFFFF", "#000000"],
	"linesWidth" : [1,5,10,30]
}
```

- **colors**: Array of colors in Hexadecimal. Default Value: ['#0000FF', '#00FF00' ,'#FF0000', '#FFFFFF', '#000000']
- **lineWidth**: Array of sizes of the line in integer. Default Value: [1,5,15,30]

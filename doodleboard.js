/*
Created By: Adriano Lobo
*/


(function(window){

    'use strict';
    function defineDoodleBoard(){
        var DoodleBoard = function (elementId,options) {
            var originalElement = window.document.getElementById(elementId);
            //Checks if the main element exists
            if (this.element === null) {
                throw 'Element '+elementId+' not found.';
            }

            //init
            var document = window.document; //This ensures we get the right document obj
            var drawSequences = []; //stores all points and parameters of the drawing
            var elements = {}; //stores all HTML elements of this component
            var currentColor = null; //stores the current selected color
            var currentLineWidth = null; //stores the current selected line width

            setDefaultOptions(options, currentColor);
            createBaseElements(originalElement, elements);
            initColors(options.colors, elements, document);
            initLinesWidth(options.linesWidth, elements, document);


            function stopDrawing(e) {
                stopMouveMoveEvent();
            }

            function canvasMouseMove(e) {
                addDrawPoints(e);
                draw();
            }

            function canvasMouseDown(e) {
                startMouveMoveEvent();
                addDrawSequence(e);
                draw();
            }

            function addDrawSequence(e) {
                //Sets a new continuous line with its own colors and size
                drawSequences.push(
                    {
                        strokeStyle: currentColor,
                        lineWidth: currentLineWidth,
                        paths: [
                            {
                                x: e.offsetX,
                                y: e.offsetY,
                            }
                        ]
                    }
                );
            }

            function addDrawPoints(e) {
                //Only adds the drawing points to the last Draw Sequence
                drawSequences[drawSequences.length-1].paths.push(
                    {
                        x: e.offsetX,
                        y: e.offsetY,
                    }
                );
            }

            function draw() {
                //Create a line using everypoint of the drawSequence array
                //This function is called everytime there is a mouse event
                //TODO: call this function in a setTimeOut to be more performatic, although there is no performance issue at the moment
                elements.context.clearRect(0, 0, elements.context.canvas.width, elements.context.canvas.height);

                for (var i = 0; i < drawSequences.length; i++) {
                    elements.context.lineJoin = 'round';
                    elements.context.lineWidth = drawSequences[i].lineWidth;
                    elements.context.strokeStyle = drawSequences[i].strokeStyle;
                    elements.context.lineCap = 'round';
                    elements.context.beginPath();
                    var paths = drawSequences[i].paths
                    for (var j = paths.length - 1; j >= 0; j--) {
                        if(j == 0){
                            elements.context.moveTo(paths[j].x, paths[j].y);
                        }else{
                            elements.context.lineTo(paths[j].x, paths[j].y);
                        }
                    }
                    elements.context.stroke();
                }
            }

            function createBaseElements(originalElement, elements){
                //init
                elements.mainWrapper = document.createElement('div');
                elements.colorsWrapper = document.createElement('div');
                elements.linesWidthWrapper = document.createElement('div');
                elements.canvas = document.createElement('canvas');

                elements.context = elements.canvas.getContext('2d');

                //Styles
                elements.mainWrapper.style.width = '100%';
                elements.mainWrapper.style.height = '100%';

                elements.canvas.style.backgroundColor = '#fff';

                elements.colorsWrapper.style.marginBottom = '10px';
                elements.colorsWrapper.style.display = 'flex';
                elements.colorsWrapper.style.justifyContent = 'space-around';

                elements.linesWidthWrapper.style.marginTop = '10px';
                elements.linesWidthWrapper.style.display = 'flex';
                elements.linesWidthWrapper.style.justifyContent = 'space-around';

                //Appending childs
                originalElement.appendChild(elements.mainWrapper);
                elements.mainWrapper.appendChild(elements.colorsWrapper);
                elements.mainWrapper.appendChild(elements.canvas);
                elements.mainWrapper.appendChild(elements.linesWidthWrapper);

                //Events
                elements.canvas.addEventListener('mousedown', canvasMouseDown, false);
                elements.canvas.addEventListener('mouseup',   stopDrawing, false);
                elements.canvas.addEventListener('mouseleave',   stopDrawing, false);

                //As the canvas element is not responsive, we have to get a static width and Height
                //If we set the width and height throught the style the drawing will be distorted
                elements.canvas.width = elements.mainWrapper.clientWidth;
                elements.canvas.height = elements.mainWrapper.clientHeight;
            }

            //init the Colors elements and events
            function initColors(colors, elements, document) {
                for (var i = 0; i < colors.length; i++) {
                    var colorElement = document.createElement('button');

                    colorElement.style.width = '30px';
                    colorElement.style.height = '30px';
                    colorElement.style.borderRadius = '2px';
                    colorElement.style.border = '0px';
                    colorElement.style.marginLeft = '5px';
                    colorElement.style.marginRight = '5px';
                    colorElement.style.cursor = 'pointer';
                    colorElement.style.backgroundColor = colors[i];

                    elements.colorsWrapper.appendChild(colorElement);
                    //Created this closure to keep the color and element Static through the For loop
                    (function (color, colorElement) {
                        colorElement.addEventListener('click',function () {
                           currentColor = color;
                        });
                    })(colors[i],colorElement);
                }
            }

            function startMouveMoveEvent() {
                elements.canvas.addEventListener('mousemove', canvasMouseMove, false);
            }

            //Remove the mouse move Event when not needed to be more performatic as mouse move is a very expensive event
            function stopMouveMoveEvent() {
                elements.canvas.removeEventListener('mousemove', canvasMouseMove, false);
            }

            //init the Line Width elements and events
            function initLinesWidth(linesWidth, elements, document) {
                for (var i = 0; i < linesWidth.length; i++) {
                    var lineElement = document.createElement('button');
                    var lineWidthSampleElement = document.createElement('div');

                    lineElement.style.width = '30px';
                    lineElement.style.height = '30px';
                    lineElement.style.borderRadius = '2px';
                    lineElement.style.border = '0px';
                    lineElement.style.marginLeft = '5px';
                    lineElement.style.marginRight = '5px';
                    lineElement.style.backgroundColor = '#FFFFFF';
                    lineElement.style.overflow = 'hidden';
                    lineElement.style.padding = '0px';
                    lineElement.style.cursor = 'pointer';

                    lineWidthSampleElement.style.width = linesWidth[i]+'px';
                    lineWidthSampleElement.style.height = linesWidth[i]+'px';
                    lineWidthSampleElement.style.backgroundColor = '#000000';
                    lineWidthSampleElement.style.borderRadius = '50%';
                    lineWidthSampleElement.style.margin = 'auto';

                    elements.linesWidthWrapper.appendChild(lineElement);
                    lineElement.appendChild(lineWidthSampleElement);
                    //Created this closure to keep the lineWidth and element Static through the For loop
                    (function (lineWidth, lineElement) {
                        lineElement.addEventListener('click',function () {
                           currentLineWidth = lineWidth;
                        });
                    })(linesWidth[i],lineElement);
                }
            }

            //validate and sets a default value if not given 
            function setDefaultOptions(options) {
                if (options == null || typeof options != 'object') {
                    options = {};
                }
                if (options.colors == null || !Array.isArray(options.colors)) {
                    options.colors = ['#0000FF', '#00FF00' ,'#FF0000', '#FFFFFF', '#000000'];
                }
                if (options.linesWidth == null || !Array.isArray(options.linesWidth)) {
                    options.linesWidth = [1,5,15,30];
                }

                currentColor = options.colors[0];
                currentLineWidth = options.linesWidth[0];
            }
        };
        return DoodleBoard;
    }

    //define globally if it doesn't already exist
    if(typeof(DoodleBoard) === 'undefined'){
        window.DoodleBoard = defineDoodleBoard();
    }
    else{
        throw ("DoodleBoard already defined.");
    }
})(window);
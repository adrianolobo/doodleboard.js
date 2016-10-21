(function(window){

    'use strict';
    function defineDoodleBoard(){
        var DoodleBoard = function (elementId,options) {
            var originalElement = window.document.getElementById(elementId);
            if (this.element === null) {
                throw 'Element '+elementId+' not found.'
            }
            var document = window.document;
            var canvasElement = document.createElement('canvas');
            var canvasContext = canvasElement.getContext('2d');
            var drawSequences = [];
            var isDrawing = false;

            //REMOVER
            window.drawSequences = drawSequences;

            originalElement.appendChild(canvasElement);

            // Temporary background color!
            canvasElement.style.backgroundColor = '#fff';

            // Remover o Mouse Move quando não precisa para performance!!!!
            canvasElement.addEventListener('mousedown', canvasMouseDown, false);
            canvasElement.addEventListener('mousemove', canvasMouseMove, false);
            canvasElement.addEventListener('mouseup',   canvasMouseUp, false);


            function canvasMouseUp(e) {
                isDrawing = false;
            }

            function canvasMouseMove(e) {
                if (isDrawing) {
                    addDrawPoints(e);
                    draw();
                }
            }

            function canvasMouseDown(e) {
                addDrawSequence(e);
                isDrawing = true;
                draw();
            }

            function addDrawSequence(e) {
                drawSequences.push(
                    {
                        strokeStyle: '#000000',
                        lineJoin: 'bevel',
                        lineWidth: 3,
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
                drawSequences[drawSequences.length-1].paths.push(
                    {
                        x: e.offsetX,
                        y: e.offsetY,
                    }
                );
            }

            function draw() {
                canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);

                for (var i = 0; i < drawSequences.length; i++) {
                    canvasContext.strokeStyle = drawSequences[i].strokeStyle;
                    canvasContext.lineJoin = drawSequences[i].lineJoin;
                    canvasContext.lineWidth = drawSequences[i].lineWidth;
                    canvasContext.beginPath();
                    var paths = drawSequences[i].paths
                    for (var j = paths.length - 1; j >= 0; j--) {
                        if(j == 0){
                            canvasContext.moveTo(paths[j].x, paths[j].y);
                        }else{
                            canvasContext.lineTo(paths[j].x, paths[j].y);
                        }
                    }
                    canvasContext.stroke();
                }
            }
        };
        return DoodleBoard;
    }

    //define globally if it doesn't already exist
    if(typeof(DoodleBoard) === 'undefined'){
        window.DoodleBoard = defineDoodleBoard();
    }
    else{
        console.log("DoodleBoard already defined.");
    }
})(window);
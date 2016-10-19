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
            var pointsToDraw = [];
            var isDrawing = false;

            //REMOVER
            window.pointsToDraw = pointsToDraw;

            originalElement.appendChild(canvasElement);

            // Temporary background color!
            canvasElement.style.backgroundColor = '#fff';

            // Remover o Mouse Move quando não precisa para performance!!!!
            canvasElement.addEventListener('mousedown', canvasMouseDown);
            canvasElement.addEventListener('mousemove', canvasMouseMove);
            canvasElement.addEventListener('mouseup',   canvasMouseUp);


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
                addDrawPoints(e);
                isDrawing = true;
                draw();
            }

            function addDrawPoints(e) {
                pointsToDraw.push(
                    {
                        x: e.offsetX,
                        y: e.offsetY,
                    }
                );
            }

            function draw() {
                canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);

                canvasContext.strokeStyle = '#000000';
                canvasContext.lineJoin = 'round';
                canvasContext.lineWidth = 5;

                canvasContext.beginPath();
                for (var i = pointsToDraw.length - 1; i >= 0; i--) {
                    if(pointsToDraw[i+1]){
                        canvasContext.moveTo(pointsToDraw[i+1].x, pointsToDraw[i+1].y);
                    }

                    canvasContext.lineTo(pointsToDraw[i].x, pointsToDraw[i].y);
                    canvasContext.closePath();
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
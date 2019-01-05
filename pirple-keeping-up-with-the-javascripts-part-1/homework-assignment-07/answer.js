/*
Keeping Up With the Javascripts: ES6
Homework #7
*/

function createRectangles() {
    const colors = [];
    colors[0] = '#6495ed';
    colors[1] = '#e9967a';
    colors[2] = '#b22222';
    colors[3] = '#00ff7f';
    colors[4] = '#ee82ee';
    colors[5] = '#bdb76b';
    colors[6] = '#8a2be2';
    colors[7] = '#696969';
    colors[8] = '#556b2f';
    colors[9] = '#b22222';

    const elmWrapper = document.getElementById('rectangleWrapper');

    for (let i = 0; i < 10; i++) {
        // color rectangle
        const elmColorRect = document.createElement('div');

        elmColorRect.id = 'rect' + i;
        elmColorRect.className = 'colorRect';
        elmColorRect.style.backgroundColor = colors[i];

        elmWrapper.appendChild(elmColorRect);


        // text
        const elmColorText = document.createElement('span');
        elmColorText.innerText = colors[i];

        elmWrapper.appendChild(elmColorText);


        // new line
        elmWrapper.appendChild(document.createElement('br'));
        elmWrapper.appendChild(document.createElement('br'));
    }
}

function printRectangleID() {
    const elmColorRects = document.getElementsByClassName('colorRect');
    if (elmColorRects === null) {
        console.log('No elements with class name colorRect found');
        return;
    }

    for (elm of elmColorRects) {
        console.log(`Here are the rectangle IDs [${elm.id}]`);
    }
}

function changeTitle() {
    const elmHead = document.querySelector('head');
    if (elmHead === null) {
        console.log('No head element found');
        return;
    }

    const elmH1 = document.querySelector('h1');
    if (elmH1 === null) {
        console.log('No h1 element found');
        return;
    }

    const elmTitle = document.createElement('title');
    elmTitle.innerText = elmH1.innerText;

    elmHead.appendChild(elmTitle);
}

window.onload = function() {
    createRectangles();
    printRectangleID();
    changeTitle();
}

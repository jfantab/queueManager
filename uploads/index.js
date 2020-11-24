const undoStackContainer = document.getElementById('undo-stack');
const redoStackContainer = document.getElementById('redo-stack');

const undoButton = document.getElementById('undo-button');
const redoButton = document.getElementById('redo-button');

const gridButtons = document.querySelectorAll('[data-position]');

// this line will error until you FIND the undoStackContainer
// and redoStackContainer elements

const undoStack = new Stack(undoStackContainer);
const redoStack = new Stack(redoStackContainer);

// this array is a bunch of hex values for colors so that 
// our random grid will be colored nicely. 
const COLORS = [
    '#1abc9c', '#16a085', '#f1c40f', '#f39c12',
    '#2ecc71', '#27ae60', '#e67e22', '#d35400',
    '#3498db', '#2980b9', '#e74c3c', '#c0392b',
    '#9b59b6', '#8e44ad', '#bdc3c7', '#34495e', 
    '#2c3e50', '#7f8c8d', '#95a5a6',
]

/**
 * @function handleGridButtonClick
 * 
 * @param {MouseEvent} event - the dispatched click event
 * @returns {void}
 * 
 * @description This function is an event handler for the grid buttons. When 
 * a grid button is clicked, it should change to a random color from the COLORS
 * Array. Because each grid button has a data-position property (which can
 * be accessed using event.currentTarget.dataset.position) you'll be able 
 * to figure out which button was clicked as well as what style it currently has.
 * 
 */
function handleGridButtonClick(event) {

    // Get data for current button
    const curBackColor = window.getComputedStyle(event.currentTarget).backgroundColor;
    let prevColor = this.style.backgroundColor;         // Get old color and button position
    let number = event.currentTarget.dataset.position;
    
    // Change button color
    const randColor = Math.floor((Math.random() * Math.floor(18)));
    this.style.backgroundColor = COLORS[randColor];

    // Create dictionary entry with clicked button and old color
    let action = {};
    action[number] = prevColor;

    // Push to the stack
    undoStack.push(action);

}
/**
 * @function handleStackButtonClicked
 * 
 * @param {Stack} fromStack - the stack to pop from
 * @param {Stack} toStack - the stack to push onto
 * @returns {void}
 * 
 * @description This function can be used to undo or redo a button click. The functionality
 * is roughly the same between undo and redo. The only difference is which stack is an action
 * being moved to and which stack is an action being moved from. Don't worry if you're not 
 * sure how to do this on Lab day. We'll go over some stuff with functions on Week 4 Tuesday
 * 
 */
function handleStackButtonClicked(fromStack, toStack) {
    
    // Get the previous action
    let newAction = fromStack.pop();    // Get most recent number button press
    const number = Object.keys(newAction)[0];   // Get location of most recent number button press
    
    // Change button color
    let elt = document.querySelectorAll('[data-position]')  // Get array of number buttons
    let curBackColor = window.getComputedStyle(elt[number]).backgroundColor;
    elt[number].style.backgroundColor = newAction[number];
    newAction[number] = curBackColor;

    // Push action to redo stack
    toStack.push(newAction);
}

/**
 * @method main
 * 
 * @returns {void}
 * 
 * @description We could just run this Javascript as the document is being read. But I like
 * keeping functions separately and then calling them later. Peep the very last line of this
 * file. 
 */

function main() {
    // attach event handlers here

    // Event handlers for grid buttions
    for (let i = 0; i < gridButtons.length; i++){
        gridButtons[i].addEventListener('click', handleGridButtonClick);
    }

    // Event handlers for redoButton and undoButton
    redoButton.addEventListener('click', function(){handleStackButtonClicked(redoStack,undoStack);});
    undoButton.addEventListener('click', function(){handleStackButtonClicked(undoStack,redoStack);});
}

// run our main function (even though Javascript doesn't actually need one)
main()
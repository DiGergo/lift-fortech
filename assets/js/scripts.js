
let elevator1 = {
    ID: 0,
    currentFloor: 0,
    isOpen: false
}

let elevator2 = {
    ID: 1,
    currentFloor: 6,
    isOpen: false
}

let highlightedSigns;

let arrivedElevator;

callElevator = (floor) => {
    let closestElevator = getClosestElevator(floor);
    if(arrivedElevator && arrivedElevator.ID == closestElevator.ID) {
        closeElevator(arrivedElevator)
    }
    moveElevator(closestElevator, floor)
}

startElevator = (tooFloor) => {
    closeElevator(arrivedElevator)
    moveElevator(arrivedElevator, tooFloor);
}

closeElevator = (elevator) => {
    let id = elevator.ID.toString() + '_' + elevator.currentFloor.toString()
    let door = document.getElementById(id);
    door.style.backgroundColor = "gray" 
    elevator.isOpen = false
}

moveElevator = (elevator, toFloor) => {
    hiddenCallButtons()
    if (elevator.isOpen) {
        closeElevator(elevator)
    }
    hiddenButtons()
    if (elevator.currentFloor == toFloor) {
        openElevatorDoor(elevator)
    } else if (elevator.currentFloor < toFloor) {
        moveElevatorUp(elevator, toFloor)
        highlightedSigns = document.getElementsByClassName('upSign')
        highlightArrows(highlightedSigns)

    } else {
        moveElevatorDown(elevator, toFloor)
        highlightedSigns = document.getElementsByClassName('downSign')
        highlightArrows(highlightedSigns)
    }
}

moveElevatorUp = (elevator, toFloor) => {
    setTimeout(() => {
        elevator.currentFloor++;
        console.log('FEL', elevator)
        if (elevator.currentFloor < toFloor) {
            colorMovingElevator(elevator)
            moveElevatorUp(elevator, toFloor)
        } else {
            openElevatorDoor(elevator)
        }
    }, 1000)
}


moveElevatorDown = (elevator, toFloor) => {
    setTimeout(() => {
        elevator.currentFloor--
        console.log('Le', elevator)
        if (elevator.currentFloor > toFloor) {
            colorMovingElevator(elevator);
            moveElevatorDown(elevator, toFloor)
        } else {
            openElevatorDoor(elevator)
        }
    }, 1000)
}

highlightArrows = (listOfArrows) => {
    for (let item of listOfArrows) {
        item.style.color = "red"
    }
}

unHiglightArrows = () => {
    for (let item of highlightedSigns) {
        item.style.color = "black"
    }
    highlightedSigns = null;
}


colorMovingElevator = (elevator) => {
    let id = elevator.ID.toString() + '_' + elevator.currentFloor.toString()
    let door = document.getElementById(id);
    door.style.backgroundColor = "orange"
    setTimeout(() => {
        door.style.backgroundColor = "gray"
    }, 800)
}

getClosestElevator = (floor) => {
    return Math.abs(elevator1.currentFloor - floor) <= Math.abs(elevator2.currentFloor - floor) ? elevator1 : elevator2
}

hiddenButtons = (elevator) => {
    let buttons = document.getElementById('inside-buttons');
    buttons.hidden = true
}

showButtonsForElevator = (elevator) => {
    let buttons = document.getElementById('inside-buttons');
    elevatorText = elevator.ID == 0 ? 'Left' : 'Right';
    buttons.children[0].children[0].children[0].textContent =  'Inside Elevator ' + elevatorText
    buttons.hidden = false
}

hiddenCallButtons = (elevator) => {
    let callButtons = document.getElementsByClassName('elevatorCallButton');
    for (let item of callButtons) {
        item.disabled= true
    }
}

showCallButtons = (elevator) => {
    let callButtons = document.getElementsByClassName('elevatorCallButton');
    for (let item of callButtons){
        item.disabled = false
    }
}

openElevatorDoor = (elevator) => {
    showCallButtons()
    console.log('kinyilt')
    showButtonsForElevator(elevator)
    elevator.isOpen = true
    let id = elevator.ID.toString() + '_' + elevator.currentFloor.toString()
    let door = document.getElementById(id);
    door.style.backgroundColor = "blue"
    arrivedElevator = elevator;
    if (highlightedSigns) {
        unHiglightArrows()
    }

}

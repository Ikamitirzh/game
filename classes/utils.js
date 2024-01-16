
function rectangularcollision ({rectangle1, rectangle2}){
    return(
        rectangle1.attackbox.position.x + rectangle1.attackbox.width >= rectangle2.position.x && rectangle1.attackbox.position.x <= rectangle2.position.x + enemy.width
        && rectangle1.attackbox.position.y + rectangle1.attackbox.height >= rectangle2.position.y
        && rectangle1.attackbox.position.y <= rectangle2.position.y + rectangle2.height
    )
       
    
}

function determineWinner({player, enemy , timerid}){
    clearTimeout(timerid)
    document.querySelector('#displaytext').style.display = 'flex'
    if(player.health === enemy.health){
        document.querySelector('#displaytext').innerHTML = 'Tie'
        
    }
    else if(player.health> enemy.health){
        document.querySelector('#displaytext').innerHTML = 'Player 1 Wins'
        
    }
    else if(player.health < enemy.health){
        document.querySelector('#displaytext').innerHTML = 'Player 2 Wins'
        
    }
}

let timer = 60
let timerid
function decreasetimer(){
    
    if(timer> 0){
        timerid = setTimeout(decreasetimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }

    if(timer === 0){
       
       determineWinner({player,enemy, timerid})
    }
    
    
}
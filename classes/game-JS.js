const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width =1024
canvas.height = 576

c.fillRect(0 , 0 , canvas.width, canvas.height)
const gravity = 0.7


const background = new Sprit({
   position:{
    x:0,
    y:0
   },
   imageSrc:"./img/background2.jpg"
})

const shop = new Sprit({
    position:{
     x:600,
     y:128
    },
    imageSrc:"./img/shop.png",
    scale: 2.75,
    framesMax: 6
 })

const player = new Fighter({
    position:{
        x: 0,
        y: 0
    },
    velocity:{
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y:0
    },
    imageSrc:"./Idle.png",
    framesMax: 8,
    scale: 2.5,
    offset:{
        x: 215,
        y: 157
    },
    sprites:{
        idle:{
            imageSrc:"./Idle.png",
            framesMax: 8
        },
        run:{
            
            imageSrc:"./Run.png",
            framesMax: 8 
        },
        jump:{
            
            imageSrc:"./img/Jump.png",
            framesMax: 2
        },
        fall:{
            imageSrc:"./img/Fall.png",
            framesMax: 2
        },
        attack1:{
            imageSrc:"./img/Attack1.png",
            framesMax: 6
        },
        takeHit:{
            imageSrc:"./img/Take Hit - white silhouette.png",
            framesMax: 4
        },
        death:{
            imageSrc:"./img/Death.png",
            framesMax: 6
        }
    

    },
    attackBox: {
        offset: {
            x: 100,
            y: 50
        },
        width: 160,
        height: 50
    }

  

   
})

player.draw()

const enemy = new Fighter({
    position:{
        x: 400,
        y: 100
    },
    velocity:{
        x: 0,
        y: 0
    },

    color: 'blue',
    offset: {
        x: -50,
        y:0
    },
    imageSrc:"./kenji/Idle.png",
    framesMax: 4,
    scale: 2.5,
    offset:{
        x: 215,
        y: 167
    },
    sprites:{
        idle:{
            imageSrc:"./kenji/Idle.png",
            framesMax: 4
        },
        run:{
            
            imageSrc:"./kenji/Run.png",
            framesMax: 8
        },
        jump:{
            
            imageSrc:"./kenji/Jump.png",
            framesMax: 2
        },
        fall:{
            imageSrc:"./kenji/Fall.png",
            framesMax: 2
        },
        attack1:{
            imageSrc:"./kenji/Attack1.png",
            framesMax: 4
        },
        takeHit: {
            imageSrc: "./kenji/Take hit.png",
            framesMax: 3
        },
        death:{
            imageSrc:"./Death.png",
            framesMax: 7
        }
    

    },
    attackBox: {
        offset: {
            x:-170,
            y: 50
        },
        width: 170,
        height: 50
    }


   
})


enemy.draw()


// console.log(player)

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}


decreasetimer()

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    c.fillStyle = 'rgba(225, 225, 225, 0 )'
    c.fillRect(0 , 0 , canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    //player movment
    
    if(keys.a.pressed && player.lastkey === 'a'){
        player.velocity.x = -5
        player.switchSprite('run')
    }else if(keys.d.pressed && player.lastkey === 'd'){
        player.velocity.x = 5
        player.switchSprite('run')
    }else{
        player.switchSprite('idle')
    }
    // -----------jumping--------------
    if(player.velocity.y < 0){
        player.switchSprite('jump')
    }else if(player.velocity.y > 0){
        player.switchSprite('fall')
    }

    //enemy movment
    if(keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft'){
        enemy.velocity.x = -5
        enemy.switchSprite('run')
    }else if(keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight'){
        enemy.velocity.x = 5
        enemy.switchSprite('run')
    }else{
        enemy.switchSprite('idle')
    }

    // -----------jumping--------------
    if(enemy.velocity.y < 0){
        enemy.switchSprite('jump')
    }else if(enemy.velocity.y > 0){
        enemy.switchSprite('fall')
    }

    //detect for collision & enemy gets hit
    if(rectangularcollision({
        rectangle1: player,
        rectangle2: enemy
    }) && player.isAttacking && player.frameCurrent === 4){
        enemy.takeHit()
        player.isAttacking = false
        
        // document.querySelector('#enemyHealth').style.width = enemy.health + '%'
        gsap.to('#enemyHealth', {width: enemy.health + '%'})
    }

    //if player misses
    if(player.isAttacking && player.frameCurrent ===4){
        player.isAttacking= false
    }

    //this is where our player gets hit
    if(rectangularcollision({
        rectangle1: enemy,
        rectangle2: player
    }) && enemy.isAttacking && enemy.frameCurrent ===2){
        player.takeHit()
        enemy.isAttacking = false
        
        // document.querySelector('#playerHealth').style.width = player.health + '%'
        gsap.to('#playerHealth', {width: player.health + '%'})
    }

    if(enemy.isAttacking && enemy.frameCurrent ===2){
        enemy.isAttacking= false
    }

    //end game based on health
    if(enemy.health <= 0 || player.health<=0){
        determineWinner({player,enemy , timerid})
    }
}

animate()

window.addEventListener('keydown',(event)=>{
    if(!player.death){

    
    switch(event.key){
        case 'd':
        keys.d.pressed = true 
        player.lastkey = 'd'
        break

        case 'a':
        keys.a.pressed = true 
        player.lastkey = 'a'
        break

        case 'w':
        player.velocity.y = -20
        break

        case ' ':
        player.attack()
        break



    }
    }
    if(!enemy.death){
    switch(event.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = true 
            enemy.lastkey = 'ArrowRight'
            break
    
            case 'ArrowLeft':
            keys.ArrowLeft.pressed = true 
            enemy.lastkey = 'ArrowLeft'
            break
    
            case 'ArrowUp':
            enemy.velocity.y = -20
            break
    
            case 'ArrowDown':
            enemy.attack()
            break
    }
    }

})

window.addEventListener('keyup',(event)=>{
    switch(event.key){
        case 'd':
        keys.d.pressed = false 
        break

        case 'a':
        keys.a.pressed = false 
        break

    }

     //enemy keys

     switch(event.key){
        case 'ArrowRight':
        keys.ArrowRight.pressed = false 
        break

        case 'ArrowLeft':
        keys.ArrowLeft.pressed = false 
        break

      
    }
})
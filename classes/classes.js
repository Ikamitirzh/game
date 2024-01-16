class Sprit{
    constructor({position ,
        imageSrc, 
        scale=1, 
        framesMax = 1, 
        offset = {x: 0, y: 0}}){
        this.position= position
        
        this.height = 150
        this.width = 50
        this.image =new Image()
        this.image.src =imageSrc
        this.scale = scale
        this.framesMax =framesMax
        this.frameCurrent = 0
        this.framesElapse = 0
        this.framesHold = 5
        this.offset = offset
        
        
       
    }
    
    draw(){
        c.drawImage(
             this.image,
             this.frameCurrent * (this.image.width/this.framesMax),
             0,
             this.image.width/ this.framesMax,
             this.image.height,
             this.position.x - this.offset.x, 
             this.position.y - this.offset.y, 
             (this.image.width/ this.framesMax) * this.scale, 
             this.image.height * this.scale)
    }

    animationFrame(){
        this.framesElapse++

        if(this.framesElapse % this.framesHold === 0) {


        if(this.frameCurrent < this.framesMax - 1)
        {this.frameCurrent++
           
        } 
        else{
                this.frameCurrent = 0
        }
    }
    }

    update(){
        this.draw()
        this.animationFrame()
    }
       
    
}




class Fighter extends Sprit{
    constructor({position,
        velocity ,
        color = 'red',
        imageSrc,
        scale=1, 
        framesMax = 1,
        offset = {x: 0, y: 0},
        sprites,
        attackBox = { offset: {}, width:undefined, health: undefined}
        }){
        
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })
        
        
        this.velocity= velocity
        this.height = 150
        this.width = 50
        this.lastkey
        this.attackbox = {
            position:{
                x:this.position.x,
                y:this.position.y
            } ,
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.color =color
        this.isAttacking
        this.health = 100
        this.frameCurrent = 0
        this.framesElapse = 0
        this.framesHold = 5
        this.sprites = sprites
        this.death = false

        for(const sprit in this.sprites){
            sprites[sprit].image = new Image()
            sprites[sprit].image.src = sprites[sprit].imageSrc
        }
        

        
    }
    
//     draw(){
//     c.fillStyle = this.color
//     c.fillRect(this.position.x , this.position.y, this.width , this.height)

//     //attack box
//    if(this.isAttacking){
//     c.fillStyle ='green'
//     c.fillRect(this.attackbox.position.x, this.attackbox.position.y, this.attackbox.width , this.attackbox.height)
//    }
    
//     }

    update(){
        this.draw()
        if(!this.death)this.animationFrame()
        

        //attack boxes
        this.attackbox.position.x = this.position.x + this.attackbox.offset.x
        this.attackbox.position.y = this.position.y + this.attackbox.offset.y
        //draw attack box
        //c.fillRect(this.attackbox.position.x, this.attackbox.position.y, this.attackbox.width, this.attackbox.height)

        this.position.x += this.velocity.x
        this. position.y += this.velocity.y

        //gravity function
        if(this.position.y + this.height + this.velocity.y >= canvas.height - 96){
            this.velocity.y = 0
            this.position.y= 330

        }else{
            this.velocity.y += gravity
        }
        
    }
        attack (){
            this.switchSprite('attack1')
            this.isAttacking = true
            
        }
        takeHit(){
           // this.switchSprite('takeHit')
            this.health -= '20'
            if(this.health<=0){
                this.switchSprite('death')
            }else{
                this.switchSprite('takeHit')
            }
        }

        switchSprite(sprite){
            if(this.image === this.sprites.death.image) {
                if(this.frameCurrent === this.sprites.death.framesMax -1)
                this.death = true
                return}
            //overriding all other animation with the attack animate
            if(this.image === this.sprites.attack1.image && this.frameCurrent < this.sprites.attack1.framesMax -1) return
            // override when fighter gets hit
            if(this.image === this.sprites.takeHit.image && this.frameCurrent < this.sprites.takeHit.framesMax -1)return

            switch (sprite){
                case 'idle':
                    if(this.image !== this.sprites.idle.image){
                        this.image = this.sprites.idle.image
                        this.framesMax = this.sprites.idle.framesMax
                        this.frameCurrent = 0
                    }
                    
                break;
                case 'run':
                    if(this.image !== this.sprites.run.image){
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.frameCurrent = 0
                    }
                    
                break;
                case 'jump':
                    if(this.image !== this.sprites.jump.image){
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.frameCurrent = 0
                    }
                    break;
                
                case 'fall':
                    if(this.image !== this.sprites.fall.image){
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.frameCurrent = 0
                    }
                    break;

                 case 'attack1':
                    if(this.image !== this.sprites.attack1.image){
                    this.image = this.sprites.attack1.image
                    this.framesMax = this.sprites.attack1.framesMax
                    this.frameCurrent = 0
                    }
                    break;

                case 'takeHit':
                    if(this.image !== this.sprites.takeHit.image){
                    this.image = this.sprites.takeHit.image
                    this.framesMax = this.sprites.takeHit.framesMax
                    this.frameCurrent = 0
                    }
                    break;

                case 'death':
                    if(this.image !== this.sprites.death.image){
                    this.image = this.sprites.death.image
                    this.framesMax = this.sprites.death.framesMax
                    this.frameCurrent = 0
                    }
                    break;
    

            }
            
        }
    
}

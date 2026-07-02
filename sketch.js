//aquí pondré las variables

//escena actual/para guaradr qué escena está en el programa 
let escena=1;
//frame actual/para indicar que imagen mostrat dentro de la escena actual
let frameActual=0

//ahora crearé los ARREGLOS para guardar 4 frames en cada escena (y 6 en la última)
let escena1=[];
let escena2=[];
let escena3=[];

//para detertar cuando el usuario hace un mov circular(en la escena2)
let anguloAnterior=0
let acumuladorCircular=0
let empiezoCirculo=false

//para guardar donde comenzó el arrastre
//saber si el usuario está arrastrando
//saber si ya terminó la escena y volver a la 1
let inicioX;
let inicioY;
let arrastrando=false;
let listoParaVolver=false

//para contar los clicspara cambiar de frame
let contadorClicks=0


//ahora para cargar las imágenes
function preload(){
  escena1[0]=loadImage("escena1_0.png")
  escena1[1]=loadImage("escena1_1.png")
  escena1[2]=loadImage("escena1_2.png")
  escena1[3]=loadImage("escena1_3.png")
  
  escena2[0]=loadImage("escena2_0.png")
  escena2[1]=loadImage("escena2_1.png")
  escena2[2]=loadImage("escena2_2.png")
  escena2[3]=loadImage("escena2_3.png")

  escena3[0]=loadImage("escena3_0.png")
  escena3[1]=loadImage("escena3_1.png")
  escena3[2]=loadImage("escena3_2.png")
  escena3[3]=loadImage("escena3_3.png")
  escena3[4]=loadImage("escena3_4.png")
  escena3[5]=loadImage("escena3_5.png")
  //ej de escena1[i]=loadImage("escena1_"i".png")
  //aquí cuando i vale 0, carga escena1_0.png
  //y asi mismo con las demás
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //para que el canvas ocupe toda la pantalla, sin determinar medidas específicas
  //para comprobar que las imágenes cargan(pq no me estaba funcionando)
  console.log(escena1)
}

function draw() {
  background(220);
//ahora para que funcione: si estoy en la escena 1, muestra los frames de la escena 1
  if(escena==1){
    image(escena1[frameActual],0,0,width,height)

    fill(255)
    textAlign(CENTER)
    textSize(32)
    textStyle(BOLD)
    text("Confía en Remy",width/2, height-50)
    textSize(16)
    text("Haz clic para seguir sus instrucciones", width/2, height-30)
    
  }
   if(escena==2){
    image(escena2[frameActual],0,0,width,height)
      fill(255)
    textAlign(CENTER)
    textSize(32)
    textStyle(BOLD)
    text("Cocina la ratatouille",width/2, height-50)
    textSize(16)
    text("Revuelve con el mouse", width/2, height-30)
     //para comenzar mov
     if(mouseIsPressed){
       empiezoCirculo=true
     }
     if(empiezoCirculo){
       //para calcular el ángulo del mouse respecto al centro
       let angulo=atan2(
         mouseY-height/2,
         mouseX-width/2
       );
       //calcular cuanto giró el mouse
       let diferencia=abs(angulo-anguloAnterior);
       //para sumar el mov circular
       acumuladorCircular+=diferencia
       anguloAnterior=angulo;

       //al llegar acá cambia de frame
       if(acumuladorCircular>1.5){
         acumuladorCircular=0;
         frameActual++;
         
       //y cuando termina pasa a la escena 3
        if(frameActual>3){
          escena=3;
          frameActual=0
          listoParaVolver=false
          arrastrando=false
        }
       }
     }
    }
  if(escena==3){
      image(escena3[frameActual],0,0,width,height)
     fill(255)
    textAlign(CENTER)
    textSize(32)
    textStyle(BOLD)
    text("Saborea el recuerdo",width/2, height-50)
    textSize(16)
    text("Arrastra desde el centro hacia la esquina inferior derecha", width/2, height-30)
   
    }
}
  //en la escena 1 quiero que los frames vayan avanzanzando por medio de 1 click
  function mousePressed(){

// ESCENA 1 
if(escena==1){

contadorClicks++;

if(contadorClicks==1){
frameActual=1;
}
else if(contadorClicks==2){
frameActual=0;
}
else if(contadorClicks==3){
frameActual=1;
}
else if(contadorClicks==4){
frameActual=2;
}
else if(contadorClicks==5){
frameActual=3;
}
else if(contadorClicks==6){
frameActual=2;
}
else if(contadorClicks==7){
frameActual=3;
}
else{
escena=2;
frameActual=0;
contadorClicks=0;
empiezoCirculo=false;
}

return;
}

// ESCENA 3 
if(escena==3){

// Si ya terminó la animación, comienza el segundo arrastre
if(listoParaVolver){
arrastrando=true;
inicioX=mouseX;
inicioY=mouseY;
return;
}

let centroX=width/2;
let centroY=height/2;

if(dist(mouseX,mouseY,centroX,centroY)<150){
arrastrando=true;
inicioX=mouseX;
inicioY=mouseY;
}
}
}

//para indicar que el arrastre terminó
  function mouseReleased(){
    //arrastrando=true indica que el usuario está arrastrando el mouse
    //mientras mueve el mouse con el botón presionado, mouseDragged cambia los frames
    //cuando suelta el mouse entra en mouseReleased
    arrastrando=false
    //es decir, el usuario dejó de arrastrar
  }
function mouseDragged(){
//para avanzar frames con arrastre diagonal
if(escena!=3 || !arrastrando){
return;
}

let dx=mouseX-inicioX;
let dy=mouseY-inicioY;

// SEGUNDO ARRASTRE (volver a escena 1)
  //comprobar q ya terminó la escena
  //medir cuanto arrastró hacia la izq
  //si supera 200 pixeles
if(listoParaVolver){

if(dx<-200){

escena=1;
frameActual=0;
contadorClicks=0;

listoParaVolver=false;
arrastrando=false;
empiezoCirculo=false;
}

return;
}

// PRIMER ARRASTRE (animación)
let distancia=sqrt(dx*dx+dy*dy);
  //eso cualcula cuanto se movió el mouse

  //mientra más se arrastra más avanzan los frames

if(distancia<100){
frameActual=0;
}
else if(distancia<200){
frameActual=1;
}
else if(distancia<250){
frameActual=2;
}
else if(distancia<300){
frameActual=3;
}
else if(distancia<350){
frameActual=4;
}
else{

frameActual=5;

listoParaVolver=true;

// Guardamos este punto para medir el arrastre hacia la izquierda
inicioX=mouseX;
inicioY=mouseY;
}

}
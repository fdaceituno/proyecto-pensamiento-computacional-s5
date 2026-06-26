//aquí pondré las variables

//escena actual
let escena=1;
//frame actual
let frameActual=0

//ahora crearé los ARREGLOS para guardar 4 frames en cada escena
let escena1=[];
let escena2=[];
let escena3=[];

let anguloAnterior=0
let acumuladorCircular=0

let empiezoCirculo=false

let inicioX;
let inicioY;
let arrastrando=false;
let finX
let finY

let procesoDrag=0

let contadorClicks=0
let listoParaVolver=false

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
  //ej de escena1[i]=loadImage("assents/escena1_"+i+".png")
  //aquí cuando i vale 0, carga escena1_0.png
  //y asi mismo con las demás
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //para que el canvas ocupe toda la pantalla, sin determinar medidas específicas
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
     if(mouseIsPressed){
       empiezoCirculo=true
     }
     if(empiezoCirculo){
       let angulo=atan2(
         mouseY-height/2,
         mouseX-width/2
       );
       let diferencia=abs(angulo-anguloAnterior);
       acumuladorCircular+=diferencia
       anguloAnterior=angulo;

       if(acumuladorCircular>1.5){
         acumuladorCircular=0;
         frameActual++;

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

// -------- ESCENA 1 --------
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

// -------- ESCENA 3 --------
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

  function mouseReleased(){
    arrastrando=false
  }
function mouseDragged(){

if(escena!=3 || !arrastrando){
return;
}

let dx=mouseX-inicioX;
let dy=mouseY-inicioY;

// SEGUNDO ARRASTRE (volver a escena 1)
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
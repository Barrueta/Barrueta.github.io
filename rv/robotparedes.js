function Sensor(position,direction){
 THREE.Raycaster.call(this,position,direction);
  this.colision=false;
}
Sensor.prototype=new THREE.Raycaster();

function BB8Cabeza(){
 THREE.Object3D.call(this);
 THREE.ImageUtils.crossOrigin = '';
 var texturahead = THREE.ImageUtils.loadTexture('http://francisgoba.github.io/rv/bb8head2.jpg');
 this.cabeza=new THREE.Mesh(new THREE.SphereGeometry    (1.15,100,50,0,Math.PI*2,3*Math.PI/2,Math.PI),new THREE.MeshPhongMaterial({map:texturahead}));
 this.cuello=new THREE.Mesh(new THREE.CylinderGeometry(1.15,1,0.2,100),new     THREE.MeshPhongMaterial({color:0xffffff}));
 this.antena1=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,0.8,100),new     THREE.MeshPhongMaterial({color:0xffffff}));
 this.antena2=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,0.5,100),new     THREE.MeshPhongMaterial({color:0xffffff}));
 this.cabeza.position.y=1.95;
 this.antena1.position.y=3.35;
 this.antena1.position.x=0.13;
 this.antena2.position.y=3.1;
 this.antena2.position.x=-0.15;
 this.cuello.position.y=1.85;
 this.add(this.cabeza);
 this.add(this.antena1);
 this.add(this.antena2);
 this.add(this.cuello);  

 
}

BB8Cabeza.prototype=new THREE.Object3D();

function BB8(x=0, y=0){
 Agent.call(this,x,y);
 THREE.ImageUtils.crossOrigin = '';
 var textura = THREE.ImageUtils.loadTexture('http://francisgoba.github.io/rv/bb8body.jpg');
 this.cuerpo=new THREE.Mesh(new THREE.SphereGeometry(2,100,100), new THREE.MeshPhongMaterial ({map:textura}));
 this.cabezabb8 = new BB8Cabeza();
 this.cuerpo.rotation.z=-0.25;
 
  
 this.add(this.cuerpo);
 this.add(this.cabezabb8);

 this.sensor=new Sensor();
 this.actuator=new Array();
 
 this.cuerpo.rotation.x=Math.PI/2;
 this.cabezabb8.rotation.x=Math.PI/2;
 
 this.cabezabb8.rotation.y=Math.PI+0.5;
 this.cuerpo.scale.x=0.5;
 this.cuerpo.scale.y=0.5;
 this.cuerpo.scale.z=0.5;
 this.cabezabb8.scale.x=0.5;
 this.cabezabb8.scale.y=0.5;
 this.cabezabb8.scale.z=0.5;
 

}
BB8.prototype=new Agent();

function Wall(size,x=0,y=0){
 THREE.Mesh.call(this,new THREE.BoxGeometry(size,size,size), new THREE.MeshLambertMaterial({color:0x777777})); 
 this.size=size;
 this.position.x=x;
 this.position.y=y;
}
Wall.prototype=new THREE.Mesh();

Environment.prototype.setMap=function(map){
 var offset=Math.floor(map.length/2);
 for(var i=0;i<map.length;i++){
  for(var j=0;j<map.length;j++){
   if(map[i][j]==="x")
    this.add(new Wall(1, j-offset,-(i-offset)));
   else if(map[i][j]==="r")
    this.add(new BB8(j-offset,-(i-offset)));
  }
 }
}	

BB8.prototype.sense=function(environment){
 
 this.sensor.set(this.position, new THREE.Vector3(Math.cos(this.rotation.z),Math.sin(this.rotation.z),0));
 

 
 var obstaculo = this.sensor.intersectObjects(environment.children,true);
 if ((obstaculo.length>0&&(obstaculo[0].distance<=1)))
  this.sensor.colision=true;
 else
  this.sensor.colision=false;
}

BB8.prototype.plan = function(environment){
 this.actuator.commands=[];
  if(this.sensor.colision==true)
   this.actuator.commands.push('RotarIzquierda');
  else
   this.actuator.commands.push('Derecho');
}

BB8.prototype.act=function(environment){
 var command=this.actuator.commands.pop();
 if(command==undefined)
  console.log('Undefined command');
 else if(command in this.operations)
  this.operations[command](this);
 else
  console.log('Unknown command'); 
}

BB8.prototype.operations = {};

BB8.prototype.operations.Derecho = function(robot,step){
 if(step==undefined)
  step=0.1;
 robot.position.x+=step*Math.cos(robot.rotation.z);
 robot.position.y+=step*Math.sin(robot.rotation.z);
 robot.cuerpo.rotation.z-=0.5;
};

BB8.prototype.operations.RotarDerecha = function(robot,angulo){
 if(angulo==undefined){
  angulo=-Math.PI/2;
 }
 robot.rotation.z+=angulo;
};

BB8.prototype.operations.RotarIzquierda = function(robot,angulo){
 if(angulo==undefined){
  angulo=Math.PI/2;
 }
 robot.rotation.z+=angulo;
};
 
function setup(){
 var mapa = new Array();
  mapa[0] = "xxxxxxxxxxxxxxxxxxxxxxxxx   x";
  mapa[1] = "x            x       x      x";
  mapa[2] = "x            x       x      x";
  mapa[3] = "x  xxxxxxxxxxx  x  xxx      x";
  mapa[4] = "x               x  x        x";
  mapa[5] = "x               x  x        x";
  mapa[6] = "x     xxxxxxxxxxx  xxxx     x";
  mapa[7] = "xxxx  x               x     x";
  mapa[8] = "   x  x               x     x";
  mapa[9] = "   x  xxxxxxxxxxxx    x     x";
 mapa[10] = "   x        x         x     x";
 mapa[11] = "x  x        x         x     x";
 mapa[12] = "x  x    xxxxx    xxxxxxxxx  x";
 mapa[13] = "x  x    x             x  x  x";
 mapa[14] = "x     xxx             x  x  x";
 mapa[15] = "x     x     x  xxxxxxxx     x";
 mapa[16] = "xxxxxxx     x  x            x";
 mapa[17] = "x        x  x  x            x";
 mapa[18] = "x        x  x  xxxxxxx   x  x";
 mapa[19] = "x   xxxxxxxxx        x   x  x";
 mapa[20] = "x   x  r             x   x  x";
 mapa[21] = "x   x            xxxxx   x  x";
 mapa[22] = "x   x   x        x   x   x  x";
 mapa[23] = "x   xxxxx        x   x   x  x";
 mapa[24] = "x   x            x       x  x";
 mapa[25] = "x   x            x       x  x";
 mapa[26] = "xxxxxxxxxxxxx    xxxxxx  xxxx";
 mapa[27] = "x                           x";
 mapa[28] = "x                           x";
 mapa[29] = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx";


 entorno=new Environment();
 entorno.setMap(mapa);
 var floor=new THREE.Mesh(new THREE.BoxGeometry(28,30,0.1), new THREE.MeshLambertMaterial({color:0x00ff00}));
 floor.position.z=-0.5;
 floor.position.x=-1.5;
 floor.position.y=0.5;
 iluminacion = new THREE.PointLight(0xffffff);
 iluminacion.position.z=20;
 iluminacion.position.y=10;
 camara=new THREE.PerspectiveCamera();
 camara.position.z=40;
 renderer = new THREE.WebGLRenderer();
 renderer.setSize(window.innerHeight*0.95, window.innerHeight*0.95);
 document.body.appendChild(renderer.domElement);
 entorno.add(camara);
 entorno.add(iluminacion);
 entorno.add(floor);
 //entorno.add(spotLight);

 renderer.shadowMap.enabled=true;
 //malla.castShadow=true;
 floor.receiveShadow=true;
 //iluminacion.castShadow=true;
}

function loop(){
 requestAnimationFrame(loop);
 entorno.sense();
 entorno.plan();
 entorno.act();
 renderer.render(entorno,camara);
}

var entorno,iluminacion,robot,step,angulo,camara,renderer;

setup();
loop();

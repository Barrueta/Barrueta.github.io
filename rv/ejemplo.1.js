function Pierna(){
THREE.Object3D.call(this);
this.pierna=new THREE.Mesh(new THREE.BoxGeometry(1,5,1));
this.pie=new THREE.Mesh(new THREE.BoxGeometry(2,1,1));
this.pierna.position.y=-2.5;
this.pie.position.y=-4.5;
this.pie.position.x=1;
this.add(this.pie);
this.add(this.pierna)
}
Pierna.prototype=new THREE.Object3D();

function setup(){
var cuerpo=new THREE.Mesh(new THREE.CylinderGeometry(1,2,5,10));
piernaD=new Pierna();
PiernaI=new Pierna();
cuerpo.position.y=2;
PiernaD.position.z=-1;
PiernaI.position.z=1;
step=.01;
escena=new THREE.Scene();
escena.add(cuerpo);
escena.add(PiernaD);
escena.add(PiernaI);
camara=new THREE.PerspectiveCamera();
camara.position.z=20;
renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerHeight*.95,window.innerHeight*.95);
document.body.appendChild(renderer.domElement);
}
function loop(){
requestAnimationFrame(loop);
renderer.render(escena,camara);
if(Math.abs(PiernaD.rotation.z)<.5)
step=-step;
PiernaD.rotation.z+=step;
PiernaI.rotation.z-=step;
}
var escena,camara,renderer;
var step,PiernaD,PiernaI;
setup();
loop();

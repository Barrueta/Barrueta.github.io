
function setup(){
cubo=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshNormalMaterial());
cubo2=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshNormalMaterial());
pelota=new THREE.Mesh(new THREE.SphereGeometry(0.5), new THREE.MeshNormalMaterial());
cubo.position.x=7;
cubo2.position.x=-7;
camara=new THREE.PerspectiveCamera();
camara.position.z=20;
raycaster1=new THREE.Raycaster(pelota.position,new THREE.Vector3(1,0,0));
raycaster2=new THREE.Raycaster(pelota.position,new THREE.Vector3(-1,0,0));
escena=new THREE.Scene();
escena.add(cubo);
escena.add(cubo2);
escena.add(camara);
escena.add(pelota);
renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerHeight*0.95,window.innerHeight*0.95);
document.body.appendChild(renderer.domElement);
step=0.01;
}
function loop(){
obstaculo1=raycaster1.intersectObject(cubo);
obstaculo2=raycaster2.intersectObject(cubo2);
if((obstaculo1.length>0 && (obstaculo1[0].distance<=0.5))|| (obstaculo2.length>0 && (obstaculo2[0].distance<=0.5)))
step=-step;
pelota.position.x +=step
raycaster1.set(pelota.position,new THREE.Vector3(1,0,0));
raycaster2.set(pelota.position,new THREE.Vector3(-1,0,0));
renderer.render(escena,camara);
requestAnimationFrame(loop);
}
var cubo,cubo2,escena,pelota,camara,renderer;
var raycaster1,raycaster2,step;
var obstaculo1,obstaculo2;
setup();
loop();


function setup(){
THREE.ImageUtils.crossOrigin = '';
var textura = new THREE.TextureLoader().load('./jade_dragon.jpg');
var forma=new THREE.CylinderGeometry(2.5,2.5,10,50);
var material=new THREE.MeshPhongMaterial({map:textura});
var pared1 = new THREE.Mesh(new THREE.BoxGeometry(1,20,10), new THREE.MeshPhongMaterial({color:'#ffffff'}));
var pared2 = new THREE.Mesh(new THREE.BoxGeometry(1,20,10), new THREE.MeshPhongMaterial({color:'#ffffff'}));
var pared3 = new THREE.Mesh(new THREE.BoxGeometry(21,1,10), new THREE.MeshPhongMaterial({color:'#ffffff'}));
var pared4 = new THREE.Mesh(new THREE.BoxGeometry(21,1,10), new THREE.MeshPhongMaterial({color:'#ffffff'}));
pared1.position.x=10;
pared2.position.x=-10;
pared3.position.y=10;
pared4.position.y=-10;
luz=new THREE.SpotLight(0xffffff);
luz.position.x=0;
luz.position.y=0;
luz.position.z=0;
malla=new THREE.Mesh(forma,material);
malla.material.transparent=true;
malla.material.opacity=0.5;
malla.rotation.x=Math.PI/2;
escena=new THREE.Scene();
escena.add(pared1);
escena.add(pared2);
escena.add(pared3);
escena.add(pared4);
escena.add(malla);
escena.add(luz);
var fov=75;
var aspect=window.innerWidth/window.innerHeight;
var near=0.1;
var far=1000;
camara=new THREE.PerspectiveCamera(fov,aspect,near,far);
camara.position.z=20;

renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled=true;
malla.castShadow=true;
pared1.receiveShadow=true;
pared2receiveShadow=true;
pared3.receiveShadow=true;
pared4.receiveShadow=true;
luz.castShadow=true;

}
function loop()
{
  requestAnimationFrame(loop);
  malla.rotation.y+=0.1;
  renderer.render(escena,camara);
}

var malla,escena,camara,renderer,luz;
setup();
loop();



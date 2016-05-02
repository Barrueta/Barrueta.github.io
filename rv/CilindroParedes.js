function setup(){
THREE.ImageUtils.crossOrigin = '';
var textura = new THREE.TextureLoader().load('./jade_dragon.jpg');
var forma=new THREE.CylinderGeometry(1,1,5,50);
var material=new THREE.MeshPhongMaterial({map:textura});
luz=new THREE.PointLight(0xffffff);
malla=new THREE.Mesh(forma,material);
malla.material.opacity=0.5;
escena=new THREE.Scene();
escena.add(malla);
escena.add(luz);

var fov=75;
var aspect=window.innerWidth/window.innerHeight;
var near=0.1;
var far=1000;
camara=new THREE.PerspectiveCamera(fov,aspect,near,far);
camara.position.z=5;

renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);


}
function loop()
{
  requestAnimationFrame(loop);
  renderer.render(escena,camara);
}

var malla,escena,camara,renderer,luz;
setup();
loop();



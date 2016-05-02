function setup(){
var forma=new THREE.CylinderGeometry(1,1,5,50);
var material=new THREE.MeshDepthMaterial({color:0x00ff00});
malla=new THREE.Mesh(forma,material);
escena=new THREE.Scene();
escena.add(malla);

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
  requestAnimationFrame(render);
  renderer.render(escena,camara);
}

var malla,escena,camara,renderer;
loop();
setup();


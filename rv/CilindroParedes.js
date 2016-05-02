function setup(){
var escena=new THREE.Scene();
var fov=75;
var aspect=window.innerWidth/window.innerHeight;
var near=0.1;
var far=1000;
var camara=new THREE.PerspectiveCamera(fov,aspect,near,far);
camara.position.z=5;
var renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
var forma=new THREE.CylinderGeometry(1,1,5,50);
var material=new THREE.MeshDepthMaterial({color:0x00ff00});
var cilindro=new THREE.Mesh(forma,material);
escena.add(cilindro);
}
function render()
{
  requestAnimationFrame(render);
  renderer.render(escena,camara);
}
render();


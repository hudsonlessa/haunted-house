import './styles.css';

import GUI from 'lil-gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const { body } = document;
const canvas = document.createElement('canvas');
canvas.classList.add('webgl');
body.appendChild(canvas);

const gui = new GUI();

const textureLoader = new THREE.TextureLoader();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();

const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({
  color: '#a9c388',
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = 0;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

const house = new THREE.Group();
scene.add(house);

const wallsGeometry = new THREE.BoxGeometry(4, 2.5, 4);
const wallsMaterial = new THREE.MeshStandardMaterial({ color: '#ac8e82' });
const walls = new THREE.Mesh(wallsGeometry, wallsMaterial);
walls.position.y = 2.5 / 2;
house.add(walls);

const roofGeometry = new THREE.ConeGeometry(3.5, 1, 4);
const roofMaterial = new THREE.MeshStandardMaterial({ color: '#b35f45' });
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.position.y = 2.5 + 1 / 2;
roof.rotation.y = Math.PI / 4;
house.add(roof);

const doorGeometry = new THREE.PlaneBufferGeometry(2.2, 2.2, 100, 100);
doorGeometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(doorGeometry.attributes.uv.array, 2)
);

const doorColorTexture = textureLoader.load('./textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load(
  './textures/door/ambientOcclusion.jpg'
);
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load(
  './textures/door/metalness.jpg'
);
const doorRoughnessTexture = textureLoader.load(
  './textures/door/roughness.jpg'
);

const doorMaterial = new THREE.MeshStandardMaterial({
  map: doorColorTexture,
  alphaMap: doorAlphaTexture,
  transparent: true,
  aoMap: doorAmbientOcclusionTexture,
  displacementMap: doorHeightTexture,
  displacementScale: 0.1,
  normalMap: doorNormalTexture,
  metalnessMap: doorMetalnessTexture,
  roughnessMap: doorRoughnessTexture,
});

const door = new THREE.Mesh(doorGeometry, doorMaterial);
door.position.y = 1;
door.position.z = 2 + 0.01;
house.add(door);

const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' });
const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.position.set(0.8, 0.2, 2.2);
bush1.scale.set(0.5, 0.5, 0.5);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.position.set(1.4, 0.1, 2.1);
bush2.scale.set(0.25, 0.25, 0.25);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.position.set(-0.8, 0.1, 2.2);
bush3.scale.set(0.4, 0.4, 0.4);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.position.set(-1, 0.05, 2.6);
bush4.scale.set(0.15, 0.15, 0.15);

house.add(bush1, bush2, bush3, bush4);

const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' });

for (let i = 0; i < 50; i += 1) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 6;

  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.set(x, 0.3, z);
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;
  graves.add(grave);
}

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(3, 3, -3);
scene.add(camera);

const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12);
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001);
scene.add(ambientLight);

const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001);
gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001);
gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001);
gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001);
scene.add(moonLight);

const doorLight = new THREE.PointLight('#ff7d46', 1, 7);
doorLight.position.set(0, 2.2, 2.7);
house.add(doorLight);

const fog = new THREE.Fog('#262837', 1, 15);
scene.fog = fog;

const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.render(scene, camera);
renderer.setClearColor('#262837');

const updateRendererSizeAndPixelRatio = () => {
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

updateRendererSizeAndPixelRatio();

const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener('resize', () => {
  const updateSizes = () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
  };

  const updateCameraAspectRatio = () => {
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
  };

  updateSizes();
  updateCameraAspectRatio();
  updateRendererSizeAndPixelRatio();
});

const tick = () => {
  renderer.render(scene, camera);

  requestAnimationFrame(tick);
};

tick();

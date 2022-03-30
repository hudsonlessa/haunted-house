import './styles.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const { body } = document;
const canvas = document.createElement('canvas');
canvas.classList.add('webgl');
body.appendChild(canvas);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();

const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({
  color: '#999',
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = 0;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(3, 3, -3);
scene.add(camera);

const ambientLight = new THREE.AmbientLight('#fff', 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('#fff', 0.5);
directionalLight.position.set(4, 5, -2);
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.render(scene, camera);

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

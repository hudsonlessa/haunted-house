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

const defaultCubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const defaultCubeMaterial = new THREE.MeshBasicMaterial({ color: "#999" });
const defaultCube = new THREE.Mesh(defaultCubeGeometry, defaultCubeMaterial);
scene.add(defaultCube);

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = -3;
camera.lookAt(defaultCube.position);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

const tick = () => {
  renderer.render(scene, camera);

  requestAnimationFrame(tick);
};

tick();

import './styles.css';
import * as THREE from 'three';

const { body } = document;
const canvas = document.createElement('canvas');
canvas.classList.add('webgl');
body.appendChild(canvas);

const defaultCubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const defaultCubeMaterial = new THREE.MeshBasicMaterial({ color: '#f00' });
const defaultCube = new THREE.Mesh(defaultCubeGeometry, defaultCubeMaterial);

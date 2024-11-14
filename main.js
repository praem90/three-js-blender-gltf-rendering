import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FlyControls } from 'three/addons/controls/FlyControls.js';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
// const camera = new THREE.OrthographicCamera();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.set(0, 0, 0);

const light = new THREE.AmbientLight( 0x00ff00, 0.7 ); // soft white light
scene.add( light );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 5 );
scene.add( directionalLight );

const loader = new GLTFLoader();

loader.load( '3dwithlight.glb',  ( gltf ) => {
	scene.add( gltf.scene );
	renderer.render( scene, camera );
}, undefined, function ( error ) {
	console.error( error );
} );


const controls = new OrbitControls( camera, renderer.domElement );
				controls.listenToKeyEvents( window ); // optional

				//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

				controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
				controls.dampingFactor = 0.05;

				controls.screenSpacePanning = false;

				controls.minDistance = 1;
				controls.maxDistance = 1000;

				controls.maxPolarAngle = Math.PI / 2;

// const flyControl = new FlyControls(camera, renderer.domElement);
// flyControl.addEventListener( 'change', animate ); // call this only in static scenes (i.e., if there is no animation loop)
//
const firstPersonControl = new FirstPersonControls(camera, renderer.domElement);
firstPersonControl.lookAt(0, 0, 0);
firstPersonControl.connect();


function animate() {
    controls.update();
    // flyControl.update();
    // firstPersonControl.update();
	renderer.render( scene, camera );
}

window.addEventListener('click', () => {
    console.log( camera.position);
});

renderer.setAnimationLoop( animate );


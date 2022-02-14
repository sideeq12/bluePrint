import './style.css'

import * as THREE from "three"
import {OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import {PointerLockControls} from "three/examples/jsm/controls/PointerLockControls"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"

// scene to be rendered
const scene = new THREE.Scene();


 const gltfLoader = new GLTFLoader();
  gltfLoader.load(
      "/models/room/scene.gltf",
      (gltf)=>{
          const root = gltf.scene
          root.scale.set(0.5, 0.5, 0.5)
          root.position.set(0, -1, 0)
          scene.add(root)
          }
  )

  scene.background = new THREE.Color( "#4A5043" );
// creating our scene
// const mesh = new THREE.BoxGeometry(1,1,1)
// const material = new THREE.MeshBasicMaterial({color : "orange"})
// const cube = new THREE.Mesh(mesh, material)

// cube.position.set(0.7, 1, 0)
// cube.rotation.set(1,1,1)

// const floor = new THREE.Mesh(
//     new THREE.PlaneGeometry(10,10),
//     new THREE.MeshStandardMaterial({
//         color : "#444444",
//         metalness : 0, roughness : 0.5
//     })
// )
// floor.rotation.x = -55
// floor.position.y = 0;
// scene.add(floor)

let ambientLight = new THREE.AmbientLight(new THREE.Color('hsl(0, 0%, 100%)'), 0.75);
    scene.add(ambientLight);

    let directionalLightBack = new THREE.DirectionalLight(new THREE.Color('hsl(0, 0%, 100%)'), 0.25);
    directionalLightBack.position.set(30, 100, 100);
    scene.add(directionalLightBack);

    let directionalLightFront = new THREE.DirectionalLight(new THREE.Color('hsl(0, 0%, 100%)'), 0.25);
    directionalLightFront.position.set(-30, 100, -100);
    scene.add(directionalLightFront);

// view ratio
const sizes = {
    width : window.innerWidth,
    height : window.innerHeight
}

// creating our axis helper
// const axesHelper = new THREE.AxesHelper(2);
// scene.add(axesHelper)

// creating our camera position
const camera = new THREE.PerspectiveCamera(65, sizes.width/sizes.height)
// const camera = new THREE.OrthographicCamera(-1,1,1,-1, 0.1, 99)
camera.position.set(0,1.5,0.5)
scene.add(camera)



const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({
    canvas : canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

const cursor = { x : 0, y : 0}
const clock = new  THREE.Clock()

// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

const controls = new PointerLockControls(camera, canvas)

const btn = document.querySelector("#button1")
const span = document.querySelector("#spa")
let status = false
btn.addEventListener("click", ()=>{
    controls.lock()
    status = true
    
})

let keyboard =[];

addEventListener("keydown", (e)=>{
    keyboard[e.key] = true
})


addEventListener("keyup", (e)=>{
    keyboard[e.key] = false
})
// const delta = clock.getDelta()
function processKeyboard(){
    // let speed = 5
    let actualspeed = 0.05
    if(keyboard["w"] || keyboard["ArrowUp"]){
        controls.moveForward(actualspeed)
    }
    if(keyboard["s"] || keyboard["ArrowDown"]){
        controls.moveForward(-actualspeed)
    }
    if(keyboard["a"] || keyboard["ArrowLeft"]){
        controls.moveRight(-actualspeed)
    }
    if(keyboard["d"] || keyboard["ArrowRight"]){
        controls.moveRight(actualspeed) 
    }
    
}

window.addEventListener("resize", ()=>{
    console.log("window has been resized")
})

const tick =()=>{
    const elapsedTime = clock.getElapsedTime()
    // controls.update()
    processKeyboard()
    span.style.display = `${status ? "none" : "block"}`;
    renderer.render(scene, camera)
    
    window.requestAnimationFrame(tick)
}
tick()
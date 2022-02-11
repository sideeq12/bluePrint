import './style.css'

import * as THREE from "three"
import {OrbitControls } from "three/examples/jsm/controls/OrbitControls"

console.log(OrbitControls)
// scene to be rendered
const scene = new THREE.Scene();

// creating our scene
const mesh = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color : "orange"})
const cube = new THREE.Mesh(mesh, material)

cube.position.set(0.7, 1, 0)
// cube.rotation.set(1,1,1)
scene.add(cube)


// view ratio
const sizes = {
    width : window.innerWidth,
    height : window.innerHeight
}

// creating our axis helper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper)

// creating our camera position
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
// const camera = new THREE.OrthographicCamera(-1,1,1,-1, 0.1, 99)
camera.position.set(1,1,3)
scene.add(camera)



const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({
    canvas : canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

const cursor = { x : 0, y : 0}
const clock = new  THREE.Clock()

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

window.addEventListener("mousemove", (event)=>{
    cursor.x = -(event.clientX/sizes.width -0.5);
    cursor.y = -(event.clientY/sizes.height -0.5);
    // console.log(cursor.x)
})

window.addEventListener("resize", ()=>{
    console.log("window has been resized")
})

const tick =()=>{
    const elapsedTime = clock.getElapsedTime()

    // camera.position.x = Math.sin(cursor.x * Math.PI *2) * 3;
    // camera.position.z = Math.cos(cursor.x * Math.PI *2) * 3;
    // camera.position.y = cursor.y* 5
    // camera.lookAt(cube.position)
    controls.update()
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}
tick()
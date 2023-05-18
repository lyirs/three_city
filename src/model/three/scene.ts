/*
 * @Author:
 * @Date: 2022-11-07 16:47:32
 * @LastEditTime: 2022-11-10 14:13:14
 * @Description:
 */
import * as THREE from "three";
const scene = new THREE.Scene();

const textureCubeLoader = new THREE.CubeTextureLoader().setPath("./textures/");
const textureCube = textureCubeLoader.load([
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
]);

scene.background = textureCube;
scene.environment = textureCube;

export default scene;

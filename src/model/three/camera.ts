/*
 * @Author:
 * @Date: 2022-11-07 17:26:59
 * @LastEditTime: 2022-11-08 17:54:42
 * @Description:
 */
import * as THREE from "three";

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  50000
);
camera.position.set(5, 10, 15);
camera.aspect = window.innerWidth / window.innerHeight;

export default camera;

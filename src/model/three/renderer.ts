/*
 * @Author:
 * @Date: 2022-11-07 17:31:27
 * @LastEditTime: 2022-11-10 14:14:20
 * @Description:
 */
import * as THREE from "three";

const renderer = new THREE.WebGLRenderer({
  antialias: true, // 抗锯齿
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

export default renderer;

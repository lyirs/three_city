/*
 * @Author:
 * @Date: 2022-11-07 17:38:56
 * @LastEditTime: 2022-11-07 17:40:50
 * @Description:
 */
import * as THREE from "three";
import controls from "./controls";
import renderer from "./renderer";
import scene from "./scene";
import camera from "./camera";

const clock = new THREE.Clock();
function render() {
  controls.update();
  renderer.render(scene, camera);
  let time = clock.getElapsedTime();
  requestAnimationFrame(render);
}

export default render;

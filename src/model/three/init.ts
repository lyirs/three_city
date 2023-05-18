/*
 * @Author:
 * @Date: 2022-11-07 17:36:28
 * @LastEditTime: 2022-11-07 17:36:46
 * @Description:
 */
import camera from "./camera";
import renderer from "./renderer";
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

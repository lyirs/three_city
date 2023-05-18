/*
 * @Author:
 * @Date: 2022-11-07 17:34:36
 * @LastEditTime: 2022-11-07 17:38:05
 * @Description:
 */
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import camera from "./camera";
import renderer from "./renderer";

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 设置控制器阻尼

export default controls;

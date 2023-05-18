/*
 * @Author:
 * @Date: 2022-11-07 19:00:11
 * @LastEditTime: 2022-11-10 16:35:40
 * @Description:
 */

import * as THREE from "three";
import scene from "../scene";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import modifyCityMaterial from "../modify/modifyCityMaterial";
import FlyLine from "./flyLine";
import FlyLineShader from "./flyLineShader";
import MeshLine from "./meshLine";
import LightWall from "./lightWall";
import LightRadar from "./lightRadar";
import AlarmSprite from "./alarmSprite";

export default function createCity() {
  const loader = new GLTFLoader();
  loader.load("./model/city.glb", (gltf) => {
    gltf.scene.traverse((item) => {
      if (item.type == "Mesh") {
        const cityMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0x000046),
          side: THREE.DoubleSide,
        });
        // @ts-ignore
        item.material = cityMaterial;
        modifyCityMaterial(item);
      }
      // 加入线框
      if (item.name == "Layerbuildings") {
        // @ts-ignore
        const meshLine = new MeshLine(item.geometry);
        meshLine.mesh.scale.set(
          item.scale.x * 1.001,
          item.scale.y * 1.001,
          item.scale.z * 1.001
        );
        // @ts-ignore
        meshLine.material.color = new THREE.Color(0x87cefa);
        scene.add(meshLine.mesh);
      }
    });
    scene.add(gltf.scene);

    // const flyLine = new FlyLine();
    // scene.add(flyLine.mesh);

    // const flyLineShader = new FlyLineShader();
    // scene.add(flyLineShader.mesh);

    // const lightWall = new LightWall();
    // scene.add(lightWall.mesh);

    // const lightRadar = new LightRadar();
    // scene.add(lightRadar.mesh);

    // const alarmSprite = new AlarmSprite();
    // scene.add(alarmSprite.mesh);
    // alarmSprite.onClick((e: any) => {
    //   console.log(e);
    // });
  });
}

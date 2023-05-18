<!--
 * @Author: 
 * @Date: 2022-11-07 16:17:36
 * @LastEditTime: 2022-11-10 19:10:27
 * @Description: 
-->
<template>
  <div class="scene" ref="sceneDiv"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import * as THREE from "three";

import gsap from "gsap";

import scene from "@/model/three/scene";
import camera from "@/model/three/camera";
import renderer from "@/model/three/renderer";
import axesHelper from "@/model/three/axesHelper";
import controls from "@/model/three/controls";
import "@/model/three/init";
import render from "@/model/three/render";

import createMesh from "@/model/three/createMesh";
import AlarmSprite from "@/model/three/mesh/alarmSprite";
import LightRadar from "@/model/three/mesh/lightRadar";
import FlyLineShader from "@/model/three/mesh/flyLineShader";
import LightWall from "@/model/three/mesh/lightWall";
import eventHub from "@/utils/eventHub";

interface IPosition {
  x: number;
  z: number;
}

interface IMapFn {
  火警: (position: IPosition, i: number) => void;
  治安: (position: IPosition, i: number) => void;
  电力: (position: IPosition, i: number) => void;
}

interface IEventList {
  name: string;
  type: string;
  position: IPosition;
  time: string;
}

const props = defineProps(["eventList"]);

const sceneDiv = ref(null);
scene.add(camera);
scene.add(axesHelper);

createMesh();

onMounted(() => {
  // @ts-ignore
  sceneDiv.value.appendChild(renderer.domElement);
  render();
});

const eventListMesh: (LightWall | FlyLineShader | LightRadar | AlarmSprite)[] =
  [];
let mapFn: IMapFn = {
  火警: (position: IPosition, i: number) => {
    const lightWall = new LightWall(1, 2, position);
    lightWall.eventListIndex = i;
    scene.add(lightWall.mesh);
    eventListMesh.push(lightWall);
  },
  治安: (position: IPosition, i: number) => {
    //   生成随机颜色
    const color = new THREE.Color(
      Math.random(),
      Math.random(),
      Math.random()
    ).getHex();
    // 添加着色器飞线
    const flyLineShader = new FlyLineShader(position, color);
    flyLineShader.eventListIndex = i;
    scene.add(flyLineShader.mesh);
    eventListMesh.push(flyLineShader);
  },
  电力: (position: IPosition, i: number) => {
    // 添加雷达
    const lightRadar = new LightRadar(2, position);
    lightRadar.eventListIndex = i;
    scene.add(lightRadar.mesh);
    eventListMesh.push(lightRadar);
  },
};

eventHub.on("eventToggle", (i: any) => {
  eventListMesh.forEach((item) => {
    if (item.eventListIndex === i) {
      item.mesh.visible = true;
    } else {
      item.mesh.visible = false;
    }
  });
  const position = {
    x: props.eventList[i].position.x / 5 - 10,
    y: 0,
    z: props.eventList[i].position.z / 5 - 10,
  };
  //   controls.target.set(position.x, position.y, position.z);
  gsap.to(controls.target, {
    duration: 1,
    x: position.x,
    y: position.y,
    z: position.z,
  });
});

watch(
  () => props.eventList,
  (val: any) => {
    eventListMesh.forEach((item) => {
      item.remove();
    });
    props.eventList.forEach((item: IEventList, i: number) => {
      const position = {
        x: item.position.x / 5 - 10, // -10-10
        z: item.position.z / 5 - 10,
      };
      const alarmSprite = new AlarmSprite(item.name, position);

      alarmSprite.onClick(() => {
        // console.log(item.name, i);
        eventHub.emit("spriteClick", { event: item, i });
      });
      alarmSprite.eventListIndex = i;
      eventListMesh.push(alarmSprite);
      scene.add(alarmSprite.mesh);
      // @ts-ignore
      if (mapFn[item.name]) {
        // @ts-ignore
        mapFn[item.name](position, i);
      }
    });
  }
);
</script>

<style>
.scene {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
}
</style>

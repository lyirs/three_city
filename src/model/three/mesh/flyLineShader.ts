/*
 * @Author:
 * @Date: 2022-11-08 15:44:09
 * @LastEditTime: 2022-11-10 16:34:06
 * @Description:着色器实现光带
 */
import * as THREE from "three";
import gsap from "gsap";

import vertex from "@/shader/flyLine/vertex.glsl";
import fragment from "@/shader/flyLine/fragment.glsl";

export default class FlyLineShader {
  private lineCurve: THREE.CatmullRomCurve3;
  private geometry: THREE.BufferGeometry;
  private shaderMaterial: THREE.ShaderMaterial;
  public mesh: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>;
  eventListIndex: any;
  constructor(position = { x: 0, z: 0 }, color = 0x00ffff) {
    const linePoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(position.x / 2, 4, position.z / 2),
      new THREE.Vector3(position.x, 0, position.z),
    ];
    this.lineCurve = new THREE.CatmullRomCurve3(linePoints);
    const points = this.lineCurve.getPoints(1000);
    this.geometry = new THREE.BufferGeometry().setFromPoints(points);

    const aSizeArray = new Float32Array(points.length);
    for (let i = 0; i < aSizeArray.length; i++) {
      aSizeArray[i] = i;
    }
    this.geometry.setAttribute(
      "aSize",
      new THREE.BufferAttribute(aSizeArray, 1)
    );

    this.shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: {
          value: 0,
        },
        uColor: {
          value: new THREE.Color(color),
        },
        uLength: {
          value: points.length,
        },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.mesh = new THREE.Points(this.geometry, this.shaderMaterial);

    gsap.to(this.shaderMaterial.uniforms.uTime, {
      value: 1000,
      duration: 1,
      repeat: -1,
      ease: "none",
    });
  }

  remove() {
    this.mesh.remove();
    this.mesh.removeFromParent();
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}

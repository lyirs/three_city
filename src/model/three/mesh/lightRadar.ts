/*
 * @Author:
 * @Date: 2022-11-08 17:39:06
 * @LastEditTime: 2022-11-08 17:45:51
 * @Description:
 */
import * as THREE from "three";
import gsap from "gsap";
import vertex from "@/shader/lightRadar/vertex.glsl";
import fragment from "@/shader/lightRadar/fragment.glsl";

export default class LightRadar {
  private geometry: THREE.PlaneGeometry;
  private material: THREE.ShaderMaterial;
  public mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  eventListIndex: any;

  constructor(radius = 2, position = { x: -8, z: 8 }, color = 0xff0000) {
    this.geometry = new THREE.PlaneGeometry(radius, radius);
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(color) },
        uTime: {
          value: 0,
        },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(position.x, 1, position.z);
    this.mesh.rotation.x = -Math.PI / 2;

    gsap.to(this.material.uniforms.uTime, {
      value: 1,
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

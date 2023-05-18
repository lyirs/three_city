/*
 * @Author:
 * @Date: 2022-11-08 16:57:46
 * @LastEditTime: 2022-11-08 17:08:38
 * @Description: 线框  边缘几何体
 */
import scene, * as THREE from "three";
export default class MeshLine {
  private material: THREE.LineBasicMaterial;
  private geometry: THREE.EdgesGeometry<THREE.BufferGeometry>;
  public mesh: THREE.LineSegments<
    THREE.EdgesGeometry<THREE.BufferGeometry>,
    THREE.LineBasicMaterial
  >;
  constructor(geometry: THREE.BufferGeometry) {
    this.geometry = new THREE.EdgesGeometry(geometry);
    this.material = new THREE.LineBasicMaterial({ color: 0xffffff });

    const line = new THREE.LineSegments(this.geometry, this.material);
    this.mesh = line;
  }
}

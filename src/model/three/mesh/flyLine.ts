/*
 * @Author:
 * @Date: 2022-11-08 15:44:09
 * @LastEditTime: 2022-11-08 16:00:23
 * @Description:非着色器实现光带
 */
import * as THREE from "three";
import gsap from "gsap";

export default class FlyLine {
  private lineCurve: THREE.CatmullRomCurve3;
  private geometry: THREE.TubeGeometry;
  private matrerial: THREE.MeshBasicMaterial;
  public mesh: THREE.Mesh<THREE.TubeGeometry, THREE.MeshBasicMaterial>;
  public texture: THREE.Texture;
  constructor() {
    const linePoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(5, 4, 0),
      new THREE.Vector3(10, 0, 0),
    ];
    this.lineCurve = new THREE.CatmullRomCurve3(linePoints);
    this.geometry = new THREE.TubeGeometry(this.lineCurve, 100, 0.1, 2, false);

    const textureLoader = new THREE.TextureLoader();
    this.texture = textureLoader.load("./textures/z_11.png");
    this.texture.repeat.set(1, 2);
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.wrapT = THREE.MirroredRepeatWrapping;

    this.matrerial = new THREE.MeshBasicMaterial({
      //   color: 0xfff000,
      map: this.texture,
      transparent: true,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.matrerial);

    gsap.to(this.texture.offset, {
      x: -1,
      duration: 1,
      repeat: -1,
      ease: "none",
    });
  }
}

/*
 * @Author:
 * @Date: 2022-11-07 19:10:32
 * @LastEditTime: 2022-11-09 17:48:07
 * @Description:
 */
import * as THREE from "three";
import gsap from "gsap";

export default function modifyCityMaterial(mesh: THREE.Object3D) {
  // @ts-ignore
  mesh.material.onBeforeCompile = (shader: THREE.Shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <dithering_fragment>",
      `
          #include <dithering_fragment>
          //#end#
           `
    );
    addGradColor(shader, mesh);
    addSpread(shader);
    addLightLine(shader);
    addToTopLine(shader);
  };
}

export function addGradColor(shader: THREE.Shader, mesh: THREE.Object3D) {
  // @ts-ignore
  mesh.geometry.computeBoundingBox();
  // @ts-ignore
  const { min, max } = mesh.geometry.boundingBox;
  const uHeight = max.y - min.y;

  shader.uniforms.uTopColor = {
    value: new THREE.Color("#87CEFA"),
  };
  shader.uniforms.uHeight = {
    value: uHeight,
  };

  shader.vertexShader = shader.vertexShader.replace(
    "#include <common>",
    `
      #include <common>
      varying vec3 vPosition;
      `
  );

  shader.vertexShader = shader.vertexShader.replace(
    "#include <begin_vertex>",
    `
        #include <begin_vertex>
        vPosition = position;
        `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
        #include <common>
        uniform vec3 uTopColor;
        uniform float uHeight;
        varying vec3 vPosition;
        `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    "//#end#",
    `
      vec4 distGradColor = gl_FragColor;
      // 计算混合百分比
      float gradMix = (vPosition.y + uHeight /2.0) / uHeight - 0.8;
      // 计算混合颜色
      vec3 gradMixColor = mix(distGradColor.xyz,uTopColor,gradMix);   
      gl_FragColor = vec4(gradMixColor,1); 
      //#end#  
       `
  );
}

export function addSpread(shader: THREE.Shader) {
  shader.uniforms.uSpreadCenter = {
    value: new THREE.Vector2(0, 0),
  };
  shader.uniforms.uSpreadTime = {
    value: 0,
  };
  shader.uniforms.uSpreadWidth = {
    value: 40,
  };

  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
    #include <common>
     uniform vec2 uSpreadCenter;
     uniform float uSpreadTime;
     uniform float uSpreadWidth;
       `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    "//#end#",
    `
    float spreadRadius = distance(vPosition.xz,uSpreadCenter);
    // 扩散范围函数
    float spreadIndex = -(spreadRadius-uSpreadTime)*(spreadRadius-uSpreadTime) + uSpreadWidth;
    if(spreadIndex>0.0){
        gl_FragColor = mix(gl_FragColor,vec4(1,1,1,1),spreadIndex/uSpreadWidth);
    }
      //#end#  
       `
  );

  gsap.to(shader.uniforms.uSpreadTime, {
    value: 800,
    duration: 2,
    ease: "none",
    repeat: -1,
  });
}

export function addLightLine(shader: THREE.Shader) {
  shader.uniforms.uLightLineTime = {
    value: -1000,
  };
  shader.uniforms.uLightLineWidth = {
    value: 40,
  };

  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
      #include <common>
       uniform float uLightLineTime;
       uniform float uLightLineWidth;
         `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    "//#end#",
    `
      // 扩散范围函数
      float lightLineMix = -(vPosition.x-uLightLineTime)*(vPosition.x-uLightLineTime) + uLightLineWidth;
      if(lightLineMix>0.0){
          gl_FragColor = mix(gl_FragColor,vec4(1,0.8,0.8,1),lightLineMix/ uLightLineWidth);
      }
        //#end#  
         `
  );

  gsap.to(shader.uniforms.uLightLineTime, {
    value: 1000,
    duration: 4,
    ease: "none",
    repeat: -1,
  });
}

export function addToTopLine(shader: THREE.Shader) {
  shader.uniforms.uToTopLineTime = {
    value: 0,
  };
  shader.uniforms.uToTopLineWidth = {
    value: 40,
  };

  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
        #include <common>
         uniform float uToTopLineTime;
         uniform float uToTopLineWidth;
           `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    "//#end#",
    `
        // 扩散范围函数
        float toTopLineMix = -(vPosition.y-uToTopLineTime)*(vPosition.y-uToTopLineTime) + uToTopLineWidth;
        if(toTopLineMix>0.0){
            gl_FragColor = mix(gl_FragColor,vec4(0.8,0.8,1,1),toTopLineMix/ uToTopLineWidth);
        }
          //#end#  
           `
  );

  gsap.to(shader.uniforms.uToTopLineTime, {
    value: 240,
    duration: 2,
    ease: "none",
    repeat: -1,
  });
}

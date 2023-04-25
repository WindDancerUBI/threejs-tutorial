/*
 * @Title: 标准材质参数
 * @Author: huangjitao
 * @Date: 2023-04-24 17:21:13
 * @Description: description of this file
 */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/** --- 创建一个场景 --- */
const scene = new THREE.Scene();

/** ---添加坐标辅助--- */
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

/** --- 创建一个网格模型 --- */
// 创建一个几何体
const geometry = new THREE.BoxGeometry(1, 1, 1, 100, 100, 100);

/** --- 材质加载器 --- */
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
  console.log("开始加载资源");
};
loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
  console.log("加载资源中");
};
loadingManager.onLoad = () => {
  console.log("加载资源完毕");
};
loadingManager.onError = (url) => {
  alert(`加载资源出错 ${url}`);
};

const textureLoader = new THREE.TextureLoader(loadingManager);
const ColorTexture = textureLoader.load("/textures/door/color.jpg");
const AlphaTexture = textureLoader.load("/textures/door/alpha.jpg"); // 透明贴图
const AoTexture = textureLoader.load("/textures/door/ambientOcclusion.jpg"); // 环境遮挡贴图
const DisplaceTexture = textureLoader.load("/textures/door/height.jpg"); // 置换贴图
const RoughnessTexture = textureLoader.load("/textures/door/roughness.jpg"); // 粗糙度贴图
const MetalnessTexture = textureLoader.load("/textures/door/metalness.jpg"); // 金属度贴图
const NormalTexture = textureLoader.load("/textures/door/normal.jpg"); // 法线贴图

const material = new THREE.MeshStandardMaterial({
  color: "#ffff00",
  map: ColorTexture,
  alphaMap: null,
  transparent: true,
  opacity: 1,
  aoMap: null,
  aoMapIntensity: 1,
  displacementMap: DisplaceTexture,
  displacementScale: 0.1,
  roughnessMap: null,
  roughness: 1,
  metalnessMap: null,
  metalness: 1,
  normalMap: null,
  side: THREE.DoubleSide,
});
// aoMap需要第二组UV。
geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(geometry.attributes.uv.array, 2)
);
// 创建一个网格模型对象
const mesh = new THREE.Mesh(geometry, material);
// 将网格模型对象添加到场景中
scene.add(mesh);

/** ---创建图形界面工具--- */
const panel = new GUI();
const basicMaterialPanel = panel.addFolder("BasicMaterial");
basicMaterialPanel
  .add(material, "alphaMap", { hasMap: AlphaTexture, none: null })
  .name("透明贴图")
  .onChange((value) => {
    material.needsUpdate = true;
  });
basicMaterialPanel
  .add(material, "transparent")
  .name("是否透明")
  .onChange(() => console.log(`当前物体是否显示：${mesh.visible}`));
basicMaterialPanel
  .add(material, "opacity")
  .min(0)
  .max(1)
  .step(0.01)
  .name("设置透明度");
basicMaterialPanel
  .add(material, "aoMap", { hasMap: AoTexture, none: null })
  .name("环境遮挡贴图")
  .onChange((value) => {
    material.needsUpdate = true;
  });
basicMaterialPanel
  .add(material, "aoMapIntensity")
  .min(0)
  .max(1)
  .step(0.01)
  .name("环境遮挡强度");
basicMaterialPanel
  .add(material, "side", {
    "THREE.FrontSide": THREE.FrontSide,
    "THREE.BackSide": THREE.BackSide,
    "THREE.DoubleSide": THREE.DoubleSide,
  })
  .name("渲染面")
  .onChange((value) => {
    material.needsUpdate = true;
  });

const standardMaterialPanel = panel.addFolder("StandardMaterial");
standardMaterialPanel
  .add(material, "displacementMap", { hasMap: DisplaceTexture, none: null })
  .name("置换贴图")
  .onChange((value) => {
    material.needsUpdate = true;
  });
standardMaterialPanel
  .add(material, "displacementScale")
  .min(0)
  .max(0.1)
  .step(0.0001)
  .name("置换贴图顶点细分度");

standardMaterialPanel
  .add(material, "roughnessMap", { hasMap: RoughnessTexture, none: null })
  .name("粗糙度贴图")
  .onChange((value) => {
    material.needsUpdate = true;
  });
standardMaterialPanel
  .add(material, "roughness")
  .min(0)
  .max(1)
  .step(0.01)
  .name("粗糙程度");

standardMaterialPanel
  .add(material, "metalnessMap", { hasMap: MetalnessTexture, none: null })
  .name("金属度贴图")
  .onChange((value) => {
    material.needsUpdate = true;
  });
standardMaterialPanel
  .add(material, "metalness")
  .min(0)
  .max(1)
  .step(0.01)
  .name("金属相似度");
standardMaterialPanel
  .add(material, "normalMap", { hasMap: NormalTexture, none: null })
  .name("法线贴图")
  .onChange((value) => {
    material.needsUpdate = true;
  });

/** --- 设置光源 --- */
// 点光源
const point = new THREE.PointLight(0xffffff);
point.position.set(4, 2, 3);
scene.add(point);
//环境光
const ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);
// 直线光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

/** --- 创建相机 --- */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.z = 5;
//设置相机方向(指向的场景对象)
camera.lookAt(scene.position);
scene.add(camera);

/** --- 创建渲染器 --- */
const renderer = new THREE.WebGLRenderer();
// 设置渲染区域尺寸
renderer.setSize(sizes.width, sizes.height);
// 设置背景颜色
renderer.setClearColor(0xb9d3ff, 1);
// 将渲染器添加到画布中去
document.body.appendChild(renderer.domElement);

/** ---创建轨道控制器--- */
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
render();

window.addEventListener("resize", () => {
  // 更新画布大小
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // 更新相机矩阵
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // 更新渲染器尺寸
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/** --- 全屏操作 --- */
window.addEventListener("dblclick", () => {
  const fullscreenElement = document.fullscreenElement;
  if (!fullscreenElement) {
    // 让画布对象全屏
    renderer.domElement.requestFullscreen();
  } else {
    // 退出全屏，使用document对象
    document.exitFullscreen();
  }
});

function render() {
  controls.update();
  renderer.render(scene, camera);
  // 渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}

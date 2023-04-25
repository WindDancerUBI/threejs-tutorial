/*
 * @Title: 环境贴图
 * @Author: huangjitao
 * @Date: 2023-04-24 17:21:13
 * @Description: description of this file
 */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const textureType = {
  envMap: 3
}

/** --- 创建一个场景 --- */
const scene = new THREE.Scene();

/** ---添加坐标辅助--- */
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 设置cube纹理加载器,设置环境贴图
const cubeTextureLoader = new THREE.CubeTextureLoader();
const envMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/1/px.jpg",
  "/textures/environmentMaps/1/nx.jpg",
  "/textures/environmentMaps/1/py.jpg",
  "/textures/environmentMaps/1/ny.jpg",
  "/textures/environmentMaps/1/pz.jpg",
  "/textures/environmentMaps/1/nz.jpg",
]);

// 加载hdr环境图
let hdrTexture;
const rgbeLoader = new RGBELoader();
rgbeLoader.loadAsync("/textures/hdr/002.hdr").then((texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  hdrTexture = texture;
});

/** --- 创建一个网格模型 --- */
// 创建一个几何体
const geometry = new THREE.SphereGeometry(1, 20, 20);

const material = new THREE.MeshStandardMaterial({
  metalness: 0.7,
  roughness: 0.1,
  // envMap: envMapTexture,
});
// 创建一个网格模型对象
const mesh = new THREE.Mesh(geometry, material);
// 将网格模型对象添加到场景中
scene.add(mesh);

/** ---创建图形界面工具--- */
const panel = new GUI();
panel
  .add(textureType, "envMap", { 环境贴图: 1, hdr: 2, 无: 3 })
  .name("贴图类型")
  .onChange((value) => {
    if (value === 1) {
      // 给场景添加背景
      scene.background = envMapTexture;
      // 给场景所有的物体添加默认的环境贴图
      scene.environment = envMapTexture;
    } else if (value === 2) {
      scene.background = hdrTexture;
      scene.environment = hdrTexture;
    } else {
      scene.background = null;
      scene.environment = null;
    }
  });

/** --- 设置光源 --- */
// 环境光
const ambient = new THREE.AmbientLight(0xffffff, 0.5);
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
camera.position.z = 10;
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

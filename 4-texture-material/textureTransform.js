/*
 * @Title: 纹理变换
 * @Author: huangjitao
 * @Date: 2023-04-24 17:21:13
 * @Description: description of this file
 */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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
const geometry = new THREE.BoxGeometry();

/** --- 材质加载器 --- */
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
  console.log("开始加载资源")
};
loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
  console.log("加载资源中")
};
loadingManager.onLoad = () => {
  console.log("加载资源完毕")
};
loadingManager.onError = (url) => {
  alert(`加载资源出错 ${url}`);
};

const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load("/textures/door/color.jpg");

// 纹理变换
colorTexture.repeat.x = 2;
colorTexture.repeat.x = 3;
// 以上两个设置并没有repeat，而是边缘的像素被拉伸了，需要再设置属性wrapS和wrapT
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;
colorTexture.wrapS = THREE.MirroredRepeatWrapping;
colorTexture.wrapT = THREE.MirroredRepeatWrapping;
// 设置偏移属性
colorTexture.offset.x = 0.5
colorTexture.offset.y = 0
// 设置旋转属性
colorTexture.rotation = Math.PI / 4
colorTexture.center = new THREE.Vector2(0.5, 0.5)

// 创建一个材质对象
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
// 创建一个网格模型对象
const mesh = new THREE.Mesh(geometry, material);
// 将网格模型对象添加到场景中
scene.add(mesh);

/** --- 设置光源 --- */
// 点光源
const point = new THREE.PointLight(0xffffff);
point.position.set(4, 2, 3);
scene.add(point);
//环境光
const ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);

/** --- 创建相机 --- */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.z = 5;
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

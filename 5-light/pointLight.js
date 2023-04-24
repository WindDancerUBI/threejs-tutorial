/*
 * @Title: 点光源
 * @Author: huangjitao
 * @Date: 2023-04-24 18:00:03
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
const geometry = new THREE.SphereGeometry(1, 20, 20);
// 创建一个材质对象
const material = new THREE.MeshStandardMaterial();
// 创建一个网格模型对象
const mesh = new THREE.Mesh(geometry, material);
// 设置物体投射阴影
mesh.castShadow = true;
// 将网格模型对象添加到场景中
scene.add(mesh);

// 创建平面
const planeGeometry = new THREE.PlaneGeometry(50, 50);
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.set(0, -1, 0);
plane.rotation.x = -Math.PI / 2;
// 接收其它物体的阴影
plane.receiveShadow = true;
scene.add(plane);

/** --- 设置光源 --- */
// 环境光
const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

// 创建一个小球，用于模拟点光源
const smallBall = new THREE.Mesh(
  new THREE.SphereGeometry(0.1, 20, 20),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
smallBall.position.set(2, 2, 2);

// 点光源
const pointLight = new THREE.PointLight(0xff0000, 1);
// pointLight.position.set(2, 2, 2);
pointLight.castShadow = true;
// 设置阴影贴图模糊度
pointLight.shadow.radius = 20;
// 设置阴影贴图的分辨率
pointLight.shadow.mapSize.set(512, 512);
pointLight.decay = 0;

// 设置透视相机的属性
smallBall.add(pointLight);
scene.add(smallBall);

const panel = new GUI();
const pointLightPanel = panel.addFolder("点光源");
pointLightPanel.add(smallBall.position, "x").min(-5).max(5).step(0.1);
pointLightPanel.add(smallBall.position, "y").min(-5).max(5).step(0.1);
pointLightPanel.add(smallBall.position, "z").min(-5).max(5).step(0.1);

/** --- 创建相机 --- */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.set(0, 0, 10);
// 设置相机方向(指向的场景对象)
camera.lookAt(scene.position);
scene.add(camera);

/** --- 创建渲染器 --- */
const renderer = new THREE.WebGLRenderer();
// 设置渲染区域尺寸
renderer.setSize(sizes.width, sizes.height);
// 设置背景颜色
renderer.setClearColor(0xb9d3ff, 1);
// 开启阴影渲染
renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;
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

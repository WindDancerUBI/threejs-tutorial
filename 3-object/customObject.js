/*
 * @Title: 自定义几何体
 * @Author: huangjitao
 * @Date: 2023-04-24 17:13:56
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
const geometry = new THREE.BufferGeometry();
// // 因为在两个三角面片里，一共有六个顶点，其中两个顶点是一模一样的。
// const vertices = new Float32Array([
//   -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0,
//   1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
// ]);
// // 顶点的法线向量，设置后可以突出光照
// const normals = new Float32Array([
//   0,0,1,0,0,1,0,0,1,
//   0,0,1,0,0,1,0,0,1
// ])
// // 一个顶点由三个坐标表示，因此创建时，三个坐标值为一组
// geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
// geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));

// 使用index（索引）复用顶点
const vertices = new Float32Array([
  -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
]);
// 顶点的法线向量，设置后可以突出光照
const normals = new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
const indexes = new Uint16Array([
  // 0对应第1个顶点位置数据、第1个顶点法向量数据
  // 1对应第2个顶点位置数据、第2个顶点法向量数据
  // 索引值3个为一组，表示一个三角形的3个顶点
  0, 1, 2, 0, 2, 3,
]);
// 一个顶点由三个坐标表示，因此创建时，三个坐标值为一组
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
geometry.index = new THREE.BufferAttribute(indexes, 1);

// 创建一个材质对象
const material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
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

/*
 * @Title: three.js入门级案例
 * @Author: huangjitao
 * @Date: 2023-04-24 13:50:52
 * @Description: description of this file
 */

import * as THREE from "three";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/** --- 创建一个场景 --- */
const scene = new THREE.Scene();

/** --- 创建一个网格模型 --- */
// 创建一个几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);
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
camera.position.z = 3;
scene.add(camera);

/** --- 创建渲染器 --- */
const renderer = new THREE.WebGLRenderer();
// 设置渲染区域尺寸
renderer.setSize(sizes.width, sizes.height);
// 设置背景颜色
renderer.setClearColor(0xb9d3ff, 1);
// 将渲染器添加到画布中去
document.body.appendChild(renderer.domElement);
// 执行渲染操作。指定场景、相机作为参数
renderer.render(scene, camera);

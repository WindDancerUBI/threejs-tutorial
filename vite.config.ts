/*
 * @Title: 配置文件
 * @Author: huangjitao
 * @Date: 2023-04-24 15:36:37
 * @Description: description of this file
 */
import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'development' ? '/' : '/threejs-tutorial/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        "1-introduction": resolve(__dirname, '1-introduction/index.html'),
        "2-basicOption/objectOption.html": resolve(__dirname, '2-basicOption/objectOption.html'),
        "2-basicOption/animation.html": resolve(__dirname, '2-basicOption/animation.html'),
        "2-basicOption/guiTools": resolve(__dirname, '2-basicOption/guiTools.html'),
        "3-object/customObject.html": resolve(__dirname, '3-object/customObject.html'),
        "3-object/randomObject.html": resolve(__dirname, '3-object/randomObject.html'),
        "4-texture-material/loadTexture.html": resolve(__dirname, '4-texture-material/loadTexture.html'),
        "4-texture-material/textureTransform.html": resolve(__dirname, '4-texture-material/textureTransform.html'),
        "4-texture-material/minmap.html": resolve(__dirname, '4-texture-material/minmap.html'),
        "4-texture-material/basicMaterial.html": resolve(__dirname, '4-texture-material/basicMaterial.html'),
        "4-texture-material/standardMaterial.html": resolve(__dirname, '4-texture-material/standardMaterial.html'),
        "4-texture-material/hdrTexture.html": resolve(__dirname, '4-texture-material/hdrTexture.html'),
        "5-light/directionLight.html": resolve(__dirname, '5-light/directionLight.html'),
        "5-light/pointLight.html": resolve(__dirname, '5-light/pointLight.html'),
        "5-light/spotLight.html": resolve(__dirname, '5-light/spotLight.html'),
      },
    },
  },
})

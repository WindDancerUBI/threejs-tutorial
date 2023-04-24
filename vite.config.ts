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
  base: process.env.NODE_ENV === 'development' ? '/' : '/<REPO>/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        "1-introduction": resolve(__dirname, '1-introduction/index.html'),
        "2-basicOption/objectOption.html": resolve(__dirname, '2-basicOption/objectOption.html'),
        "2-basicOption/animation.html": resolve(__dirname, '2-basicOption/animation.html'),
        "2-basicOption/guiTools": resolve(__dirname, '2-basicOption/guiTools.html'),
      },
    },
  },
})

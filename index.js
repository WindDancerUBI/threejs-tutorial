/*
 * @Title: 页面点击跳转事件
 * @Author: huangjitao
 * @Date: 2023-04-24 16:02:46
 * @Description: import.meta.env.BASE_URL 只能在module中使用
 */

const btns = document.querySelectorAll(".open-page")

const baseUrl = import.meta.env.BASE_URL

btns.forEach((i) => {
  const href = i.getAttribute("href")
  i.onclick = () => window.open(`${baseUrl}${href}`)
})

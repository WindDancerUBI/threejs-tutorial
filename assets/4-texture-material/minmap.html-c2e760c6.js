import"../reset-56fd7512.js";import{S as p,c as w,B as h,T as g,f as L,a as E,N as u,h as f,i as F,j as M,k as x,l as N,P as b,A as H,b as T,W as R,L as P}from"../three.module-30b36ebb.js";import{O as C}from"../OrbitControls-19869cf3.js";import{G as z}from"../lil-gui.esm-b4f18ba3.js";const S="/threejs-tutorial/",e={width:window.innerWidth,height:window.innerHeight},r=new p,A=new w(5);r.add(A);const G=new h,s=new P;s.onStart=(t,m,c)=>{console.log("开始加载资源")};s.onProgress=(t,m,c)=>{console.log("加载资源中")};s.onLoad=()=>{console.log("加载资源完毕")};s.onError=t=>{alert(`加载资源出错 ${t}`)};const W=new g(s),a=W.load(`${S}textures/minecraft.png`),j=new L({map:a}),y=new E(G,j);r.add(y);const B=new z;B.add(a,"minFilter",{"THREE.NearestFilter":u,"THREE.NearestMipmapNearestFilter":f,"THREE.NearestMipmapLinearFilter":F,"THREE.LinearFilter":M,"THREE.LinearMipmapNearestFilter":x,"THREE.LinearMipmapLinearFilter":N}).name("minmap算法").onChange(t=>{console.log(t),a.minFilter=t,a.magFilter=t,a.needsUpdate=!0});const o=new b(16777215);o.position.set(4,2,3);r.add(o);const U=new H(4473924);r.add(U);const i=new T(75,e.width/e.height,.1,1e3);i.position.z=5;r.add(i);const n=new R;n.setSize(e.width,e.height);n.setClearColor(12178431,1);document.body.appendChild(n.domElement);const l=new C(i,n.domElement);l.enableDamping=!0;d();window.addEventListener("resize",()=>{e.width=window.innerWidth,e.height=window.innerHeight,i.aspect=e.width/e.height,i.updateProjectionMatrix(),n.setSize(e.width,e.height),n.setPixelRatio(Math.min(window.devicePixelRatio,2))});window.addEventListener("dblclick",()=>{document.fullscreenElement?document.exitFullscreen():n.domElement.requestFullscreen()});function d(){l.update(),n.render(r,i),requestAnimationFrame(d)}

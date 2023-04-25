import"../reset-56fd7512.js";import{S,c as v,B as C,T as L,n as T,D as p,e as j,a as A,F as P,m as U,P as $,A as y,o as F,b as H,W as R,L as B}from"../three.module-30b36ebb.js";import{O as D}from"../OrbitControls-19869cf3.js";import{G as z}from"../lil-gui.esm-b4f18ba3.js";const d="/threejs-tutorial/",n={width:window.innerWidth,height:window.innerHeight},o=new S,k=new v(5);o.add(k);const u=new C(1,1,1,100,100,100),m=new B;m.onStart=(a,b,E)=>{console.log("开始加载资源")};m.onProgress=(a,b,E)=>{console.log("加载资源中")};m.onLoad=()=>{console.log("加载资源完毕")};m.onError=a=>{alert(`加载资源出错 ${a}`)};const r=new L(m),G=r.load(`${d}textures/door/color.jpg`),W=r.load(`${d}/textures/door/alpha.jpg`),I=r.load(`${d}/textures/door/ambientOcclusion.jpg`),c=r.load(`${d}/textures/door/height.jpg`),O=r.load(`${d}/textures/door/roughness.jpg`),q=r.load(`${d}/textures/door/metalness.jpg`),N=r.load(`${d}/textures/door/normal.jpg`),e=new T({color:"#ffff00",map:G,alphaMap:null,transparent:!0,opacity:1,aoMap:null,aoMapIntensity:1,displacementMap:c,displacementScale:.1,roughnessMap:null,roughness:1,metalnessMap:null,metalness:1,normalMap:null,side:p});u.setAttribute("uv2",new j(u.attributes.uv.array,2));const h=new A(u,e);o.add(h);const g=new z,i=g.addFolder("BasicMaterial");i.add(e,"alphaMap",{hasMap:W,none:null}).name("透明贴图").onChange(a=>{e.needsUpdate=!0});i.add(e,"transparent").name("是否透明").onChange(()=>console.log(`当前物体是否显示：${h.visible}`));i.add(e,"opacity").min(0).max(1).step(.01).name("设置透明度");i.add(e,"aoMap",{hasMap:I,none:null}).name("环境遮挡贴图").onChange(a=>{e.needsUpdate=!0});i.add(e,"aoMapIntensity").min(0).max(1).step(.01).name("环境遮挡强度");i.add(e,"side",{"THREE.FrontSide":P,"THREE.BackSide":U,"THREE.DoubleSide":p}).name("渲染面").onChange(a=>{e.needsUpdate=!0});const l=g.addFolder("StandardMaterial");l.add(e,"displacementMap",{hasMap:c,none:null}).name("置换贴图").onChange(a=>{e.needsUpdate=!0});l.add(e,"displacementScale").min(0).max(.1).step(1e-4).name("置换贴图顶点细分度");l.add(e,"roughnessMap",{hasMap:O,none:null}).name("粗糙度贴图").onChange(a=>{e.needsUpdate=!0});l.add(e,"roughness").min(0).max(1).step(.01).name("粗糙程度");l.add(e,"metalnessMap",{hasMap:q,none:null}).name("金属度贴图").onChange(a=>{e.needsUpdate=!0});l.add(e,"metalness").min(0).max(1).step(.01).name("金属相似度");l.add(e,"normalMap",{hasMap:N,none:null}).name("法线贴图").onChange(a=>{e.needsUpdate=!0});const w=new $(16777215);w.position.set(4,2,3);o.add(w);const J=new y(4473924);o.add(J);const x=new F(16777215,.5);x.position.set(10,10,10);o.add(x);const s=new H(75,n.width/n.height,.1,1e3);s.position.z=5;s.lookAt(o.position);o.add(s);const t=new R;t.setSize(n.width,n.height);t.setClearColor(12178431,1);document.body.appendChild(t.domElement);const M=new D(s,t.domElement);M.enableDamping=!0;f();window.addEventListener("resize",()=>{n.width=window.innerWidth,n.height=window.innerHeight,s.aspect=n.width/n.height,s.updateProjectionMatrix(),t.setSize(n.width,n.height),t.setPixelRatio(Math.min(window.devicePixelRatio,2))});window.addEventListener("dblclick",()=>{document.fullscreenElement?document.exitFullscreen():t.domElement.requestFullscreen()});function f(){M.update(),t.render(o,s),requestAnimationFrame(f)}
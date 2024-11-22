import{_ as y,r as i,o as m,c as d,a as o,w as x,v as b,b as w,G as _,p as h,m as k,t as I,d as A}from"./index-tRtWQFrh.js";const j={class:"m-2"},T={class:"flex items-center justify-between"},C={class:"mt-4"},H={key:0,class:"mx-8 mt-4 text-md prose max-w-none"},V={class:"px-2 py-1 bg-green-100 border border-green-200 rounded-md"},B=["innerHTML"],D={__name:"AboutView",setup(G){const a=i(""),s=i(""),u=i(""),l=i(null),c="AIzaSyBHjvj2f6nRskTiC7dWjqsvmsQjuIjw-Hk",g=new _(c),f=async(t,e=10)=>{a.value="";for(let n=0;n<t.length;n++)a.value+=t[n],await new Promise(r=>setTimeout(r,e))},v=t=>{const e=t.target.files;e&&e[0]&&(l.value=e[0])},p=async()=>{try{if(!s.value&&!l.value){alert("Please provide a text prompt or an image.");return}u.value=s.value;const t=new FormData;s.value&&t.append("prompt",s.value),l.value&&t.append("image",l.value);const r=(await g.getGenerativeModel({model:"gemini-pro-vision"}).generateContent(t)).response.text();a.value=h.sanitize(k(r)),await f(r)}catch(t){console.error("Error generating AI response:",t),a.value="An error occurred while generating the response."}finally{s.value="",l.value=null}};return(t,e)=>(m(),d("main",null,[o("div",j,[e[3]||(e[3]=o("h1",{class:"text-2xl font-semibold text-center"},"How can I help you? 😇",-1)),o("div",T,[x(o("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=n=>s.value=n),onKeyup:w(p,["enter"]),class:"w-full mx-2 p-2 border border-gray-300 text-gray-700 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none",placeholder:"Type your prompt here..."},null,544),[[b,s.value]])]),o("div",C,[e[1]||(e[1]=o("label",{class:"block text-sm font-medium text-gray-700"}," Upload an image (optional) ",-1)),o("input",{type:"file",accept:"image/*",onChange:v,class:"mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded-lg file:border-gray-300 file:text-gray-700 hover:file:bg-gray-100"},null,32)]),o("button",{onClick:p,class:"py-2 px-4 bg-gray-300 hover:bg-gray-400 text-black font-semibold m-2 rounded-full mt-4"}," Send "),u.value?(m(),d("p",H,[e[2]||(e[2]=o("span",{class:"font-semibold"},"Q:",-1)),o("span",V,I(u.value),1)])):A("",!0),o("p",{innerHTML:a.value,class:"blink mx-8 mt-4 text-md prose max-w-none"},null,8,B)])]))}},K=y(D,[["__scopeId","data-v-79231fb6"]]);export{K as default};

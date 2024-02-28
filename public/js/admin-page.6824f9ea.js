"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[807],{7955:function(a,e,t){t.d(e,{d:function(){return i}});var n=t(1020),s=t(4870);const i=(0,n.Q_)("adminStore",(()=>{const a=(0,s.iH)({isOpen:!1});return{adminSidebar:a}}))},9717:function(a,e,t){t.r(e),t.d(e,{default:function(){return P}});var n=t(3396),s=t(9242),i=t(4870);const d={class:"admin-sidebar"};function o(a,e){const t=(0,n.up)("router-link");return(0,n.wg)(),(0,n.iD)("section",d,[(0,n.Wm)(t,{to:{name:"admin.posts"}},{default:(0,n.w5)((()=>[(0,n.Uk)("Posts")])),_:1},8,["to"]),(0,n.Wm)(t,{to:{name:"admin.post.create"}},{default:(0,n.w5)((()=>[(0,n.Uk)("Create new")])),_:1},8,["to"]),(0,n.Wm)(t,{to:{name:"admin.categories"}},{default:(0,n.w5)((()=>[(0,n.Uk)("Categories")])),_:1},8,["to"]),(0,n.Wm)(t,{to:{name:"admin.tags"}},{default:(0,n.w5)((()=>[(0,n.Uk)("Tags")])),_:1},8,["to"]),(0,n.Wm)(t,{to:{name:"admin.comments"}},{default:(0,n.w5)((()=>[(0,n.Uk)("Comments")])),_:1},8,["to"]),(0,n.Wm)(t,{to:{name:"admin.chat"}},{default:(0,n.w5)((()=>[(0,n.Uk)("Messages")])),_:1},8,["to"]),(0,n.Wm)(t,{to:{name:"admin.students"}},{default:(0,n.w5)((()=>[(0,n.Uk)("Students")])),_:1},8,["to"])])}var r=t(89);const l={},c=(0,r.Z)(l,[["render",o],["__scopeId","data-v-0ab445ec"]]);var u=c,m=(t(7658),t(7139)),_=t(4161);const g=a=>((0,n.dD)("data-v-3b14c467"),a=a(),(0,n.Cn)(),a),p={key:0,class:"loading"},v=g((()=>(0,n._)("span",{class:"dots"},".",-1))),k=g((()=>(0,n._)("span",{class:"dots"},".",-1))),f=g((()=>(0,n._)("span",{class:"dots"},".",-1))),b=[v,k,f],w={key:1,class:"chat-sidebar"},h={key:0,class:"chat-sidebar__students"},y={key:1},C=g((()=>(0,n._)("img",{class:"back-button-icon",src:"/assets/images/arrow-back.svg",alt:""},null,-1))),D=[C];var H=(0,n.aZ)({__name:"ChatSidebarComponent",setup(a){const e=(0,i.iH)(),t=(0,i.iH)(!1),d=(0,i.iH)(null),o=(0,i.iH)();function r(){t.value=!0,_.Z.get("/api/admin/users").then((a=>e.value=a.data)).finally((()=>t.value=!1))}function l(a,e){d.value=e,o.value.style.top=a.target.offsetTop+"px",o.value.style.height=a.target.offsetHeight+"px"}return(0,n.bv)((()=>r())),(a,i)=>{const r=(0,n.up)("router-link");return(0,n.wg)(),(0,n.iD)(n.HY,null,[t.value?((0,n.wg)(),(0,n.iD)("div",p,b)):((0,n.wg)(),(0,n.iD)("section",w,[e.value?((0,n.wg)(),(0,n.iD)("div",h,[(0,n.wy)((0,n._)("div",{id:"marker",ref_key:"marker",ref:o},null,512),[[s.F8,d.value]]),((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e.value,(e=>((0,n.wg)(),(0,n.j4)(r,{key:e.id,onClick:a=>l(a,e.id),class:(0,m.C_)(["chat-sidebar__student",{active:+a.$route.params.id===e.id&&!d.value}]),to:{name:"admin.chat.id",params:{id:e.id},query:{name:e.name}}},{default:(0,n.w5)((()=>[(0,n.Uk)((0,m.zw)(e.name),1)])),_:2},1032,["onClick","class","to"])))),128))])):((0,n.wg)(),(0,n.iD)("div",y," нет пользователей "))])),(0,n._)("button",{onClick:i[0]||(i[0]=e=>a.$router.push({name:"admin"})),class:"chat-sidebar__back-button"},D)],64)}}});const W=(0,r.Z)(H,[["__scopeId","data-v-3b14c467"]]);var S=W,U=t(7955);const Z=a=>((0,n.dD)("data-v-b46e9bfc"),a=a(),(0,n.Cn)(),a),$={class:"admin-page admin-page__container"},j=Z((()=>(0,n._)("img",{class:"admin-page__sidebar-image",src:"/assets/images/sidebar-open.svg",alt:""},null,-1))),L=[j],O={class:"admin-page__content"};var T=(0,n.aZ)({__name:"AdminPage",setup(a){const e=(0,U.d)(),t=(0,i.iH)(null),d=(0,i.iH)(null);function o(){t.value?.classList.toggle("sidebar--open"),d.value?.classList.toggle("hide"),e.adminSidebar.isOpen=!e.adminSidebar.isOpen}return(a,r)=>{const l=(0,n.up)("router-view");return(0,n.wg)(),(0,n.iD)("section",$,[(0,n._)("div",{class:"admin-page__sidebar-open-btn",onClick:r[0]||(r[0]=a=>o())},L),(0,n._)("div",{class:"admin-page__sidebar",ref_key:"adminSidebar",ref:t},["chat"===a.$route.meta.sidebar?((0,n.wg)(),(0,n.j4)(S,{key:0})):((0,n.wg)(),(0,n.j4)(u,{key:1}))],512),(0,n._)("div",O,[(0,n.Wm)(s.uT,{name:"opacity"},{default:(0,n.w5)((()=>[(0,i.SU)(e).adminSidebar.isOpen&&"active"==a.$route.meta.status?((0,n.wg)(),(0,n.iD)("div",{key:0,class:"admin-page__content-backdrop",onClick:o,ref_key:"adminBackdrop",ref:d},null,512)):(0,n.kq)("",!0)])),_:1}),(0,n.Wm)(l,null,{default:(0,n.w5)((e=>[(0,n.Wm)(s.uT,{name:a.$route.meta.transition},{default:(0,n.w5)((()=>[((0,n.wg)(),(0,n.j4)((0,n.LL)(e.Component),{key:a.$route.fullPath}))])),_:2},1032,["name"])])),_:1})])])}}});const I=(0,r.Z)(T,[["__scopeId","data-v-b46e9bfc"]]);var P=I}}]);
//# sourceMappingURL=admin-page.6824f9ea.js.map
(this["webpackJsonpreviews-front"]=this["webpackJsonpreviews-front"]||[]).push([[0],{131:function(e,t,c){},134:function(e,t,c){},136:function(e,t,c){"use strict";c.r(t);var n,r=c(0),i=c.n(r),a=c(41),s=c.n(a),o=(c(96),function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,148)).then((function(t){var c=t.getCLS,n=t.getFID,r=t.getFCP,i=t.getLCP,a=t.getTTFB;c(e),n(e),r(e),i(e),a(e)}))}),u=c(34),l=c(29),j=c(74),b=c.n(j),d=c(144),h=c(19),f=c(1),O=i.a.createContext({token:void 0,setToken:function(){}}),v=function(){return Object(r.useContext)(O)},x=function(e){var t=e.children,c=O.Provider,n=Object(r.useMemo)((function(){return localStorage.getItem("token")||void 0}),[]),i=Object(r.useState)(n),a=Object(h.a)(i,2),s=a[0],o=a[1],u=Object(r.useCallback)((function(e){e?localStorage.setItem("token",e):localStorage.removeItem("token"),o(e)}),[]),j=Object(r.useMemo)((function(){return{token:s,setToken:u}}),[s,u]),b=Object(l.useQueryClient)();return Object(r.useEffect)((function(){void 0===s&&b.clear()}),[b,s]),Object(f.jsx)(c,{value:j,children:t})},g=i.a.createContext({subscribe:function(){throw new Error},publish:function(){}}),p=function(e){return function(t){e.active?e.callback(t):e.buffer.push(t)}},m=function(e){var t=e.children,c=g.Provider,n=v().token,i=Object(r.useRef)(),a=Object(r.useRef)([]),s=Object(r.useRef)(new Map);Object(r.useEffect)((function(){if(n){var e=new d.a({connectHeaders:{"X-Authorization":n},webSocketFactory:function(){return new b.a("".concat("","/ws"))},onConnect:function(){s.current.forEach((function(t){t.subscriptionId=e.subscribe(t.topic,p(t)).id})),a.current.forEach((function(t){return e.publish(t)})),a.current=[]}});return e.activate(),i.current=e,function(){var e;null===(e=i.current)||void 0===e||e.deactivate(),i.current=void 0}}}),[n]);var o=Object(r.useMemo)((function(){return{subscribe:function(e,t,c){var n=s.current.get(e);if(n){if(n.active)return function(){};var r;n.callback=c,n.active=!0,n.buffer.forEach(c),n.buffer=[],n.topic!==t&&(n.topic=t,(null===(r=i.current)||void 0===r?void 0:r.connected)&&void 0!==n.subscriptionId&&(i.current.unsubscribe(n.subscriptionId),n.subscriptionId=i.current.subscribe(t,p(n)).id));return function(){n.active=!1}}var a,o={topic:t,callback:c,active:!0,buffer:[]};return s.current.set(e,o),(null===(a=i.current)||void 0===a?void 0:a.connected)&&(o.subscriptionId=i.current.subscribe(t,p(o)).id),function(){o.active=!1}},publish:function(e){var t;(null===(t=i.current)||void 0===t?void 0:t.connected)?i.current.publish(e):a.current.push(e)}}}),[]);return Object(f.jsx)(c,{value:o,children:t})},k=c(9),w=c(141),C=c(142),I=c(143),S=c(145),N=c(147),P=c(146),U=c(43),E=c(76),F=function(e){var t=e.className,c=e.title,n=e.onClick,r=e.children;return Object(f.jsxs)("div",{onClick:n,className:"Page ".concat(null!==t&&void 0!==t?t:""),children:[Object(f.jsx)(E.a,{children:Object(f.jsx)("title",{children:c?"Reviews - ".concat(c):"Reviews"})}),r]})},R=(c(131),function(e){var t=e.visible,c=e.redirectUrl,n=e.children;return t?Object(f.jsx)(f.Fragment,{children:n}):void 0!==c?Object(f.jsx)(k.a,{to:c}):null}),M=function(e){var t=e.redirectUrl,c=e.children,n=v().token;return Object(f.jsx)(R,{visible:void 0===n,redirectUrl:t,children:c})},T=Object(U.cn)("SignInPage"),y=function(e){var t=e.classname;return Object(f.jsx)(M,{redirectUrl:"/",children:Object(f.jsx)(F,{className:T(null,[t]),title:"Sign in",children:Object(f.jsx)(w.a,{children:Object(f.jsx)(C.a,{className:"d-flex align-items-center",children:Object(f.jsx)(I.a,{xs:{span:4,offset:3},children:Object(f.jsxs)(S.a,{children:[Object(f.jsx)(S.a.Header,{children:"Sign in with"}),Object(f.jsxs)(S.a.Text,{className:"d-grid gap-2 p-2",children:[Object(f.jsxs)(N.a,{href:"".concat("","/oauth2/authorization/github"),variant:"outline-dark",children:[Object(f.jsx)("span",{className:"align-middle",children:"GitHub"})," ",Object(f.jsx)(P.b,{})]}),Object(f.jsxs)(N.a,{href:"".concat("","/oauth2/authorization/facebook"),variant:"outline-dark",children:[Object(f.jsx)("span",{className:"align-middle",children:"Facebook"}),Object(f.jsx)(P.a,{})]}),Object(f.jsxs)(N.a,{href:"".concat("","/oauth2/authorization/google"),variant:"outline-dark",children:[Object(f.jsx)("span",{className:"align-middle",children:"Google"})," ",Object(f.jsx)(P.c,{})]})]})]})})})})})})},z=(c(134),function(e){var t=e.redirectUrl,c=e.children,n=v().token;return Object(f.jsx)(R,{visible:void 0!==n,redirectUrl:t,children:c})}),H=Object(U.cn)("MainPage"),L=function(e){var t=e.classname;return Object(f.jsx)(z,{redirectUrl:"/signIn",children:Object(f.jsx)(F,{className:H(null,[t]),title:"",children:Object(f.jsx)(w.a,{children:Object(f.jsx)(C.a,{children:Object(f.jsx)(I.a,{})})})})})},Q=function(e){e.classname;var t=v().setToken,c=Object(k.h)();Object(k.g)();return Object(r.useEffect)((function(){var e=new URLSearchParams(c.search).get("token");e&&t(e)}),[c.search,t]),Object(f.jsx)(M,{redirectUrl:"/",children:Object(f.jsx)(F,{children:"Redirecting..."})})},B=Object(f.jsxs)(k.d,{children:[Object(f.jsx)(k.b,{path:"/signIn",exact:!0,children:Object(f.jsx)(y,{})}),Object(f.jsx)(k.b,{path:"/",exact:!0,children:Object(f.jsx)(L,{})}),Object(f.jsx)(k.b,{path:"/redirect",exact:!0,children:Object(f.jsx)(Q,{})})]});n||(n={});var G=new l.QueryClient,J=(c(135),function(){return Object(f.jsx)(l.QueryClientProvider,{client:G,children:Object(f.jsx)(x,{children:Object(f.jsx)(m,{children:Object(f.jsx)(u.a,{children:B})})})})});s.a.render(Object(f.jsx)(i.a.StrictMode,{children:Object(f.jsx)(J,{})}),document.getElementById("root")),o()},96:function(e,t,c){}},[[136,1,2]]]);
//# sourceMappingURL=main.5cf5b0eb.chunk.js.map
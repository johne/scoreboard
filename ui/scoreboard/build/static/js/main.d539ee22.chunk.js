(this.webpackJsonpscoreboard=this.webpackJsonpscoreboard||[]).push([[0],{113:function(e,n){},123:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(52),i=t.n(o),l=(t(66),t(8)),c=t(9),s=t(11),u=t(10),d=t(12),m=t(4),f=t(56),p=t(14),h=t(5),g=t(2),b=t(29),v=t(30),w=t.n(v);function y(){var e=Object(m.a)(["\n  color: red;\n  font-size: 100px;\n  text-align: right;\n  padding-right: 30px;\n  position: absolute;\n  bottom: 2px;\n  right: 2px;\n  animation-duration: 1.1s;\n  animation-name: countdown",";\n  animation-timing-function: ease-in;\n  \n  @keyframes countdown"," {\n    from {\n      transform: scale(0.5);\n      transform-origin: 100% 100%;\n    }\n    to {\n      transform: scale(2.5);\n      transform-origin: 100% 100%;\n    }\n  }\n"]);return y=function(){return e},e}function x(){var e=Object(m.a)(['\n  text-align: center;\n  width: 100%;\n  color: white;\n  font-size: 210px;\n  font-family: "Arial Narrow";\n  padding-top: 5px;\n']);return x=function(){return e},e}var E=h.b.div(x()),j=h.b.div(y(),(function(e){return e.seconds}),(function(e){return e.seconds})),C=function(e){function n(){var e,t;Object(l.a)(this,n);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(t=Object(s.a)(this,(e=Object(u.a)(n)).call.apply(e,[this].concat(o)))).completion=function(){var e=t.props.onComplete;return t.interval&&clearInterval(t.interval),r.a.createElement(w.a,{url:"air-horn.wav",autoLoad:!0,volume:100,playFromPosition:0,playStatus:w.a.status.PLAYING,onFinishedPlaying:e})},t.pad=function(e,n){return(e+="").length>=n?e:new Array(n-e.length+1).join("0")+e},t.startupRenderer=function(e){var n=e.seconds;return e.completed?r.a.createElement(r.a.Fragment,null):r.a.createElement(j,{seconds:n},n+1)},t.renderer=function(e){var n=e.minutes,a=e.seconds,o=e.completed,i=e.milliseconds,l=t.props,c=l.start,s=l.paused,u=(new Date).getTime();return o?t.completion():r.a.createElement(r.a.Fragment,null,0===n?r.a.createElement("span",null,t.pad(a,2),void 0!==i&&r.a.createElement(r.a.Fragment,null,".",Math.round(i+.01))):r.a.createElement("span",null,t.pad(n,2),":",t.pad(a,2)),c>u&&!s&&r.a.createElement(b.a,{date:c,renderer:t.startupRenderer,intervalDelay:0,precision:3}))},t}return Object(d.a)(n,e),Object(c.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.interval=setInterval((function(){e.setState({})}))}},{key:"componentWillUnmount",value:function(){this.interval&&clearInterval(this.interval)}},{key:"renderTimer",value:function(){var e=this.props,n=e.end,t=e.start,a=e.paused,o=e.timeLeft,i=Math.floor(o/6e4),l=(o%6e4/1e3).toFixed(0),c=parseInt(o%1e3),s=(new Date).getTime();return a||s<t?this.renderer({minutes:i,seconds:l,milliseconds:c}):s<n+1e3?r.a.createElement(b.a,{date:n,renderer:this.renderer,intervalDelay:0,precision:3}):r.a.createElement("div",null)}},{key:"render",value:function(){return r.a.createElement(E,null,this.renderTimer())}}]),n}(r.a.Component);function O(){var e=Object(m.a)(['\n  text-align: center;\n  width: 100%;\n  color: white;\n  font-weight: bold;\n  font-size: 100px;\n  font-family: "Tahoma";\n  flex: 0 1 5px;\n  padding-bottom: 25px;\n']);return O=function(){return e},e}function k(){var e=Object(m.a)(['\n  text-align: center;\n  width: 100%;\n  color: white;\n  font-size: 50px;\n  font-family: "Tahoma";\n  flex: 1 1 auto;\n  padding-top: 10px;\n']);return k=function(){return e},e}function T(){var e=Object(m.a)(['\n  width: 100%;\n  height: 100%;\n  text-align: "center";\n  padding-top: 10px;\n  padding-bottom: 15px;\n  display: flex;\n  flex-flow: column;\n  min-height: 270px;\n']);return T=function(){return e},e}var S=h.b.div(T()),M=h.b.div(k()),W=h.b.div(O()),R=function(e){var n=e.name,t=e.score;return r.a.createElement(S,null,r.a.createElement(M,null,n),r.a.createElement(W,null,t))},_=function(e){function n(){var e,t;Object(l.a)(this,n);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(t=Object(s.a)(this,(e=Object(u.a)(n)).call.apply(e,[this].concat(o)))).render=function(){return r.a.createElement("div",{style:{width:"100%",display:"inline-block"},ref:function(e){return t.instance=e}},r.a.createElement("a",{className:"weatherwidget-io",href:"https://forecast7.com/en/33d88n111d93/85331/?unit=us","data-label_1":"Ellis Center","data-label_2":"Weather","data-days":"3","data-theme":"original"},"Cave Creek Weather"))},t}return Object(d.a)(n,e),Object(c.a)(n,[{key:"componentDidMount",value:function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.innerHTML="!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');",this.instance.appendChild(e)}}]),n}(r.a.Component),z=t(33),D=t.n(z),G=function(e){function n(e){var t;return Object(l.a)(this,n),(t=Object(s.a)(this,Object(u.a)(n).call(this,e))).render=function(){var e=t.state.now;return r.a.createElement("div",{style:{color:"white",font:"Tahoma",fontSize:25,fontWeight:"bold",textAlign:"center",width:"100%",paddingTop:"35px"}},e.tz("America/Phoenix").format("h:mm a"))},t.state={now:D()()},t}return Object(d.a)(n,e),Object(c.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.interval=setInterval((function(){e.setState({now:D()()})}),1e4)}},{key:"componentWillUnmount",value:function(){this.interval&&clearInterval(this.interval)}}]),n}(r.a.Component),A=t(55),I=t(21),N=function(e){function n(e){var t;return Object(l.a)(this,n),(t=Object(s.a)(this,Object(u.a)(n).call(this,e))).thumb=function(e){return{url:e.node.thumbnail_resources[2].src}},t.parseResult=function(e){var n={},a=new I.Parser({onopentag:function(e,n){},ontext:function(e){var t="window._sharedData = ";if(e.startsWith(t)){var a=e.substr(t.length,e.length-t.length-1);n=JSON.parse(a)}},onclosetag:function(e){}},{decodeEntities:!0});if(a.write(e),a.end(),n.entry_data){var r=n.entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_top_posts.edges,o=n.entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_media.edges.slice(0,10),i=r.map(t.thumb).concat(o.map(t.thumb));t.shuffleArray(i),t.setState({images:i})}else setTimeout(1e3)},t._loadData=function(){var e=t.state.feedName;fetch("https://www.instagram.com/explore/tags/".concat(e,"/"),{method:"GET"}).then((function(e){return e.text()})).then((function(e){return t.parseResult(e)})).catch((function(e){console.log(e)}))},t.render=function(){var e=t.state,n=e.images,a=e.feedName;return t.fadeProperties.defaultIndex=Math.floor(Math.random()*n.length),console.log(t.fadeProperties.defaultIndex),r.a.createElement(A.Fade,Object.assign({style:{width:"100%",height:"100%",minHeight:455}},t.fadeProperties),t.state.images.map((function(e,n){return r.a.createElement("div",{key:n},r.a.createElement("img",{key:n,style:{width:"100%"},alt:e.alt,src:e.url}),r.a.createElement("div",{style:{width:"100%",color:"white",font:"Tahoma",fontSize:50,fontWeight:"bold",textAlign:"center",paddingTop:20,paddingBottom:10}},"#",a))})))},t.state={images:[],feedName:"ellisFamilyHoops"},t.fadeProperties={duration:5e3,transitionDuration:500,infinite:!0,indicators:!1,arrows:!1},t}return Object(d.a)(n,e),Object(c.a)(n,[{key:"shuffleArray",value:function(e){for(var n=e.length-1;n>0;n--){var t=Math.floor(Math.random()*(n+1)),a=[e[t],e[n]];e[n]=a[0],e[t]=a[1]}}},{key:"componentDidMount",value:function(){this._loadData()}}]),n}(r.a.Component);Object(g.setConfiguration)({gutterWidth:0,gridColumns:20,breakpoints:[576,720,1280,1200],containerWidths:[540,710,1280,1280]});var P=function(e){var n=e.currentGame,t=e.onComplete,a=n.home,o=n.homeScore,i=n.away,l=n.awayScore;return r.a.createElement(g.Container,{style:{padding:"5px",paddingBottom:"0px",overflow:"hidden"}},r.a.createElement(g.Row,null,r.a.createElement(g.Col,{md:11,style:{display:"flex",flexFlow:"column",height:"750",backgroundColor:"white"}},r.a.createElement(g.Row,{style:{flex:"1 1 auto"}},r.a.createElement(g.Col,{style:{backgroundColor:"#1f567c",border:"white solid 5px"}},r.a.createElement(C,Object.assign({},n,{onComplete:t})))),r.a.createElement(g.Row,null,r.a.createElement(g.Col,{md:5,style:{border:"white solid 5px",padding:5,backgroundColor:"#1f567c",alignContent:"center"}},r.a.createElement(g.Row,null,r.a.createElement(G,null))),r.a.createElement(g.Col,{md:15,style:{border:"white solid 5px",padding:5,backgroundColor:"#1f567c",alignContent:"center"}},r.a.createElement(_,null))),r.a.createElement(g.Row,{style:{flex:"0 1 auto",backgroundColor:"#1f567c"}},r.a.createElement(g.Col,{style:{border:"white solid 5px"}},r.a.createElement(R,{name:a,score:o})),r.a.createElement(g.Col,{style:{border:"white solid 5px"}},r.a.createElement(R,{name:i,score:l})))),r.a.createElement(g.Col,{md:9,style:{height:710,maxHeight:710,backgroundColor:"#1f567c",border:"white solid 5px"}},r.a.createElement(g.Row,null,r.a.createElement(N,null)))))},F=t(23);function B(){var e=Object(m.a)(["\n  ","\n"]);return B=function(){return e},e}function H(){var e=Object(m.a)(["\n  display: block;\n  outline: none;\n  padding: 14px 15%;\n  width: 100%;\n  max-width: 452px;\n  font-family: Roboto;\n  font-size: 14px;\n  font-weight: 500;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: 1.14;\n  letter-spacing: 1.25px;\n  text-align: center;\n  color: #ffffff;\n  text-transform: uppercase;\n  border: none;\n  -webkit-backdrop-filter: blur(40px);\n  backdrop-filter: blur(40px);\n  border-radius: 6px;\n  background-color: #1f567c;\n  cursor: pointer;\n"]);return H=function(){return e},e}function L(){var e=Object(m.a)(["\n  width: 90%;\n  height: 50px;\n  border-radius: 10px;\n  box-shadow: 0 5px 10px -10px rgba(0, 0, 0, 0.2);\n  background-color: #ffffff;\n  padding: 0px 15px 0px 15px;\n  font-size: 18px;\n  font-weight: normal;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: normal;\n  letter-spacing: normal;\n  color: #4a4a4a;\n  outline: none;\n  margin: 20px;\n\n  ::placeholder {\n    opacity: 0.5;\n\n    font-size: 22px;\n    font-weight: normal;\n    font-stretch: normal;\n    font-style: normal;\n    line-height: normal;\n    letter-spacing: normal;\n    color: #4a4a4a;\n  }\n"]);return L=function(){return e},e}function J(){var e=Object(m.a)(["\n  height: 50px;\n  border-radius: 10px;\n  background-color: #ffffff;\n  padding: 0px 15px 0px 15px;\n  margin: 20px;\n  font-size: 18px;\n  font-weight: normal;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: normal;\n  letter-spacing: normal;\n  color: #4a4a4a;\n  outline: none;\n"]);return J=function(){return e},e}function q(){var e=Object(m.a)(["\n  height: 50px;\n  border-radius: 10px;\n  box-shadow: 0 5px 10px -10px rgba(0, 0, 0, 0.2);\n  background-color: #ffffff;\n  padding: 0px 15px 0px 15px;\n  font-size: 18px;\n  font-weight: normal;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: normal;\n  letter-spacing: normal;\n  color: #4a4a4a;\n  outline: none;\n  margin: 20px;\n\n  ::placeholder {\n    opacity: 0.5;\n\n    font-size: 22px;\n    font-weight: normal;\n    font-stretch: normal;\n    font-style: normal;\n    line-height: normal;\n    letter-spacing: normal;\n    color: #4a4a4a;\n  }\n  ::-webkit-inner-spin-button {\n    opacity: 1;\n    transform: scale(2.2);\n  }\n"]);return q=function(){return e},e}var U=h.b.input(q()),Y=h.b.select(J()),$=h.b.input(L()),K=Object(h.a)(H()),Q=h.b.button(B(),K);Object(g.setConfiguration)({gutterWidth:1,gridColumns:20,breakpoints:[576,720,992,1200],containerWidths:[540,710,1280,1280]});var V=function(e){var n=e.currentGame,t=e.sendMessage,r=e.onComplete,o=e.historyTeams,i=n.home,l=n.homeScore,c=n.away,s=n.awayScore,u=a.useState(20),d=Object(F.a)(u,2),m=d[0],f=d[1],p=a.useState(o[0]),h=Object(F.a)(p,2),b=h[0],v=h[1],w=function(e){t({action:"".concat(e,"Score")})};return a.createElement(g.Container,{style:{padding:0,paddingTop:5,marginLeft:5,maxHeight:1280,overflow:"hidden"}},a.createElement(g.Row,null,a.createElement(g.Col,null,a.createElement($,{placeholder:"Team Names (with @)",value:b,onChange:function(e){return v(e.target.value)}}))),a.createElement(g.Row,null,a.createElement(g.Col,null,a.createElement(U,{type:"number",placeholder:"Game Length",value:m,onChange:function(e){return f(parseInt(e.target.value))}})),a.createElement(g.Col,null,a.createElement(Y,{onChange:function(e){return v(e.target.value)}},o.map((function(e){return a.createElement("option",{key:e,value:e},e)}))))),a.createElement(g.Row,null,a.createElement(Q,{onClick:function(){console.log("new game");var e=b.split("@"),n=Object(F.a)(e,2),a=n[0],r=n[1];t({action:"newGame",gameInfo:{home:r,away:a,duration:m}})}},"New Game")),a.createElement(g.Row,{style:{backgroundColor:"#1f567c"},onClick:function(){}},a.createElement(g.Col,{style:{border:"white solid 5px"}},a.createElement(C,Object.assign({},n,{onComplete:r})))),a.createElement(g.Row,{style:{backgroundColor:"#1f567c"}},a.createElement(g.Col,{style:{border:"white solid 5px"},onClick:function(){return w("away")}},a.createElement(R,{name:c,score:s})),a.createElement(g.Col,{style:{border:"white solid 5px"},onClick:function(){return w("home")}},a.createElement(R,{name:i,score:l}))))};function X(){var e=Object(m.a)([""]);return X=function(){return e},e}var Z=t(121),ee=h.b.div(X()),ne=function(e){function n(){var e;return Object(l.a)(this,n),(e=Object(s.a)(this,Object(u.a)(n).call(this))).handleData=function(n){console.log(n);var t=n.currentGame;t&&e.setState((function(e){return{currentGame:t}}))},e.sendMessage=function(n){e.refWebSocket.request({method:"POST",path:"update",payload:JSON.stringify(n)})},e.onComplete=function(){},e.state={currentGame:{},historyTeams:["dad@reef","reef@dad","penguin polar pops@lazy llamas","lazy llamas@penguin polar pops","something else"]},e}return Object(d.a)(n,e),Object(c.a)(n,[{key:"getHistory",value:function(){var e=this;fetch("http://ellis-scoreboard.local:3000/history",{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return console.log("here"),e.json()})).then((function(n){var t=Array.from(n.reduce((function(e,n){return e.add("".concat(n.home,"@").concat(n.away)).add("".concat(n.away,"@").concat(n.home))}),new Set));console.log(t),e.setState((function(e){return{historyTeams:t}}))})).catch((function(e){console.log(e)}))}},{key:"componentDidMount",value:function(){var e=this;console.log("here again"),this.refWebSocket=new Z.Client("ws://ellis-scoreboard.local:3000"),this.refWebSocket.connect().then((function(){e.refWebSocket.onUpdate=e.handleData,e.sendMessage({action:"currentGame"}),e.getHistory()}))}},{key:"render",value:function(){var e=this,n=this.state,t=n.currentGame,a=n.historyTeams;return r.a.createElement(f.a,{className:"App"},r.a.createElement(ee,null,t&&r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a,{exact:!0,path:"/scoreboard",render:function(n){return r.a.createElement(P,Object.assign({},n,{currentGame:t,onComplete:e.onComplete}))}}),r.a.createElement(p.a,{exact:!0,path:"/controller",render:function(n){return r.a.createElement(V,Object.assign({},n,{currentGame:t,sendMessage:e.sendMessage,onComplete:e.onComplete,historyTeams:a}))}}))))}}]),n}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));console.log("here"),i.a.render(r.a.createElement(ne,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},61:function(e,n,t){e.exports=t(123)},66:function(e,n,t){}},[[61,1,2]]]);
//# sourceMappingURL=main.d539ee22.chunk.js.map
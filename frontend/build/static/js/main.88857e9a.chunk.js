(this["webpackJsonpclasses-to-calendar"]=this["webpackJsonpclasses-to-calendar"]||[]).push([[0],{117:function(e,a,t){e.exports=t(146)},146:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(10),c=t.n(l),o=t(2),i=t(12),s=t(36),d=t(33),u=t(213),m=t(105),p=t(214),g=t(90),h=t(187),f=t(190),E=t(189),v=t(47),C=t(149),b=Object(C.a)((function(e){return{titleWrapper:{flexGrow:1},title:{"&:hover":{cursor:"pointer"}},navButton:{marginLeft:e.spacing(2)}}}));var y=function(e){var a=b(),t=Object(s.f)(),n=e.openInstructions;return r.a.createElement(h.a,{position:"fixed"},r.a.createElement(E.a,null,r.a.createElement(v.a,{variant:"h5",className:a.titleWrapper},r.a.createElement("span",{onClick:function(){return t.push("/")},className:a.title},"Classes to Calendar")),r.a.createElement(f.a,{variant:"outlined",color:"inherit",className:a.navButton,onClick:n},"Instructions"),r.a.createElement(f.a,{variant:"outlined",color:"inherit",className:a.navButton,component:d.b,to:"/upload",onClick:n},"Upload")))},x=t(191),w=t(194),j=t(192),k=t(193),O=Object(g.a)((function(e){return{homeContent:{padding:e.spacing(8,0,6),display:"flex",alignItems:"center",width:"100%"},homeButtons:{marginTop:e.spacing(4)},card:{padding:"50px"}}}));function S(e){var a=O(),t=e.openInstructions;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:a.homeContent},r.a.createElement(x.a,{maxWidth:"md"},r.a.createElement(j.a,{className:a.card},r.a.createElement(k.a,null,r.a.createElement(v.a,{component:"h1",variant:"h2",align:"center",color:"textPrimary",gutterBottom:!0},"Classes to Calendar"),r.a.createElement(v.a,{variant:"h5",align:"center",color:"textSecondary",paragraph:!0},"An online app that takes an screenshot of your class schedule and enters it in Google Calendar."),r.a.createElement("div",{className:a.homeButtons},r.a.createElement(w.a,{container:!0,spacing:2,justify:"center"},r.a.createElement(w.a,{item:!0},r.a.createElement(f.a,{variant:"contained",color:"primary",component:d.b,to:"/upload",onClick:t},"Upload class schedule image")))))))))}var I=t(38),N=t.n(I),T=t(44),D=t(27),L=t(91),A=t(92),F=t(106),B=t(196),R=t(4),z=t(195),G=t(93),W=t.n(G),U=t(94),P=t.n(U),H=function(e){function a(){var e,t;Object(T.a)(this,a);for(var n=arguments.length,l=new Array(n),c=0;c<n;c++)l[c]=arguments[c];return(t=Object(L.a)(this,(e=Object(A.a)(a)).call.apply(e,[this].concat(l)))).state={dragging:!1,userHasSelectedImage:!1},t.dragCounter=0,t.dropRef=r.a.createRef(),t.allowedFiles=["jpg","jpeg","png"],t.isImageFile=function(e){var a=e.name.match(/\.([0-9a-z]+)/i);return t.allowedFiles.includes(a[1].toLowerCase())},t.handleDrag=function(e){e.preventDefault(),e.stopPropagation()},t.handleDragIn=function(e){e.preventDefault(),e.stopPropagation(),t.dragCounter++,e.dataTransfer.items&&e.dataTransfer.items.length>0&&t.setState({dragging:!0})},t.handleDragOut=function(e){e.preventDefault(),e.stopPropagation(),t.dragCounter--,t.dragCounter>0||t.setState({dragging:!1})},t.handleDrop=function(e){if(e.preventDefault(),e.stopPropagation(),t.setState({dragging:!1}),e.dataTransfer.files&&e.dataTransfer.files.length>0){var a=e.dataTransfer.files[0];if(!t.isImageFile(a))return void t.props.openToast("Invalid file type.","error");t.setState({userHasSelectedImage:!0}),t.props.handleImageSelect(a),e.dataTransfer.clearData(),t.dragCounter=0}},t.handleImageSelect=function(e){t.setState({dragging:!1}),e.target.files&&e.target.files.length>0&&(t.setState({userHasSelectedImage:!0}),t.props.handleImageSelect(e.target.files[0]),t.dragCounter=0)},t}return Object(F.a)(a,e),Object(D.a)(a,[{key:"componentDidMount",value:function(){var e=this.dropRef.current;this.dragCounter=0,e.addEventListener("dragenter",this.handleDragIn),e.addEventListener("dragleave",this.handleDragOut),e.addEventListener("dragover",this.handleDrag),e.addEventListener("drop",this.handleDrop)}},{key:"componentWillUnmount",value:function(){var e=this.dropRef.current;e.removeEventListener("dragenter",this.handleDragIn),e.removeEventListener("dragleave",this.handleDragOut),e.removeEventListener("dragover",this.handleDrag),e.removeEventListener("drop",this.handleDrop)}},{key:"render",value:function(){var e=this.props.classes,a=r.a.createElement(r.a.Fragment,null,r.a.createElement(W.a,{style:{fontSize:80},color:"action"}),r.a.createElement(v.a,{component:"h4",variant:"h4",color:"textSecondary"},"Drag and drop screenshot here")),t=r.a.createElement(r.a.Fragment,null,r.a.createElement(P.a,{style:{fontSize:80},color:"action"}),r.a.createElement(v.a,{component:"h4",variant:"h4",color:"textSecondary"},"Add image")),n=r.a.createElement(r.a.Fragment,null,this.props.selectedImageLoaded?r.a.createElement("img",{className:e.previewImage,src:this.props.selectedImageSrc,alt:"Uploaded"}):r.a.createElement(z.a,null));return r.a.createElement(j.a,{variante:"outlined",className:e.cardStyle},r.a.createElement(k.a,null,r.a.createElement("label",{htmlFor:"image-upload"},r.a.createElement("div",{ref:this.dropRef,className:e.dropzoneArea},r.a.createElement("div",{className:e.uploadInfo},this.state.userHasSelectedImage?n:this.state.dragging?t:a)))),r.a.createElement(B.a,{className:e.buttonContainer},r.a.createElement("input",{accept:"image/*",className:e.input,id:"image-upload",type:"file",onChange:this.handleImageSelect}),r.a.createElement("label",{htmlFor:"image-upload"},r.a.createElement(f.a,{variant:"contained",color:"primary",component:"span"},"Browse")),r.a.createElement(f.a,{variant:"contained",color:"primary",disabled:!this.props.selectedImageSrc,onClick:this.props.handleUpload},"Upload")))}}]),a}(n.Component),M=Object(R.a)((function(e){return{cardStyle:{padding:"20px"},dropzoneArea:{display:"flex",position:"relative",border:"2px dashed #ccc",width:"100%",minHeight:"400px",padding:"20px",transition:"all 0.1s ease-in-out","&:hover":{backgroundColor:e.palette.grey[200],cursor:"pointer"}},uploadInfo:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100%"},previewImage:{maxHeight:"400px",maxWidth:"400px"},input:{display:"none"},buttonContainer:{justifyContent:"center"}}}))(H),V=t(11),Y=Object(g.a)((function(e){return{uploadContent:{display:"flex",width:"100%",alignItems:"center",flexDirection:"column"},uploadContainer:{position:"relative",padding:0},loadingOverlay:{display:"flex",alignItems:"center",justifyContent:"center",position:"absolute",top:0,left:0,zIndex:9999,width:"100%",height:"100%",borderRadius:"4px",backgroundColor:Object(V.c)(e.palette.grey[900],.4)},header:{color:e.palette.grey[50],marginBottom:e.spacing(2)},pageContent:{marginTop:"15vh"}}}));var J=function(e){var a=Y(),t=Object(s.f)(),l=Object(n.useState)(null),c=Object(i.a)(l,2),o=c[0],d=c[1],u=Object(n.useState)(""),m=Object(i.a)(u,2),p=m[0],g=m[1],h=Object(n.useState)(!1),f=Object(i.a)(h,2),E=f[0],C=f[1],b=Object(n.useState)(""),y=Object(i.a)(b,2),w=y[0],j=y[1],k=function(e){var a=new FileReader;a.readAsDataURL(e),a.onloadend=function(){g(a.result),C(!0)}};return r.a.createElement("div",{className:a.uploadContent},r.a.createElement(x.a,{className:a.pageContent},r.a.createElement(x.a,{className:a.header},r.a.createElement(v.a,{variant:"h2",align:"center",component:"h1",color:"inherit"},"Upload Schedule")),r.a.createElement(x.a,{maxWidth:"sm",className:a.uploadContainer},r.a.createElement(M,{handleImageSelect:function(e){d(e),k(e)},handleUpload:function(){var a="".concat("","/api/upload"),n=new FormData;n.append("file",o),j("uploading"),N.a.post(a,n,{headers:{"Content-Type":"multipart/form-data"}}).then((function(a){if(e.openToast("Classes extracted","success"),j("uploaded"),!(a&&Array.isArray(a.data)&&a.data.length>0))throw new Error("No classes extracted. Ensure your image meets the requirements.");e.handleClasses(a.data),t.push("/classes")})).catch((function(a){console.error("Error with image upload",a);var t="";t=a.response?a.response.data.message:a.message,e.openToast(t,"error"),j("uploaded")}))},selectedImageLoaded:E,selectedImageSrc:p,openToast:e.openToast}),"uploading"===w&&r.a.createElement("div",{className:a.loadingOverlay},r.a.createElement(z.a,null)))))},q=t(95),Z=t.n(q),$=t(96),_=t.n($),K=t(98),Q=t.n(K),X=t(99),ee=t.n(X),ae=t(97),te=t.n(ae),ne=t(220),re=t(198),le=t(147),ce=t(66),oe=t(65),ie={success:Z.a,warning:_.a,error:te.a,info:Q.a},se=Object(g.a)((function(e){return{success:{backgroundColor:ce.a[600]},error:{backgroundColor:e.palette.error.dark},info:{backgroundColor:e.palette.primary.main},warning:{backgroundColor:oe.a[700]},icon:{fontSize:20},iconVariant:{opacity:.9,marginRight:e.spacing(1)},message:{display:"flex",alignItems:"center"}}}));var de=function(e){var a=se(),t=e.message,n=e.handleClose,l=e.variant,c=e.open,o=ie[l];return r.a.createElement(ne.a,{anchorOrigin:{vertical:"bottom",horizontal:"center"},open:c,onClose:n,autoHideDuration:5e3},r.a.createElement(re.a,{className:a[l],"aria-describedby":"client-snackbar",message:r.a.createElement("span",{id:"client-snackbar",className:a.message},r.a.createElement(o,{className:a.icon+" "+a.iconVariant}),t),action:[r.a.createElement(le.a,{key:"close","aria-label":"close",color:"inherit",onClick:n},r.a.createElement(ee.a,{className:a.icon}))]}))},ue=t(218),me=t(199),pe=t(200),ge=t(201),he=t(202),fe=t(221),Ee=t(100),ve=t.n(Ee),Ce=Object(g.a)((function(e){return{heading:{fontSize:e.typography.pxToRem(15),fontWeight:e.typography.fontWeightRegular},inputField:{marginBottom:e.spacing(1)},info:{flexDirection:"column"}}}));var be=function(e){var a=Ce(),t=e.cls,l=e.handleClassChange,c=Object(n.useState)(t.name),o=Object(i.a)(c,2),s=o[0],d=o[1],u=function(e){t[e.target.name]=e.target.value,l(t),"name"===e.target.name&&d(t.name)};return r.a.createElement(ue.a,{key:t.id},r.a.createElement(me.a,{expandIcon:r.a.createElement(ve.a,null),"aria-controls":"panel1a-content"},r.a.createElement(v.a,{className:a.heading,color:"primary"},s)),r.a.createElement(pe.a,{className:a.info},Object.keys(t).map((function(e,n){return"id"!==e&&r.a.createElement(ge.a,{key:n,className:a.inputField},r.a.createElement(fe.a,null,e.replace(/_/g," ").replace(/\w\S*/g,(function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()}))),r.a.createElement(he.a,{name:e,defaultValue:t[e],onChange:u}))}))))},ye=t(52),xe=t.n(ye),we=function(){function e(){Object(T.a)(this,e),this.signedIn=!1,this.gapi=null,this.onLoadCallback=null,this.calendar=null,this.initClient=this.initClient.bind(this),this.handleClientLoad=this.handleClientLoad.bind(this),this.handleAuthClick=this.handleAuthClick.bind(this),this.updateSigninStatus=this.updateSigninStatus.bind(this),this.handleClientLoad()}return Object(D.a)(e,[{key:"getConfig",value:function(){return xe.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,xe.a.awrap(N.a.get("".concat("","/api/google-config")));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}))}},{key:"initClient",value:function(){var e,a=this;return xe.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return this.gapi=window.gapi,t.next=3,xe.a.awrap(this.getConfig());case 3:e=t.sent,this.gapi.client.init(e.data).then((function(){a.gapi.auth2.getAuthInstance().isSignedIn.listen(a.updateSigninStatus),a.updateSigninStatus(a.gapi.auth2.getAuthInstance().isSignedIn.get()),a.onLoadCallback&&a.onLoadCallback(a.signedIn)})).catch((function(e){console.error(e)}));case 5:case"end":return t.stop()}}),null,this)}},{key:"handleClientLoad",value:function(){var e=this;this.gapi=window.gapi;var a=document.createElement("script");a.src="https://apis.google.com/js/api.js",document.body.appendChild(a),a.onload=function(){window.gapi.load("client:auth2",e.initClient)}}},{key:"handleAuthClick",value:function(){this.gapi?this.gapi.auth2.getAuthInstance().signIn():console.log("Error: this.gapi not loaded")}},{key:"updateSigninStatus",value:function(e){this.signedIn=e}},{key:"listCalendars",value:function(){return this.gapi.client.calendar.calendarList.list()}},{key:"createCalendar",value:function(e){var a=this,t={summary:e,timeZone:"America/Chicago"};return this.gapi.client.calendar.calendars.insert(t).then((function(e){a.calendar=e.result,console.log(e)}))}},{key:"createEvent",value:function(e){return this.gapi.client.calendar.events.insert({calendarId:this.calendar.id,resource:e})}},{key:"setCalendar",value:function(e){this.calendar=e}}]),e}(),je=t(207),ke=t(222),Oe=t(203),Se=t(216),Ie=t(223),Ne=t(215),Te=t(206),De=t(101),Le=t.n(De),Ae=t(102),Fe=t.n(Ae),Be=t(103),Re=t.n(Be),ze=Object(g.a)((function(e){return{card:{position:"relative",marginBottom:e.spacing(1)},buttonContainer:{display:"flex",justifyContent:"center"},optionsForm:{paddingLeft:e.spacing(1),paddingRight:e.spacing(1)},formField:{marginLeft:e.spacing(4),marginBottom:e.spacing(2)},extendedIcon:{marginRight:"4px"},infoText:{marginBottom:e.spacing(1)},actionSection:{marginBottom:e.spacing(3),marginTop:e.spacing(2),"&:last-child":{marginBottom:0},"&:first-child":{marginTop:0}}}}));var Ge=function(e){var a=ze(),t=e.sendToGcal,l=e.authorizeGcal,c=e.gcalClient,o=e.signedIn,s=e.exportCalendar,d=Object(n.useState)("new"),u=Object(i.a)(d,2),m=u[0],p=u[1],g=Object(n.useState)([]),h=Object(i.a)(g,2),E=h[0],C=h[1],b=Object(n.useState)(""),y=Object(i.a)(b,2),x=y[0],w=y[1],O=Object(n.useState)("Class Schedule"),S=Object(i.a)(O,2),I=S[0],N=S[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(j.a,{className:a.card},r.a.createElement(k.a,null,e.children,r.a.createElement("div",{className:a.actionSection},r.a.createElement(v.a,{variant:"h6",component:"h6"},"Add to Google Calendar"),r.a.createElement("p",{className:a.infoText},"You can add your classes to Google Calendar by either making a new calendar or adding them to an existing one. You must authorize GCal in order to do this."),r.a.createElement("div",{className:a.optionsForm},r.a.createElement(ge.a,{component:"fieldset"},r.a.createElement(ke.a,{"aria-label":"calendarOption",name:"calendarOption",defaultValue:m,onChange:function(a){p(a.target.value),"existing"===a.target.value&&0===E.length&&c.listCalendars().then((function(e){C(e.result.items)})).catch((function(a){e.openToast("Could not retrieve your calendar list.","error"),console.error(a)}))}},r.a.createElement(Oe.a,{value:"new",control:r.a.createElement(Se.a,null),label:"Make a new calendar",disabled:!o}),"new"===m&&r.a.createElement(Ie.a,{className:a.formField,label:"New calendar name",variant:"filled",onChange:function(e){N(e.target.value)},defaultValue:I,disabled:!o}),r.a.createElement(Oe.a,{value:"existing",control:r.a.createElement(Se.a,null),label:"Add to existing calendar",disabled:!o}),"existing"===m&&r.a.createElement(ge.a,{className:a.formField,style:{width:"300px"}},r.a.createElement(fe.a,null,"Select from calendars..."),r.a.createElement(Ne.a,{label:"existing-calendar",defaultValue:"",onChange:function(e){w(e.target.value)},style:{width:"300px"}},E.map((function(e){return r.a.createElement(Te.a,{key:e.id,value:e.id},e.summary)}))))))),r.a.createElement("div",{className:a.buttonContainer},r.a.createElement(f.a,{onClick:l},r.a.createElement(Le.a,{className:a.extendedIcon}),"Authorize GCal"),r.a.createElement(f.a,{color:"primary",onClick:function(a){if("new"===m)I?t(m,I,null):e.openToast("Must specify a name for the new calendar","error");else if("existing"===m)if(x){var n=E.filter((function(e){return e.id===x}))[0];t(m,null,n)}else e.openToast("Must select a calendar","error")},disabled:!o},r.a.createElement(Fe.a,{className:a.extendedIcon}),"Send to GCal"))),r.a.createElement(je.a,null),r.a.createElement("div",{className:a.actionSection},r.a.createElement(v.a,{variant:"h6",component:"h6"},"Export to Another Calendar"),r.a.createElement("p",{className:a.infoText},"You can also export your classes to another calendar by clicking the export button. This will download a file that you can import to any other calendar service."),r.a.createElement("div",{className:a.buttonContainer},r.a.createElement(f.a,{color:"primary",onClick:s},r.a.createElement(Re.a,{className:a.extendedIcon}),"Download"))))))},We=Object(g.a)((function(e){return{classesPage:{display:"flex",width:"100%",justifyContent:"center",overflow:"auto"},loadingOverlay:{display:"flex",alignItems:"center",justifyContent:"center",position:"absolute",top:0,left:0,zIndex:9999,width:"100%",height:"100%",borderRadius:"4px",backgroundColor:Object(V.c)(e.palette.grey[900],.4)},content:{marginTop:"15vh"},classesContainer:{display:"flex"},classList:{flex:3,paddingBottom:e.spacing(3)},actionCol:{flex:2,position:"relative",marginLeft:e.spacing(1)},header:{color:e.palette.grey[50],marginBottom:e.spacing(2)},classesInfo:{borderBottomLeftRadius:0,borderBottomRightRadius:0}}})),Ue=new we;var Pe=function(e){var a=We(),t=Object(s.f)(),l=Object(n.useState)(Ue.signedIn),c=Object(i.a)(l,2),o=c[0],d=c[1],u=Object(n.useState)("unbegun"),m=Object(i.a)(u,2),p=m[0],g=m[1];return Object(n.useEffect)((function(){Ue.onLoadCallback=function(e){d(e)}}),[]),r.a.createElement("div",{className:a.classesPage},r.a.createElement(x.a,{className:a.content},r.a.createElement(x.a,{className:a.header},r.a.createElement(v.a,{variant:"h2",align:"center",component:"h1",color:"inherit"},"Review Classes")),r.a.createElement(x.a,{className:a.classesContainer},r.a.createElement("div",{className:a.classList},r.a.createElement(j.a,{className:a.classesInfo},r.a.createElement(k.a,{style:{paddingBottom:"16px"}},"The classes extracted from your screenshot are below. Review and edit the info for each class by clicking on it and changing anything that's incorrect.")),e.extractedClasses.map((function(a){return r.a.createElement(be,{key:a.id,cls:a,handleClassChange:e.handleClassChange})}))),r.a.createElement("div",{className:a.actionCol},r.a.createElement(Ge,{sendToGcal:function(a,n,r){g("creating"),function(e,a,t){return"new"===e?a?Ue.createCalendar(a):new Promise((function(e,a){return a()})):"existing"===e?new Promise(t?function(e,a){Ue.setCalendar(t),e()}:function(e,a){return a()}):void 0}(a,n,r).then((function(){!function(){Ue.calendar||e.openToast("A calendar must be selected","error");var a=[],n=0;N.a.post("".concat("","/api/events"),e.extractedClasses).then((function(r){(a=r.data).forEach((function(r){Ue.createEvent(r).then((function(e){++n===a.length&&(g("created"),t.push("/success"))})).catch((function(a){e.openToast("Could not create event "+r.summary,"error"),console.error(a)}))}))})).catch((function(a){e.openToast(a.message,"error"),console.error(a)}))}()})).catch((function(a){e.openToast("Could not create or add to calendar.","error")}))},authorizeGcal:function(){Ue.handleAuthClick()},gcalClient:Ue,exportCalendar:function(){N.a.post("".concat("","/api/ics"),e.extractedClasses).then((function(e){var a=e.data.ics,t=document.createElement("a");t.setAttribute("href","data:text/calendar;charset=utf-8,"+encodeURIComponent(a)),t.setAttribute("download","class-calendar.ics"),t.style.display="none",document.body.appendChild(t),t.click(),document.body.removeChild(t)})).catch((function(a){e.openToast("Could create ics file. Please try again.","error"),console.error(a)}))},signedIn:o,openToast:e.openToast},"creating"===p&&r.a.createElement("div",{className:a.loadingOverlay},r.a.createElement(z.a,null)))))))},He=t(104),Me=t.n(He),Ve=Object(g.a)((function(e){return{pageContent:{display:"flex",alignItems:"center",justifyContent:"center",width:"100%"},successCard:{maxWidth:"800px",maxHeight:"400px",width:"100%",padding:"50px",backgroundColor:e.palette.success.main},successContent:{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"},successIcon:{fontSize:"120px",marginBottom:e.spacing(2),color:e.palette.grey[200]},successText:{color:e.palette.grey[200]}}}));var Ye=function(){var e=Ve();return r.a.createElement("div",{className:e.pageContent},r.a.createElement(j.a,{className:e.successCard},r.a.createElement(k.a,{className:e.successContent},r.a.createElement(Me.a,{className:e.successIcon}),r.a.createElement(v.a,{variant:"h1",component:"h1",className:e.successText},"Success"),r.a.createElement(v.a,{className:e.successText},"Check your Google Calendar"))))},Je=t(219),qe=t(208),Ze=t(209),$e=t(205),_e=t(148),Ke=t(210),Qe=t(211),Xe=t(212),ea=Object(g.a)((function(e){return{content:{maxWidth:"960px",width:"100%"}}}));var aa=function(e){var a=ea(),t=e.open,n=e.onClose;return r.a.createElement(Je.a,{open:t,onClose:n,maxWidth:"md"},r.a.createElement(qe.a,{id:"simple-dialog-title"},"How To"),r.a.createElement(Ze.a,{className:a.content},r.a.createElement($e.a,{component:"nav",dense:!0},r.a.createElement(_e.a,null,r.a.createElement(Ke.a,null,r.a.createElement(v.a,null,"1.")),r.a.createElement(Qe.a,null,"Go to myu.umn.edu, click on academics, and go to the 'My Classes' tab.")),r.a.createElement(_e.a,null,r.a.createElement(Ke.a,null,r.a.createElement(v.a,null,"2.")),r.a.createElement(Qe.a,null,"Click to a week where all the classes appear. (If the first week doesn't have classes on Monday for instance, go to the second week so the Monday classes can be seen.)")),r.a.createElement(_e.a,null,r.a.createElement(Ke.a,null,r.a.createElement(v.a,null,"3.")),r.a.createElement(Qe.a,null,"Take a screenshot of the entire schedule and save it locally. Make sure the days of the week at the top of each column are in the screenshot.")),r.a.createElement(_e.a,{style:{display:"text",justifyContent:"center"}},r.a.createElement("img",{src:"example-calendar.png",height:"400",alt:"Example Calendar"})),r.a.createElement(_e.a,null,r.a.createElement(Ke.a,null,r.a.createElement(v.a,null,"4.")),r.a.createElement(Qe.a,null,"Upload the image here and wait for the classes to be read.")),r.a.createElement(_e.a,null,r.a.createElement(Ke.a,null,r.a.createElement(v.a,null,"5.")),r.a.createElement(Qe.a,null,"After the classes have been loaded, correct any data that is wrong by clicking the class and directly editing it.")),r.a.createElement(_e.a,null,r.a.createElement(Ke.a,null,r.a.createElement(v.a,null,"6.")),r.a.createElement(Qe.a,null,"Authorize the app to use your Google Calendar, and set your calendar creation options. Then submit and voil\xe0.")))),r.a.createElement(Xe.a,null,r.a.createElement(f.a,{onClick:n,color:"primary"},"Close")))},ta=Object(m.a)({palette:{primary:{light:"#913447",main:"#760219",dark:"#520111",contrastText:"#fff"},secondary:{light:"#FFDF7E",main:"#FFD75E",dark:"#b29641",contrastText:"#000"}}}),na=Object(g.a)((function(e){return{background:{display:"flex",height:"100vh",width:"100vw",background:'url("gopher.jpg") no-repeat center center fixed',backgroundSize:"cover"}}}));var ra=function(){var e=na(),a=Object(n.useState)([]),t=Object(i.a)(a,2),l=t[0],c=t[1],m=Object(n.useState)(!1),g=Object(i.a)(m,2),h=g[0],f=g[1],E=Object(n.useState)(""),v=Object(i.a)(E,2),C=v[0],b=v[1],x=Object(n.useState)("error"),w=Object(i.a)(x,2),j=w[0],k=w[1],O=Object(n.useState)(!1),I=Object(i.a)(O,2),N=I[0],T=I[1],D=function(e,a){f(!0),b(e),k(a)},L=function(){T(!0)};return r.a.createElement(r.a.Fragment,null,r.a.createElement(u.a,null),r.a.createElement(p.a,{theme:ta},r.a.createElement("div",{className:e.background},r.a.createElement(d.a,null,r.a.createElement(y,{openInstructions:L}),r.a.createElement(s.b,{exact:!0,path:"/"},r.a.createElement(S,{openInstructions:L})),r.a.createElement(s.b,{exact:!0,path:"/upload"},r.a.createElement(J,{openToast:D,handleClasses:function(e){c(e)}})),r.a.createElement(s.b,{exact:!0,path:"/success"},r.a.createElement(Ye,null)),r.a.createElement((function(e){e.component;var a=e.children,t=Object(o.a)(e,["component","children"]);return r.a.createElement(s.b,t,0!==l.length?a:r.a.createElement(s.a,{to:"/"}))}),{exact:!0,path:"/classes"},r.a.createElement(Pe,{extractedClasses:l,handleClassChange:function(e){var a=l.indexOf(e);l.splice(a,1,e),c(l)},openToast:D})),r.a.createElement(de,{open:h,handleClose:function(e,a){"clickaway"!==a&&f(!1)},message:C,variant:j}),r.a.createElement(aa,{open:N,onClose:function(){T(!1)}})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(ra,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[117,1,2]]]);
//# sourceMappingURL=main.88857e9a.chunk.js.map
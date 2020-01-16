(this["webpackJsonpclasses-to-calendar"]=this["webpackJsonpclasses-to-calendar"]||[]).push([[0],{119:function(e,a,t){e.exports=t(148)},148:function(e,a,t){"use strict";t.r(a);var n=t(0),o=t.n(n),r=t(10),i=t.n(r),l=t(24),c=t(12),s=t(33),d=t(36),u=t(216),m=t(107),h=t(217),p=t(90),g=t(188),f=t(191),y=t(190),v=t(47),E=t(151),b=Object(E.a)((function(e){return{titleWrapper:{flexGrow:1},title:{"&:hover":{cursor:"pointer"}},navLink:{marginLeft:e.spacing(2)}}}));var C=function(e){var a=b(),t=Object(d.f)(),n=e.openInstructions;return o.a.createElement(g.a,{position:"fixed"},o.a.createElement(y.a,null,o.a.createElement(v.a,{variant:"h5",className:a.titleWrapper},o.a.createElement("span",{onClick:function(){return t.push("/")},className:a.title},"Classes to Calendar")),o.a.createElement(f.a,{color:"inherit",className:a.navLink,component:s.b,to:"/upload",onClick:n},"Upload"),o.a.createElement(f.a,{color:"inherit",className:a.navLink,onClick:n},"Instructions"),o.a.createElement(f.a,{href:"https://github.com/broden-wanner/classes-to-calendar/issues",color:"inherit",className:a.navLink},"Issues"),o.a.createElement(f.a,{href:"https://github.com/broden-wanner/classes-to-calendar",color:"inherit",className:a.navLink},"Github repo"),o.a.createElement(f.a,{href:"mailto:broden.wanner@outlook.com",color:"inherit",className:a.navLink},"Contact")))},w=t(192),x=t(195),O=t(193),k=t(194),S=Object(p.a)((function(e){return{homeContent:{padding:e.spacing(8,0,6),display:"flex",alignItems:"center",width:"100%"},homeButtons:{marginTop:e.spacing(4)},card:{padding:"50px"}}}));function N(e){var a=S(),t=e.openInstructions;return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:a.homeContent},o.a.createElement(w.a,{maxWidth:"md"},o.a.createElement(O.a,{className:a.card},o.a.createElement(k.a,null,o.a.createElement(v.a,{component:"h1",variant:"h2",align:"center",color:"textPrimary",gutterBottom:!0},"Classes to Calendar"),o.a.createElement(v.a,{variant:"h5",align:"center",color:"textSecondary",paragraph:!0},"An online app that takes the html file of your class schedule and enters it in Google Calendar, or you can export it to whatever calendar you want."),o.a.createElement("div",{className:a.homeButtons},o.a.createElement(x.a,{container:!0,spacing:2,justify:"center"},o.a.createElement(x.a,{item:!0},o.a.createElement(f.a,{variant:"contained",color:"primary",component:s.b,to:"/upload",onClick:t},"Upload class schedule image")))))))))}var I=t(38),T=t.n(I),j=t(44),A=t(29),F=t(91),D=t(92),L=t(108),R=t(196),W=t(4),B=t(93),z=t.n(B),P=t(94),G=t.n(P),H=t(95),U=t.n(H),M=function(e){function a(){var e,t;Object(j.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(t=Object(F.a)(this,(e=Object(D.a)(a)).call.apply(e,[this].concat(r)))).state={dragging:!1,userHasSelectedFile:!1},t.dragCounter=0,t.dropRef=o.a.createRef(),t.allowedFiles=["html"],t.isAllowedFile=function(e){var a=e.name.match(/\.([0-9a-z]+)/i);return t.allowedFiles.includes(a[1].toLowerCase())},t.handleDrag=function(e){e.preventDefault(),e.stopPropagation()},t.handleDragIn=function(e){e.preventDefault(),e.stopPropagation(),t.dragCounter++,e.dataTransfer.items&&e.dataTransfer.items.length>0&&t.setState({dragging:!0})},t.handleDragOut=function(e){e.preventDefault(),e.stopPropagation(),t.dragCounter--,t.dragCounter>0||t.setState({dragging:!1})},t.handleDrop=function(e){if(e.preventDefault(),e.stopPropagation(),t.setState({dragging:!1}),e.dataTransfer.files&&e.dataTransfer.files.length>0){var a=e.dataTransfer.files[0];if(!t.isAllowedFile(a))return void t.props.openToast("Invalid file type.","error");t.setState({userHasSelectedFile:!0}),t.props.handleFileSelect(a),e.dataTransfer.clearData(),t.dragCounter=0}},t.handleFileSelect=function(e){t.setState({dragging:!1}),e.target.files&&e.target.files.length>0&&(t.setState({userHasSelectedFile:!0}),t.props.handleFileSelect(e.target.files[0]),t.dragCounter=0)},t}return Object(L.a)(a,e),Object(A.a)(a,[{key:"componentDidMount",value:function(){var e=this.dropRef.current;this.dragCounter=0,e.addEventListener("dragenter",this.handleDragIn),e.addEventListener("dragleave",this.handleDragOut),e.addEventListener("dragover",this.handleDrag),e.addEventListener("drop",this.handleDrop)}},{key:"componentWillUnmount",value:function(){var e=this.dropRef.current;e.removeEventListener("dragenter",this.handleDragIn),e.removeEventListener("dragleave",this.handleDragOut),e.removeEventListener("dragover",this.handleDrag),e.removeEventListener("drop",this.handleDrop)}},{key:"render",value:function(){var e=this.props.classes,a=o.a.createElement(o.a.Fragment,null,o.a.createElement(z.a,{style:{fontSize:80},color:"action"}),o.a.createElement(v.a,{component:"h4",variant:"h4",color:"textSecondary"},"Drag and drop html file here")),t=o.a.createElement(o.a.Fragment,null,o.a.createElement(G.a,{style:{fontSize:80},color:"action"}),o.a.createElement(v.a,{component:"h4",variant:"h4",color:"textSecondary"},"Add file")),n=o.a.createElement(o.a.Fragment,null,o.a.createElement(U.a,{style:{fontSize:80},color:"action"}),o.a.createElement(v.a,{color:"textSecondary",className:e.filePreview},this.props.selectedFileName));return o.a.createElement(O.a,{variante:"outlined",className:e.cardStyle},o.a.createElement(k.a,null,o.a.createElement("label",{htmlFor:"html-upload"},o.a.createElement("div",{ref:this.dropRef,className:e.dropzoneArea},o.a.createElement("div",{className:e.uploadInfo},this.state.userHasSelectedFile?n:this.state.dragging?t:a)))),o.a.createElement(R.a,{className:e.buttonContainer},o.a.createElement("input",{accept:"text/html",className:e.input,id:"html-upload",type:"file",onChange:this.handleFileSelect}),o.a.createElement("label",{htmlFor:"html-upload"},o.a.createElement(f.a,{variant:"contained",color:"primary",component:"span"},"Browse")),o.a.createElement(f.a,{variant:"contained",color:"primary",disabled:!this.props.selectedFileName,onClick:this.props.handleUpload},"Upload")))}}]),a}(n.Component),Y=Object(W.a)((function(e){return{cardStyle:{padding:"20px"},dropzoneArea:{display:"flex",position:"relative",border:"2px dashed #ccc",width:"100%",minHeight:"400px",padding:"20px",transition:"all 0.1s ease-in-out","&:hover":{backgroundColor:e.palette.grey[200],cursor:"pointer"}},uploadInfo:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100%"},filePreview:{fontSize:"34px",marginTop:e.spacing(2)},input:{display:"none"},buttonContainer:{justifyContent:"center"}}}))(M),_=t(11),q=t(197),V=Object(p.a)((function(e){return{uploadContent:{display:"flex",width:"100%",alignItems:"center",flexDirection:"column"},uploadContainer:{position:"relative",padding:0},loadingOverlay:{display:"flex",alignItems:"center",justifyContent:"center",position:"absolute",top:0,left:0,zIndex:9999,width:"100%",height:"100%",borderRadius:"4px",backgroundColor:Object(_.c)(e.palette.grey[900],.4)},header:{color:e.palette.grey[50],marginBottom:e.spacing(2)},pageContent:{marginTop:"15vh"}}}));var J=function(e){var a=V(),t=Object(d.f)(),r=Object(n.useState)(null),i=Object(c.a)(r,2),l=i[0],s=i[1],u=Object(n.useState)(""),m=Object(c.a)(u,2),h=m[0],p=m[1],g=Object(n.useState)(""),f=Object(c.a)(g,2),y=f[0],E=f[1];return o.a.createElement("div",{className:a.uploadContent},o.a.createElement(w.a,{className:a.pageContent},o.a.createElement(w.a,{className:a.header},o.a.createElement(v.a,{variant:"h2",align:"center",component:"h1",color:"inherit"},"Upload Schedule")),o.a.createElement(w.a,{maxWidth:"sm",className:a.uploadContainer},o.a.createElement(Y,{handleFileSelect:function(e){s(e),p(e.name)},handleUpload:function(){var a="".concat("","/api/upload-html"),n=new FormData;n.append("file",l),E("uploading"),T.a.post(a,n,{headers:{"Content-Type":"multipart/form-data"}}).then((function(a){E("uploaded");var n=a.data,o=n.classes,r=n.extracted_all;if(!(o&&Array.isArray(o)&&o.length>0))throw new Error("No classes extracted. Ensure your image meets the requirements.");e.handleClasses(o),r?e.openToast("Classes extracted","success"):e.openToast("Only some data extracted. Fill in the missing info.","warning"),t.push("/classes")})).catch((function(a){console.error("Error with image upload",a);var t="";t=a.response?a.response.data.message:a.message,e.openToast(t,"error"),E("uploaded")}))},selectedFileName:h,openToast:e.openToast}),"uploading"===y&&o.a.createElement("div",{className:a.loadingOverlay},o.a.createElement(q.a,null)))))},K=t(96),$=t.n(K),Z=t(97),Q=t.n(Z),X=t(99),ee=t.n(X),ae=t(100),te=t.n(ae),ne=t(98),oe=t.n(ne),re=t(223),ie=t(199),le=t(149),ce=t(68),se=t(67),de={success:$.a,warning:Q.a,error:oe.a,info:ee.a},ue=Object(p.a)((function(e){return{success:{backgroundColor:ce.a[600]},error:{backgroundColor:e.palette.error.dark},info:{backgroundColor:e.palette.primary.main},warning:{backgroundColor:se.a[700]},icon:{fontSize:20},iconVariant:{opacity:.9,marginRight:e.spacing(1)},message:{display:"flex",alignItems:"center"}}}));var me=function(e){var a=ue(),t=e.message,n=e.handleClose,r=e.variant,i=e.open,l=de[r];return o.a.createElement(re.a,{anchorOrigin:{vertical:"bottom",horizontal:"center"},open:i,onClose:n,autoHideDuration:4e3},o.a.createElement(ie.a,{className:a[r],"aria-describedby":"client-snackbar",message:o.a.createElement("span",{id:"client-snackbar",className:a.message},o.a.createElement(l,{className:a.icon+" "+a.iconVariant}),t),action:[o.a.createElement(le.a,{key:"close","aria-label":"close",color:"inherit",onClick:n},o.a.createElement(te.a,{className:a.icon}))]}))},he=t(221),pe=t(200),ge=t(201),fe=t(202),ye=t(203),ve=t(224),Ee=t(101),be=t.n(Ee),Ce=t(204),we=Object(W.a)({root:{border:"1px solid rgba(0, 0, 0, .125)",boxShadow:"none","&:not(:last-child)":{borderBottom:0},"&:before":{display:"none"},"&$expanded":{margin:"auto"}},expanded:{}})(he.a),xe=Object(W.a)({root:{backgroundColor:"rgba(0, 0, 0, .03)",borderBottom:"1px solid rgba(0, 0, 0, .125)",marginBottom:-1,minHeight:56,"&$expanded":{minHeight:56}},content:{"&$expanded":{margin:"12px 0"}},expanded:{}})(pe.a),Oe=Object(W.a)((function(e){return{root:{padding:e.spacing(2)}}}))(ge.a),ke=Object(p.a)((function(e){return{heading:{fontSize:e.typography.pxToRem(15),fontWeight:e.typography.fontWeightRegular},inputField:{marginBottom:e.spacing(1)},info:{flexDirection:"column"}}}));var Se=function(e){var a=ke(),t=e.cls,r=e.handleClassChange,i=e.handleClassDelete,l=Object(n.useState)(t.name),s=Object(c.a)(l,2),d=s[0],u=s[1],m=function(e){t[e.target.name]=e.target.value,r(t),"name"===e.target.name&&u(t.name)};return o.a.createElement(we,{key:t.id},o.a.createElement(xe,{expandIcon:o.a.createElement(be.a,null),"aria-controls":"panel1a-content"},o.a.createElement(v.a,{className:a.heading,color:"primary"},d)),o.a.createElement(Oe,{className:a.info},Object.keys(t).map((function(e,n){return"id"!==e&&o.a.createElement(fe.a,{key:n,className:a.inputField,required:!0},o.a.createElement(ve.a,null,e.replace(/_/g," ").replace(/\w\S*/g,(function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()}))),o.a.createElement(ye.a,{name:e,defaultValue:t[e],onChange:m}))}))),o.a.createElement(Ce.a,null,o.a.createElement(f.a,{color:"primary",onClick:function(){i(t)},variant:"contained"},"Remove")))},Ne=t(210),Ie=t(105),Te=t.n(Ie),je=t(52),Ae=t.n(je),Fe=function(){function e(){Object(j.a)(this,e),this.signedIn=!1,this.gapi=null,this.onLoadCallback=null,this.calendar=null,this.GoogleAuth=null,this.initClient=this.initClient.bind(this),this.handleClientLoad=this.handleClientLoad.bind(this),this.handleAuthClick=this.handleAuthClick.bind(this),this.updateSigninStatus=this.updateSigninStatus.bind(this),this.handleClientLoad()}return Object(A.a)(e,[{key:"getConfig",value:function(){return Ae.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Ae.a.awrap(T.a.get("".concat("","/api/google-config")));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}))}},{key:"initClient",value:function(){var e,a=this;return Ae.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return this.gapi=window.gapi,t.next=3,Ae.a.awrap(this.getConfig());case 3:e=t.sent,this.gapi.client.init(e.data).then((function(){if(a.GoogleAuth=a.gapi.auth2.getAuthInstance(),!a.GoogleAuth)throw new Error("Could not authorize Google API");a.GoogleAuth.isSignedIn.listen(a.updateSigninStatus),a.updateSigninStatus(a.GoogleAuth.isSignedIn.get()),a.onLoadCallback&&a.onLoadCallback(a.signedIn)})).catch((function(e){console.error("Error in setting up the google client:"),console.error(e)}));case 5:case"end":return t.stop()}}),null,this)}},{key:"handleClientLoad",value:function(){var e=this;this.gapi=window.gapi;var a=document.createElement("script");a.src="https://apis.google.com/js/api.js",document.body.appendChild(a),a.onload=function(){window.gapi.load("client:auth2",e.initClient)}}},{key:"handleAuthClick",value:function(){this.GoogleAuth?this.GoogleAuth.signIn():console.error("App not authorized with Google")}},{key:"updateSigninStatus",value:function(e){this.signedIn=e,this.onLoadCallback&&this.onLoadCallback(e)}},{key:"listCalendars",value:function(){return this.gapi.client.calendar.calendarList.list()}},{key:"createCalendar",value:function(e){var a=this,t={summary:e,timeZone:"America/Chicago"};return this.gapi.client.calendar.calendars.insert(t).then((function(e){a.calendar=e.result,console.log(e)}))}},{key:"createEvent",value:function(e){return this.gapi.client.calendar.events.insert({calendarId:this.calendar.id,resource:e})}},{key:"setCalendar",value:function(e){this.calendar=e}}]),e}(),De=t(209),Le=t(225),Re=t(205),We=t(219),Be=t(226),ze=t(218),Pe=t(208),Ge=t(102),He=t.n(Ge),Ue=t(103),Me=t.n(Ue),Ye=t(104),_e=t.n(Ye),qe=Object(p.a)((function(e){return{card:{position:"relative",marginBottom:e.spacing(1)},buttonContainer:{display:"flex",justifyContent:"center"},optionsForm:{paddingLeft:e.spacing(1),paddingRight:e.spacing(1)},formField:{marginLeft:e.spacing(4),marginBottom:e.spacing(2)},extendedIcon:{marginRight:"4px"},infoText:{marginBottom:e.spacing(1)},actionSection:{marginBottom:e.spacing(3),marginTop:e.spacing(2),"&:last-child":{marginBottom:0},"&:first-child":{marginTop:0}}}}));var Ve=function(e){var a=qe(),t=e.sendToGcal,r=e.authorizeGcal,i=e.gcalClient,l=e.signedIn,s=e.exportCalendar,d=Object(n.useState)("new"),u=Object(c.a)(d,2),m=u[0],h=u[1],p=Object(n.useState)([]),g=Object(c.a)(p,2),y=g[0],E=g[1],b=Object(n.useState)(""),C=Object(c.a)(b,2),w=C[0],x=C[1],S=Object(n.useState)("Class Schedule"),N=Object(c.a)(S,2),I=N[0],T=N[1];return o.a.createElement(o.a.Fragment,null,o.a.createElement(O.a,{className:a.card},o.a.createElement(k.a,null,o.a.createElement("div",{className:a.actionSection},o.a.createElement(v.a,{variant:"h6",component:"h6"},"Add to Google Calendar"),o.a.createElement("p",{className:a.infoText},"You can add your classes to Google Calendar by either making a new calendar or adding them to an existing one. You must authorize GCal in order to do this."),o.a.createElement("div",{className:a.optionsForm},o.a.createElement(fe.a,{component:"fieldset"},o.a.createElement(Le.a,{"aria-label":"calendarOption",name:"calendarOption",defaultValue:m,onChange:function(a){h(a.target.value),"existing"===a.target.value&&0===y.length&&i.listCalendars().then((function(e){E(e.result.items)})).catch((function(a){e.openToast("Could not retrieve your calendar list.","error"),console.error(a)}))}},o.a.createElement(Re.a,{value:"new",control:o.a.createElement(We.a,null),label:"Make a new calendar",disabled:!l}),"new"===m&&o.a.createElement(Be.a,{className:a.formField,label:"New calendar name",variant:"filled",onChange:function(e){T(e.target.value)},defaultValue:I,disabled:!l}),o.a.createElement(Re.a,{value:"existing",control:o.a.createElement(We.a,null),label:"Add to existing calendar",disabled:!l}),"existing"===m&&o.a.createElement(fe.a,{className:a.formField,style:{width:"300px"}},o.a.createElement(ve.a,null,"Select from calendars..."),o.a.createElement(ze.a,{label:"existing-calendar",defaultValue:"",onChange:function(e){x(e.target.value)},style:{width:"300px"}},y.map((function(e){return o.a.createElement(Pe.a,{key:e.id,value:e.id},e.summary)}))))))),o.a.createElement("div",{className:a.buttonContainer},o.a.createElement(f.a,{onClick:r},o.a.createElement(He.a,{className:a.extendedIcon}),"Authorize GCal"),o.a.createElement(f.a,{color:"primary",onClick:function(a){if("new"===m)I?t(m,I,null):e.openToast("Must specify a name for the new calendar","error");else if("existing"===m)if(w){var n=y.filter((function(e){return e.id===w}))[0];t(m,null,n)}else e.openToast("Must select a calendar","error")},disabled:!l},o.a.createElement(Me.a,{className:a.extendedIcon}),"Send to GCal"))),o.a.createElement(De.a,null),e.children,o.a.createElement("div",{className:a.actionSection},o.a.createElement(v.a,{variant:"h6",component:"h6"},"Export to Another Calendar"),o.a.createElement("p",{className:a.infoText},"You can also export your classes to another calendar by clicking the export button. This will download a file that you can import to any other calendar service."),o.a.createElement("div",{className:a.buttonContainer},o.a.createElement(f.a,{color:"primary",onClick:s},o.a.createElement(_e.a,{className:a.extendedIcon}),"Download"))))))},Je=Object(p.a)((function(e){return{classesPage:{display:"flex",width:"100%",justifyContent:"center",overflow:"auto"},loadingOverlay:{display:"flex",alignItems:"center",justifyContent:"center",position:"absolute",top:0,left:0,zIndex:9999,width:"100%",height:"100%",borderRadius:"4px",backgroundColor:Object(_.c)(e.palette.grey[900],.4)},content:{height:"max-content",marginTop:"10vh",marginBottom:"10vh"},classesContainer:{display:"flex"},classList:{textAlign:"center",flex:3},actionCol:{flex:2,position:"relative",marginLeft:e.spacing(1)},header:{color:e.palette.grey[50],marginBottom:e.spacing(2)},classesInfo:{borderBottomLeftRadius:0,borderBottomRightRadius:0,textAlign:"left"},fabButton:{position:"relative",zIndex:1,top:-30,left:0,right:0,margin:"0 auto"}}})),Ke=new Fe;var $e=function(e){var a=Je(),t=Object(n.useState)(Ke.signedIn),r=Object(c.a)(t,2),i=r[0],l=r[1],s=Object(n.useState)("unbegun"),u=Object(c.a)(s,2),m=u[0],h=u[1];return Ke.onLoadCallback=function(e){l(e)},0===e.extractedClasses.length?o.a.createElement(d.a,{to:"/"}):o.a.createElement("div",{className:a.classesPage},o.a.createElement(w.a,{className:a.content},o.a.createElement(w.a,{className:a.header},o.a.createElement(v.a,{variant:"h2",align:"center",component:"h1",color:"inherit"},"Review Classes")),o.a.createElement(w.a,{className:a.classesContainer},o.a.createElement("div",{className:a.classList},o.a.createElement(O.a,{className:a.classesInfo},o.a.createElement(k.a,{style:{paddingBottom:"16px"}},"The classes extracted from your screenshot are below. Review and edit the info for each class by clicking on it and changing anything that's incorrect.")),e.extractedClasses.map((function(a){return o.a.createElement(Se,{key:a.id,cls:a,handleClassChange:e.handleClassChange,handleClassDelete:e.handleClassDelete})})),o.a.createElement(Ne.a,{color:"primary",className:a.fabButton,onClick:e.handleClassAdd},o.a.createElement(Te.a,null))),o.a.createElement("div",{className:a.actionCol},o.a.createElement(Ve,{sendToGcal:function(a,t,n){h("creating"),function(e,a,t){return"new"===e?a?Ke.createCalendar(a):new Promise((function(e,a){return a()})):"existing"===e?new Promise(t?function(e,a){Ke.setCalendar(t),e()}:function(e,a){return a()}):void 0}(a,t,n).then((function(){!function(){Ke.calendar||e.openToast("A calendar must be selected","error");var a=[],t=0;T.a.post("".concat("","/api/events"),e.extractedClasses).then((function(n){(a=n.data).forEach((function(n){Ke.createEvent(n).then((function(n){++t===a.length&&(h("created"),e.openToast("Successfully create events! Check your gcal","success"))})).catch((function(a){e.openToast("Could not create event "+n.summary,"error"),console.error(a)}))}))})).catch((function(a){e.openToast(a.message,"error"),h("error"),console.error(a)}))}()})).catch((function(a){e.openToast("Could not create or add to calendar.","error")}))},authorizeGcal:function(){Ke.handleAuthClick()},gcalClient:Ke,exportCalendar:function(){T.a.post("".concat("","/api/ics"),e.extractedClasses).then((function(e){var a=e.data.ics,t=document.createElement("a");t.setAttribute("href","data:text/calendar;charset=utf-8,"+encodeURIComponent(a)),t.setAttribute("download","class-calendar.ics"),t.style.display="none",document.body.appendChild(t),t.click(),document.body.removeChild(t)})).catch((function(a){e.openToast("Could create ics file. Please try again.","error"),console.error(a)}))},signedIn:i,openToast:e.openToast},"creating"===m&&o.a.createElement("div",{className:a.loadingOverlay},o.a.createElement(q.a,null)))))))},Ze=t(222),Qe=t(211),Xe=t(212),ea=t(207),aa=t(150),ta=t(213),na=t(214),oa=t(215),ra=Object(p.a)((function(e){return{content:{maxWidth:"960px",width:"100%"}}}));var ia=function(e){var a=ra(),t=e.open,n=e.onClose;return o.a.createElement(Ze.a,{open:t,onClose:n,maxWidth:"md"},o.a.createElement(Qe.a,{id:"simple-dialog-title"},"How To"),o.a.createElement(Xe.a,{className:a.content},o.a.createElement(ea.a,{component:"nav",dense:!0},o.a.createElement(aa.a,null,o.a.createElement(ta.a,null,o.a.createElement(v.a,null,"1.")),o.a.createElement(na.a,null,"Go to myu.umn.edu, click on academics, and go to the 'My Classes' tab.")),o.a.createElement(aa.a,null,o.a.createElement(ta.a,null,o.a.createElement(v.a,null,"2.")),o.a.createElement(na.a,null,"Click to a week where all the classes appear. (If the first week doesn't have classes on Monday for instance, go to the second week so the Monday classes can be seen.)")),o.a.createElement(aa.a,{style:{display:"text",justifyContent:"center"}},o.a.createElement("img",{src:"example-calendar.png",height:"300",alt:"Example Calendar"})),o.a.createElement(aa.a,null,o.a.createElement(ta.a,null,o.a.createElement(v.a,null,"3.")),o.a.createElement(na.a,null,'Right-click somewhere on the webpage and click "Save As..." to save the html file somewhere you\'ll rememeber. (This will also download an extra folder that you can delete. All you need is the .html file)')),o.a.createElement(aa.a,null,o.a.createElement(ta.a,null,o.a.createElement(v.a,null,"4.")),o.a.createElement(na.a,null,"Upload the html file here and wait for the classes to be read.")),o.a.createElement(aa.a,null,o.a.createElement(ta.a,null,o.a.createElement(v.a,null,"5.")),o.a.createElement(na.a,null,"After the classes have been loaded, correct any data that is wrong by clicking the class and directly editing it.")),o.a.createElement(aa.a,null,o.a.createElement(ta.a,null,o.a.createElement(v.a,null,"6.")),o.a.createElement(na.a,null,"Authorize the app to use your Google Calendar, and set your calendar creation options. Then submit and voil\xe0.")))),o.a.createElement(oa.a,null,o.a.createElement(f.a,{onClick:n,color:"primary"},"Close")))},la=Object(p.a)((function(e){return{page:{display:"flex",width:"100%",overflow:"auto"},content:{marginTop:"10vh",paddingBottom:"5vh","& p":{marginBottom:e.spacing(5)}},card:{marginBottom:"10vh",padding:e.spacing(2)}}}));var ca=function(){var e=la();return o.a.createElement("div",{className:e.page},o.a.createElement(w.a,{className:e.content},o.a.createElement(O.a,{className:e.card},o.a.createElement(k.a,null,o.a.createElement(v.a,{variant:"h2",component:"h2"},"Privacy Policy"),o.a.createElement(v.a,null,"Last updated January 06, 2020"),o.a.createElement("p",null,'Thank you for choosing to be part of our community (\u201cCompany\u201d, \u201cwe\u201d, \u201cus\u201d, or \u201cour\u201d). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our notice\xa0, or our practices with regards to your personal information, please contact us at wanne036@umn.edu. When you visit our website classes-to-calendar.xyz, and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy notice, we seek to explain to you in the clearest way possible what information we collect, how we use it and what rights you have in relation to it. We hope you take some time to read through it carefully, as it is important. If there are any terms in this privacy notice\xa0that you do not agree with, please discontinue use of our Sites and our services.\xa0 This privacy notice\xa0applies to all information collected through our website (such as classes-to-calendar.xyz), and/or any related services, sales, marketing or events (we refer to them collectively in this privacy notice\xa0as the "Services").\xa0\xa0 Please read this privacy notice\xa0carefully as it will help you make informed decisions about sharing your personal information with us.\xa0\xa0'),o.a.createElement(v.a,{variant:"h6",component:"h6"},"1. WHAT INFORMATION DO WE COLLECT AND HOW DO WE USE IT?\xa0\xa0"),o.a.createElement("p",null,"We collect no information from any users. All data that is used to complete the service provided by the website for a specific user is not knowingly retained anywhere. That is the design of the website. The data that is used during use is only for the function of the app and that is all."),o.a.createElement(v.a,{variant:"h6",component:"h6"},"2. WILL YOUR INFORMATION BE SHARED WITH ANYONE?\xa0\xa0"),o.a.createElement("p",null,"In Short:\xa0\xa0Your information will not be shared with anyone since we keep none of your information. If under any circumstance you find your information has been shared, please email wanne036 or report it."),o.a.createElement(v.a,{variant:"h6",component:"h6"},"3. HOW LONG DO WE KEEP YOUR INFORMATION?"),"\xa0",o.a.createElement("p",null,"In Short:\xa0\xa0We don't keep any of your information. All information pertaining to a user is destroyed after they leave the site."),o.a.createElement(v.a,{variant:"h6",component:"h6"},"4. HOW DO WE KEEP YOUR INFORMATION SAFE?"),"\xa0\xa0",o.a.createElement("p",null,"In Short:\xa0\xa0We aim to protect your personal information through a system of organizational and technical security measures.\xa0\xa0 We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. No personal information is retained after use, and all that is transmitted during use is sent with encryption over HTTPS. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the services within a secure environment.\xa0"),o.a.createElement(v.a,{variant:"h6",component:"h6"},"5. DO WE COLLECT INFORMATION FROM MINORS?\xa0\xa0"),"\xa0",o.a.createElement("p",null,"In Short:\xa0\xa0We do not knowingly collect data from or market to children under 18 years of age.\xa0\xa0 We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent\u2019s use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we have collected from children under age 18, please contact us at wanne036@umn.edu."),o.a.createElement(v.a,{variant:"h6",component:"h6"},"6. WHAT ARE YOUR PRIVACY RIGHTS?"),"\xa0\xa0",o.a.createElement("p",null,"If you are resident in the European Economic Area and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details here:\xa0",o.a.createElement("a",{href:"http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm"},"http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm"),"."),o.a.createElement(v.a,{variant:"h6",component:"h6"},"7. CONTROLS FOR DO-NOT-TRACK FEATURES\xa0"),"\xa0",o.a.createElement("p",null,"Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track (\u201cDNT\u201d) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. No uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice."),o.a.createElement(v.a,{variant:"h6",component:"h6"},"8. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?"),"\xa0",o.a.createElement("p",null,"In Short:\xa0\xa0Yes, if you are a resident of California, you are granted specific rights regarding access to your personal information.\xa0\xa0\xa0 California Civil Code Section 1798.83, also known as the \u201cShine The Light\u201d law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.\xa0 If you are under 18 years of age, reside in California, and have a registered account with the Services, you have the right to request removal of unwanted data that you publicly post on the Services. To request removal of such data, please contact us using the contact information provided below, and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Services, but please be aware that the data may not be completely or comprehensively removed from our systems."),o.a.createElement(v.a,{variant:"h6",component:"h6"},"9. DO WE MAKE UPDATES TO THIS POLICY?"),"\xa0\xa0",o.a.createElement("p",null,"In Short:\xa0\xa0Yes, we will update this policy as necessary to stay compliant with relevant laws.\xa0\xa0 We may update this privacy notice\xa0from time to time. The updated version will be indicated by an updated \u201cRevised\u201d date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice\xa0frequently to be informed of how we are protecting your information."),o.a.createElement(v.a,{variant:"h6",component:"h6"},"10. HOW CAN YOU CONTACT US ABOUT THIS POLICY?\xa0"),o.a.createElement("p",null,"If you have questions or comments about this policy, you may email us at wanne036@umn.edu or by post to: Broden Wanner, 615 Fulton Street SE #214 Minneapolis, MN 55455, United States")))))},sa=t(106),da=t.n(sa),ua=Object(p.a)((function(e){return{footer:{position:"absolute",top:"auto",bottom:"0",padding:"24px",width:"100%",display:"flex",justifyContent:"flex-end"},extendedIcon:{marginRight:"8px"}}}));var ma=function(){var e=ua(),a=Object(d.f)();return o.a.createElement("div",{className:e.footer},o.a.createElement(Ne.a,{variant:"extended",color:"primary",onClick:function(){return a.push("/privacy-policy")}},o.a.createElement(da.a,{className:e.extendedIcon}),"Privacy Policy"))},ha=Object(m.a)({palette:{primary:{light:"#913447",main:"#760219",dark:"#520111",contrastText:"#fff"},secondary:{light:"#FFDF7E",main:"#FFD75E",dark:"#b29641",contrastText:"#000"}}}),pa=Object(p.a)((function(e){return{background:{display:"flex",height:"100vh",width:"100vw",background:'url("gopher.jpg") no-repeat center center fixed',backgroundSize:"cover"}}}));var ga=function(){var e=pa(),a=Object(n.useState)(JSON.parse(localStorage.getItem("extractedClasses"))||[]),t=Object(c.a)(a,2),r=t[0],i=t[1],m=Object(n.useState)(!1),p=Object(c.a)(m,2),g=p[0],f=p[1],y=Object(n.useState)(""),v=Object(c.a)(y,2),E=v[0],b=v[1],w=Object(n.useState)("error"),x=Object(c.a)(w,2),O=x[0],k=x[1],S=Object(n.useState)(!1),I=Object(c.a)(S,2),T=I[0],j=I[1];Object(n.useEffect)((function(){localStorage.setItem("extractedClasses",JSON.stringify(r))}),[r]);var A=function(e,a){f(!0),b(e),k(a)},F=function(){j(!0)};return o.a.createElement(o.a.Fragment,null,o.a.createElement(u.a,null),o.a.createElement(h.a,{theme:ha},o.a.createElement("div",{className:e.background},o.a.createElement(s.a,null,o.a.createElement(C,{openInstructions:F}),o.a.createElement(d.b,{exact:!0,path:"/"},o.a.createElement(N,{openInstructions:F})),o.a.createElement(d.b,{exact:!0,path:"/upload"},o.a.createElement(J,{openToast:A,handleClasses:function(e){i(e)}})),o.a.createElement(d.b,{exact:!0,path:"/classes"},o.a.createElement($e,{extractedClasses:r,handleClassChange:function(e){var a=r.indexOf(e);r.splice(a,1,e),i(Object(l.a)(r))},handleClassAdd:function(){var e={name:"Class Name",dept:"",course_num:"",section:"",location:"",start_time:"",end_time:"",start_date:"",end_date:"",days_of_week:"",id:r.length+1};i([].concat(Object(l.a)(r),[e]))},handleClassDelete:function(e){var a=r.indexOf(e);r.splice(a,1),i(Object(l.a)(r)),A("Class deleted","success")},openToast:A})),o.a.createElement(d.b,{exact:!0,path:"/privacy-policy"},o.a.createElement(ca,null)),o.a.createElement(ma,null)),o.a.createElement(ia,{open:T,onClose:function(){j(!1)}}),o.a.createElement(me,{open:g,handleClose:function(e,a){"clickaway"!==a&&f(!1)},message:E,variant:O}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(ga,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[119,1,2]]]);
//# sourceMappingURL=main.82e9fe50.chunk.js.map
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();const p=document.createElement("template");p.innerHTML=`
    <style>
        #root {
            box-sizing: border-box;
            background-color: #000;
            display: flex;
            justify-content: start;
            align-items: center;
            gap: 10px;
            padding: 0 20px;
            box-shadow: 0 0 16px rgba(0, 0, 0, 0.7);
            height: 80px;
        }
            
        ::slotted(img) {
            max-width: calc(80px*0.45);
            max-height: calc(80px*0.45);
        }
        
    </style>
    
    <div id="root">
        <slot name="header-logo"></slot>
        <h2 id="title"></h2>
    </div>
`;class x extends HTMLElement{#e;#t;constructor(){super(),this.attachShadow({mode:"open"}).appendChild(p.content.cloneNode(!0)),this.#e=this.shadowRoot.querySelector("#title"),this.#t=this.shadowRoot.querySelector("#logo")}static get observedAttributes(){return["title"]}attributeChangedCallback(e,t,s){switch(e){case"title":this.#e.textContent=s;break}}connectedCallback(){this.hasAttribute("title")&&(this.#e.textContent=this.getAttribute("title"))}}customElements.define("page-header",x);class m{#e;isCorrectAnswer;#t;constructor(e,t,s,i){this.id=e,this.question=t,this.nextURL=s,this.message=i}get limit(){return this.#t}set limit(e){this.#t=e}setAnswer(e){this.#e=e}getAnswer(){return this.#e}setIsAnswerCorrect(e){this.isCorrectAnswer=e}getIsAnswerCorrect(){return this.isCorrectAnswer}}class b extends m{#e;constructor(e,t,s,i,n){super(e,t,s,i),this.#e=n}}class u{seconds;#e;#t;constructor(){this.seconds=0,this.#e=null,this.#t=!0}startTimerIncrementing(e){this.#t=!1,this.#n(e)}#n(e){this.#e=setTimeout(()=>{this.#r(),e(),this.#n(e)},1e3)}startTimerDecreasing(e,t,s){this.#t=!1,this.seconds=e,this.#o(this.seconds,t,s)}#o(e,t,s){this.#e=setTimeout(()=>{if(this.#c(),t(),this.seconds<1){s(),this.stopTimer();return}this.#o(this.seconds,t,s)},1e3)}#r(){this.seconds++}#c(){this.seconds--}stopTimer(){this.#e!==null&&clearTimeout(this.#e)}resetTimer(){this.#e!==null&&(this.seconds=0)}toString(){const e=this.seconds<3600?0:Math.floor(this.seconds/3600),t=this.seconds<60?0:Math.floor(this.seconds%3600/60),s=this.seconds%60;return e<1?`${t<10?`0${t}`:t}:${s<10?`0${s}`:s}`:`${e<10?`0${e}`:e}:${t<10?`0${t}`:t}:${s<10?`0${s}`:s}`}}class y{#e;#t;constructor(e,t){this.#e=t,this.#t=e}get sessionScore(){return this.#e}get username(){return this.#t}toJSON(){return JSON.stringify(this.toObject())}toObject(){return{username:this.#t,score:this.#e}}}class l{static#e=5;static HIGH_SCORE_LOCAL_STORAGE="highScores";isNewHighScore(e,t){const s=new y(e,t),i=this.getHighScoresLocalStorageJSON();if(!i)return this._updateHighScoreLocalStorage([s.toObject()]),!0;const n=Object.values(i);return this.#n(n,s)?(this._updateHighScoreLocalStorage(n),!0):!1}#t(e,t){return e.score-t.score}getHighScoresLocalStorageJSON(){return JSON.parse(localStorage.getItem(l.HIGH_SCORE_LOCAL_STORAGE))}_updateHighScoreLocalStorage(e){localStorage.setItem(l.HIGH_SCORE_LOCAL_STORAGE,JSON.stringify(e))}#n(e,t){if(e.length<l.#e)return e.push(t.toObject()),e.sort(this.#t),!0;{const s=e.find(i=>t.sessionScore<i.score);if(s){const i=e.indexOf(s);return e.splice(i,0,t.toObject()),e.pop(),!0}}return!1}}function w(r){const e=r<0;e&&(r*=-1);const t=r%1e3,s=(r-t)/1e3,i=t<100?t<10?`00${t}`:`0${t}`:`${t}`;return e?`-${s}.${i}s`:`${s}.${i}s`}const g=document.createElement("template");g.innerHTML=`
  <style>
    
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
  
    :host {
        width: 100%;
    }
  
    #root {
      display: grid;
      grid-template-columns: auto auto;
      gap: 20px;
      width: 80%;
      margin: 0 auto;
      justify-content: center;
    }
    
    .game-panel {
      background-color: #000;
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
      border-radius: 10px;
      padding: 20px;
      gap: 20px;
      width: 100%;
    }
    
    #questions-panel {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        background-color: #000;
        border-radius: 10px;
        padding: 20px;
        gap: 10px;
        width: 500px;
    }
    
    .questions-panel-row {
        display: flex;
        justify-content: start;
        align-items: start;
        gap: 10px;
        border-radius: 10px;
        width: 100%;
        background-color: #6262621f;
        padding: 5px 5px;
    }
   
    .question-answer-section {
      display: flex;
      flex-direction: column;
      word-break: break-word;
    }
    
    .question-answer {
        color: #9f9f9f;
    }
    
    .status {
        background-color: rgba(255, 255, 255, 0.7);
        border-radius: 10px;
        padding: 2px 10px;
        color: transparent;
        text-shadow: 0 0 0 white;
        user-select: none;
        width: 35px;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    #input-section {
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      width: 100%;
    }
    
    #input-div {
        display: flex;
        column-gap: 10px;
    }
    
    #input {
        background-color: #f5c216;
        border: none;
        width: 100%;
    }
    
    #title {
        text-align: start;
        margin-bottom: 10px;
    }
    
    #input-section label {
      display: flex;
      font-size: 18px;
      font-weight: 600;
      color: #fff;
      user-select: none;
    }

    #input-section input {
      border-radius: 10px;
      font-size: 25px;
      padding: 2px 10px;
      font-weight: 600;
    }

    #input-section input:focus {
      outline: none;
    }
    
    #submit-btn {
        padding: 0 10px;
        background-color: #f5c216;
        border: none;
        border-radius: 10px;
        font-size: 18px;
        cursor: pointer;
        width: 40px;
        height: 40px;
    }
    
    #submit-btn:hover {
        background-color: #ffde6f;
    }
    
    #message {
        font-size: 13px;
        background-color: red;
        border-radius: 10px;
        padding: 2px 5px;
        width: 100%;
    }
    
    .message-success::before {
        content: '✔️';
        color: transparent;
        text-shadow: 0 0 0 white;
        margin-right: 10px;
    }
    
    .message-fail::before {
        content: '❌';
        color: transparent;
        text-shadow: 0 0 0 white;
        margin-right: 10px;
    }
    
    .message-completed-quiz::before {
        content: '🏆';
        color: transparent;
        text-shadow: 0 0 0 white;
        margin-right: 10px;
    }
    
    #alternatives-section {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    #alternatives {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
    }
    
    #alternatives input {
        opacity: 0;
        pointer-events: none;
        position: fixed;
    }
    
    .alternative-label {
        background-color: #3c3c3c26;
        border-radius: 10px;
        padding: 2px 10px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 5px;
        user-select: none;
        word-wrap: anywhere;
        font-size: 18px;
    }
    
    .btn {
       width: 100%;
       background-color: #f5c216;
       padding: 0 10px;
       border: none;
       border-radius: 10px;
       font-size: 18px;
       cursor: pointer;
       height: 40px;
       font-weight: 600;
       color: black;
    }
    
    .btn:hover {
        background-color: #ffde6f;
    }
    
    #questions-panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    
    .timer {
        background-color: #6262621f;
        padding: 2px 5px;
        border-radius: 10px;
        display: flex;
    }
    
    .timer::before {
        content: "📝";
        margin-right: 5px;
    }
    
    .question-timer {
        
    }
    
    .question-timer::before {
        content: '❔';
        color: transparent;
        text-shadow: 0 0 0 #828282;
    }
    
    .game-panel-top {
        display: flex;
        justify-content: space-between;
        align-items: start;
        gap: 10px;
        width: 100%;
    }
    
    .username-timer-section {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    
    .username {
        color: #f5c216;
        font-weight: 600;
    }
    
    .username::before {
        content: '👤';
        color: transparent;
        text-shadow: 0 0 0 white;
    }
    
    .alternative-checked {
        background-color: #737373;
    }
    
    .high-score-panel {
      background-color: #000;
      width: 100%;
      border-radius: 10px;
      padding: 20px;
      gap: 20px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
    }
    
    .high-score-main {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .scores {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .score {
        background-color: #6262621f;
        width: 100%;
        border-radius: 10px;
        padding: 2px 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .score-first-place {
        background-color: #d2b12c;
    }
    
    .score-second-place {
        background-color: silver;
    }
    
    .score-third-place {
        background-color: #f76208;
    }
    
    .high-score-title {
        text-align: center;
    }
    
    .first-place::before {
        content: '🥇';
    }
    
    .second-place::before {
        content: '🥈';
    }
    
    .third-place::before {
        content: '🥉';
    }
    
    .other-place::before {
       content: '🎗️';
    }
    
    .card-rotatable {
        transform-style: preserve-3d;
        transition: all 0.5s ease;
        width: 450px;
        height: fit-content;
    }
    
    .card-front {
        backface-visibility: hidden;
        height: 100%;
    }
    
    .card-back {
        position: absolute;
        backface-visibility: hidden;
        transform: rotateY(180deg);
        top: 0;
        left: 0;
        min-height: 100%;
    }
    
    .answer-panel {
        display: flex;
        flex-direction: column;
        width: inherit;
        gap: 10px;
    }
    
    .questions-in-panel {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
    }
    
  </style>
  
  <div id="root">  
    <div id="questions-panel">
      <div id="questions-panel-header">
        <h2 id="questions-panel-title">Questions</h2>
        <div class="username-timer-section">
            <h3 class="username"></h3>
            <h2 class="timer total-time">00:00</h2>
        </div>
      </div>
      <div class="questions-in-panel"></div>
    </div>
  
    <div class="card-rotatable">
      <div class="game-panel card-front">
        <div class="answer-panel">
          <div class="game-panel-top">
            <h2 id="title">Welcome to the <br> Quiz Game 💡</h2>
            <h2 class="timer question-timer">00:00</h2>
          </div>
          
          <section id="input-section">
            <label id="label" for="input">Please provide a username</label>
            <div id="input-div">
              <input type="text" name="cardholder-name" id="input" placeholder="name">
              <button id="submit-btn">✏️</button>
            </div>
          </section>
          
          <section id="alternatives-section">
              <form id="alternatives"></form>
              <button class="btn">✏️ ANSWER</button>
          </section>
        </div>
        
        <h3 id="message"></h3>
        
        <button class="btn-restart btn">🏁 RESTART QUIZ</button>
        <button class="btn-to-score btn">🏆 HIGH SCORES</button>
      </div>
    
      <div class="high-score-panel card-back">
        <div class="high-score-main">
          <h2 class="high-score-title">High Scores 🏆</h2>
          <div class="scores"></div>
        </div>
        <button class="btn-to-quiz btn">BACK</button>
      </div>
    </div>
  </div>
`;class d extends HTMLElement{static#e="https://courselab.lnu.se/quiz/question/1";#t=[];#n;#o;#r;#c;#q;#C;#O;#T;#x;#b;#M;#I;#i;#l;#s;#Q;#y;#z;#k;#H;#h;#j;#w;#d;#E;#R;#u;#p;#v;#S;#A;#m;#g;#a;#N;#D;constructor(){super(),this.attachShadow({mode:"open"}).appendChild(g.content.cloneNode(!0)),this.#r=d.#e,this.#o=!1,this.#c=!1,this.#x=new l,this.#b=!1,this.#m=new u,this.#a=new u,this.#M=this.shadowRoot.querySelector("#title"),this.#I=this.shadowRoot.querySelector("#label"),this.#i=this.shadowRoot.querySelector("#input"),this.#l=this.shadowRoot.querySelector("#submit-btn"),this.#s=this.shadowRoot.querySelector("#message"),this.#y=this.shadowRoot.querySelector("#questions-panel"),this.#E=this.#y.querySelector(".questions-in-panel"),this.#R=this.shadowRoot.querySelector("#input-section"),this.#u=this.shadowRoot.querySelector("#alternatives-section"),this.#p=this.shadowRoot.querySelector("#alternatives"),this.#v=this.#u.querySelector(".btn"),this.#A=this.shadowRoot.querySelector(".total-time"),this.#g=this.shadowRoot.querySelector(".question-timer"),this.#z=this.shadowRoot.querySelector(".username"),this.#H=this.shadowRoot.querySelector(".card-rotatable"),this.#Q=this.shadowRoot.querySelector(".game-panel"),this.#k=this.shadowRoot.querySelector(".high-score-panel"),this.#j=this.#k.querySelector(".btn-to-quiz"),this.#w=this.#k.querySelector(".scores"),this.#h=this.#Q.querySelector(".btn-to-score"),this.#d=this.shadowRoot.querySelector(".btn-restart"),this.#h.addEventListener("click",e=>{e.stopPropagation(),this.#H.style.transform="rotateY(180deg)"}),this.#j.addEventListener("click",e=>{e.stopPropagation(),this.#H.style.transform="unset"}),this.#d.addEventListener("click",()=>{this.#Y()}),this.#y.style.display="none",this.#s.style.display="none",this.#u.style.display="none",this.#g.style.display="none",this.#d.style.display="none",this.#W(this.#x.getHighScoresLocalStorageJSON())}connectedCallback(){this.#i.focus(),this.#P(),this.#i.addEventListener("keydown",e=>{e.keyCode===13&&(e.preventDefault(),e.stopPropagation(),this.#l.click())})}#P(){this.#l.addEventListener("click",e=>{e.stopPropagation(),this.#F(this.#i)},{once:!0})}#F(e){const t=e.value;if(t.length<1){this.#P();return}this.#h.style.display="none",this.#i.placeholder="Answer...",this.#n=t,this.#z.textContent=t,this.#y.style.display="flex",this.#I.textContent="Provide your answer",this.#$()}#$(){this.#G(this.#r).then(e=>{e&&(this.#q=performance.now(),this.#m.startTimerIncrementing(()=>{this.#A.textContent=this.#m.toString()}),e())})}#Y(){this.#h.style.display="none",this.#d.style.display="none",this.#A.textContent="00:00",this.#s.style.display="none",this.#m.resetTimer(),this.#q=void 0,this.#C=void 0,this.#b=!1,this.#o=!1,this.#E.textContent="",this.#r=d.#e,this.#$()}#K(e){if(!e)return[];this.#p.textContent="";const t=[];for(const[i,n]of Object.entries(e)){const o=this.#Z(n,i),a=o.firstChild;a.addEventListener("keydown",c=>{c.keyCode===13&&(c.preventDefault(),c.stopPropagation(),this.#v.click())}),a.addEventListener("change",c=>{this.#S.classList.remove("alternative-checked");const h=c.target.parentElement;h.classList.add("alternative-checked"),this.#S=h}),this.#p.appendChild(o),t.push(o)}const s=this.#p.firstChild.firstChild;return s.checked=!0,s.focus(),this.#S=s.parentElement,this.#S.classList.add("alternative-checked"),t}#Z(e,t){const s=document.createElement("label");s.className="alternative-label";const i=document.createElement("input");return i.type="radio",i.name="alternative",i.value=t,s.append(i,e),s}async#G(e){if(!this.#o)return await this.#ne(e).then(t=>{const s=t.limit!==void 0,i=t.alternatives!==void 0;if(t){const n=this.#ae(t.question);let o;return i?i&&(o=new b(t.id,t.question,t.nextURL,t.message,t.alternatives),this.#ee(),this.#T=this.#K(t.alternatives),this.#le(this.#v,o,n)):(o=new m(t.id,t.question,t.nextURL,t.message),this.#X(),this.#ce(this.#l,o,n)),this.#te(o),()=>this.#V(s,o,t,n)}}).catch(t=>(console.log("Error fetching question:"+t),null))}#V(e,t,s,i){e?(t.limit=s.limit,this.#c=!0,this.#U(Number(s.limit),i)):this.#U(10,i)}#U(e,t){this.#g.style.display="flex",this.#a.seconds=e,this.#g.textContent=this.#a.toString(),this.#a.startTimerDecreasing(e,()=>{this.#g.textContent=this.#a.toString()},()=>{this.#pe(),this.#we(t),this.#l.removeEventListener("click",this.#N),this.#v.removeEventListener("click",this.#N)})}#X(){this.#u.style.display="none",this.#R.style.display="flex",this.#i.value="",this.#i.focus()}#ee(){this.#R.style.display="none",this.#u.style.display="flex"}#te(e){this.#t.push(e),this.#re(this.#t.at(-1).question)}#_(e){this.#L(e),this.#s.style.backgroundColor="red",this.#s.className="message-fail"}#se(e){this.#L(e),this.#s.style.backgroundColor="green",this.#s.className="message-success"}#ie(e,t){t?this.#L(e+". NEW HIGH SCORE! 🎗️"):this.#L(e),this.#s.style.backgroundColor="orange",this.#s.className="message-completed-quiz"}#L(e){this.#s.style.display="block",this.#s.textContent=e}async#ne(e){const t=await fetch(e);if(!t.ok)throw new Error("ERROR: Bad Request");return await t.json()}async#oe(e,t){const s={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({answer:t})};return await fetch(e,s)}#re(e){this.#M.textContent=e}#ae(e){const t=document.createElement("div");t.className="questions-panel-row";const s=document.createElement("div");s.className="question-answer-section",t.appendChild(s);const i=document.createElement("h3");i.textContent=e,i.className="question-title",s.appendChild(i);const n=document.createElement("h3");return n.textContent="⌛",n.className="status",t.prepend(n),this.#E.appendChild(t),t}#ce(e,t,s){const i=n=>{n.stopPropagation();const o=this.#i.value;o.length>0&&(e.removeEventListener("click",i),this.#J(e,s,t,o,o))};this.#N=i,e.addEventListener("click",i)}#le(e,t,s){const i=n=>{n.stopPropagation();const o=this.#p.querySelectorAll(".alternative-label"),a=Array.from(o).filter(f=>f.firstChild.checked===!0)[0],c=a.firstChild.value,h=a.textContent;c.length>0&&(e.removeEventListener("click",i),this.#J(e,s,t,c,h))};this.#D=i,e.addEventListener("click",i)}#J(e,t,s,i,n){this.#c&&this.#a.stopTimer(),s.setAnswer(i),this.#oe(s.nextURL,i).then(o=>{o.json().then(a=>{this.#he(o,a,t,n)}).catch(a=>{console.log("Error receiving response: "+a),this.#f()})}).catch(o=>{console.log("Error sending answer: "+o),this.#f()})}#he(e,t,s,i){e.ok?this.#fe(t,s,i):this.#xe(t,s,i)}#de(e){e.nextURL!==void 0?(this.#se(e.message),this.#r=e.nextURL,this.#G(e.nextURL).then(t=>{t&&t()})):this.#ue()}#ue(){this.#b=!0,this.#f()}#pe(){this.#_("Question timer ran out... 🕑"),this.#f()}#me(){this.#C=performance.now(),this.#O=this.#C-this.#q}#f(){if(this.#me(),this.#m.stopTimer(),this.#o=!0,this.#r=null,this.#T)for(const e of this.#T)e.replaceWith(e.cloneNode(!0));if(this.#h.style.display="block",this.#d.style.display="block",this.#b){const e=this.#x.isNewHighScore(this.#n,this.#O);this.#ie("Nice work, you completed the quiz",e),e&&this.#W(this.#x.getHighScoresLocalStorageJSON())}}#W(e){if(this.#w.textContent="",!e){this.#w.append("High-scores is empty. Be the first one to complete the game and get a high-score.");return}const t=Object.values(e);for(let s=0;s<t.length;s++){const i=t[s].username,n=t[s].score;this.#ge(i,n,s+1)}}#ge(e,t,s){const i=document.createElement("div");i.className="score";const n=document.createElement("h3");n.className="score-name",n.textContent=e,i.append(n);const o=document.createElement("h3");switch(o.className="score-time",o.textContent=w(t),i.append(o),s){case 1:{i.classList.add("score-first-place"),n.classList.add("first-place");break}case 2:{i.classList.add("score-second-place"),n.classList.add("second-place");break}case 3:{i.classList.add("score-third-place"),n.classList.add("third-place");break}default:{n.classList.add("other-place");break}}this.#w.appendChild(i)}#fe(e,t,s){this.#de(e),this.#be(t,s)}#xe(e,t,s){this.#f(),this.#_(e.message),this.#ye(t,s)}#be(e,t){const s=e.querySelector(".status");s.style.backgroundColor="green",s.textContent="✔️",this.#B(e,t)}#ye(e,t){const s=e.querySelector(".status");s.style.backgroundColor="red",s.textContent="❌",this.#B(e,t)}#we(e){const t=e.querySelector(".status");t.style.backgroundColor="red",t.textContent="⌛"}#B(e,t,s){const i=document.createElement("h4");i.className="question-answer",i.textContent=t,s&&(i.style.color=s),e.querySelector(".question-answer-section").appendChild(i)}}customElements.define("quiz-game",d);

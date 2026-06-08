import { useState, useEffect, useRef } from "react";
import { UNIVERSITIES, CATEGORIES, TIERS, ALL_CITIES } from "./universities.js";

function save(d){try{localStorage.setItem("nav_v1",JSON.stringify(d));}catch(e){}}
function load(){try{const s=localStorage.getItem("nav_v1");return s?JSON.parse(s):null;}catch(e){return null;}}

const T = {
  bg:"#060912", card:"#0c1220", card2:"#101828", border:"#1a2840",
  border2:"#243550", text:"#e2e8f4", dim:"#4a6080", accent:"#3b82f6",
  green:"#10b981", red:"#ef4444", yellow:"#f59e0b", purple:"#8b5cf6"
};

const CAT_ICONS = {
  it:"💻",math:"📐",eng:"⚙️",med:"🏥",law:"⚖️",econ:"📈",
  hum:"📚",lang:"🌍",ped:"🍎",art:"🎭",bio:"🔬",mil:"🎖️",
  agro:"🌾",arch:"🏗️",sport:"⚽",psych:"🧠",soc:"👥",all:"🔍"
};

// ── WELCOME ──
function Welcome({onClose}) {
  const [step,setStep]=useState(0);
  const steps=[
    {icon:"🧭",title:"Навигатор Поступления",text:"Всё о вузах России в одном месте. 125+ вузов, все направления, актуальные данные 2025 года."},
    {icon:"🎯",title:"Список мечты",text:"Отметь вузы мечты — 1-е, 2-е, 3-е место. Приложение всё запомнит и поможет планировать поступление."},
    {icon:"📊",title:"Калькулятор шансов",text:"Введи свои баллы ЕГЭ — увидишь куда реально можешь поступить на бюджет, а куда нет."},
    {icon:"🤖",title:"ИИ-консультант",text:"Задай любой вопрос про поступление. ИИ знает всё про вузы, специальности, ЕГЭ и сроки подачи документов."},
    {icon:"🗺️",title:"Дорожная карта",text:"Пошаговый план — что делать в 10 классе, в 11 классе, когда подавать документы и как не пропустить дедлайны."},
  ];
  const s=steps[step];
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.96)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:T.card,border:`1px solid ${T.border2}`,borderRadius:22,padding:28,maxWidth:360,width:"100%"}}>
        <div style={{textAlign:"center",marginBottom:22}}>
          <div style={{fontSize:52,marginBottom:10}}>{s.icon}</div>
          <div style={{fontSize:19,fontWeight:"bold",color:T.text,marginBottom:8}}>{s.title}</div>
          <div style={{fontSize:13,color:T.dim,lineHeight:1.7}}>{s.text}</div>
        </div>
        <div style={{display:"flex",gap:5,justifyContent:"center",marginBottom:20}}>
          {steps.map((_,i)=><div key={i} style={{width:i===step?22:8,height:8,borderRadius:4,background:i===step?T.accent:T.border2,transition:"all 0.3s"}}/>)}
        </div>
        <div style={{display:"flex",gap:10}}>
          {step>0&&<button onClick={()=>setStep(s=>s-1)} style={{flex:1,padding:12,background:"transparent",border:`1px solid ${T.border2}`,borderRadius:12,color:T.dim,cursor:"pointer",fontFamily:"inherit"}}>← Назад</button>}
          <button onClick={()=>step<steps.length-1?setStep(s=>s+1):onClose()} style={{flex:1,padding:12,background:`linear-gradient(135deg,${T.accent},#1d4ed8)`,border:"none",borderRadius:12,color:"#fff",cursor:"pointer",fontFamily:"inherit",fontWeight:"bold"}}>
            {step<steps.length-1?"Далее →":"Начать 🚀"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── HOME ──
function HomeScreen({wishlist,onNavigate}) {
  const totalWish=Object.values(wishlist).filter(v=>v).length;
  const top3=["wish1","wish2","wish3"].map(k=>wishlist[k]).filter(Boolean);
  return (
    <div style={{padding:"14px 16px",overflowY:"auto",maxHeight:"calc(100vh-120px)"}}>
      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,#0a1628,#0f1f38)",border:`1px solid ${T.border2}`,borderRadius:18,padding:20,marginBottom:14}}>
        <div style={{fontSize:11,color:T.accent,textTransform:"uppercase",letterSpacing:2,marginBottom:6}}>Навигатор Поступления 2025</div>
        <div style={{fontSize:22,fontWeight:"bold",color:T.text,marginBottom:6}}>Найди свой вуз мечты 🎓</div>
        <div style={{fontSize:13,color:T.dim,lineHeight:1.6}}>125+ вузов · Все направления · Актуальные баллы · ИИ-консультант</div>
        {totalWish>0&&<div style={{marginTop:10,fontSize:12,color:T.green}}>✓ В твоём списке: {totalWish} {totalWish===1?"вуз":totalWish<5?"вуза":"вузов"}</div>}
      </div>

      {/* Quick actions */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
        {[
          {icon:"🔍",label:"Поиск вузов",sub:"125+ вузов России",nav:"search",col:T.accent},
          {icon:"🎯",label:"Список мечты",sub:totalWish>0?`${totalWish} вуза выбрано`:"Добавь вузы мечты",nav:"wishlist",col:T.purple},
          {icon:"📊",label:"Мои шансы",sub:"Введи баллы ЕГЭ",nav:"chances",col:T.green},
          {icon:"🤖",label:"ИИ-консультант",sub:"Задай вопрос",nav:"ai",col:T.yellow},
        ].map(a=>(
          <button key={a.nav} onClick={()=>onNavigate(a.nav)} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"14px 12px",cursor:"pointer",fontFamily:"inherit",textAlign:"left",transition:"all 0.2s"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor=a.col}
            onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
            <div style={{fontSize:24,marginBottom:6}}>{a.icon}</div>
            <div style={{fontSize:13,fontWeight:"bold",color:T.text}}>{a.label}</div>
            <div style={{fontSize:11,color:T.dim,marginTop:2}}>{a.sub}</div>
          </button>
        ))}
      </div>

      {/* Список мечты preview */}
      {top3.length>0&&(
        <div style={{background:T.card,border:`1px solid ${T.border2}`,borderRadius:14,padding:14,marginBottom:14}}>
          <div style={{fontSize:13,fontWeight:"bold",color:T.text,marginBottom:10}}>🎯 Мой список мечты</div>
          {top3.map((id,i)=>{
            const u=UNIVERSITIES.find(u=>u.id===id);
            if(!u) return null;
            return (
              <div key={id} style={{display:"flex",alignItems:"center",gap:10,marginBottom:i<top3.length-1?8:0}}>
                <div style={{width:24,height:24,borderRadius:8,background:["#f59e0b","#6b7280","#cd7c32"][i]+"20",border:`1px solid ${["#f59e0b","#6b7280","#cd7c32"][i]}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0}}>
                  {["🥇","🥈","🥉"][i]}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:"bold",color:T.text}}>{u.name}</div>
                  <div style={{fontSize:11,color:T.dim}}>{u.faculty}</div>
                </div>
                <div style={{fontSize:12,color:T.accent}}>{u.score}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Дорожная карта */}
      <button onClick={()=>onNavigate("roadmap")} style={{width:"100%",padding:"14px 16px",background:"linear-gradient(135deg,#0a1628,#0d1f35)",border:`1px solid ${T.border2}`,borderRadius:14,cursor:"pointer",fontFamily:"inherit",textAlign:"left",display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
        <span style={{fontSize:28}}>🗺️</span>
        <div style={{flex:1}}>
          <div style={{fontSize:14,fontWeight:"bold",color:T.text}}>Дорожная карта абитуриента</div>
          <div style={{fontSize:12,color:T.dim}}>Пошаговый план — от 10 класса до зачисления</div>
        </div>
        <span style={{color:T.accent}}>→</span>
      </button>

      {/* Категории */}
      <div style={{fontSize:11,color:T.dim,marginBottom:10,textTransform:"uppercase",letterSpacing:1}}>Направления</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
        {Object.entries(CATEGORIES).filter(([k])=>k!=="all").map(([k,v])=>(
          <button key={k} onClick={()=>onNavigate("search",k)} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:"10px 8px",cursor:"pointer",fontFamily:"inherit",textAlign:"center",transition:"all 0.2s"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor=T.accent}
            onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
            <div style={{fontSize:20,marginBottom:4}}>{CAT_ICONS[k]||"📚"}</div>
            <div style={{fontSize:10,color:T.dim,lineHeight:1.3}}>{v.split(" /")[0].split(" и")[0]}</div>
          </button>
        ))}
      </div>

      <div style={{marginTop:14,background:"rgba(245,158,11,0.06)",border:"1px solid rgba(245,158,11,0.15)",borderRadius:12,padding:"10px 13px",fontSize:11,color:T.dim,lineHeight:1.6}}>
        ⚠️ Проходные баллы — ориентир по итогам 2025 года. Актуальные данные вузы публикуют в августе. Проверяй на официальных сайтах.
      </div>
    </div>
  );
}

// ── SEARCH ──
function SearchScreen({wishlist,onWishlist,onUni,initialCat}) {
  const [search,setSearch]=useState("");
  const [cat,setCat]=useState(initialCat||"all");
  const [city,setCity]=useState("all");
  const [sort,setSort]=useState("score_desc");
  const [tier,setTier]=useState("all");

  const filtered=UNIVERSITIES.filter(u=>{
    if(cat!=="all"&&u.cat!==cat) return false;
    if(city!=="all"&&u.city!==city) return false;
    if(tier!=="all"&&u.tier!==parseInt(tier)) return false;
    if(search){
      const q=search.toLowerCase();
      return u.name.toLowerCase().includes(q)||u.faculty.toLowerCase().includes(q)||u.city.toLowerCase().includes(q)||u.profession?.toLowerCase().includes(q);
    }
    return true;
  }).sort((a,b)=>{
    if(sort==="score_desc") return b.score-a.score;
    if(sort==="score_asc") return a.score-b.score;
    if(sort==="name") return a.name.localeCompare(b.name);
    return 0;
  });

  const isWished=id=>Object.values(wishlist).includes(id);

  return (
    <div style={{display:"flex",flexDirection:"column",height:"calc(100vh-120px)"}}>
      <div style={{padding:"10px 16px",borderBottom:`1px solid ${T.border}`}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Поиск вуза, факультета, профессии..."
          style={{width:"100%",padding:"10px 13px",background:T.card,border:`1px solid ${T.border2}`,borderRadius:12,color:T.text,fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"inherit",marginBottom:8}}/>
        <div style={{display:"flex",gap:6,overflowX:"auto",scrollbarWidth:"none",paddingBottom:2}}>
          <select value={cat} onChange={e=>setCat(e.target.value)} style={{padding:"5px 8px",background:T.card,border:`1px solid ${T.border2}`,borderRadius:8,color:T.text,fontSize:12,cursor:"pointer",flexShrink:0}}>
            <option value="all">Все направления</option>
            {Object.entries(CATEGORIES).filter(([k])=>k!=="all").map(([k,v])=><option key={k} value={k}>{CAT_ICONS[k]} {v.split(" /")[0]}</option>)}
          </select>
          <select value={city} onChange={e=>setCity(e.target.value)} style={{padding:"5px 8px",background:T.card,border:`1px solid ${T.border2}`,borderRadius:8,color:T.text,fontSize:12,cursor:"pointer",flexShrink:0}}>
            <option value="all">Все города</option>
            {ALL_CITIES.map(c=><option key={c} value={c}>{c}</option>)}
          </select>
          <select value={tier} onChange={e=>setTier(e.target.value)} style={{padding:"5px 8px",background:T.card,border:`1px solid ${T.border2}`,borderRadius:8,color:T.text,fontSize:12,cursor:"pointer",flexShrink:0}}>
            <option value="all">Все типы</option>
            <option value="1">🥇 Топ-вузы</option>
            <option value="2">💙 Сильные</option>
            <option value="3">💚 Региональные</option>
          </select>
          <select value={sort} onChange={e=>setSort(e.target.value)} style={{padding:"5px 8px",background:T.card,border:`1px solid ${T.border2}`,borderRadius:8,color:T.text,fontSize:12,cursor:"pointer",flexShrink:0}}>
            <option value="score_desc">По баллу ↓</option>
            <option value="score_asc">По баллу ↑</option>
            <option value="name">По названию</option>
          </select>
        </div>
        <div style={{fontSize:11,color:T.dim,marginTop:6}}>Найдено: {filtered.length} программ</div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"10px 16px"}}>
        {filtered.map(u=>{
          const wished=isWished(u.id);
          const tierInfo=TIERS[u.tier];
          return (
            <div key={u.id} onClick={()=>onUni(u)} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"13px 14px",marginBottom:10,cursor:"pointer",transition:"all 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor=T.accent}
              onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
              <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",gap:6,marginBottom:4,flexWrap:"wrap"}}>
                    <span style={{fontSize:11,background:`${tierInfo.color}20`,color:tierInfo.color,padding:"2px 7px",borderRadius:8}}>{tierInfo.label}</span>
                    <span style={{fontSize:11,background:`${T.accent}15`,color:T.accent,padding:"2px 7px",borderRadius:8}}>{CAT_ICONS[u.cat]} {CATEGORIES[u.cat]?.split(" /")[0]}</span>
                  </div>
                  <div style={{fontSize:14,fontWeight:"bold",color:T.text,marginBottom:2}}>{u.name}</div>
                  <div style={{fontSize:12,color:T.dim,marginBottom:4}}>{u.faculty}</div>
                  <div style={{fontSize:11,color:T.dim}}>{u.city} · {u.duration}</div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontSize:20,fontWeight:"bold",color:T.accent,fontFamily:"monospace"}}>{u.score}</div>
                  <div style={{fontSize:10,color:T.dim}}>мин. балл</div>
                  <button onClick={e=>{e.stopPropagation();onWishlist(u.id);}} style={{marginTop:6,background:"none",border:"none",fontSize:18,cursor:"pointer",opacity:wished?1:0.4}}>
                    {wished?"⭐":"☆"}
                  </button>
                </div>
              </div>
              {u.subjects&&<div style={{marginTop:8,display:"flex",gap:5,flexWrap:"wrap"}}>
                {u.subjects.map(s=><span key={s} style={{fontSize:10,background:T.card2,border:`1px solid ${T.border}`,padding:"2px 7px",borderRadius:6,color:T.dim}}>{s}</span>)}
              </div>}
            </div>
          );
        })}
        {filtered.length===0&&<div style={{textAlign:"center",color:T.dim,padding:40,fontSize:14}}>Ничего не найдено. Попробуй изменить фильтры.</div>}
      </div>
    </div>
  );
}

// ── UNI DETAIL ──
function UniDetail({uni,wishlist,onWishlist,onBack}) {
  const [wSlot,setWSlot]=useState(null);
  const wished=Object.entries(wishlist).find(([,v])=>v===uni.id);
  const tierInfo=TIERS[uni.tier];

  function handleWish(slot) {
    onWishlist(uni.id,slot);
    setWSlot(null);
  }

  return (
    <div style={{padding:"14px 16px",overflowY:"auto",maxHeight:"calc(100vh-120px)"}}>
      {/* Header */}
      <div style={{background:`linear-gradient(135deg,${T.accent}15,${T.accent}05)`,border:`1px solid ${T.accent}30`,borderRadius:18,padding:18,marginBottom:14}}>
        <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
          <span style={{fontSize:12,background:`${tierInfo.color}20`,color:tierInfo.color,padding:"3px 10px",borderRadius:10}}>{tierInfo.label}</span>
          <span style={{fontSize:12,background:`${T.accent}15`,color:T.accent,padding:"3px 10px",borderRadius:10}}>{CAT_ICONS[uni.cat]} {CATEGORIES[uni.cat]}</span>
        </div>
        <div style={{fontSize:19,fontWeight:"bold",color:T.text,marginBottom:4}}>{uni.name}</div>
        <div style={{fontSize:14,color:T.dim,marginBottom:8}}>{uni.faculty}</div>
        <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
          <div><div style={{fontSize:11,color:T.dim}}>Город</div><div style={{fontSize:13,color:T.text,fontWeight:"bold"}}>{uni.city}</div></div>
          <div><div style={{fontSize:11,color:T.dim}}>Срок</div><div style={{fontSize:13,color:T.text,fontWeight:"bold"}}>{uni.duration}</div></div>
          <div><div style={{fontSize:11,color:T.dim}}>Бюджет</div><div style={{fontSize:13,color:T.green,fontWeight:"bold"}}>{uni.budget} мест</div></div>
        </div>
      </div>

      {/* Проходной балл */}
      <div style={{background:T.card,border:`1px solid ${T.border2}`,borderRadius:14,padding:16,marginBottom:12}}>
        <div style={{fontSize:12,color:T.dim,marginBottom:4}}>Минимальный проходной балл (2025)</div>
        <div style={{fontSize:36,fontWeight:"bold",color:T.accent,fontFamily:"monospace",marginBottom:4}}>{uni.score}</div>
        <div style={{background:T.border,borderRadius:6,height:8,overflow:"hidden",marginBottom:8}}>
          <div style={{width:`${Math.min(100,(uni.score-150)/200*100)}%`,height:"100%",background:uni.score>=280?T.red:uni.score>=240?T.yellow:T.green,borderRadius:6}}/>
        </div>
        <div style={{fontSize:12,color:T.dim}}>
          {uni.score>=280?"🔴 Очень высокий":uni.score>=240?"🟡 Высокий":uni.score>=200?"🟢 Средний":"🔵 Доступный"}
        </div>
        {uni.note&&<div style={{marginTop:8,fontSize:12,color:T.yellow,background:"rgba(245,158,11,0.08)",borderRadius:8,padding:"6px 10px"}}>⚠️ {uni.note}</div>}
      </div>

      {/* Предметы ЕГЭ */}
      <div style={{background:T.card,border:`1px solid ${T.border2}`,borderRadius:14,padding:14,marginBottom:12}}>
        <div style={{fontSize:12,color:T.dim,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>📝 Предметы ЕГЭ</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {uni.subjects?.map(s=><span key={s} style={{background:`${T.accent}15`,color:T.accent,padding:"5px 12px",borderRadius:10,fontSize:13,fontWeight:"bold"}}>{s}</span>)}
        </div>
      </div>

      {/* Профессии */}
      <div style={{background:T.card,border:`1px solid ${T.border2}`,borderRadius:14,padding:14,marginBottom:12}}>
        <div style={{fontSize:12,color:T.dim,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>💼 Кем можно работать</div>
        <div style={{fontSize:14,color:T.text,lineHeight:1.7}}>{uni.profession}</div>
        {uni.salary&&<div style={{marginTop:10,display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:12,color:T.dim}}>Средняя зарплата:</span>
          <span style={{fontSize:14,fontWeight:"bold",color:T.green}}>{uni.salary}</span>
        </div>}
      </div>

      {/* О вузе */}
      {uni.about&&<div style={{background:T.card,border:`1px solid ${T.border2}`,borderRadius:14,padding:14,marginBottom:12}}>
        <div style={{fontSize:12,color:T.dim,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>🏛️ О вузе</div>
        <div style={{fontSize:13,color:T.text,lineHeight:1.7}}>{uni.about}</div>
      </div>}

      {/* Добавить в список */}
      <div style={{background:T.card,border:`1px solid ${T.border2}`,borderRadius:14,padding:14,marginBottom:12}}>
        <div style={{fontSize:13,fontWeight:"bold",color:T.text,marginBottom:10}}>⭐ Добавить в список мечты</div>
        {wished
          ? <div style={{background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.3)",borderRadius:10,padding:"10px 14px",fontSize:13,color:T.green}}>
              ✓ Уже в списке: {{"wish1":"🥇 1-е место","wish2":"🥈 2-е место","wish3":"🥉 3-е место"}[wished[0]]}
              <button onClick={()=>onWishlist(uni.id,null)} style={{marginLeft:10,background:"none",border:"none",color:T.red,cursor:"pointer",fontSize:13}}>Убрать ✕</button>
            </div>
          : <div style={{display:"flex",gap:8}}>
              {[["wish1","🥇 1-е место"],["wish2","🥈 2-е место"],["wish3","🥉 3-е место"]].map(([slot,label])=>(
                <button key={slot} onClick={()=>handleWish(slot)} style={{flex:1,padding:"10px 6px",background:T.card2,border:`1px solid ${T.border2}`,borderRadius:10,color:T.text,cursor:"pointer",fontSize:12,fontFamily:"inherit",textAlign:"center"}}>
                  {label}
                </button>
              ))}
            </div>
        }
      </div>

      {/* Сайт */}
      <div style={{display:"flex",gap:10}}>
        {uni.url&&<a href={uni.url} target="_blank" rel="noreferrer" style={{flex:1,padding:13,background:`linear-gradient(135deg,${T.accent},#1d4ed8)`,borderRadius:12,color:"#fff",fontSize:14,textDecoration:"none",textAlign:"center",fontWeight:"bold"}}>
          🌐 Официальный сайт
        </a>}
      </div>
    </div>
  );
}

// ── WISHLIST ──
function WishlistScreen({wishlist,onWishlist,onUni}) {
  const slots=[
    {key:"wish1",label:"Вуз мечты №1",icon:"🥇",color:"#f59e0b"},
    {key:"wish2",label:"Запасной вариант №1",icon:"🥈",color:"#6b7280"},
    {key:"wish3",label:"Запасной вариант №2",icon:"🥉",color:"#cd7c32"},
    {key:"wish4",label:"Дополнительный вариант",icon:"📌",color:T.accent},
    {key:"wish5",label:"Ещё один вариант",icon:"📌",color:T.accent},
  ];
  return (
    <div style={{padding:"14px 16px",overflowY:"auto",maxHeight:"calc(100vh-120px)"}}>
      <div style={{fontSize:17,fontWeight:"bold",color:T.text,marginBottom:4}}>🎯 Список мечты</div>
      <div style={{fontSize:13,color:T.dim,marginBottom:16}}>Отметь вузы куда хочешь поступить</div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {slots.map(sl=>{
          const u=UNIVERSITIES.find(u=>u.id===wishlist[sl.key]);
          return (
            <div key={sl.key} style={{background:T.card,border:`2px solid ${u?sl.color+"40":T.border}`,borderRadius:16,padding:"14px 16px"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:u?10:0}}>
                <span style={{fontSize:24}}>{sl.icon}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:"bold",color:sl.color}}>{sl.label}</div>
                  {!u&&<div style={{fontSize:12,color:T.dim,marginTop:2}}>Не выбрано</div>}
                </div>
                {u&&<button onClick={()=>onWishlist(u.id,null)} style={{background:"none",border:"none",color:T.red,cursor:"pointer",fontSize:18}}>✕</button>}
              </div>
              {u&&(
                <div onClick={()=>onUni(u)} style={{background:T.card2,borderRadius:12,padding:"10px 12px",cursor:"pointer"}}>
                  <div style={{fontSize:14,fontWeight:"bold",color:T.text,marginBottom:2}}>{u.name}</div>
                  <div style={{fontSize:12,color:T.dim,marginBottom:4}}>{u.faculty}</div>
                  <div style={{display:"flex",gap:10,alignItems:"center"}}>
                    <span style={{fontSize:12,color:T.dim}}>{u.city}</span>
                    <span style={{fontSize:13,color:T.accent,fontWeight:"bold"}}>Балл: {u.score}</span>
                  </div>
                </div>
              )}
              {!u&&<div style={{marginTop:8,fontSize:12,color:T.dim}}>💡 Найди вуз в поиске и нажми "В список мечты"</div>}
            </div>
          );
        })}
      </div>
      <div style={{marginTop:16,background:"rgba(59,130,246,0.06)",border:`1px solid ${T.accent}20`,borderRadius:12,padding:14,fontSize:12,color:T.dim,lineHeight:1.7}}>
        💡 Стратегия поступления: 1-е место — вуз мечты с высокими баллами, 2-е — вуз где шансы выше, 3-е — надёжный запасной. Подавай документы сразу в 5 вузов!
      </div>
    </div>
  );
}

// ── CHANCES ──
function ChancesScreen() {
  const [scores,setScores]=useState({s1:"",s2:"",s3:""});
  const [total,setTotal]=useState(0);
  const [results,setResults]=useState(null);

  function calc() {
    const t=Object.values(scores).reduce((a,v)=>a+(parseInt(v)||0),0);
    setTotal(t);
    const res={
      easy:UNIVERSITIES.filter(u=>u.score<=t-20).sort((a,b)=>b.score-a.score),
      real:UNIVERSITIES.filter(u=>u.score<=t&&u.score>t-20).sort((a,b)=>b.score-a.score),
      hard:UNIVERSITIES.filter(u=>u.score>t&&u.score<=t+30).sort((a,b)=>a.score-b.score),
      dream:UNIVERSITIES.filter(u=>u.score>t+30).sort((a,b)=>a.score-b.score).slice(0,10),
    };
    setResults(res);
  }

  return (
    <div style={{padding:"14px 16px",overflowY:"auto",maxHeight:"calc(100vh-120px)"}}>
      <div style={{fontSize:17,fontWeight:"bold",color:T.text,marginBottom:4}}>📊 Мои шансы на поступление</div>
      <div style={{fontSize:13,color:T.dim,marginBottom:16}}>Введи баллы ЕГЭ — посмотри куда реально поступишь</div>

      <div style={{background:T.card,border:`1px solid ${T.border2}`,borderRadius:14,padding:16,marginBottom:14}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:12}}>
          {[["s1","Предмет 1"],["s2","Предмет 2"],["s3","Предмет 3"]].map(([k,l])=>(
            <div key={k}>
              <div style={{fontSize:11,color:T.dim,marginBottom:4}}>{l}</div>
              <input type="number" min="0" max="100" value={scores[k]} onChange={e=>setScores(s=>({...s,[k]:e.target.value}))}
                placeholder="0-100" style={{width:"100%",padding:"8px 10px",background:T.card2,border:`1px solid ${T.border2}`,borderRadius:8,color:T.text,fontSize:16,outline:"none",boxSizing:"border-box",fontFamily:"monospace",textAlign:"center"}}/>
            </div>
          ))}
        </div>
        {total>0&&<div style={{textAlign:"center",fontSize:13,color:T.dim,marginBottom:12}}>Сумма: <strong style={{color:T.accent,fontSize:18}}>{total}</strong> баллов</div>}
        <button onClick={calc} disabled={!Object.values(scores).some(v=>v)} style={{width:"100%",padding:13,background:Object.values(scores).some(v=>v)?`linear-gradient(135deg,${T.accent},#1d4ed8)`:"#1a2840",border:"none",borderRadius:12,color:"#fff",fontSize:15,cursor:"pointer",fontWeight:"bold",fontFamily:"inherit"}}>
          Рассчитать шансы →
        </button>
      </div>

      {results&&(
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {[
            {key:"real",label:"✅ Хорошие шансы",desc:"Твоих баллов достаточно с запасом",color:T.green},
            {key:"hard",label:"⚡ На грани",desc:"Баллы чуть ниже проходного — попробуй!",color:T.yellow},
            {key:"easy",label:"💚 Надёжные варианты",desc:"Поступишь уверенно — запасные варианты",color:T.accent},
            {key:"dream",label:"🌟 Цель на будущее",desc:"Нужно ещё подтянуть баллы",color:T.purple},
          ].map(({key,label,desc,color})=>(
            results[key].length>0&&(
              <div key={key} style={{background:T.card,border:`1px solid ${T.border2}`,borderRadius:14,padding:14}}>
                <div style={{fontSize:13,fontWeight:"bold",color,marginBottom:3}}>{label}</div>
                <div style={{fontSize:11,color:T.dim,marginBottom:10}}>{desc}</div>
                {results[key].slice(0,5).map(u=>(
                  <div key={u.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${T.border}`}}>
                    <div>
                      <div style={{fontSize:13,color:T.text}}>{u.name}</div>
                      <div style={{fontSize:11,color:T.dim}}>{u.faculty} · {u.city}</div>
                    </div>
                    <span style={{fontSize:13,color:color,fontWeight:"bold",fontFamily:"monospace"}}>{u.score}</span>
                  </div>
                ))}
                {results[key].length>5&&<div style={{fontSize:12,color:T.dim,marginTop:6}}>+{results[key].length-5} ещё вузов</div>}
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}

// ── ROADMAP ──
function RoadmapScreen() {
  const [open,setOpen]=useState(null);
  const steps=[
    {icon:"📚",title:"10 класс",sub:"Подготовка и выбор направления",color:T.green,items:[
      "Определи направление — что тебе интересно? Попробуй профориентационные тесты",
      "Выбери 3-4 предмета ЕГЭ которые понадобятся для поступления",
      "Начни заниматься с репетитором или на курсах по профильным предметам",
      "Участвуй в олимпиадах — победа даёт льготы при поступлении",
      "Посещай дни открытых дверей вузов которые интересуют",
      "Изучи требования конкретных вузов и специальностей",
    ]},
    {icon:"🔥",title:"11 класс (сентябрь-декабрь)",sub:"Интенсивная подготовка",color:T.accent,items:[
      "Запишись на курсы подготовки к ЕГЭ — лучше очно или через проверенные онлайн-платформы",
      "Составь список из 5-7 вузов разного уровня (мечта, реальные, запасные)",
      "Уточни проходные баллы прошлых лет на сайтах вузов",
      "Проверь не нужны ли дополнительные испытания (творческий конкурс, доп. ЕГЭ)",
      "Пиши пробные ЕГЭ — минимум раз в месяц",
    ]},
    {icon:"📝",title:"11 класс (январь-май)",sub:"Финальный рывок",color:T.yellow,items:[
      "Январь-февраль: зарегистрируйся на ЕГЭ через школу (до 1 февраля!)",
      "Март: последние пробники — оцени реальный уровень",
      "Апрель: финальное повторение тем где слабые места",
      "Май: соблюдай режим дня, не занимайся за ночь до экзамена",
      "Возьми с собой: паспорт, пропуск, гелевые ручки (черные!), воду, шоколад",
    ]},
    {icon:"🎯",title:"Июнь: ЕГЭ",sub:"День X",color:T.red,items:[
      "Русский язык — обычно первым",
      "Математика профиль/база",
      "Профильные предметы по выбору",
      "Результаты — примерно через 2 недели после экзамена",
      "Апелляцию можно подать в течение 2 дней после объявления результатов",
    ]},
    {icon:"📨",title:"Июль: Подача документов",sub:"Самое важное время",color:T.purple,items:[
      "Подача заявлений открывается ~20 июня",
      "Подавай в 5 вузов максимум, до 3 специальностей в каждом",
      "Через Госуслуги или лично — большинство вузов принимают оба варианта",
      "Отслеживай рейтинговые списки — обновляются каждый день на сайте вуза",
      "Приоритет согласия подачи — важно правильно расставить",
      "Оригинал аттестата — подаётся при зачислении (до 3 августа)",
    ]},
    {icon:"🎉",title:"Август: Зачисление",sub:"Финал!",color:T.green,items:[
      "28 июля — первая волна зачисления (80% мест)",
      "3 августа — вторая волна (оставшиеся места)",
      "Подай оригинал аттестата в выбранный вуз до 3 августа",
      "Приказ о зачислении — 9 августа",
      "Поздравляем — ты студент! 🎓",
    ]},
  ];
  return (
    <div style={{padding:"14px 16px",overflowY:"auto",maxHeight:"calc(100vh-120px)"}}>
      <div style={{fontSize:17,fontWeight:"bold",color:T.text,marginBottom:4}}>🗺️ Дорожная карта абитуриента</div>
      <div style={{fontSize:13,color:T.dim,marginBottom:16}}>Пошаговый план от 10 класса до зачисления</div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {steps.map((s,i)=>(
          <div key={i} onClick={()=>setOpen(open===i?null:i)} style={{background:T.card,border:`2px solid ${open===i?s.color:T.border}`,borderRadius:14,overflow:"hidden",cursor:"pointer",transition:"all 0.2s"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,padding:"13px 14px"}}>
              <div style={{width:40,height:40,borderRadius:11,background:`${s.color}15`,border:`1px solid ${s.color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{s.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:"bold",color:T.text}}>{s.title}</div>
                <div style={{fontSize:12,color:T.dim}}>{s.sub}</div>
              </div>
              <span style={{color:s.color,fontSize:18,transition:"transform 0.3s",display:"inline-block",transform:open===i?"rotate(90deg)":"none"}}>›</span>
            </div>
            {open===i&&<div style={{padding:"0 14px 14px"}}>
              {s.items.map((item,j)=>(
                <div key={j} style={{display:"flex",gap:8,marginBottom:8}}>
                  <span style={{color:s.color,flexShrink:0,marginTop:2}}>•</span>
                  <span style={{fontSize:13,color:T.text,lineHeight:1.6}}>{item}</span>
                </div>
              ))}
            </div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── AI CONSULTANT ──
function AIScreen() {
  const [msgs,setMsgs]=useState([{role:"assistant",text:"Привет! Я ИИ-консультант по поступлению в российские вузы 🎓\n\nМогу помочь с:\n• Выбором вуза и специальности\n• Информацией о баллах и конкурсе\n• Сроками и порядком подачи документов\n• Стратегией поступления\n• Вопросами про ЕГЭ и олимпиады\n\nЗадай любой вопрос!"}]);
  const [input,setInput]=useState(""); const [loading,setLoading]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{ref.current?.scrollIntoView({behavior:"smooth"});},[msgs]);

  const QUICK=["Как выбрать специальность?","Что такое целевое поступление?","Как работают олимпиады при поступлении?","Сколько вузов можно подать одновременно?","Что лучше: очное или заочное?","Как поступить без ЕГЭ?"];

  async function send(text) {
    const msg=text||input.trim(); if(!msg||loading) return;
    setInput(""); setMsgs(m=>[...m,{role:"user",text:msg}]); setLoading(true);
    try {
      const hist=msgs.slice(-8).map(m=>({role:m.role==="assistant"?"assistant":"user",content:m.text}));
      const resp=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:800,
          system:`Ты эксперт по поступлению в российские вузы. Отвечаешь 10-11 классникам и выпускникам.

Знаешь всё о:
- Системе ЕГЭ и баллах поступления
- Вузах России: МГУ, МФТИ, ВШЭ, МГТУ, медвузы, региональные вузы
- Порядке подачи документов (через Госуслуги, лично)
- Целевом обучении, квотах, льготах
- Олимпиадах (ВсОШ, перечневые) и их влиянии
- Сроках: февраль — регистрация ЕГЭ, июль — подача, август — зачисление
- Специальностях и профессиях

Отвечай конкретно и честно. Используй эмодзи. Максимум 300 слов. Приводи реальные примеры. Предупреждай о рисках. В конце предложи связанный вопрос.`,
          messages:[...hist,{role:"user",content:msg}]
        })
      });
      const d=await resp.json();
      setMsgs(m=>[...m,{role:"assistant",text:d.content?.map(b=>b.text||"").join("").trim()||"Ошибка"}]);
    } catch(e){ setMsgs(m=>[...m,{role:"assistant",text:"Ошибка подключения."}]); }
    setLoading(false);
  }

  return (
    <div style={{display:"flex",flexDirection:"column",height:"calc(100vh-120px)"}}>
      <div style={{padding:"10px 16px 8px",borderBottom:`1px solid ${T.border}`}}>
        <div style={{fontSize:14,fontWeight:"bold",color:T.text}}>🤖 ИИ-консультант по поступлению</div>
        <div style={{fontSize:11,color:T.dim}}>Знает всё о вузах, ЕГЭ и поступлении в России</div>
      </div>
      {msgs.length<=1&&<div style={{padding:"10px 16px 0",display:"flex",gap:6,flexWrap:"wrap"}}>
        {QUICK.map(q=><button key={q} onClick={()=>send(q)} style={{padding:"5px 10px",borderRadius:12,border:`1px solid ${T.border2}`,background:"transparent",color:T.dim,fontSize:11,cursor:"pointer",fontFamily:"inherit",marginBottom:4}}>{q}</button>)}
      </div>}
      <div style={{flex:1,overflowY:"auto",padding:"12px 16px",display:"flex",flexDirection:"column",gap:10}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
            <div style={{maxWidth:"88%",padding:"10px 14px",borderRadius:m.role==="user"?"16px 16px 4px 16px":"4px 16px 16px 16px",
              background:m.role==="user"?`linear-gradient(135deg,${T.accent},#1d4ed8)`:T.card,
              border:m.role==="user"?"none":`1px solid ${T.border2}`,
              color:m.role==="user"?"#fff":T.text,fontSize:13,lineHeight:1.7,whiteSpace:"pre-wrap"}}>
              {m.text}
            </div>
          </div>
        ))}
        {loading&&<div style={{display:"flex"}}><div style={{padding:"10px 16px",borderRadius:"4px 16px 16px 16px",background:T.card,border:`1px solid ${T.border2}`,color:T.dim,fontSize:13}}>🎓 Думаю...</div></div>}
        <div ref={ref}/>
      </div>
      <div style={{padding:"10px 16px 14px",borderTop:`1px solid ${T.border}`,display:"flex",gap:8}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&input.trim()&&send()} placeholder="Задай вопрос про поступление..."
          style={{flex:1,padding:"11px 14px",background:T.card,border:`1px solid ${T.border2}`,borderRadius:24,color:T.text,fontSize:14,outline:"none",fontFamily:"inherit"}}/>
        <button onClick={()=>send()} disabled={!input.trim()||loading} style={{width:44,height:44,borderRadius:"50%",background:input.trim()&&!loading?`linear-gradient(135deg,${T.accent},#1d4ed8)`:T.card,border:"none",cursor:"pointer",fontSize:18,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>→</button>
      </div>
    </div>
  );
}

// ── COMPARE ──
function CompareScreen({onNavigate}) {
  const [a,setA]=useState(null); const [b,setB]=useState(null);
  const [searchA,setSearchA]=useState(""); const [searchB,setSearchB]=useState("");
  const filtA=UNIVERSITIES.filter(u=>u.name.toLowerCase().includes(searchA.toLowerCase())||u.faculty.toLowerCase().includes(searchA.toLowerCase())).slice(0,5);
  const filtB=UNIVERSITIES.filter(u=>u.name.toLowerCase().includes(searchB.toLowerCase())||u.faculty.toLowerCase().includes(searchB.toLowerCase())).slice(0,5);

  const Row=({label,va,vb,better})=>(
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10,alignItems:"center"}}>
      <div style={{fontSize:12,color:T.dim,textAlign:"center"}}>{label}</div>
      <div style={{textAlign:"center",fontSize:13,fontWeight:"bold",color:better==="a"?T.green:T.text}}>{va}</div>
      <div style={{textAlign:"center",fontSize:13,fontWeight:"bold",color:better==="b"?T.green:T.text}}>{vb}</div>
    </div>
  );

  return (
    <div style={{padding:"14px 16px",overflowY:"auto",maxHeight:"calc(100vh-120px)"}}>
      <div style={{fontSize:17,fontWeight:"bold",color:T.text,marginBottom:4}}>⚖️ Сравнение вузов</div>
      <div style={{fontSize:13,color:T.dim,marginBottom:16}}>Выбери два вуза для сравнения</div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
        {[[a,setA,searchA,setSearchA,filtA,"Вуз A"],[b,setB,searchB,setSearchB,filtB,"Вуз B"]].map(([sel,setSel,q,setQ,filt,lbl],idx)=>(
          <div key={idx}>
            <div style={{fontSize:12,color:T.dim,marginBottom:6}}>{lbl}</div>
            {sel ? (
              <div style={{background:T.card,border:`1px solid ${T.accent}`,borderRadius:12,padding:10}}>
                <div style={{fontSize:12,fontWeight:"bold",color:T.text,marginBottom:2}}>{sel.name}</div>
                <div style={{fontSize:11,color:T.dim,marginBottom:6}}>{sel.faculty}</div>
                <button onClick={()=>{setSel(null);setQ("");}} style={{background:"none",border:"none",color:T.red,cursor:"pointer",fontSize:12}}>✕ Сменить</button>
              </div>
            ) : (
              <div>
                <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Поиск..." style={{width:"100%",padding:"8px 10px",background:T.card,border:`1px solid ${T.border2}`,borderRadius:8,color:T.text,fontSize:12,outline:"none",boxSizing:"border-box"}}/>
                {q&&filt.map(u=><div key={u.id} onClick={()=>{setSel(u);setQ("");}} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:8,padding:"8px 10px",marginTop:4,cursor:"pointer",fontSize:12,color:T.text}}>{u.name}<br/><span style={{fontSize:11,color:T.dim}}>{u.faculty}</span></div>)}
              </div>
            )}
          </div>
        ))}
      </div>

      {a&&b&&(
        <div style={{background:T.card,border:`1px solid ${T.border2}`,borderRadius:14,padding:16}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
            <div style={{fontSize:11,color:T.dim,textAlign:"center"}}>Критерий</div>
            <div style={{textAlign:"center",fontSize:12,fontWeight:"bold",color:T.accent,lineHeight:1.3}}>{a.name.split(" ").slice(0,2).join(" ")}</div>
            <div style={{textAlign:"center",fontSize:12,fontWeight:"bold",color:T.accent,lineHeight:1.3}}>{b.name.split(" ").slice(0,2).join(" ")}</div>
          </div>
          <Row label="Мин. балл" va={a.score} vb={b.score} better={a.score<b.score?"a":"b"}/>
          <Row label="Бюджет мест" va={a.budget} vb={b.budget} better={a.budget>b.budget?"a":"b"}/>
          <Row label="Срок обучения" va={a.duration} vb={b.duration}/>
          <Row label="Город" va={a.city} vb={b.city}/>
          <Row label="Тип" va={TIERS[a.tier].label} vb={TIERS[b.tier].label} better={a.tier<b.tier?"a":"b"}/>
          <div style={{marginTop:12,padding:12,background:T.card2,borderRadius:10}}>
            <div style={{fontSize:11,color:T.dim,marginBottom:6}}>Зарплата выпускников</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <div style={{fontSize:12,color:T.green}}>{a.salary||"Нет данных"}</div>
              <div style={{fontSize:12,color:T.green}}>{b.salary||"Нет данных"}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── MAIN APP ──
export default function App() {
  const [screen,setScreen]=useState("home");
  const [subCat,setSubCat]=useState("all");
  const [selectedUni,setSelectedUni]=useState(null);
  const [showWelcome,setShowWelcome]=useState(false);
  const [tab,setTab]=useState("home");
  const [wishlist,setWishlist]=useState(()=>load()?.wishlist||{wish1:null,wish2:null,wish3:null,wish4:null,wish5:null});

  useEffect(()=>{save({wishlist});},[wishlist]);
  useEffect(()=>{const s=localStorage.getItem("nav_welcome");if(!s){setShowWelcome(true);localStorage.setItem("nav_welcome","1");};},[]);

  function handleWishlist(id,slot) {
    setWishlist(w=>{
      const nw={...w};
      // Remove from any slot first
      Object.keys(nw).forEach(k=>{if(nw[k]===id)nw[k]=null;});
      // Add to specific slot
      if(slot) nw[slot]=id;
      return nw;
    });
  }

  function navigate(s,sub=null) {
    setScreen(s);
    if(sub) setSubCat(sub);
  }

  function renderContent() {
    if(screen==="search") return <SearchScreen wishlist={wishlist} onWishlist={(id)=>{const free=["wish1","wish2","wish3","wish4","wish5"].find(k=>!wishlist[k]);if(free)handleWishlist(id,free);}} onUni={u=>{setSelectedUni(u);setScreen("uni");}} initialCat={subCat}/>;
    if(screen==="uni"&&selectedUni) return <UniDetail uni={selectedUni} wishlist={wishlist} onWishlist={handleWishlist} onBack={()=>setScreen("search")}/>;
    if(screen==="wishlist") return <WishlistScreen wishlist={wishlist} onWishlist={handleWishlist} onUni={u=>{setSelectedUni(u);setScreen("uni");}}/>;
    if(screen==="chances") return <ChancesScreen/>;
    if(screen==="roadmap") return <RoadmapScreen/>;
    if(screen==="ai") return <AIScreen/>;
    if(screen==="compare") return <CompareScreen onNavigate={navigate}/>;
    if(tab==="home") return <HomeScreen wishlist={wishlist} onNavigate={navigate}/>;
    if(tab==="search") return <SearchScreen wishlist={wishlist} onWishlist={(id)=>{const free=["wish1","wish2","wish3","wish4","wish5"].find(k=>!wishlist[k]);if(free)handleWishlist(id,free);}} onUni={u=>{setSelectedUni(u);setScreen("uni");}} initialCat="all"/>;
    if(tab==="wishlist") return <WishlistScreen wishlist={wishlist} onWishlist={handleWishlist} onUni={u=>{setSelectedUni(u);setScreen("uni");}}/>;
    if(tab==="ai") return <AIScreen/>;
    return null;
  }

  const isHome=screen==="home"&&["home","search","wishlist","ai"].includes(tab);
  const tabs=[{id:"home",icon:"🏠",label:"Главная"},{id:"search",icon:"🔍",label:"Поиск"},{id:"wishlist",icon:"🎯",label:"Список"},{id:"ai",icon:"🤖",label:"Советник"}];

  return (
    <div style={{minHeight:"100vh",background:T.bg,color:T.text,fontFamily:"'Georgia',serif",maxWidth:480,margin:"0 auto"}}>
      {showWelcome&&<Welcome onClose={()=>setShowWelcome(false)}/>}

      {/* Header */}
      <div style={{background:"#050912",borderBottom:`1px solid ${T.border}`,padding:"10px 16px",display:"flex",alignItems:"center",gap:10,position:"sticky",top:0,zIndex:10}}>
        {screen!=="home"&&<button onClick={()=>{setScreen("home");setSelectedUni(null);}} style={{background:"none",border:"none",color:T.accent,fontSize:18,cursor:"pointer",padding:0}}>←</button>}
        <div style={{width:30,height:30,borderRadius:8,background:`linear-gradient(135deg,${T.accent},${T.purple})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🧭</div>
        <div>
          <div style={{fontSize:13,fontWeight:"bold",color:T.text,letterSpacing:0.5}}>Навигатор Поступления</div>
          <div style={{fontSize:9,color:T.dim,letterSpacing:1,textTransform:"uppercase"}}>Вузы России 2025</div>
        </div>
        <div style={{marginLeft:"auto",display:"flex",gap:6}}>
          <button onClick={()=>navigate("compare")} style={{background:"none",border:`1px solid ${T.border}`,borderRadius:8,padding:"4px 8px",color:T.dim,fontSize:12,cursor:"pointer"}}>⚖️</button>
          <button onClick={()=>setShowWelcome(true)} style={{background:"none",border:`1px solid ${T.border}`,borderRadius:8,padding:"4px 8px",color:T.dim,fontSize:13,cursor:"pointer"}}>?</button>
        </div>
      </div>

      <div style={{paddingBottom:isHome?70:16}}>{renderContent()}</div>

      {isHome&&(
        <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"#050912",borderTop:`1px solid ${T.border}`,display:"flex"}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>{setTab(t.id);setScreen("home");}} style={{flex:1,padding:"10px 0",background:"none",border:"none",cursor:"pointer",color:tab===t.id?T.accent:T.dim,display:"flex",flexDirection:"column",alignItems:"center",gap:2,transition:"color 0.2s"}}>
              <span style={{fontSize:19}}>{t.icon}</span>
              <span style={{fontSize:9,fontFamily:"inherit",textTransform:"uppercase",letterSpacing:0.5}}>{t.label}</span>
            </button>
          ))}
        </div>
      )}
      <style>{`*{box-sizing:border-box;}::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:#1a2840;}`}</style>
    </div>
  );
}

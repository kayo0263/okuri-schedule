import { useState } from "react";

const DAUGHTER_EVENTS = [
  // 5月
  { id:"e01", title:"★授業参観",           date:"2026-05-20", time:"09:45〜10:25" },
  { id:"e02", title:"★午前授業※昼食なし",  date:"2026-05-21", time:"" },
  { id:"e03", title:"★🍙",                date:"2026-05-22", time:"" },
  { id:"e04", title:"★P1600国算/1715英語", date:"2026-05-22", time:"16:00〜19:00" },
  { id:"e05", title:"★ビジョンズパレット",  date:"2026-05-23", time:"13:00〜15:00" },
  { id:"e06", title:"★新体操※荏原",        date:"2026-05-23", time:"17:00〜18:00", location:"荏原区民センター集会室" },
  { id:"e07", title:"★コンテンポラリー",    date:"2026-05-23", time:"18:00〜20:00", location:"荏原区民センター集会室" },
  { id:"e08", title:"★新体操※荏原",        date:"2026-05-24", time:"09:00〜10:00", location:"荏原区民センター集会室" },
  { id:"e09", title:"★P英語",              date:"2026-05-25", time:"15:00〜19:00" },
  { id:"e10", title:"★🍙",                date:"2026-05-26", time:"" },
  { id:"e11", title:"★新体操※中体トレスタ", date:"2026-05-26", time:"16:45〜17:45", location:"中体トレスタ" },
  { id:"e12", title:"★🍙",                date:"2026-05-29", time:"" },
  { id:"e13", title:"★P1600国算/1715英語", date:"2026-05-29", time:"16:00〜19:00" },
  { id:"e14", title:"★新体操※荏原",        date:"2026-05-30", time:"17:00〜18:00", location:"荏原区民センター集会室" },
  // 6月
  { id:"e15", title:"★新体操",             date:"2026-06-02", time:"16:45〜17:45", location:"中央体育館" },
  { id:"e16", title:"★保育園懇談会",       date:"2026-06-05", time:"" },
  { id:"e17", title:"★P1600国算/1715英語", date:"2026-06-05", time:"16:00〜19:00" },
  { id:"e18", title:"★ビジョンズパレット",  date:"2026-06-06", time:"13:00〜15:00" },
  { id:"e19", title:"★新体操",             date:"2026-06-06", time:"18:00〜19:00", location:"学芸大NOAスタジオ #A2" },
  { id:"e20", title:"★新体操",             date:"2026-06-07", time:"10:00〜11:00", location:"学芸大NOAスタジオ #A2" },
  { id:"e21", title:"★P国算",              date:"2026-06-09", time:"15:00〜19:00" },
  { id:"e22", title:"★たしかめテスト",     date:"2026-06-10", time:"" },
  { id:"e23", title:"★休校",               date:"2026-06-12", time:"" },
  { id:"e24", title:"★P1600国算/1715英語", date:"2026-06-12", time:"16:00〜19:00" },
  { id:"e25", title:"★ビジョンズパレット",  date:"2026-06-13", time:"13:00〜15:00" },
  { id:"e26", title:"★新体操",             date:"2026-06-13", time:"17:00〜18:00", location:"荏原区民センター集会室" },
  { id:"e27", title:"★新体操（コンテンポラリー）", date:"2026-06-13", time:"18:00〜20:00", location:"荏原区民センター集会室" },
  { id:"e28", title:"★新体操",             date:"2026-06-14", time:"09:00〜10:00", location:"荏原区民センター集会室" },
  { id:"e29", title:"★P国算",              date:"2026-06-16", time:"15:00〜19:00" },
  { id:"e30", title:"★運動会",             date:"2026-06-17", time:"" },
  { id:"e31", title:"★振替休日",           date:"2026-06-18", time:"" },
  { id:"e32", title:"★P1600国算/1715英語", date:"2026-06-19", time:"16:00〜19:00" },
  { id:"e33", title:"★ビジョンズパレット",  date:"2026-06-20", time:"13:00〜15:00" },
  { id:"e34", title:"★新体操",             date:"2026-06-20", time:"17:00〜18:00", location:"学芸大NOAスタジオ #A2" },
  { id:"e35", title:"★新体操",             date:"2026-06-21", time:"10:00〜11:00", location:"学芸大NOAスタジオ #A2" },
  { id:"e36", title:"★P国算",              date:"2026-06-23", time:"15:00〜19:00" },
  { id:"e37", title:"★新体操",             date:"2026-06-25", time:"16:45〜17:45", location:"中央体育館" },
  { id:"e38", title:"★P1600国算/1715英語", date:"2026-06-26", time:"16:00〜19:00" },
  { id:"e39", title:"★ビジョンズパレット",  date:"2026-06-27", time:"13:00〜15:00" },
  { id:"e40", title:"★P国算",              date:"2026-06-30", time:"15:00〜19:00" },
];

const MONTHS = [{ year:2026, month:5 }, { year:2026, month:6 }];
// 日曜始まり
const DOW = ["日","月","火","水","木","金","土"];

function buildCalendar(year, month) {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay  = new Date(year, month, 0);
  const startDow = firstDay.getDay(); // 0=Sun（そのまま使う）
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function toDateStr(year, month, day) {
  return `${year}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
}

function dowColor(year, month, day) {
  const dow = new Date(year, month - 1, day).getDay();
  if (dow === 0) return "#FF4444";
  if (dow === 6) return "#2196F3";
  return "#333";
}

const CATEGORIES = [
  { label:"🍽️ 会食",   value:"dinner",   color:"#90CAF9" },
  { label:"📅 その他", value:"other",     color:"#90CAF9" },
];
const catColor = v => CATEGORIES.find(c=>c.value===v)?.color ?? "#546E7A";
const catLabel = v => CATEGORIES.find(c=>c.value===v)?.label ?? "📅 その他";

let uid = 1000;

const EMPTY_FORM = { title:"", date:"", timeFrom:"", timeTo:"", location:"", category:"dinner", memo:"" };

export default function App() {
  const [monthIdx, setMonthIdx] = useState(0);
  const [husbandEvs, setHusbandEvs] = useState([]);
  // モーダル状態
  const [mode, setMode] = useState(null); // "daughter" | "add" | "hdetail"
  const [selHusband, setSelHusband]   = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const { year, month } = MONTHS[monthIdx];
  const cells = buildCalendar(year, month);
  const mmStr = `${year}-${String(month).padStart(2,"0")}`;

  function eventsForDate(ds) {
    return {
      daughter: DAUGHTER_EVENTS.filter(e => e.date === ds),
      husband:  husbandEvs.filter(e => e.date === ds),
    };
  }

  function openAdd(date = "") {
    setForm({ ...EMPTY_FORM, date });
    setMode("add");
  }

  function saveHusband() {
    if (!form.date) return;
    const autoTitle = catLabel(form.category);
    setHusbandEvs(prev => [...prev, { ...form, title: autoTitle, id: String(uid++) }]);
    setMode(null);
  }

  function deleteHusband(id) {
    setHusbandEvs(prev => prev.filter(e => e.id !== id));
    setMode(null);
  }

  // 日付セルをタップ → 娘の予定があればそちら優先、なければ追加モーダル
  function onDayTap(ds, daughter, husband) {
    if (daughter.length === 0 && husband.length === 1) {
      setSelHusband(husband[0]); setMode("hdetail");
    } else {
      openAdd(ds);
    }
  }

  // ===== ご主人詳細モーダル =====
  const husbandModal = mode === "hdetail" && selHusband && (
    <Overlay onClose={() => setMode(null)}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
        <div style={{ width:12, height:12, borderRadius:3, background: catColor(selHusband.category) }} />
        <div style={{ fontSize:17, fontWeight:700, color:"#333" }}>{selHusband.title}</div>
      </div>
      <div style={{ fontSize:12, color:"#aaa", marginBottom:4 }}>{catLabel(selHusband.category)}</div>
      {selHusband.timeFrom && <div style={{ fontSize:13, color:"#888" }}>⏰ {selHusband.timeFrom}{selHusband.timeTo?`〜${selHusband.timeTo}`:""}</div>}
      {selHusband.location && <div style={{ fontSize:13, color:"#888" }}>📍 {selHusband.location}</div>}
      {selHusband.memo && <div style={{ fontSize:13, color:"#888", marginTop:4 }}>📝 {selHusband.memo}</div>}
      <button onClick={() => deleteHusband(selHusband.id)} style={{ marginTop:16, width:"100%", padding:"12px 0", borderRadius:12, border:"none", background:"#ffebee", color:"#c62828", fontWeight:700, fontSize:14, cursor:"pointer" }}>🗑 削除</button>
      <CloseBtn onClose={() => setMode(null)} />
    </Overlay>
  );

  // ===== 追加モーダル =====
  const addModal = mode === "add" && (
    <Overlay onClose={() => setMode(null)} scroll>
      {/* ヘッダー：日付表示 */}
      <div style={{ fontSize:15, fontWeight:700, color:"#333", marginBottom:16 }}>
        📝 {form.date ? form.date.slice(5).replace("-","/") + " の予定を追加" : "予定を追加"}
      </div>

      {/* カテゴリ */}
      <div style={{ display:"flex", gap:12, marginBottom:20 }}>
        {CATEGORIES.map(c => (
          <button key={c.value} onClick={() => setForm(f=>({...f,category:c.value}))} style={{
            flex:1, padding:"18px 0", borderRadius:14, border:"none", fontSize:15, cursor:"pointer",
            background: form.category===c.value ? c.color : "#f0f0f0",
            color: form.category===c.value ? "#fff" : "#888",
            fontWeight: form.category===c.value ? 700 : 400,
            boxShadow: form.category===c.value ? "0 3px 10px rgba(0,0,0,0.15)" : "none",
            transition:"all 0.15s",
          }}>{c.label}</button>
        ))}
      </div>

      <Label>メモ</Label>
      <textarea value={form.memo} onChange={e=>setForm(f=>({...f,memo:e.target.value}))} rows={2}
        placeholder="自由記入" style={{ width:"100%", padding:"12px 14px", borderRadius:10, border:"2px solid #e0e0e0", fontSize:15, resize:"none", boxSizing:"border-box", marginBottom:20, background:"#fff", color:"#222", fontFamily:"inherit", outline:"none" }} />

      <button onClick={saveHusband} disabled={!form.date} style={{
        width:"100%", padding:"14px 0", borderRadius:12, border:"none",
        background:(!form.date)?"#ccc":"#e84040",
        color:"#fff", fontWeight:700, fontSize:16, cursor:(!form.date)?"default":"pointer"
      }}>追加する</button>
      <CloseBtn onClose={() => setMode(null)} label="キャンセル" />
    </Overlay>
  );

  const monthDaughterEvs = DAUGHTER_EVENTS.filter(e=>e.date.startsWith(mmStr));
  const monthHusbandEvs  = husbandEvs.filter(e=>e.date.startsWith(mmStr));

  return (
    <div style={{ fontFamily:"'Hiragino Sans','Noto Sans JP',sans-serif", minHeight:"100vh", background:"#f8f8f8", paddingBottom:80 }}>
      {husbandModal}{addModal}

      {/* ヘッダー */}
      <div style={{ background:"linear-gradient(135deg,#e84040,#ff6060)", color:"#fff", padding:"16px 16px 12px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <button onClick={() => setMonthIdx(i=>Math.max(0,i-1))} style={{ background:"rgba(255,255,255,0.25)", border:"none", color:"#fff", width:32, height:32, borderRadius:"50%", fontSize:18, cursor:"pointer" }}>‹</button>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:20, fontWeight:700 }}>{year}年{month}月</div>
          <div style={{ fontSize:11, opacity:0.85, marginTop:2 }}>🎀 娘の送迎スケジュール</div>
        </div>
        <button onClick={() => setMonthIdx(i=>Math.min(MONTHS.length-1,i+1))} style={{ background:"rgba(255,255,255,0.25)", border:"none", color:"#fff", width:32, height:32, borderRadius:"50%", fontSize:18, cursor:"pointer" }}>›</button>
      </div>

      {/* 曜日ヘッダー（日曜始まり） */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", background:"#fff", borderBottom:"1px solid #eee" }}>
        {DOW.map(d => (
          <div key={d} style={{ textAlign:"center", padding:"8px 0", fontSize:12, fontWeight:600, color: d==="日"?"#FF4444":d==="土"?"#2196F3":"#555" }}>{d}</div>
        ))}
      </div>

      {/* カレンダーグリッド */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", background:"#fff" }}>
        {cells.map((day, i) => {
          const ds = day ? toDateStr(year, month, day) : null;
          const { daughter, husband } = ds ? eventsForDate(ds) : { daughter:[], husband:[] };
          const today = ds === "2026-05-20";
          const hasEv = daughter.length > 0 || husband.length > 0;

          return (
            <div key={i} onClick={() => day && onDayTap(ds, daughter, husband)} style={{
              height:90, overflow:"hidden",
              borderRight:(i+1)%7===0?"none":"1px solid #f0f0f0",
              borderBottom:"1px solid #f0f0f0",
              padding:"4px 2px 2px",
              background: !day ? "#fafafa" : "#fff",
              cursor: day ? "pointer" : "default",
              position:"relative",
            }}>
              {day && (
                <>
                  <div style={{ width:22, height:22, borderRadius:"50%", background:today?"#e84040":"transparent", color:today?"#fff":dowColor(year,month,day), fontSize:12, fontWeight:today?700:400, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 2px" }}>{day}</div>

                  {daughter.map(ev => (
                    <div key={ev.id} style={{ background:"#e84040", color:"#fff", fontSize:9, fontWeight:600, borderRadius:4, padding:"2px 3px", marginBottom:2, overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis", lineHeight:1.3 }}>
                      {ev.title}
                    </div>
                  ))}
                  {husband.map(ev => (
                    <div key={ev.id} style={{ background: catColor(ev.category), color:"#fff", fontSize:9, fontWeight:600, borderRadius:4, padding:"2px 3px", marginBottom:2, overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis", lineHeight:1.3 }}>
                      {ev.title}
                    </div>
                  ))}

                  {/* 予定なし → ＋ヒント */}
                  {!hasEv && (
                    <div style={{ textAlign:"center", fontSize:14, color:"#e0e0e0", marginTop:4 }}>＋</div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* FAB */}
      <button onClick={() => openAdd()} style={{
        position:"fixed", bottom:24, right:20, width:56, height:56, borderRadius:"50%",
        background:"linear-gradient(135deg,#e84040,#ff7043)", color:"#fff", fontSize:28,
        border:"none", boxShadow:"0 4px 16px rgba(232,64,64,0.45)", cursor:"pointer",
        display:"flex", alignItems:"center", justifyContent:"center", zIndex:50,
      }}>＋</button>
    </div>
  );
}

// ===== 共通コンポーネント =====
function Overlay({ children, onClose, scroll }) {
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:200, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:"#ffffff", borderRadius:"20px 20px 0 0", padding:"20px 18px 40px", boxShadow:"0 -4px 30px rgba(0,0,0,0.12)",
        width:"100%", maxWidth:480,
        maxHeight: scroll ? "90vh" : "auto",
        overflowY: scroll ? "auto" : "visible",
      }}>
        <div style={{ width:40, height:4, background:"#ddd", borderRadius:2, margin:"0 auto 16px" }} />
        {children}
      </div>
    </div>
  );
}

function CloseBtn({ onClose, label="閉じる" }) {
  return (
    <button onClick={onClose} style={{ marginTop:8, width:"100%", padding:"12px 0", borderRadius:12, border:"none", background:"#f5f5f5", color:"#888", fontSize:14, cursor:"pointer" }}>{label}</button>
  );
}

function Label({ children, req }) {
  return <div style={{ fontSize:12, color:"#888", marginBottom:4, fontWeight:600 }}>{children}{req && <span style={{ color:"#e84040" }}> *</span>}</div>;
}

function Input({ value, onChange, placeholder, type="text" }) {
  return (
    <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
      style={{
        width:"100%", padding:"12px 14px", borderRadius:10,
        border:"2px solid #e0e0e0", fontSize:15, boxSizing:"border-box", marginBottom:12,
        background:"#fff", color:"#222", outline:"none",
        WebkitAppearance:"none", appearance:"none",
        fontFamily:"inherit",
      }} />
  );
}

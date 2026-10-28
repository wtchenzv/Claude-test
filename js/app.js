(function(){
  /* ---------- helpers ---------- */
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var LV = {go:'必去',pri:'優先安排',need:'必要',flex:'彈性',later:'有時間再去',tbd:'待安排'};
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}

  /* ---------- countdown ---------- */
  var target = new Date('2026-12-10T08:30:00+08:00').getTime();
  var end = new Date('2026-12-14T23:59:00+09:00').getTime();
  function pad(n){return n<10?'0'+n:''+n}
  function tick(){
    var now = Date.now(), diff = target - now;
    var d=document.getElementById('cd-d'),h=document.getElementById('cd-h'),m=document.getElementById('cd-m'),s=document.getElementById('cd-s'),note=document.getElementById('cd-note');
    if(diff<=0){
      d.textContent=h.textContent=m.textContent=s.textContent='0';
      note.textContent = now>end ? '旅程結束，歡迎回家。' : '旅程進行中，玩得開心！';
      return;
    }
    var sec=Math.floor(diff/1000);
    d.textContent=Math.floor(sec/86400);
    h.textContent=pad(Math.floor(sec%86400/3600));
    m.textContent=pad(Math.floor(sec%3600/60));
    s.textContent=pad(sec%60);
  }
  tick(); setInterval(tick,1000);

  /* ---------- day illustrations ---------- */
  var ART = {
    1:'<svg viewBox="0 0 80 80" aria-hidden="true"><g class="sway"><path d="M40 16 L54 38 H26Z" fill="#B9DAA5" stroke="#3E3A39" stroke-width="3" stroke-linejoin="round"/><path d="M40 28 L58 54 H22Z" fill="#B9DAA5" stroke="#3E3A39" stroke-width="3" stroke-linejoin="round"/><rect x="36" y="54" width="8" height="10" fill="#F2A497" stroke="#3E3A39" stroke-width="3"/><path class="tw fb" d="M40 4 L43 12 L51 12 L45 17 L47 25 L40 20 L33 25 L35 17 L29 12 L37 12Z" fill="#F6D27A" stroke="#3E3A39" stroke-width="2.5" stroke-linejoin="round"/></g><circle class="tw2 fb" cx="34" cy="44" r="3" fill="#F2A497"/><circle class="tw fb" cx="47" cy="50" r="3" fill="#F6D27A"/></svg>',
    2:'<svg viewBox="0 0 80 80" aria-hidden="true"><rect x="14" y="40" width="52" height="30" rx="4" fill="#fff" stroke="#3E3A39" stroke-width="3"/><rect x="8" y="26" width="16" height="44" rx="3" fill="#A8D3E6" stroke="#3E3A39" stroke-width="3"/><rect x="56" y="26" width="16" height="44" rx="3" fill="#A8D3E6" stroke="#3E3A39" stroke-width="3"/><path d="M5 26 L16 8 L27 26Z" fill="#F2A497" stroke="#3E3A39" stroke-width="3" stroke-linejoin="round"/><path d="M53 26 L64 8 L75 26Z" fill="#F2A497" stroke="#3E3A39" stroke-width="3" stroke-linejoin="round"/><path d="M30 40 L40 20 L50 40Z" fill="#F6D27A" stroke="#3E3A39" stroke-width="3" stroke-linejoin="round"/><path d="M34 70 V56 Q40 48 46 56 V70Z" fill="#F6D27A" stroke="#3E3A39" stroke-width="3" stroke-linejoin="round"/><g class="bobx"><ellipse cx="40" cy="8" rx="6" ry="7" fill="#F2A497" stroke="#3E3A39" stroke-width="2.5"/></g></svg>',
    3:'<svg viewBox="0 0 80 80" aria-hidden="true"><rect x="14" y="10" width="52" height="62" rx="8" fill="#F2A497" stroke="#3E3A39" stroke-width="3"/><rect x="20" y="18" width="40" height="30" rx="5" fill="#E6F3F9" stroke="#3E3A39" stroke-width="3"/><g class="bobx"><path d="M40 18 V30 M34 30 H46 M34 30 L32 38 M46 30 L48 38" fill="none" stroke="#3E3A39" stroke-width="3" stroke-linecap="round"/></g><circle cx="30" cy="42" r="5" fill="#F6D27A" stroke="#3E3A39" stroke-width="2.5"/><circle cx="46" cy="42" r="5" fill="#B9DAA5" stroke="#3E3A39" stroke-width="2.5"/><rect x="20" y="54" width="40" height="10" rx="4" fill="#fff" stroke="#3E3A39" stroke-width="3"/><circle class="tw fb" cx="30" cy="59" r="2.5" fill="#F6D27A"/><circle class="tw2 fb" cx="40" cy="59" r="2.5" fill="#A8D3E6"/></svg>',
    4:'<svg viewBox="0 0 80 80" aria-hidden="true"><path d="M14 8 L30 40 H6Z" fill="#F6D27A" stroke="#3E3A39" stroke-width="3" stroke-linejoin="round" class="tw fb"/><path d="M66 8 L74 40 H50Z" fill="#A8D3E6" stroke="#3E3A39" stroke-width="3" stroke-linejoin="round" class="tw2 fb"/><path d="M6 72 V52 Q40 36 74 52 V72Z" fill="#fff" stroke="#3E3A39" stroke-width="3" stroke-linejoin="round"/><path d="M6 60 H74" stroke="#3E3A39" stroke-width="3"/><g class="bobx"><path d="M40 38 L43 46 L51 46 L45 51 L47 58 L40 54 L33 58 L35 51 L29 46 L37 46Z" fill="#F2A497" stroke="#3E3A39" stroke-width="2.5" stroke-linejoin="round"/></g></svg>',
    5:'<svg viewBox="0 0 80 80" aria-hidden="true"><g class="bobx"><path d="M6 44 Q4 34 16 34 L58 34 Q74 34 76 44 Q74 54 58 54 L16 54 Q4 54 6 44Z" fill="#fff" stroke="#3E3A39" stroke-width="3" stroke-linejoin="round"/><path d="M16 34 L8 14 L24 14 L32 34Z" fill="#F2A497" stroke="#3E3A39" stroke-width="3" stroke-linejoin="round"/><path d="M48 52 L60 74 L72 74 L64 52Z" fill="#A8D3E6" stroke="#3E3A39" stroke-width="3" stroke-linejoin="round"/><circle cx="52" cy="44" r="3" fill="#3E3A39"/><circle cx="40" cy="44" r="3" fill="#3E3A39"/><circle cx="28" cy="44" r="3" fill="#3E3A39"/></g></svg>'
  };

  /* ---------- day data ---------- */
  function T(k,s){return [k,s]}
  var DAYS = [
   {n:1,date:'12/10',wk:'四',title:'抵達東京＋丸之內聖誕燈飾',focus:'抵達東京、前往住宿區、參觀丸之內聖誕活動。第一天不排太滿。',
    rows:[
     ['08:30 左右','台北桃園機場出發',[T('air','長榮 BR198')],'need'],
     ['12:30 左右（待確認）','抵達東京成田機場',[T('air','飛機')],'need'],
     ['12:30–14:30（暫估）','入境、領行李、購買交通或網路用品',[T('walk','機場步行')],'need'],
     ['14:30–16:00（暫估）','成田機場 → 錦糸町住宿處',[T('jr','JR'),T('rail','或其他合適鐵路')],'need','依住宿位置與行李狀況選擇路線。'],
     ['16:00–17:00（暫估）','寄放行李、入住或稍作休息',[T('walk','步行')],'need'],
     ['17:00–20:00（暫定）','丸之內聖誕燈飾、丸之內 × Harry Potter 聖誕活動、東京車站周邊',[T('jr','JR 錦糸町→東京站'),T('walk','步行')],'pri'],
     ['20:00 後','晚餐、返回住宿',[T('walk','步行'),T('jr','JR')],'flex']
    ],
    notes:['實際能否順利參觀，取決於入境時間、行李與入住時間。','航班延誤或疲累時，可縮短燈飾行程。'],
    ask:['航班實際起降時間','住宿入住時間與寄放行李','丸之內 × Harry Potter 活動日期與點燈時間']},
   {n:2,date:'12/11',wk:'五',title:'東京迪士尼樂園',focus:'全天遊玩，當天以迪士尼為主，不另外排其他市區景點。',
    rows:[
     ['07:00 左右','從錦糸町出發',[T('jr','JR／轉乘依當日確認')],'need'],
     ['08:00 前後','抵達東京迪士尼樂園周邊',[T('rail','鐵路'),T('walk','步行')],'need','依實際班次調整。'],
     ['開園至傍晚','東京迪士尼樂園遊玩、設施及園區活動',[T('walk','園內步行')],'go'],
     ['晚間','夜間遊行或燈光演出',[T('walk','園內步行')],'pri'],
     ['演出結束後','返回錦糸町',[T('rail','鐵路轉乘')],'need']
    ],
    notes:['研究 Disney Premier Access 等付費設施優先體驗方案。','若不想提早排隊卡位，研究夜間遊行是否有付費觀賞區、適用規則及價格。','付費方案、遊行內容與開放時間，都以官方當日資訊為準。'],
    ask:['當日門票、入園時間與營運公告','Premier Access 方案內容與價格','夜間遊行時間與付費觀賞區']},
   {n:3,date:'12/12',wk:'六',title:'GiGO 秋葉原＋Music Bank',focus:'上午尋找 TWICE 周邊，下午與晚上參加 Music Bank。',
    rows:[
     ['09:00 左右','從錦糸町前往秋葉原',[T('jr','JR')],'pri'],
     ['09:30–11:30（暫定）','GiGO 秋葉原 2、3、5 號館：尋找 TWICE LOVELYS 周邊與夾娃娃機',[T('walk','秋葉原站周邊步行')],'pri'],
     ['11:30–12:30','午餐',[T('walk','秋葉原附近步行')],'need'],
     ['12:30–14:00（暫估）','前往新國立競技場周邊',[T('jr','JR／地鐵'),T('walk','步行')],'need','依實際路線搭乘。'],
     ['14:00–15:00','抵達場館、確認入口及排隊',[T('walk','步行')],'need'],
     ['15:00 起','Music Bank 入場',[T('walk','場館內')],'go'],
     ['17:00–21:00（預估）','Music Bank 演出（新國立競技場）',[T('walk','場館內')],'go'],
     ['21:00 後','散場、返回錦糸町',[T('rail','鐵路（依人潮選擇路線）')],'need']
    ],
    notes:['GiGO 秋葉原 2、3、5 號館是優先尋找地點，但不代表 12 月一定有 TWICE 商品。','過去曾有的 LOVELYS 獎品活動，不等於 2026 年 12 月仍有同樣商品。','夾娃娃時間若拖長，以準時抵達場館為優先。'],
    ask:['2026/12 官方 TWICE LOVELYS 獎品活動、店舖名單與現場庫存','Music Bank 正式入場時間、入口、座位區','交通管制與散場路線']},
   {n:4,date:'12/13',wk:'日',title:'上野聖誕市集＋Music Bank',focus:'視時間參觀上野聖誕市集，再次參加 Music Bank。',
    rows:[
     ['09:00 左右','從錦糸町前往上野',[T('jr','JR（依當日路線確認）')],'flex'],
     ['09:30–11:00（暫定）','上野公園聖誕市集',[T('walk','步行')],'later','cancel'],
     ['11:00–12:00','午餐',[T('walk','上野周邊步行')],'need'],
     ['12:00–14:00（暫估）','前往新國立競技場周邊',[T('rail','鐵路轉乘'),T('walk','步行')],'need'],
     ['14:00–15:00','場館周邊集合、排隊及入場準備',[T('walk','步行')],'need'],
     ['15:00 起','Music Bank 入場',[T('walk','場館內')],'go'],
     ['17:00–21:00（預估）','Music Bank 演出（新國立競技場）',[T('walk','場館內')],'go'],
     ['21:00 後','返回錦糸町住宿',[T('rail','鐵路')],'need']
    ],
    notes:['Music Bank 是當天最重要的固定行程。','市集開放較晚、交通不順或需要提早排隊時，直接前往場館，不要為市集壓縮準備時間。'],
    ask:['上野公園聖誕市集日期與營業時間','Music Bank 入場資訊與禁止攜帶物品']},
   {n:5,date:'12/14',wk:'一',title:'退房＋返回台灣',focus:'順利前往成田機場搭機返台，不安排需要停留的景點。',
    rows:[
     ['07:00–08:00（暫定）','起床、整理行李、退房',[T('walk','住宿處')],'need'],
     ['08:00–09:00（暫估）','錦糸町前往成田機場',[T('jr','JR'),T('rail','或其他合適鐵路')],'need'],
     ['09:00–10:00（目標）','抵達機場、確認航廈及報到櫃檯',[T('walk','步行')],'need'],
     ['起飛前','報到、託運、安檢、出境',[T('walk','機場')],'need'],
     ['13:00–13:30（暫定）','BR183 起飛 成田 → 桃園',[T('air','長榮 BR183')],'need'],
     ['16:05–16:50（暫定）','抵達台灣桃園機場',[T('air','飛機')],'need']
    ],
    notes:['以上是保守的暫定安排，實際出發時間依機票、鐵路班次與行李狀況調整。','不建議當天安排 Skytree 或其他需要停留的景點。'],
    ask:['BR183 實際起飛時間與航廈','報到櫃檯、行李額度','錦糸町到成田的路線與班次']}
  ];

  var tabs=document.getElementById('tabs'), panel=document.getElementById('panel'), cur=0;
  var WK=''; 
  DAYS.forEach(function(d,i){
    var b=document.createElement('button');
    b.type='button'; b.className='tab'; b.setAttribute('role','tab'); b.id='tab'+i;
    b.setAttribute('aria-controls','panel');
    b.innerHTML='<small>Day '+d.n+'</small><b>'+d.date+'</b><small>（'+d.wk+'）</small>';
    b.addEventListener('click',function(){show(i,true)});
    b.addEventListener('keydown',function(e){
      var k=e.key, n=null;
      if(k==='ArrowRight')n=(i+1)%DAYS.length;
      if(k==='ArrowLeft')n=(i+DAYS.length-1)%DAYS.length;
      if(n!==null){e.preventDefault();show(n,true);document.getElementById('tab'+n).focus()}
    });
    tabs.appendChild(b);
  });

  function show(i,animate){
    cur=i; var d=DAYS[i];
    Array.prototype.forEach.call(tabs.children,function(b,j){
      b.setAttribute('aria-selected',j===i?'true':'false');
      b.tabIndex=j===i?0:-1;
    });
    panel.setAttribute('aria-labelledby','tab'+i);
    var h='<div class="day-head">'+ART[d.n]+'<div><span class="dayno">Day '+d.n+' · '+d.date+'（'+d.wk+'）</span><h3>'+esc(d.title)+'</h3><p>'+esc(d.focus)+'</p></div></div>';
    h+='<ol class="tl">';
    d.rows.forEach(function(r,k){
      var tags=r[2].map(function(t){return '<span class="tg tg-'+t[0]+'">'+esc(t[1])+'</span>'}).join('');
      var lv=r[3];
      var cancel=(r[4]==='cancel');
      var note=(r[4]&&!cancel)?'<div class="note">'+esc(r[4])+'</div>':'';
      h+='<li class="li-'+lv+'" style="animation-delay:'+(k*0.05)+'s"><div class="card"><div class="time">'+esc(r[0])+'</div><div class="place">'+esc(r[1])+'</div><div class="meta">'+tags+(cancel?'<span class="cancel">可取消</span>':'')+'<span class="lv lv-'+lv+'">'+LV[lv]+'</span></div>'+note+'</div></li>';
    });
    h+='</ol>';
    h+='<div class="sidebox hint"><h4>🌟 小提醒</h4><ul>'+d.notes.map(function(n){return '<li>'+esc(n)+'</li>'}).join('')+'</ul></div>';
    h+='<div class="sidebox ask"><h4>📝 出發前待確認</h4><ul>'+d.ask.map(function(n){return '<li>'+esc(n)+'</li>'}).join('')+'</ul></div>';
    panel.innerHTML=h;
    if(animate && !reduce){
      panel.classList.remove('panel'); void panel.offsetWidth; panel.classList.add('panel');
    }
  }
  show(0,false);

  /* ---------- todo ---------- */
  var TODO=[
   ['✈️ A. 航班與住宿',['確認 BR198、BR183 的實際起降時間','確認航廈、行李額度及報到規定','確認住宿名稱、地址、入住及退房時間','確認住宿是否可以提前寄放行李','查好錦糸町往返成田機場的交通路線與班次','下載離線地圖並保存住宿地址']],
   ['🏰 B. 東京迪士尼',['購買或確認 12/11 東京迪士尼樂園門票','確認開園時間與當日營運公告','研究 Disney Premier Access 等付費優先體驗方案','確認夜間遊行的舉行時間及是否有付費觀賞區','預先規劃必玩的設施與用餐安排']],
   ['🎤 C. Music Bank',['確認 12/12、12/13 的門票及電子票券','確認正式入場時間、演出開始時間及預估結束時間','確認新國立競技場的入口、座位區與交通方式','確認禁止攜帶的物品、行李尺寸與應援物規定','預先安排散場後返回錦糸町的路線','準備行動電源、票券截圖及必要應援用品']],
   ['🎄 D. 聖誕活動',['確認丸之內 × Harry Potter 活動日期及點燈時間','確認東京 Skytree 聖誕市集的日期及營業時間','確認上野公園聖誕市集的日期及營業時間','依天氣與演出安排決定是否保留上野市集','查詢當地天氣、降雨及低溫狀況']],
   ['🧸 E. TWICE 周邊／GiGO',['查詢 2026 年 12 月官方 TWICE LOVELYS 獎品活動','確認秋葉原 GiGO 各分館是否有目標商品','確認獎品機台位置、活動期間及庫存資訊','預留夾娃娃機預算，避免影響其他旅費']],
   ['🎒 F. 旅遊基本準備',['確認護照效期','依當時入境規定完成入境資料準備（例如 Visit Japan Web）','準備 eSIM、SIM 卡或漫遊方案','確認信用卡、交通 IC 卡及日圓現金','購買旅遊平安險及旅遊不便險（依需求）','下載交通、翻譯及支付相關 App','準備常用藥品、保暖衣物及舒適好走的鞋','將航班、住宿、門票與重要地址截圖備份']]
  ];
  var KEY='tokyo2026-todo-v1', state={};
  try{ state=JSON.parse(localStorage.getItem(KEY)||'{}')||{}; }catch(e){ state={}; }
  function save(){ try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){} }
  var list=document.getElementById('todo-list'), total=0, uid=0;
  TODO.forEach(function(g){
    var wrap=document.createElement('div'); wrap.className='group';
    var h='<h3>'+esc(g[0])+'</h3>';
    g[1].forEach(function(t){
      var id='t'+(uid++); total++;
      h+='<label class="chk"><input type="checkbox" data-id="'+id+'"'+(state[id]?' checked':'')+'><span>'+esc(t)+'</span></label>';
    });
    wrap.innerHTML=h; list.appendChild(wrap);
  });
  function prog(){
    var done=0; Object.keys(state).forEach(function(k){ if(state[k]) done++; });
    document.getElementById('bar').style.width=(total?done/total*100:0)+'%';
    document.getElementById('prog-t').textContent=done+' / '+total+' 完成';
  }
  list.addEventListener('change',function(e){
    var el=e.target; if(el.type!=='checkbox')return;
    state[el.getAttribute('data-id')]=el.checked; save(); prog();
  });
  document.getElementById('reset').addEventListener('click',function(){
    state={}; save();
    Array.prototype.forEach.call(list.querySelectorAll('input'),function(i){i.checked=false});
    prog();
  });
  prog();

  /* ---------- nav highlight ---------- */
  var links=Array.prototype.slice.call(document.querySelectorAll('#links a'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(en){
        if(en.isIntersecting){
          links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+en.target.id)});
          var on=document.querySelector('#links a.on');
          if(on&&on.scrollIntoView){ try{on.scrollIntoView({block:'nearest',inline:'center',behavior:reduce?'auto':'smooth'})}catch(e){} }
        }
      });
    },{rootMargin:'-35% 0px -55% 0px'});
    ['home','flight','days','xmas','todo','stay'].forEach(function(id){io.observe(document.getElementById(id))});
  }
})();

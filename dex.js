#!/usr/bin/env node

const [B,M,R]=[{cat:'root',weight:3,origin:'gk'},new Map(),/([^|]+)\|([^|]+)\|([^|]+)(?:\|(.+))?/]
'bio|baɪoʊ|life|w:5 geo|dʒioʊ|earth|w:5 photo|foʊtoʊ|light|w:4 chrono|krɑnoʊ|time|w:4 thermo|θɜrmoʊ|heat hydro|haɪdroʊ|water psycho|saɪkoʊ|mind|w:4 neuro|nʊroʊ|nerve micro|maɪkroʊ|small macro|mækroʊ|large tele|tɛli|far|c:prefix,w:2 auto|ɔtoʊ|self|c:prefix hetero|hɛtəroʊ|other|c:prefix,w:2 homo|hoʊmoʊ|same|c:prefix,w:2 anti|ænti|against|c:prefix,w:4,o:lat trans|trænz|across|c:prefix,w:4,o:lat inter|ɪntɜr|between|c:prefix,o:lat intra|ɪntrə|within|c:prefix,w:2,o:lat extra|ɛkstrə|beyond|c:prefix,w:2,o:lat ultra|ʌltrə|extreme|c:prefix,w:2,o:lat super|supɜr|above|c:prefix,o:lat sub|sʌb|under|c:prefix,o:lat pre|pri|before|c:prefix,w:2,o:lat post|poʊst|after|c:prefix,w:2,o:lat pro|proʊ|forward|c:prefix,w:2,o:lat retro|rɛtroʊ|backward|c:prefix,w:2,o:lat syn|sɪn|together|c:prefix,w:2 co|koʊ|with|c:prefix,w:2,o:lat con|kɑn|with|c:prefix,w:2,o:lat de|di|down|c:prefix,w:2,o:lat dis|dɪs|apart|c:prefix,w:2,o:lat ex|ɛks|out|c:prefix,w:2,o:lat re|ri|again|c:prefix,w:2,o:lat in|ɪn|in|c:prefix,w:2,o:lat un|ʌn|not|c:prefix,w:2,o:english graph|græf|write|o:gk gram|græm|write|o:gk scrib|skrɪb|write|o:lat script|skrɪpt|write|o:lat log|lɑg|speak|o:gk logue|lɔg|speak|o:gk phone|foʊn|sound|o:gk phon|fɑn|sound|o:gk voc|voʊk|voice|o:lat vid|vɪd|see|o:lat vis|vɪz|see|o:lat spec|spɛk|look|o:lat scope|skoʊp|view|o:gk path|pæθ|feeling|o:gk morph|mɔrf|form|o:gk form|fɔrm|shape|o:lat struct|strʌkt|build|o:lat fac|fæk|make|o:lat gen|dʒɛn|produce|o:gk meter|mitɜr|measure|o:gk metr|mɛtr|measure|o:gk crat|kræt|rule|o:gk arch|ɑrk|rule|o:gk nom|nɑm|law|o:gk leg|lɛg|law|o:lat jur|dʒʊr|law|o:lat theo|θioʊ|god|o:gk anthrop|ænθrɑp|human|o:gk zoo|zuː|animal|o:gk phyt|faɪt|plant|o:gk derm|dɜrm|skin|o:gk cardi|kɑrdi|heart|o:gk pneum|nuːm|lung|o:gk gastr|gæstr|stomach|o:gk hepat|hɛpət|liver|o:gk nephr|nɛfr|kidney|o:gk oste|ɑsti|bone|o:gk arthr|ɑrθr|joint|o:gk ology|ɑlədʒi|study|c:suffix,w:4 ist|ɪst|person|c:suffix,w:3 ism|ɪzəm|doctrine|c:suffix,w:3 tion|ʃən|action|c:suffix,w:3,o:lat sion|ʒən|action|c:suffix,w:2,o:lat ment|mənt|result|c:suffix,w:2,o:lat ness|nɪs|state|c:suffix,w:2,o:english ity|əti|quality|c:suffix,w:3,o:lat able|əbəl|capable|c:suffix,w:2,o:lat ible|əbəl|capable|c:suffix,w:2,o:lat al|əl|related|c:suffix,w:2,o:lat ic|ɪk|related|c:suffix,w:3 ous|əs|full_of|c:suffix,w:2,o:lat ive|ɪv|tendency|c:suffix,w:2,o:lat ize|aɪz|make|c:suffix,w:2 ate|eɪt|make|c:suffix,w:2,o:lat fy|faɪ|make|c:suffix,w:2,o:lat'.split(' ').map(x=>{let[_,f,i,g,o]=x.match(R),d={...B,form:f,ipa:i,gloss:g};o?.split(',').map(kv=>{let[k,v]=kv.split(':');d[{c:'cat',w:'weight',o:'origin'}[k]||k]=+v||v});M.set(f,d)})

const F={
  p:[0,0,0,0,'lab','stop'],t:[0,0,0,0,'alv','stop'],k:[0,0,0,0,'vel','stop'],
  b:[1,0,0,0,'lab','stop'],d:[1,0,0,0,'alv','stop'],g:[1,0,0,0,'vel','stop'],
  f:[0,1,0,0,'lab','fric'],s:[0,1,0,0,'alv','fric'],x:[0,1,0,0,'vel','fric'],
  v:[1,1,0,0,'lab','fric'],z:[1,1,0,0,'alv','fric'],h:[1,1,0,0,'glo','fric'],
  m:[1,0,1,1,'lab','nas'],n:[1,0,1,1,'alv','nas'],ŋ:[1,0,1,1,'vel','nas'],
  l:[1,1,1,0,'alv','lat'],r:[1,1,1,0,'alv','app'],w:[1,1,1,0,'lab','app'],j:[1,1,1,0,'pal','app']
}

const SON={stop:0,fric:1,nas:2,lat:3,app:3,gli:4}

const P={
  s:{o:'p|t|k|m|n|l',n:'i|e|a|o|u',c:'p|t|k|m|n',son:1,ass:0,ton:0},
  c:{o:'p|t|k|b|d|g|m|n|f|s|h|l|r|w|j|pr|tr|kr|br|pl|kl|bl|fl|sm|sn|sp|st|sk|str|spr',n:'i|ɪ|e|ɛ|æ|ə|ʌ|ɑ|ɔ|ʊ|u|oʊ|aɪ|aʊ|ɔɪ|eɪ',c:'p|t|k|m|n|ŋ|f|s|z|l|r|mp|nt|ŋk|ft|st|kt',son:2,ass:1,ton:0},
  f:{o:'m|n|l|r|w|j',n:'i|e|ə|a|o|u',c:'m|n|l|r',son:1,ass:0,ton:0},
  h:{o:'p|t|k|q|ʔ|s|x|ts|tʃ|kx',n:'ɨ|ɯ|ɤ|ʌ|ə|ɑ',c:'p|t|k|q|ʔ|s|x|ts',son:1,ass:0,ton:0},
  t:{o:'p|t|k|m|n',n:'i|e|a|o|u',c:'p|t|k|m|n',son:1,ass:0,ton:1,t:['˥','˧˥','˨˩','˥˩']}
}

const $=a=>a[~~(Math.random()*a.length)]
const W=(a,wf)=>{let s=a.reduce((x,i)=>x+wf(i),0),r=Math.random()*s;for(let i of a)if((r-=wf(i))<=0)return i;return a[0]}

const assim=(c1,c2,type)=>{
  if(!F[c1]||!F[c2])return c1+c2
  let[v1,_,__,___,p1,m1]=F[c1],[v2,____,_____,______,p2,m2]=F[c2]
  if(type&1&&m1=='stop'&&m2=='stop')c1=Object.keys(F).find(k=>F[k][0]==v2&&F[k][4]==p1&&F[k][5]==m1)||c1
  if(type&2&&m1=='nas')c1=Object.keys(F).find(k=>F[k][4]==p2&&F[k][5]=='nas')||c1
  return c1+c2
}

const drift=(w,rules)=>{
  rules.forEach(r=>{
    if(r.t=='len')w=w.replace(/([ptk])([aeiou])/g,(_,c,v)=>({'p':'b','t':'d','k':'g'}[c]||c)+v)
    if(r.t=='fort')w=w.replace(/([bdg])$/g,(_,c)=>({'b':'p','d':'t','g':'k'}[c]||c))
    if(r.t=='pal')w=w.replace(/([tk])i/g,(_,c)=>({'t':'tʃ','k':'tʃ'}[c]||c)+'i')
    if(r.t=='vshift')w=w.replace(/[aeiou]/g,v=>({a:'ɑ',e:'i',i:'ɪ',o:'u',u:'ʊ'}[v]||v))
    if(r.t=='meta')w=w.replace(new RegExp(r.from,'g'),r.to)
  })
  return w
}

const slots=(ms)=>{
  let s=[[],[],[],[],[]],cats=['prefix','prefix','root','suffix','suffix']
  ms.forEach(m=>{
    let i=cats.dexOf(m.cat)
    if(i>=0&&s[i].length<1)s[i].push(m)
    else if(m.cat=='root')s[2].push(m)
  })
  return s.flat()
}

const allo=(m,ctx)=>{
  if(m.alt){
    let prev=ctx.prev?.slice(-1)
    if(prev=='n'&&m.alt.includes('an'))return 'an'
    if(['p','b','m'].includes(prev)&&m.alt.includes('im'))return 'im'
  }
  return m.form
}

const sem=(ms)=>{
  let feats=ms.map(m=>({
    lex:m.gloss,
    arg:m.arg||[],
    sel:m.sel||[],
    dom:m.domain||'concrete'
  }))
  for(let i=1;i<feats.length;i++){
    if(feats[i-1].arg.length&&feats[i].sel.length){
      let match=feats[i-1].arg.some(a=>feats[i].sel.includes(a))
      if(!match&&feats[i].sel.length>0)return null
    }
  }
  return feats.map(f=>f.lex).join('_')
}

const parse=t=>t.toLowerCase().match(/[a-z]+/g)?.map(w=>{
  let p=[],i=0
  while(i<w.length){
    let m=[...M.values()].filter(x=>w.slice(i).startsWith(x.form)).sort((a,b)=>b.form.length-a.form.length)[0]
    if(m){p.push(m);i+=m.form.length}else i++
  }
  return{w,p,c:p.map(x=>x.form).join('+')}
})||[]

const craft=(seeds,tpl,size,min,max,gen)=>{
  let ph=P[tpl]||P.s,[O,N,C,AS,TN]=[ph.o.split('|'),ph.n.split('|'),ph.c.split('|'),ph.ass,ph.ton],
      pool=[...M.values()].filter(x=>seeds.includes(x.form)||x.cat!='root'),
      lex=[],seen=new Set(),hist=[],
      
      syl=()=>{
        let o=$(O.filter(x=>!x.includes('|'))),v=$(N),c=Math.random()<.5?$(C.filter(x=>!x.includes('|'))):''
        let seq=o+(c?'_'+c:'')
        if(seq.includes('_')){
          let [c1,c2]=seq.split('_')
          if(SON[F[c1]?.[5]]>=SON[F[c2]?.[5]])return syl()
        }
        return AS?assim(o,v,AS):o+v+(c?assim(v,c,AS):c)
      },
      
      word=(ms)=>{
        let ctx={prev:'',next:''}
        return ms.map((m,i)=>{
          ctx.next=ms[i+1]?.form[0]||''
          let f=allo(m,ctx)
          ctx.prev=f
          return f
        }).join('')+Array(1+~~(Math.random()*2)).fill(0).map(syl).join('')+(TN?$(ph.t):'')
      }
  
  while(lex.length<size){
    let nm=min+~~(Math.random()*(max-min+1)),
        ms=slots(Array(nm).fill(0).map(()=>W(pool,x=>x.weight))),
        g=sem(ms)
    
    if(!g)continue
    
    let l=word(ms)
    if(seen.has(l))continue
    seen.add(l)
    
    lex.push({l,i:l,m:ms.map(x=>x.form),g,gen:0})
  }
  
  if(gen>0){
    let rules=[
      {t:'len',prob:.3},
      {t:'fort',prob:.2},
      {t:'pal',prob:.15},
      {t:'vshift',prob:.1}
    ]
    for(let g=1;g<=gen;g++){
      let active=rules.filter(r=>Math.random()<r.prob)
      hist.push({gen:g,rules:active})
      lex=lex.map(x=>({...x,l:drift(x.l,active),i:drift(x.i,active),gen:g}))
    }
  }
  
  return{lex,hist}
}

const fmt={
  json:d=>JSON.stringify(d,null,2),
  csv:d=>['lemma,ipa,morphemes,gloss,gen',...d.lex.map(x=>`${x.l},${x.i},"${x.m.join('-')}",${x.g},${x.gen}`)].join('\n'),
  md:d=>['# Lexicon','| lemma | morphemes | gloss | gen |','|---|---|---|---|',...d.lex.map(x=>`| ${x.l} | ${x.m.join('+')} | ${x.g} | ${x.gen} |`)].join('\n'),
  tbl:d=>[...d.lex.map(x=>`${x.l.padEnd(12)} ${x.i.padEnd(15)} ${x.m.join('-').padEnd(20)} ${x.g.padEnd(25)} [g${x.gen}]`),d.hist.length?'\nDrift:':'',...d.hist.map(h=>`Gen ${h.gen}: ${h.rules.map(r=>r.t).join(', ')}`)].join('\n')
}

const[_n,_f,cmd,...args]=process.argv

const cmds={
  parse:()=>{
    let text=args.join(' ')
    parse(text).forEach(({w,p,c})=>{
      console.log(`\n${w} → ${c}`)
      p.forEach(m=>console.log(`  ${m.form.padEnd(10)} ${m.ipa.padEnd(12)} ${m.gloss.padEnd(15)} [${m.cat}/${m.origin}]`))
    })
  },
  
  craft:()=>{
    let seeds=args[0]?.split(',')||['al','go','ion'],
        tpl=args[1]||'s',
        size=+args[2]||50,
        min=+args[3]||1,
        max=+args[4]||2,
        gen=+args[5]||0,
        out=args[6]||'tbl'
    
    console.log(`\nForging: seeds=${seeds.join(',')} phon=${tpl} size=${size} morph=${min}-${max} gen=${gen}\n`)
    let data=craft(seeds,tpl,size,min,max,gen)
    console.log(fmt[out](data))
  },
  
  list:()=>{
    console.log('\nAvailable morphemes:')
    let bycat={}
    M.forEach(m=>{
      bycat[m.cat]=bycat[m.cat]||[]
      bycat[m.cat].push(m)
    })
    Object.entries(bycat).forEach(([cat,ms])=>{
      console.log(`\n${cat.toUpperCase()} (${ms.length}):`)
      ms.slice(0,20).forEach(m=>console.log(`  ${m.form.padEnd(10)} ${m.gloss.padEnd(20)} [${m.origin}]`))
      if(ms.length>20)console.log(`  ... ${ms.length-20} more`)
    })
  },
  
  help:()=>console.log(`
Usage: node dex.js <command> [args]

Commands:
  parse <text>                                     Decompose words into morphemes
  craft <seeds> [phon] [size] [min] [max] [gen] [fmt]
                                                   Generate conlang lexicon
    seeds: comma-separated (bio,geo,chrono)
    phon:  s=simple c=complex f=soft h=harsh t=tonal (default: s)
    size:  lexicon entries (default: 50)
    min:   min morphemes per word (default: 1)
    max:   max morphemes per word (default: 2)
    gen:   generations of sound change (default: 0)
    fmt:   tbl|json|csv|md (default: tbl)
  
  list                                             Show available morphemes
  help                                             This message

Examples:
  node dex.js craft bio,geo,chrono c 100 1 3 5 md > lang.md
  node dex.js craft photo,thermo t 50 2 2 3 json
`)
}

;(cmds[cmd]||cmds.help)()
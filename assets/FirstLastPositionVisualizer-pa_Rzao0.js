import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{l as t}from"./vendor-icons-C3qM9Spt.js";import{m as n}from"./vendor-react-DQHF1KOs.js";import{A as r,E as i,i as a,l as o,t as s,w as c,x as l}from"./vendor-ui-yFFsSR_D.js";import{t as u}from"./index-BmsVf6Iy.js";import{n as d,t as f}from"./StepLabel-ClglrW6L.js";import{t as p}from"./SweepTrace-DuFI-hQM.js";var m=e(t(),1),h=n(),g=[5,7,7,8,8,10],_=8,v=[{label:`Find First (pass 1):`,text:`L=0, R=5. mid=2 (value 7). 7 < 8 → search right: L=3. L=3, R=5. mid=4 (value 8). 8===8 but check left: R=3. L=3, R=3. mid=3 (value 8). Found first = 3.`},{label:`Find Last (pass 2):`,text:`L=3, R=5. mid=4 (value 8). 8===8 but check right: L=5. L=5, R=5. mid=5 (value 10). 10 > 8 → R=4. L > R. Last = 4.`},{label:`Result:`,text:`First occurrence at index 3, last at index 4. Return [3, 4].`,isAction:!0}],y=`function searchRange(nums, target) {
    function findFirst() {
        let L = 0, R = nums.length - 1;
        let ans = -1;
        while (L <= R) {
            const mid = Math.floor((L + R) / 2);
            if (nums[mid] >= target) {
                R = mid - 1;
                if (nums[mid] === target) ans = mid;
            } else L = mid + 1;
        }
        return ans;
    }
    function findLast() {
        let L = 0, R = nums.length - 1;
        let ans = -1;
        while (L <= R) {
            const mid = Math.floor((L + R) / 2);
            if (nums[mid] <= target) {
                L = mid + 1;
                if (nums[mid] === target) ans = mid;
            } else R = mid - 1;
        }
        return ans;
    }
    return [findFirst(), findLast()];
}`,b=`function searchRange(nums, target) {
    let first = -1, last = -1;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) {
            if (first === -1) first = i;
            last = i;
        }
    }
    return [first, last];
}`,x=`function searchRange(nums, target) {
    function findFirst() {
        let L = 0, R = nums.length - 1, ans = -1;
        while (L <= R) {
            const mid = Math.floor((L + R) / 2);
            if (nums[mid] >= target) {
                R = mid - 1;
                if (nums[mid] === target) ans = mid;
            } else L = mid + 1;
        }
        return ans;
    }
    function findLast() {
        let L = 0, R = nums.length - 1, ans = -1;
        while (L <= R) {
            const mid = Math.floor((L + R) / 2);
            if (nums[mid] <= target) {
                L = mid + 1;
                if (nums[mid] === target) ans = mid;
            } else R = mid - 1;
        }
        return ans;
    }
    return [findFirst(), findLast()];
}`;function S(){let e=[],t=-1,n=-1,r=0,i=g.length-1;for(e.push({L:r,R:i,mid:-1,phase:`first`,first:t,last:n,explanation:`Phase 1: Find first occurrence of 8. L=0, R=5.`,activeLines:[3]});r<=i;){let a=Math.floor((r+i)/2);g[a]>=_?(g[a]===_&&(t=a),e.push({L:r,R:i,mid:a,phase:`first`,first:t,last:n,explanation:`nums[${a}]=${g[a]} >= ${_}. Possible first at ${t}. Search left: R=${a-1}`,activeLines:[6,7,8]}),i=a-1):(e.push({L:r,R:i,mid:a,phase:`first`,first:t,last:n,explanation:`nums[${a}]=${g[a]} < ${_}. Search right: L=${a+1}`,activeLines:[9]}),r=a+1)}for(e.push({L:-1,R:-1,mid:-1,phase:`first`,first:t,last:n,explanation:`First occurrence found at index ${t}. Starting Phase 2...`,activeLines:[11]}),r=0,i=g.length-1;r<=i;){let a=Math.floor((r+i)/2);g[a]<=_?(g[a]===_&&(n=a),e.push({L:r,R:i,mid:a,phase:`last`,first:t,last:n,explanation:`nums[${a}]=${g[a]} <= ${_}. Possible last at ${n}. Search right: L=${a+1}`,activeLines:[15,16,17]}),r=a+1):(e.push({L:r,R:i,mid:a,phase:`last`,first:t,last:n,explanation:`nums[${a}]=${g[a]} > ${_}. Search left: R=${a-1}`,activeLines:[18]}),i=a-1)}return e.push({L:-1,R:-1,mid:-1,phase:`done`,first:t,last:n,explanation:`Done. First = ${t}, Last = ${n} → [${t}, ${n}]`,activeLines:[20]}),e}var C=S();function w(){let{setTotalSteps:e,reset:t,setActiveLines:n,currentStep:_,isPlaying:S,playbackSpeed:w,nextStep:T}=u(),E=(0,m.useMemo)(()=>C[_]||C[0],[_]);return(0,m.useEffect)(()=>(e(C.length),()=>t()),[e,t]),(0,m.useEffect)(()=>{n(E.activeLines)},[_,n,E.activeLines]),(0,m.useEffect)(()=>{let e;return S&&_<C.length-1&&(e=setTimeout(T,w)),()=>clearTimeout(e)},[S,_,T,w]),(0,h.jsxs)(a,{gap:8,align:`stretch`,w:`full`,children:[(0,h.jsxs)(r,{p:8,bg:`white`,borderRadius:`2xl`,border:`1px solid`,borderColor:`#e8e0d6`,shadow:`lg`,children:[(0,h.jsx)(i,{size:`md`,mb:1,children:`Find First and Last Position`}),(0,h.jsx)(c,{color:`#8b8589`,mb:6,fontSize:`sm`,children:`Chapter 13: Sorting & Searching — Boundary Binary Search`}),(0,h.jsxs)(r,{p:4,bg:`#f5f0eb`,borderRadius:`lg`,mb:4,children:[(0,h.jsx)(f,{num:1,title:`Restate`}),(0,h.jsx)(c,{fontSize:`0.9rem`,color:`#1a1a2e`,children:`Given a sorted array with duplicates, find the starting and ending position of a target value. Return [-1, -1] if not found. O(log n) required.`})]}),(0,h.jsx)(o,{gap:4,mb:3,children:(0,h.jsxs)(r,{flex:`1`,p:3,bg:`#faf6f0`,borderRadius:`lg`,children:[(0,h.jsx)(f,{num:2,title:`Clarify`}),(0,h.jsx)(c,{fontSize:`0.65rem`,color:`#8b8589`,textTransform:`uppercase`,letterSpacing:`0.1em`,fontWeight:`600`,mb:1,children:`Edge Cases`}),(0,h.jsx)(c,{fontSize:`0.8rem`,color:`#6b6350`,fontFamily:`mono`,children:`Duplicates allowed. Target may appear once, many times, or not at all.`}),(0,h.jsx)(c,{fontSize:`0.8rem`,color:`#6b6350`,fontFamily:`mono`,mt:1,children:`Empty array → [-1, -1]. Single match → [i, i].`})]})}),(0,h.jsxs)(o,{gap:4,mb:3,children:[(0,h.jsxs)(r,{flex:`1`,p:4,bg:`#fdf6f5`,borderRadius:`lg`,border:`1px solid`,borderColor:`#f0ddd4`,children:[(0,h.jsx)(f,{num:4,title:`Baseline`}),(0,h.jsx)(c,{fontSize:`0.85rem`,color:`#6b6350`,children:`Linear scan: track first and last occurrence of target in one pass. O(n).`})]}),(0,h.jsxs)(r,{flex:`1`,p:4,bg:`#f0faf4`,borderRadius:`lg`,border:`1px solid`,borderColor:`#cce0d4`,children:[(0,h.jsx)(f,{num:6,title:`Refine`}),(0,h.jsx)(c,{fontSize:`0.85rem`,color:`#6b6350`,children:`Two binary searches — one for the left boundary, one for the right boundary. O(log n) each.`})]})]}),(0,h.jsxs)(r,{p:3,bg:`#fdf6f5`,borderRadius:`lg`,mb:4,borderLeft:`3px solid`,borderColor:`#c94a4a`,children:[(0,h.jsx)(f,{num:5,title:`Bottleneck`,mb:.5}),(0,h.jsx)(c,{fontSize:`0.8rem`,color:`#6b6350`,children:`Linear scan wastes the sorted order. Even though we find the target, we don't know if an earlier/later one exists without scanning adjacent elements.`})]}),(0,h.jsx)(f,{num:3,title:`Example`,mb:3}),(0,h.jsx)(c,{fontSize:`0.75rem`,color:`#8b8589`,mb:3,children:`[5, 7, 7, 8, 8, 10] — target = 8 → expect [3, 4]`}),(0,h.jsx)(r,{pb:4,children:(0,h.jsx)(o,{justify:`center`,align:`flex-end`,gap:3,position:`relative`,minH:`120px`,pt:12,children:g.map((e,t)=>{let n=E.L>=0&&E.R>=0&&t>=E.L&&t<=E.R,i=t===E.mid,a=E.first>=0&&t===E.first,o=E.last>=0&&t===E.last,l=a||o;return(0,h.jsxs)(r,{position:`relative`,children:[t===E.L&&E.L>=0&&(0,h.jsx)(c,{position:`absolute`,top:`-1.75rem`,left:`50%`,transform:`translateX(-50%)`,color:`#4a7db5`,fontWeight:`700`,fontSize:`0.75rem`,children:`L`}),t===E.R&&E.R>=0&&(0,h.jsx)(c,{position:`absolute`,top:`-1.75rem`,left:`50%`,transform:`translateX(-50%)`,color:`#c94a6b`,fontWeight:`700`,fontSize:`0.75rem`,children:`R`}),i&&!l&&(0,h.jsx)(c,{position:`absolute`,bottom:`-1.5rem`,left:`50%`,transform:`translateX(-50%)`,color:`#c9952e`,fontWeight:`700`,fontSize:`0.75rem`,children:`mid`}),a&&(0,h.jsx)(c,{position:`absolute`,bottom:`-1.5rem`,left:`50%`,transform:`translateX(-50%)`,color:`#4a9e6b`,fontWeight:`700`,fontSize:`0.65rem`,children:`first`}),o&&!a&&(0,h.jsx)(c,{position:`absolute`,bottom:`-1.5rem`,left:`50%`,transform:`translateX(-50%)`,color:`#c94a6b`,fontWeight:`700`,fontSize:`0.65rem`,children:`last`}),(0,h.jsx)(s.div,{animate:{scale:i?1.08:1,borderColor:l?`#4a9e6b`:i?`#c9952e`:n?`#4a7db5`:`#e0d8d0`,backgroundColor:l?`#f0faf4`:i?`#faf6f0`:n?`#f0f6fd`:`#ffffff`,opacity:n||l?1:.3},transition:{duration:.25},style:{width:`56px`,height:`56px`,display:`flex`,alignItems:`center`,justifyContent:`center`,borderRadius:`10px`,border:`2px solid #e0d8d0`,fontSize:`1.125rem`,fontWeight:i?700:500,color:`#1a1a2e`},children:e})]},t)})})}),(0,h.jsxs)(o,{p:6,bg:`#f5f0eb`,borderRadius:`xl`,direction:`column`,gap:2,children:[(0,h.jsxs)(o,{justify:`space-between`,align:`center`,children:[(0,h.jsxs)(o,{align:`center`,gap:4,children:[(0,h.jsxs)(c,{fontFamily:`mono`,fontSize:`sm`,color:`#8b8589`,children:[`First: `,(0,h.jsx)(r,{as:`span`,fontWeight:600,color:E.first>=0?`#4a9e6b`:`#8b8589`,children:E.first>=0?E.first:`?`})]}),(0,h.jsxs)(c,{fontFamily:`mono`,fontSize:`sm`,color:`#8b8589`,children:[`Last: `,(0,h.jsx)(r,{as:`span`,fontWeight:600,color:E.last>=0?`#c94a6b`:`#8b8589`,children:E.last>=0?E.last:`?`})]})]}),(0,h.jsx)(l,{bg:E.phase===`done`?`green.500`:E.phase===`last`?`orange.500`:`purple.500`,color:`white`,px:3,py:1,borderRadius:`full`,fontSize:`0.65rem`,children:E.phase===`done`?`Done`:E.phase===`last`?`Phase 2: Last`:`Phase 1: First`})]}),(0,h.jsxs)(c,{color:`#6b6350`,fontSize:`md`,fontStyle:`italic`,borderLeft:`4px solid`,borderColor:`#c9952e`,pl:4,py:1,children:[`"`,E.explanation,`"`]})]})]}),(0,h.jsx)(p,{traceTitle:`Sweep & Trace: First & Last Position`,steps:v,code:y}),(0,h.jsxs)(r,{children:[(0,h.jsx)(f,{num:7,title:`Implement`,mb:2}),(0,h.jsx)(i,{size:`sm`,mb:4,color:`#6b6350`,children:`JS Code`}),(0,h.jsx)(d,{bruteForceCode:b,optimizedCode:x,activeLines:E.activeLines})]})]})}export{w as FirstLastPositionVisualizer};
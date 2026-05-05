import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{l as t}from"./vendor-icons-C3qM9Spt.js";import{m as n}from"./vendor-react-DQHF1KOs.js";import{A as r,E as i,i as a,l as o,t as s,w as c,x as l}from"./vendor-ui-yFFsSR_D.js";import{t as u}from"./index-BmsVf6Iy.js";import{n as d,t as f}from"./StepLabel-ClglrW6L.js";import{t as p}from"./SweepTrace-DuFI-hQM.js";var m=e(t(),1),h=n(),g=[1,3,5,4,2],_=`function nextPermutation(nums) {
  const perms = [];
  function permute(arr, start) {
    if (start === arr.length) {
      perms.push([...arr]); return;
    }
    for (let i = start; i < arr.length; i++) {
      [arr[start], arr[i]] = [arr[i], arr[start]];
      permute(arr, start + 1);
      [arr[start], arr[i]] = [arr[i], arr[start]];
    }
  }
  permute([...nums].sort(), 0);
  for (let i = 0; i < perms.length; i++) {
    if (perms[i].join() === nums.join())
      return perms[(i + 1) % perms.length];
  }
}`,v=`function nextPermutation(nums) {
  let i = nums.length - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) i--;
  if (i >= 0) {
    let j = nums.length - 1;
    while (nums[j] <= nums[i]) j--;
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  let left = i + 1, right = nums.length - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++; right--;
  }
  return nums;
}`,y={title:`Next Permutation`,subtitle:`Ch 6: Arrays & Strings — Pivot and Swap`,restate:`Rearrange nums into the next lexicographically greater permutation. If no greater arrangement exists, return the lowest possible order (sorted ascending).`,baseline:`Generate all permutations, sort them, find the current one, return the next. O(n!) — impossible for n > 10.`,refine:`Find pivot from right, swap with next larger element, reverse suffix. O(n), O(1) space.`,bottleneck:`Generating n! permutations wastes enormous time. We only need the next one — a single swap and reverse achieves it in O(n) without generating anything else.`,edgeCases:[`Already the largest permutation → return sorted ascending`,`Single element → return same array`]},b=[{label:`Step 1: Find the Pivot.`,text:`Sweep from right to left. 5 > 4 > 2 is increasing. The first drop is at 3 (Index 1). This is our pivot.`},{label:`Step 2: Find the Successor.`,text:`Sweep from right to left again to find the smallest number larger than our pivot (3). That number is 4.`},{label:`Step 3: Swap.`,text:`Swap the pivot (3) with the successor (4).`},{label:``,text:`Current Array: [1, 4, 5, 3, 2]`,isAction:!0},{label:`Step 4: Reverse.`,text:`The section to the right of our old pivot index (the 5, 3, 2 part) is currently in decreasing order. Reverse it to get the smallest possible order.`},{label:``,text:`Reversed: [1, 4, 2, 3, 5]`,isAction:!0},{label:`Final Answer:`,text:`[1, 4, 2, 3, 5]`,isAction:!0}],x=`function nextPermutation(nums) {
    let i = nums.length - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) i--;
    if (i >= 0) {
        let j = nums.length - 1;
        while (nums[j] <= nums[i]) j--;
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
        left++; right--;
    }
    return nums;
}`;function S(){let e=[],t=[...g],n=t.length;e.push({phase:`initial`,array:[...t],pivotIdx:-1,successorIdx:-1,leftRev:-1,rightRev:-1,explanation:`Starting array: [1, 3, 5, 4, 2]. We need the next lexicographical permutation.`,activeLines:[1,2]});let r=n-2;for(;r>=0&&t[r]>=t[r+1];)r--;if(e.push({phase:`findPivot`,array:[...t],pivotIdx:r,successorIdx:-1,leftRev:-1,rightRev:-1,explanation:r>=0?`Pivot found at index ${r} (value ${t[r]}). First element from the right that is smaller than its right neighbor.`:`No pivot — array is the largest permutation.`,activeLines:[2,3]}),r>=0){let i=n-1;for(;t[i]<=t[r];)i--;e.push({phase:`findSuccessor`,array:[...t],pivotIdx:r,successorIdx:i,leftRev:-1,rightRev:-1,explanation:`Successor found at index ${i} (value ${t[i]}). Smallest element to the right that is larger than pivot (${t[r]}).`,activeLines:[5,6]}),[t[r],t[i]]=[t[i],t[r]],e.push({phase:`swap`,array:[...t],pivotIdx:r,successorIdx:-1,leftRev:-1,rightRev:-1,explanation:`Swapped pivot (${t[i]}) with successor (${t[r]}) at indices ${r} and original ${i}.`,activeLines:[7]})}let i=r+1,a=n-1;for(;i<a;)[t[i],t[a]]=[t[a],t[i]],i++,a--;return e.push({phase:`reverse`,array:[...t],pivotIdx:r,successorIdx:-1,leftRev:r+1,rightRev:n-1,explanation:`Reversed the suffix (elements after the original pivot position) to get the smallest lexicographical order.`,activeLines:[9,10,11,12,13]}),e.push({phase:`done`,array:[...t],pivotIdx:-1,successorIdx:-1,leftRev:-1,rightRev:-1,explanation:`Done! Next permutation is [${t.join(`, `)}].`,activeLines:[14]}),e}var C=S(),w={initial:{label:`Starting`,bg:`gray.500`},findPivot:{label:`Finding Pivot`,bg:`blue.500`},findSuccessor:{label:`Finding Successor`,bg:`teal.500`},swap:{label:`Swapping`,bg:`orange.500`},reverse:{label:`Reversing Suffix`,bg:`purple.500`},done:{label:`Done`,bg:`green.500`}},T=()=>(0,h.jsxs)(a,{align:`stretch`,gap:4,children:[(0,h.jsxs)(r,{p:4,bg:`#f5f0eb`,borderRadius:`lg`,children:[(0,h.jsx)(f,{num:1,title:`Restate`}),(0,h.jsx)(c,{fontSize:`0.9rem`,color:`#1a1a2e`,children:y.restate})]}),(0,h.jsx)(o,{gap:4,children:(0,h.jsxs)(r,{flex:`1`,p:3,bg:`#faf6f0`,borderRadius:`lg`,children:[(0,h.jsx)(f,{num:2,title:`Clarify`}),(0,h.jsx)(c,{fontSize:`0.65rem`,color:`#8b8589`,textTransform:`uppercase`,letterSpacing:`0.1em`,fontWeight:`600`,mb:1,children:`Edge Cases`}),y.edgeCases.map((e,t)=>(0,h.jsx)(c,{fontSize:`0.8rem`,color:`#6b6350`,fontFamily:`mono`,mt:+(t>0),children:e},t))]})}),(0,h.jsxs)(o,{gap:4,children:[(0,h.jsxs)(r,{flex:`1`,p:4,bg:`#fdf6f5`,borderRadius:`lg`,border:`1px solid`,borderColor:`#f0ddd4`,children:[(0,h.jsx)(f,{num:4,title:`Baseline`}),(0,h.jsx)(c,{fontSize:`0.85rem`,color:`#6b6350`,children:y.baseline})]}),(0,h.jsxs)(r,{flex:`1`,p:4,bg:`#f0faf4`,borderRadius:`lg`,border:`1px solid`,borderColor:`#cce0d4`,children:[(0,h.jsx)(f,{num:6,title:`Refine`}),(0,h.jsx)(c,{fontSize:`0.85rem`,color:`#6b6350`,children:y.refine})]})]}),(0,h.jsxs)(r,{p:3,bg:`#fdf6f5`,borderRadius:`lg`,borderLeft:`3px solid`,borderColor:`#c94a4a`,children:[(0,h.jsx)(f,{num:5,title:`Bottleneck`,mb:.5}),(0,h.jsx)(c,{fontSize:`0.8rem`,color:`#6b6350`,children:y.bottleneck})]})]});function E(){let{setTotalSteps:e,reset:t,setActiveLines:n,currentStep:g,isPlaying:S,playbackSpeed:E,nextStep:D}=u(),O=(0,m.useMemo)(()=>C[g]||C[0],[g]);(0,m.useEffect)(()=>(e(C.length),()=>t()),[e,t]),(0,m.useEffect)(()=>{n(O.activeLines)},[g,n,O.activeLines]),(0,m.useEffect)(()=>{if(!S||g>=C.length-1)return;let e=setTimeout(D,E);return()=>clearTimeout(e)},[S,g,D,E]);let k=w[O.phase];return(0,h.jsxs)(a,{gap:8,align:`stretch`,w:`full`,children:[(0,h.jsxs)(r,{p:8,bg:`white`,borderRadius:`2xl`,border:`1px solid`,borderColor:`#e8e0d6`,shadow:`lg`,children:[(0,h.jsx)(i,{size:`md`,mb:1,children:y.title}),(0,h.jsx)(c,{color:`#8b8589`,mb:6,fontSize:`sm`,children:y.subtitle}),(0,h.jsx)(T,{}),(0,h.jsxs)(r,{mt:8,children:[(0,h.jsx)(f,{num:3,title:`Example`,mb:3}),(0,h.jsx)(r,{pb:4,children:(0,h.jsx)(o,{justify:`center`,align:`center`,gap:2,wrap:`wrap`,children:O.array.map((e,t)=>{let n=t===O.pivotIdx,i=t===O.successorIdx,a=t>=O.leftRev&&t<=O.rightRev,l=`#e8e0d6`,u=`white`,d=``;return n?(l=`#4a7db5`,u=`#f0f6fd`,d=`pivot`):i?(l=`#c94a6b`,u=`#fdf6f5`,d=`succ`):a&&(l=`#8b5cf6`,u=`#f5f0fa`),(0,h.jsxs)(r,{position:`relative`,children:[d&&(0,h.jsx)(c,{position:`absolute`,top:`-1.1rem`,left:`50%`,transform:`translateX(-50%)`,fontSize:`0.55rem`,color:l,fontWeight:700,children:d}),(0,h.jsx)(s.div,{animate:{scale:n||i?1.08:1},children:(0,h.jsx)(o,{w:`52px`,h:`52px`,align:`center`,justify:`center`,borderRadius:`md`,border:`2px solid`,borderColor:l,bg:u,fontSize:`1rem`,fontWeight:n||i?700:500,color:`#1a1a2e`,children:e})}),(0,h.jsx)(c,{fontSize:`0.6rem`,color:`#8b8589`,textAlign:`center`,mt:1,children:t})]},t)})})}),(0,h.jsxs)(o,{mt:4,p:6,bg:`#f5f0eb`,borderRadius:`xl`,direction:`column`,gap:2,children:[(0,h.jsx)(o,{justify:`space-between`,align:`center`,children:(0,h.jsx)(l,{bg:k.bg,color:`white`,px:3,py:1,borderRadius:`full`,fontSize:`0.65rem`,children:k.label})}),(0,h.jsxs)(c,{color:`#6b6350`,fontSize:`md`,fontStyle:`italic`,borderLeft:`4px solid`,borderColor:`#c9952e`,pl:4,py:1,children:[`"`,O.explanation,`"`]})]})]})]}),(0,h.jsx)(p,{traceTitle:`The Trace (Example: nums = [1, 3, 5, 4, 2])`,steps:b,code:x}),(0,h.jsxs)(r,{children:[(0,h.jsx)(f,{num:7,title:`Implement`,mb:2}),(0,h.jsx)(i,{size:`sm`,mb:4,color:`#6b6350`,children:`JS Code`}),(0,h.jsx)(d,{bruteForceCode:_,optimizedCode:v,activeLines:O.activeLines})]})]})}export{E as NextPermutationVisualizer};
import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{l as t}from"./vendor-icons-C3qM9Spt.js";import{m as n}from"./vendor-react-DQHF1KOs.js";import{A as r,E as i,i as a,l as o,n as s,t as c,w as l,x as u}from"./vendor-ui-yFFsSR_D.js";import{t as d}from"./index-BmsVf6Iy.js";import{n as f,t as p}from"./StepLabel-ClglrW6L.js";import{t as m}from"./SweepTrace-DuFI-hQM.js";var h=e(t(),1),g=n(),_=[`2`,`1`,`+`,`3`,`*`],v=new Set([`+`,`-`,`*`,`/`]),y=[{label:`Token '2':`,text:`Operand. Push 2 onto stack. Stack: [2]`},{label:`Token '1':`,text:`Operand. Push 1 onto stack. Stack: [2, 1]`},{label:`Token '+':`,text:`Operator. Pop 1, pop 2. Compute 2 + 1 = 3. Push 3. Stack: [3]`},{label:`Token '3':`,text:`Operand. Push 3 onto stack. Stack: [3, 3]`},{label:`Token '*':`,text:`Operator. Pop 3, pop 3. Compute 3 * 3 = 9. Push 9. Stack: [9]`},{label:`Result:`,text:`Stack has one element: 9. Return 9.`,isAction:!0}],b=`function evalRPN(tokens) {
    const stack = [];
    for (const t of tokens) {
        if (!isNaN(t)) {
            stack.push(Number(t));
        } else {
            const b = stack.pop();
            const a = stack.pop();
            if (t === '+') stack.push(a + b);
            else if (t === '-') stack.push(a - b);
            else if (t === '*') stack.push(a * b);
            else stack.push(Math.trunc(a / b));
        }
    }
    return stack[0];
}`,x=`// Brute/Naive: recursively parse
// No clean brute for RPN — it's naturally O(n)
// The "brute" is misunderstanding Reverse
// Polish Notation and trying infix parsing.

function evalRPN(tokens) {
  const stack = [];
  for (const t of tokens) {
    if (!isNaN(t)) stack.push(+t);
    else {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(compute(a, b, t));
    }
  }
  return stack[0];
}`,S=`// RPN: stack-based O(n) evaluation
function evalRPN(tokens) {
  const stack = [];
  for (const t of tokens) {
    if (t === "+") stack.push(stack.pop() + stack.pop());
    else if (t === "-") {
      const b = stack.pop(), a = stack.pop();
      stack.push(a - b);
    }
    else if (t === "*") stack.push(stack.pop() * stack.pop());
    else if (t === "/") {
      const b = stack.pop(), a = stack.pop();
      stack.push(Math.trunc(a / b));
    }
    else stack.push(Number(t));
  }
  return stack[0];
}`;function C(e,t,n){switch(n){case`+`:return e+t;case`-`:return e-t;case`*`:return e*t;case`/`:return Math.trunc(e/t);default:return 0}}function w(){let e=[],t=[];e.push({idx:-1,stack:[],token:``,isOperator:!1,result:null,explanation:`RPN: operands first, then operator. When you see an operator, pop the last two operands, compute, push result.`,activeLines:[3]});for(let n=0;n<_.length;n++){let r=_[n];if(v.has(r)){let i=t.pop(),a=t.pop(),o=C(a,i,r);t.push(o),e.push({idx:n,stack:[...t],token:r,isOperator:!0,result:o,explanation:`Operator "${r}": pop ${i}, pop ${a} → ${a} ${r} ${i} = ${o}. Push ${o} back.`,activeLines:[6,7,8,17]})}else t.push(Number(r)),e.push({idx:n,stack:[...t],token:r,isOperator:!1,result:null,explanation:`Operand ${r}: push onto stack. Stack now has ${t.length} value(s).`,activeLines:[5]})}return e.push({idx:_.length,stack:[...t],token:``,isOperator:!1,result:t[0],explanation:`Done. Final result is ${t[0]}.`,activeLines:[10]}),e}var T=w();function E(){let{setTotalSteps:e,reset:t,setActiveLines:n,currentStep:C,isPlaying:w,playbackSpeed:E,nextStep:D}=d(),O=(0,h.useMemo)(()=>T[C]||T[0],[C]);return(0,h.useEffect)(()=>(e(T.length),()=>t()),[e,t]),(0,h.useEffect)(()=>{n(O.activeLines)},[C,n,O.activeLines]),(0,h.useEffect)(()=>{let e;return w&&C<T.length-1&&(e=setTimeout(D,E)),()=>clearTimeout(e)},[w,C,D,E]),(0,g.jsxs)(a,{gap:8,align:`stretch`,w:`full`,children:[(0,g.jsxs)(r,{p:8,bg:`white`,borderRadius:`2xl`,border:`1px solid`,borderColor:`#e8e0d6`,shadow:`lg`,children:[(0,g.jsx)(i,{size:`md`,mb:1,children:`Evaluate Reverse Polish Notation`}),(0,g.jsx)(l,{color:`#8b8589`,mb:6,fontSize:`sm`,children:`Chapter 8: Stacks & Queues — Postfix Evaluation`}),(0,g.jsxs)(r,{p:4,bg:`#f5f0eb`,borderRadius:`lg`,mb:4,children:[(0,g.jsx)(p,{num:1,title:`Restate`}),(0,g.jsx)(l,{fontSize:`0.9rem`,color:`#1a1a2e`,children:`Evaluate an arithmetic expression in Reverse Polish Notation (postfix). Valid operators are +, -, *, /. Division truncates toward zero.`})]}),(0,g.jsx)(o,{gap:4,mb:3,children:(0,g.jsxs)(r,{flex:`1`,p:3,bg:`#faf6f0`,borderRadius:`lg`,children:[(0,g.jsx)(p,{num:2,title:`Clarify`}),(0,g.jsx)(l,{fontSize:`0.65rem`,color:`#8b8589`,textTransform:`uppercase`,letterSpacing:`0.1em`,fontWeight:`600`,mb:1,children:`Edge Cases`}),(0,g.jsx)(l,{fontSize:`0.8rem`,color:`#6b6350`,fontFamily:`mono`,children:`Division truncates toward zero. No division by zero. Input always valid.`})]})}),(0,g.jsxs)(o,{gap:4,mb:3,children:[(0,g.jsxs)(r,{flex:`1`,p:4,bg:`#fdf6f5`,borderRadius:`lg`,border:`1px solid`,borderColor:`#f0ddd4`,children:[(0,g.jsx)(p,{num:4,title:`Baseline`}),(0,g.jsx)(l,{fontSize:`0.85rem`,color:`#6b6350`,children:`Could recursively parse the postfix expression into a tree, then evaluate bottom-up. More complex, still O(n) but extra memory for the tree.`})]}),(0,g.jsxs)(r,{flex:`1`,p:4,bg:`#f0faf4`,borderRadius:`lg`,border:`1px solid`,borderColor:`#cce0d4`,children:[(0,g.jsx)(p,{num:6,title:`Refine`}),(0,g.jsx)(l,{fontSize:`0.85rem`,color:`#6b6350`,children:`Stack-based: push numbers, pop two for operators, push result. One pass, O(n).`})]})]}),(0,g.jsxs)(r,{p:3,bg:`#fdf6f5`,borderRadius:`lg`,mb:4,borderLeft:`3px solid`,borderColor:`#c94a4a`,children:[(0,g.jsx)(p,{num:5,title:`Bottleneck`,mb:.5}),(0,g.jsx)(l,{fontSize:`0.8rem`,color:`#6b6350`,children:`The recursive tree approach uses extra O(n) memory for nodes. Stack-based evaluation is more memory-efficient and simpler.`})]}),(0,g.jsx)(p,{num:3,title:`Example`,mb:3}),(0,g.jsxs)(l,{fontSize:`0.75rem`,color:`#8b8589`,mb:3,children:[`"`,_.join(` `),`" = ((2 + 1) * 3) = 9`]}),(0,g.jsxs)(o,{gap:6,align:`flex-start`,justify:`center`,children:[(0,g.jsxs)(a,{align:`center`,children:[(0,g.jsx)(l,{fontSize:`0.65rem`,color:`#8b8589`,textTransform:`uppercase`,letterSpacing:`0.1em`,fontWeight:`600`,mb:2,children:`Tokens`}),(0,g.jsx)(o,{gap:2,children:_.map((e,t)=>{let n=t===O.idx,r=t<O.idx,i=v.has(e);return(0,g.jsx)(c.div,{animate:{scale:n?1.12:1,y:n?-4:0},transition:{duration:.2},children:(0,g.jsx)(o,{w:`52px`,h:`52px`,align:`center`,justify:`center`,borderRadius:`lg`,border:`2px solid`,borderColor:n?`#c9952e`:r?`#e0d8d0`:`#e8e0d6`,bg:i||n?`#faf6f0`:r?`#f5f0eb`:`white`,fontSize:`1.1rem`,fontWeight:n?700:500,color:i?`#c9952e`:`#1a1a2e`,opacity:r&&!n?.4:1,children:e})},t)})})]}),(0,g.jsx)(r,{w:`1px`,bg:`#e8e0d6`,alignSelf:`stretch`}),(0,g.jsxs)(a,{align:`center`,minW:`120px`,children:[(0,g.jsx)(l,{fontSize:`0.65rem`,color:`#8b8589`,textTransform:`uppercase`,letterSpacing:`0.1em`,fontWeight:`600`,mb:2,children:`Stack`}),(0,g.jsxs)(r,{w:`80px`,minH:`180px`,bg:`#faf6f0`,borderRadius:`lg`,border:`2px dashed`,borderColor:`#e0d8d0`,display:`flex`,flexDirection:`column-reverse`,alignItems:`center`,p:2,children:[(0,g.jsx)(s,{children:O.stack.map((e,t)=>(0,g.jsx)(c.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},exit:{opacity:0,y:20},transition:{duration:.25},style:{marginBottom:`4px`},children:(0,g.jsx)(o,{w:`56px`,h:`40px`,align:`center`,justify:`center`,borderRadius:`md`,bg:`#1a1a2e`,color:`white`,fontSize:`0.9rem`,fontWeight:700,children:e})},`${e}-${t}`))}),O.stack.length===0&&(0,g.jsx)(l,{fontSize:`0.7rem`,color:`#c0b8b0`,fontStyle:`italic`,children:`empty`})]})]})]}),(0,g.jsxs)(o,{p:6,bg:`#f5f0eb`,borderRadius:`xl`,direction:`column`,gap:2,mt:4,children:[(0,g.jsxs)(o,{justify:`space-between`,align:`center`,children:[(0,g.jsxs)(l,{fontSize:`sm`,color:`#8b8589`,children:[`Stack size: `,(0,g.jsx)(r,{as:`span`,fontWeight:700,color:`#1a1a2e`,children:O.stack.length})]}),(0,g.jsx)(u,{bg:O.isOperator?`orange.500`:O.idx<_.length?`purple.500`:`green.500`,color:`white`,px:3,py:1,borderRadius:`full`,fontSize:`0.65rem`,children:O.isOperator?`Compute`:O.idx<_.length?`Push`:`Done`})]}),(0,g.jsxs)(l,{color:`#6b6350`,fontSize:`md`,fontStyle:`italic`,borderLeft:`4px solid`,borderColor:`#c9952e`,pl:4,py:1,children:[`"`,O.explanation,`"`]})]})]}),(0,g.jsx)(m,{traceTitle:`Sweep & Trace: Evaluate RPN`,steps:y,code:b}),(0,g.jsxs)(r,{children:[(0,g.jsx)(p,{num:7,title:`Implement`,mb:2}),(0,g.jsx)(i,{size:`sm`,mb:4,color:`#6b6350`,children:`JS Code`}),(0,g.jsx)(f,{bruteForceCode:x,optimizedCode:S,activeLines:O.activeLines})]})]})}export{E as EvaluateRPNVisualizer};
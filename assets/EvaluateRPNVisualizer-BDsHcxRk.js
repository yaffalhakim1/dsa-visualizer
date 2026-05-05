import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{l as t}from"./vendor-icons-C3qM9Spt.js";import{m as n}from"./vendor-react-DQHF1KOs.js";import{C as r,T as i,c as a,i as o,k as s,n as c,t as l,y as u}from"./vendor-ui-Bxova36W.js";import{t as d}from"./index-CjnKFw64.js";import{n as f,r as p,t as m}from"./InterviewWorkflow-CA4nCP7E.js";import{t as h}from"./SweepTrace-SxhPc9WI.js";var g=e(t(),1),_=n(),v=[`2`,`1`,`+`,`3`,`*`],y=new Set([`+`,`-`,`*`,`/`]),b=[{label:`Token '2':`,text:`Operand. Push 2 onto stack. Stack: [2]`},{label:`Token '1':`,text:`Operand. Push 1 onto stack. Stack: [2, 1]`},{label:`Token '+':`,text:`Operator. Pop 1, pop 2. Compute 2 + 1 = 3. Push 3. Stack: [3]`},{label:`Token '3':`,text:`Operand. Push 3 onto stack. Stack: [3, 3]`},{label:`Token '*':`,text:`Operator. Pop 3, pop 3. Compute 3 * 3 = 9. Push 9. Stack: [9]`},{label:`Result:`,text:`Stack has one element: 9. Return 9.`,isAction:!0}],x=`function evalRPN(tokens) {
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
}`,S=`// Brute/Naive: recursively parse
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
}`,C=`// RPN: stack-based O(n) evaluation
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
}`;function w(e,t,n){switch(n){case`+`:return e+t;case`-`:return e-t;case`*`:return e*t;case`/`:return Math.trunc(e/t);default:return 0}}function T(){let e=[],t=[];e.push({idx:-1,stack:[],token:``,isOperator:!1,result:null,explanation:`RPN: operands first, then operator. When you see an operator, pop the last two operands, compute, push result.`,activeLines:[3]});for(let n=0;n<v.length;n++){let r=v[n];if(y.has(r)){let i=t.pop(),a=t.pop(),o=w(a,i,r);t.push(o),e.push({idx:n,stack:[...t],token:r,isOperator:!0,result:o,explanation:`Operator "${r}": pop ${i}, pop ${a} → ${a} ${r} ${i} = ${o}. Push ${o} back.`,activeLines:[6,7,8,17]})}else t.push(Number(r)),e.push({idx:n,stack:[...t],token:r,isOperator:!1,result:null,explanation:`Operand ${r}: push onto stack. Stack now has ${t.length} value(s).`,activeLines:[5]})}return e.push({idx:v.length,stack:[...t],token:``,isOperator:!1,result:t[0],explanation:`Done. Final result is ${t[0]}.`,activeLines:[10]}),e}var E=T();function D(){let{setTotalSteps:e,reset:t,setActiveLines:n,currentStep:w,isPlaying:T,playbackSpeed:D,nextStep:O}=d(),k=(0,g.useMemo)(()=>E[w]||E[0],[w]);return(0,g.useEffect)(()=>(e(E.length),()=>t()),[e,t]),(0,g.useEffect)(()=>{n(k.activeLines)},[w,n,k.activeLines]),(0,g.useEffect)(()=>{let e;return T&&w<E.length-1&&(e=setTimeout(O,D)),()=>clearTimeout(e)},[T,w,O,D]),(0,_.jsxs)(o,{gap:8,align:`stretch`,w:`full`,children:[(0,_.jsxs)(s,{p:8,bg:`white`,borderRadius:`2xl`,border:`1px solid`,borderColor:`#e8e0d6`,shadow:`lg`,children:[(0,_.jsx)(i,{size:`md`,mb:1,children:`Evaluate Reverse Polish Notation`}),(0,_.jsx)(r,{color:`#8b8589`,mb:6,fontSize:`sm`,children:`Chapter 8: Stacks & Queues — Postfix Evaluation`}),(0,_.jsx)(s,{mb:6,children:(0,_.jsx)(m,{current:6})}),(0,_.jsx)(s,{p:3,bg:`#faf6f0`,borderRadius:`lg`,mb:6,children:(0,_.jsx)(r,{fontSize:`0.8rem`,color:`#6b6350`,children:`Each visualizer follows the 7-step interview workflow. Use the bottom control bar to step through animations and adjust speed.`})}),(0,_.jsxs)(s,{p:4,bg:`#f5f0eb`,borderRadius:`lg`,mb:4,children:[(0,_.jsx)(f,{num:1,title:`Restate`}),(0,_.jsx)(r,{fontSize:`0.9rem`,color:`#1a1a2e`,children:`Evaluate an arithmetic expression in Reverse Polish Notation (postfix). Valid operators are +, -, *, /. Division truncates toward zero.`})]}),(0,_.jsx)(a,{gap:4,mb:3,children:(0,_.jsxs)(s,{flex:`1`,p:3,bg:`#faf6f0`,borderRadius:`lg`,children:[(0,_.jsx)(f,{num:2,title:`Clarify`}),(0,_.jsx)(r,{fontSize:`0.65rem`,color:`#8b8589`,textTransform:`uppercase`,letterSpacing:`0.1em`,fontWeight:`600`,mb:1,children:`Edge Cases`}),(0,_.jsx)(r,{fontSize:`0.8rem`,color:`#6b6350`,fontFamily:`mono`,children:`Division truncates toward zero. No division by zero. Input always valid.`})]})}),(0,_.jsx)(f,{num:3,title:`Example`,mb:3}),(0,_.jsxs)(r,{fontSize:`0.75rem`,color:`#8b8589`,mb:3,children:[`"`,v.join(` `),`" = ((2 + 1) * 3) = 9`]}),(0,_.jsxs)(a,{gap:6,align:`flex-start`,justify:`center`,children:[(0,_.jsxs)(o,{align:`center`,children:[(0,_.jsx)(r,{fontSize:`0.65rem`,color:`#8b8589`,textTransform:`uppercase`,letterSpacing:`0.1em`,fontWeight:`600`,mb:2,children:`Tokens`}),(0,_.jsx)(a,{gap:2,children:v.map((e,t)=>{let n=t===k.idx,r=t<k.idx,i=y.has(e);return(0,_.jsx)(l.div,{animate:{scale:n?1.12:1,y:n?-4:0},transition:{duration:.2},children:(0,_.jsx)(a,{w:`52px`,h:`52px`,align:`center`,justify:`center`,borderRadius:`lg`,border:`2px solid`,borderColor:n?`#c9952e`:r?`#e0d8d0`:`#e8e0d6`,bg:i||n?`#faf6f0`:r?`#f5f0eb`:`white`,fontSize:`1.1rem`,fontWeight:n?700:500,color:i?`#c9952e`:`#1a1a2e`,opacity:r&&!n?.4:1,children:e})},t)})})]}),(0,_.jsx)(s,{w:`1px`,bg:`#e8e0d6`,alignSelf:`stretch`}),(0,_.jsxs)(o,{align:`center`,minW:`120px`,children:[(0,_.jsx)(r,{fontSize:`0.65rem`,color:`#8b8589`,textTransform:`uppercase`,letterSpacing:`0.1em`,fontWeight:`600`,mb:2,children:`Stack`}),(0,_.jsxs)(s,{w:`80px`,minH:`180px`,bg:`#faf6f0`,borderRadius:`lg`,border:`2px dashed`,borderColor:`#e0d8d0`,display:`flex`,flexDirection:`column-reverse`,alignItems:`center`,p:2,children:[(0,_.jsx)(c,{children:k.stack.map((e,t)=>(0,_.jsx)(l.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},exit:{opacity:0,y:20},transition:{duration:.25},style:{marginBottom:`4px`},children:(0,_.jsx)(a,{w:`56px`,h:`40px`,align:`center`,justify:`center`,borderRadius:`md`,bg:`#1a1a2e`,color:`white`,fontSize:`0.9rem`,fontWeight:700,children:e})},`${e}-${t}`))}),k.stack.length===0&&(0,_.jsx)(r,{fontSize:`0.7rem`,color:`#c0b8b0`,fontStyle:`italic`,children:`empty`})]})]})]}),(0,_.jsxs)(a,{p:6,bg:`#f5f0eb`,borderRadius:`xl`,direction:`column`,gap:2,mt:4,mb:8,children:[(0,_.jsxs)(a,{justify:`space-between`,align:`center`,children:[(0,_.jsxs)(r,{fontSize:`sm`,color:`#8b8589`,children:[`Stack size: `,(0,_.jsx)(s,{as:`span`,fontWeight:700,color:`#1a1a2e`,children:k.stack.length})]}),(0,_.jsx)(u,{bg:k.isOperator?`orange.500`:k.idx<v.length?`purple.500`:`green.500`,color:`white`,px:3,py:1,borderRadius:`full`,fontSize:`0.65rem`,children:k.isOperator?`Compute`:k.idx<v.length?`Push`:`Done`})]}),(0,_.jsxs)(r,{color:`#6b6350`,fontSize:`md`,fontStyle:`italic`,borderLeft:`4px solid`,borderColor:`#c9952e`,pl:4,py:1,children:[`"`,k.explanation,`"`]})]}),(0,_.jsxs)(a,{gap:4,mb:8,children:[(0,_.jsxs)(s,{flex:`1`,p:4,bg:`#fdf6f5`,borderRadius:`lg`,border:`1px solid`,borderColor:`#f0ddd4`,children:[(0,_.jsx)(f,{num:4,title:`Baseline`}),(0,_.jsx)(r,{fontSize:`0.85rem`,color:`#6b6350`,children:`Could recursively parse the postfix expression into a tree, then evaluate bottom-up. More complex, still O(n) but extra memory for the tree.`})]}),(0,_.jsxs)(s,{flex:`1`,p:4,bg:`#f0faf4`,borderRadius:`lg`,border:`1px solid`,borderColor:`#cce0d4`,children:[(0,_.jsx)(f,{num:6,title:`Refine`}),(0,_.jsx)(r,{fontSize:`0.85rem`,color:`#6b6350`,children:`Stack-based: push numbers, pop two for operators, push result. One pass, O(n).`})]})]}),(0,_.jsxs)(s,{p:3,bg:`#fdf6f5`,borderRadius:`lg`,mb:4,borderLeft:`3px solid`,borderColor:`#c94a4a`,children:[(0,_.jsx)(f,{num:5,title:`Bottleneck`,mb:.5}),(0,_.jsx)(r,{fontSize:`0.8rem`,color:`#6b6350`,children:`The recursive tree approach uses extra O(n) memory for nodes. Stack-based evaluation is more memory-efficient and simpler.`})]})]}),(0,_.jsx)(h,{traceTitle:`Sweep & Trace: Evaluate RPN`,steps:b,code:x}),(0,_.jsxs)(s,{children:[(0,_.jsx)(f,{num:7,title:`Implement`,mb:2}),(0,_.jsx)(i,{size:`sm`,mb:4,color:`#6b6350`,children:`JS Code`}),(0,_.jsx)(p,{bruteForceCode:S,optimizedCode:C,activeLines:k.activeLines})]})]})}export{D as EvaluateRPNVisualizer};
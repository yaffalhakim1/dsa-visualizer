import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{l as t}from"./vendor-icons-C3qM9Spt.js";import{m as n}from"./vendor-react-DQHF1KOs.js";import{A as r,E as i,i as a,l as o,n as s,t as c,w as l,x as u}from"./vendor-ui-yFFsSR_D.js";import{t as d}from"./index-BmsVf6Iy.js";import{n as f,t as p}from"./StepLabel-ClglrW6L.js";import{t as m}from"./SweepTrace-DuFI-hQM.js";var h=e(t(),1),g=n(),_=[{op:`push`,val:1},{op:`push`,val:2},{op:`peek`,val:void 0},{op:`pop`,val:void 0},{op:`empty`,val:void 0}],v=[{label:`push(1):`,text:`Push 1 onto inStack. inStack: [1], outStack: []`},{label:`push(2):`,text:`Push 2 onto inStack. inStack: [1, 2], outStack: []`},{label:`peek():`,text:`outStack is empty → drain inStack into outStack (pop from inStack, push to outStack). inStack: [], outStack: [2, 1]. Peek = top of outStack = 1.`},{label:`pop():`,text:`outStack has values → pop directly. Pop 1 from outStack. inStack: [], outStack: [2].`},{label:`empty():`,text:`inStack is empty, outStack has [2] → not empty. Return false.`},{label:`Key insight:`,text:`Each element moves from inStack → outStack at most once per lifetime. Amortized O(1) for all operations.`,isAction:!0}],y=`class MyQueue {
    constructor() {
        this.inStack = [];
        this.outStack = [];
    }
    push(x) { this.inStack.push(x); }
    pop() {
        this._shiftStacks();
        return this.outStack.pop();
    }
    peek() {
        this._shiftStacks();
        return this.outStack.at(-1);
    }
    empty() {
        return !this.inStack.length &&
               !this.outStack.length;
    }
    _shiftStacks() {
        if (!this.outStack.length) {
            while (this.inStack.length)
                this.outStack.push(this.inStack.pop());
        }
    }
}`,b={init:{color:`blue.500`,label:`Start`},push:{color:`purple.500`,label:`Push`},peek:{color:`teal.500`,label:`Peek`},pop:{color:`orange.500`,label:`Pop`},empty:{color:`gray.500`,label:`empty?`},done:{color:`green.500`,label:`Done`}},x=`// Brute: one-stack, shift-on-push
class MyQueue {
  constructor() { this.s = []; }
  push(x) {
    const t = [];
    while (this.s.length) t.push(this.s.pop());
    t.push(x);
    while (t.length) this.s.push(t.pop());
  }
  pop() { return this.s.pop(); }
  peek() { return this.s.at(-1); }
  empty() { return !this.s.length; }
}`,S=`// Optimized: two-stack amortized O(1)
class MyQueue {
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }
  push(x) { this.inStack.push(x); }
  pop() {
    this._shiftStacks();
    return this.outStack.pop();
  }
  peek() {
    this._shiftStacks();
    return this.outStack.at(-1);
  }
  empty() {
    return !this.inStack.length &&
           !this.outStack.length;
  }
  _shiftStacks() {
    if (!this.outStack.length) {
      while (this.inStack.length)
        this.outStack.push(this.inStack.pop());
    }
  }
}`;function C(){let e=[],t=[],n=[],r=()=>{if(n.length===0)for(;t.length>0;)n.push(t.pop())};e.push({inStack:[],outStack:[],opIdx:-1,action:`init`,frontVal:void 0,explanation:`Use two stacks. Push goes to inStack. Pop/peek drain inStack into outStack once (amortized O(1)).`,activeLines:[3,4]});for(let i=0;i<_.length;i++){let{op:a,val:o}=_[i];if(a===`push`&&o!==void 0)t.push(o),e.push({inStack:[...t],outStack:[...n],opIdx:i,action:`push`,frontVal:n.length>0?n[n.length-1]:t[0],explanation:`Push ${o} onto inStack. O(1).`,activeLines:[7]});else if(a===`peek`){let a=n.length===0&&t.length>0;r();let o=n.length>0?n[n.length-1]:void 0;e.push({inStack:[...t],outStack:[...n],opIdx:i,action:`peek`,frontVal:o,explanation:a?`Peek: outStack empty → drain inStack into outStack. Front = ${o}.`:`Peek: outStack already has values. Front = ${o}.`,activeLines:[12,13]})}else if(a===`pop`){let a=n.length===0&&t.length>0;r();let o=n.length>0?n.pop():void 0;e.push({inStack:[...t],outStack:[...n],opIdx:i,action:`pop`,frontVal:n.length>0?n[n.length-1]:t.length>0?t[0]:void 0,explanation:a?`Pop: shift stacks, then pop ${o} from outStack.`:`Pop: pop ${o} from outStack directly.`,activeLines:[9,10,11]})}else a===`empty`&&e.push({inStack:[...t],outStack:[...n],opIdx:i,action:`empty`,frontVal:n.length>0?n[n.length-1]:t.length>0?t[0]:void 0,explanation:`empty? → ${t.length===0&&n.length===0}.`,activeLines:[15,16,17]})}return e.push({inStack:[...t],outStack:[...n],opIdx:_.length,action:`done`,frontVal:void 0,explanation:`Two stacks give amortized O(1) push, pop, and peek. Each element moves from inStack to outStack at most once.`,activeLines:[7,9,12,20,21,22]}),e}var w=C();function T(){let{setTotalSteps:e,reset:t,setActiveLines:n,currentStep:_,isPlaying:C,playbackSpeed:T,nextStep:E}=d(),D=(0,h.useMemo)(()=>w[_]||w[0],[_]),O=b[D.action];return(0,h.useEffect)(()=>(e(w.length),()=>t()),[e,t]),(0,h.useEffect)(()=>{n(D.activeLines)},[_,n,D.activeLines]),(0,h.useEffect)(()=>{let e;return C&&_<w.length-1&&(e=setTimeout(E,T)),()=>clearTimeout(e)},[C,_,E,T]),(0,g.jsxs)(a,{gap:8,align:`stretch`,w:`full`,children:[(0,g.jsxs)(r,{p:8,bg:`white`,borderRadius:`2xl`,border:`1px solid`,borderColor:`#e8e0d6`,shadow:`lg`,children:[(0,g.jsx)(i,{size:`md`,mb:1,children:`Implement Queue Using Stacks`}),(0,g.jsx)(l,{color:`#8b8589`,mb:6,fontSize:`sm`,children:`Chapter 8: Stacks & Queues — Two-Stack Queue`}),(0,g.jsxs)(r,{p:4,bg:`#f5f0eb`,borderRadius:`lg`,mb:4,children:[(0,g.jsx)(p,{num:1,title:`Restate`}),(0,g.jsx)(l,{fontSize:`0.9rem`,color:`#1a1a2e`,children:`Implement a FIFO queue using only stack operations. Support push, pop, peek, and empty in amortized O(1).`})]}),(0,g.jsx)(o,{gap:4,mb:3,children:(0,g.jsxs)(r,{flex:`1`,p:3,bg:`#faf6f0`,borderRadius:`lg`,children:[(0,g.jsx)(p,{num:2,title:`Clarify`}),(0,g.jsx)(l,{fontSize:`0.65rem`,color:`#8b8589`,textTransform:`uppercase`,letterSpacing:`0.1em`,fontWeight:`600`,mb:1,children:`Edge Cases`}),(0,g.jsx)(l,{fontSize:`0.8rem`,color:`#6b6350`,fontFamily:`mono`,children:`pop/peek on empty queue → undefined. Only use push and pop from arrays.`})]})}),(0,g.jsxs)(o,{gap:4,mb:3,children:[(0,g.jsxs)(r,{flex:`1`,p:4,bg:`#fdf6f5`,borderRadius:`lg`,border:`1px solid`,borderColor:`#f0ddd4`,children:[(0,g.jsx)(p,{num:4,title:`Baseline`}),(0,g.jsx)(l,{fontSize:`0.85rem`,color:`#6b6350`,children:`Use one stack: to push, reverse the entire stack with a temp stack. O(n) per push.`})]}),(0,g.jsxs)(r,{flex:`1`,p:4,bg:`#f0faf4`,borderRadius:`lg`,border:`1px solid`,borderColor:`#cce0d4`,children:[(0,g.jsx)(p,{num:6,title:`Refine`}),(0,g.jsx)(l,{fontSize:`0.85rem`,color:`#6b6350`,children:`Two stacks: inStack for pushes, outStack for pops. Drain inStack into outStack only when outStack is empty. Amortized O(1) for all operations.`})]})]}),(0,g.jsxs)(r,{p:3,bg:`#fdf6f5`,borderRadius:`lg`,mb:4,borderLeft:`3px solid`,borderColor:`#c94a4a`,children:[(0,g.jsx)(p,{num:5,title:`Bottleneck`,mb:.5}),(0,g.jsx)(l,{fontSize:`0.8rem`,color:`#6b6350`,children:`The one-stack approach reverses the whole stack on every push — O(n) per operation. Must amortize the cost.`})]}),(0,g.jsx)(p,{num:3,title:`Example`,mb:3}),(0,g.jsx)(l,{fontSize:`0.75rem`,color:`#8b8589`,mb:2,children:`Operations: push(1), push(2), peek(), pop(), empty()`}),(0,g.jsxs)(o,{gap:6,justify:`center`,minH:`280px`,children:[(0,g.jsxs)(a,{align:`center`,children:[(0,g.jsx)(l,{fontSize:`0.65rem`,color:`#8b8589`,textTransform:`uppercase`,letterSpacing:`0.1em`,fontWeight:`600`,mb:2,children:`inStack (push here)`}),(0,g.jsxs)(r,{w:`80px`,minH:`200px`,bg:`#f5f0eb`,borderRadius:`lg`,border:`2px dashed`,borderColor:`#e0d8d0`,display:`flex`,flexDirection:`column-reverse`,alignItems:`center`,p:2,children:[(0,g.jsx)(s,{children:D.inStack.map((e,t)=>(0,g.jsx)(c.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},exit:{opacity:0,y:20},transition:{duration:.25},style:{marginBottom:`4px`},children:(0,g.jsx)(o,{w:`56px`,h:`40px`,align:`center`,justify:`center`,borderRadius:`md`,bg:`#8b5cf6`,color:`white`,fontSize:`0.9rem`,fontWeight:700,children:e})},`in-${t}-${e}`))}),D.inStack.length===0&&(0,g.jsx)(l,{fontSize:`0.7rem`,color:`#c0b8b0`,fontStyle:`italic`,children:`empty`})]})]}),(0,g.jsxs)(a,{align:`center`,children:[(0,g.jsx)(l,{fontSize:`0.65rem`,color:`#8b8589`,textTransform:`uppercase`,letterSpacing:`0.1em`,fontWeight:`600`,mb:2,children:`outStack (pop from here)`}),(0,g.jsxs)(r,{w:`80px`,minH:`200px`,bg:`#f0faf4`,borderRadius:`lg`,border:`2px dashed`,borderColor:`#cce0d4`,display:`flex`,flexDirection:`column-reverse`,alignItems:`center`,p:2,children:[(0,g.jsx)(s,{children:D.outStack.map((e,t)=>(0,g.jsx)(c.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},exit:{opacity:0,y:20},transition:{duration:.25},style:{marginBottom:`4px`},children:(0,g.jsx)(o,{w:`56px`,h:`40px`,align:`center`,justify:`center`,borderRadius:`md`,bg:`#4a7db5`,color:`white`,fontSize:`0.9rem`,fontWeight:700,children:e})},`out-${t}-${e}`))}),D.outStack.length===0&&(0,g.jsx)(l,{fontSize:`0.7rem`,color:`#c0b8b0`,fontStyle:`italic`,children:`empty`})]})]})]}),(0,g.jsxs)(o,{p:6,bg:`#f5f0eb`,borderRadius:`xl`,direction:`column`,gap:2,mt:4,children:[(0,g.jsxs)(o,{justify:`space-between`,align:`center`,children:[(0,g.jsxs)(l,{fontSize:`sm`,color:`#8b8589`,children:[`Front: `,(0,g.jsx)(r,{as:`span`,fontWeight:700,color:`#1a1a2e`,children:D.frontVal??`—`})]}),(0,g.jsx)(u,{bg:O.color,color:`white`,px:3,py:1,borderRadius:`full`,fontSize:`0.65rem`,children:O.label})]}),(0,g.jsxs)(l,{color:`#6b6350`,fontSize:`md`,fontStyle:`italic`,borderLeft:`4px solid`,borderColor:`#c9952e`,pl:4,py:1,children:[`"`,D.explanation,`"`]})]})]}),(0,g.jsx)(m,{traceTitle:`Sweep & Trace: Queue Using Stacks`,steps:v,code:y}),(0,g.jsxs)(r,{children:[(0,g.jsx)(p,{num:7,title:`Implement`,mb:2}),(0,g.jsx)(i,{size:`sm`,mb:4,color:`#6b6350`,children:`JS Code`}),(0,g.jsx)(f,{bruteForceCode:x,optimizedCode:S,activeLines:D.activeLines})]})]})}export{T as QueueUsingStacksVisualizer};
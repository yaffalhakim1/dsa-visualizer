import { HashRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { HomePage } from "@/components/HomePage";
import { SlidingWindowVisualizer } from "@/components/SlidingWindowVisualizer";
import { TwoSumVisualizer } from "@/components/TwoSumVisualizer";
import { PrefixSumVisualizer } from "@/components/PrefixSumVisualizer";
import { LinkedListVisualizer } from "@/components/LinkedListVisualizer";
import { StackQueueVisualizer } from "@/components/StackQueueVisualizer";
import { TreeVisualizer } from "@/components/TreeVisualizer";
import { InterviewGuide } from "@/components/InterviewGuide";
import { BinarySearchVisualizer } from "@/components/BinarySearchVisualizer";
import { BacktrackingVisualizer } from "@/components/BacktrackingVisualizer";
import { ReverseIntegerVisualizer } from "@/components/ReverseIntegerVisualizer";
import { MinStackVisualizer } from "@/components/MinStackVisualizer";
import { DailyTemperaturesVisualizer } from "@/components/DailyTemperaturesVisualizer";
import { EvaluateRPNVisualizer } from "@/components/EvaluateRPNVisualizer";
import { QueueUsingStacksVisualizer } from "@/components/QueueUsingStacksVisualizer";
import { PatternsMistakes } from "@/components/PatternsMistakes";
import { TwoSumHashMap } from "@/components/TwoSumHashMap";
import { StockProfitVisualizer } from "@/components/StockProfitVisualizer";
import { ProductExceptSelfVisualizer } from "@/components/ProductExceptSelfVisualizer";
import { MaximumSubarrayVisualizer } from "@/components/MaximumSubarrayVisualizer";
import { ContainsDuplicateVisualizer } from "@/components/ContainsDuplicateVisualizer";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="ch6/two-sum" element={<TwoSumHashMap />} />
          <Route path="ch6/best-time" element={<StockProfitVisualizer />} />
          <Route path="ch6/product-except-self" element={<ProductExceptSelfVisualizer />} />
          <Route path="ch6/maximum-subarray" element={<MaximumSubarrayVisualizer />} />
          <Route path="ch6/contains-duplicate" element={<ContainsDuplicateVisualizer />} />
          <Route path="sliding-window" element={<SlidingWindowVisualizer />} />
          <Route path="arrays-strings" element={<TwoSumVisualizer />} />
          <Route path="prefix-sums" element={<PrefixSumVisualizer />} />
          <Route path="linked-lists" element={<LinkedListVisualizer />} />
          <Route path="ch8/valid-parentheses" element={<StackQueueVisualizer />} />
          <Route path="ch8/min-stack" element={<MinStackVisualizer />} />
          <Route path="ch8/daily-temperatures" element={<DailyTemperaturesVisualizer />} />
          <Route path="ch8/evaluate-rpn" element={<EvaluateRPNVisualizer />} />
          <Route path="ch8/queue-using-stacks" element={<QueueUsingStacksVisualizer />} />
          <Route path="trees" element={<TreeVisualizer />} />
          <Route path="binary-search" element={<BinarySearchVisualizer />} />
          <Route path="backtracking" element={<BacktrackingVisualizer />} />
          <Route path="reverse-integer" element={<ReverseIntegerVisualizer />} />
          <Route path="patterns-mistakes" element={<PatternsMistakes />} />
          <Route path="interview-workflow" element={<InterviewGuide />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;

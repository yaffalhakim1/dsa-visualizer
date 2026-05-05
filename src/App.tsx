import { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Flex, Spinner } from "@chakra-ui/react";
import { MainLayout } from "@/layouts/MainLayout";
import { HomePage } from "@/components/HomePage";
import { InterviewGuide } from "@/components/InterviewGuide";
import { PatternsMistakes } from "@/components/PatternsMistakes";

const SlidingWindowVisualizer = lazy(() => import("@/components/SlidingWindowVisualizer").then(m => ({ default: m.SlidingWindowVisualizer })));
const TwoSumVisualizer = lazy(() => import("@/components/TwoSumVisualizer").then(m => ({ default: m.TwoSumVisualizer })));
const PrefixSumVisualizer = lazy(() => import("@/components/PrefixSumVisualizer").then(m => ({ default: m.PrefixSumVisualizer })));
const LinkedListVisualizer = lazy(() => import("@/components/LinkedListVisualizer").then(m => ({ default: m.LinkedListVisualizer })));
const StackQueueVisualizer = lazy(() => import("@/components/StackQueueVisualizer").then(m => ({ default: m.StackQueueVisualizer })));
const TreeVisualizer = lazy(() => import("@/components/TreeVisualizer").then(m => ({ default: m.TreeVisualizer })));
const BinarySearchVisualizer = lazy(() => import("@/components/BinarySearchVisualizer").then(m => ({ default: m.BinarySearchVisualizer })));
const BacktrackingVisualizer = lazy(() => import("@/components/BacktrackingVisualizer").then(m => ({ default: m.BacktrackingVisualizer })));
const ReverseIntegerVisualizer = lazy(() => import("@/components/ReverseIntegerVisualizer").then(m => ({ default: m.ReverseIntegerVisualizer })));
const MinStackVisualizer = lazy(() => import("@/components/MinStackVisualizer").then(m => ({ default: m.MinStackVisualizer })));
const DailyTemperaturesVisualizer = lazy(() => import("@/components/DailyTemperaturesVisualizer").then(m => ({ default: m.DailyTemperaturesVisualizer })));
const EvaluateRPNVisualizer = lazy(() => import("@/components/EvaluateRPNVisualizer").then(m => ({ default: m.EvaluateRPNVisualizer })));
const QueueUsingStacksVisualizer = lazy(() => import("@/components/QueueUsingStacksVisualizer").then(m => ({ default: m.QueueUsingStacksVisualizer })));
const TwoSumHashMap = lazy(() => import("@/components/TwoSumHashMap").then(m => ({ default: m.TwoSumHashMap })));
const StockProfitVisualizer = lazy(() => import("@/components/StockProfitVisualizer").then(m => ({ default: m.StockProfitVisualizer })));
const ProductExceptSelfVisualizer = lazy(() => import("@/components/ProductExceptSelfVisualizer").then(m => ({ default: m.ProductExceptSelfVisualizer })));
const MaximumSubarrayVisualizer = lazy(() => import("@/components/MaximumSubarrayVisualizer").then(m => ({ default: m.MaximumSubarrayVisualizer })));
const ContainsDuplicateVisualizer = lazy(() => import("@/components/ContainsDuplicateVisualizer").then(m => ({ default: m.ContainsDuplicateVisualizer })));
const NextPermutationVisualizer = lazy(() => import("@/components/NextPermutationVisualizer").then(m => ({ default: m.NextPermutationVisualizer })));
const SearchRotatedArrayVisualizer = lazy(() => import("@/components/SearchRotatedArrayVisualizer").then(m => ({ default: m.SearchRotatedArrayVisualizer })));
const FirstLastPositionVisualizer = lazy(() => import("@/components/FirstLastPositionVisualizer").then(m => ({ default: m.FirstLastPositionVisualizer })));
const KokoEatingBananasVisualizer = lazy(() => import("@/components/KokoEatingBananasVisualizer").then(m => ({ default: m.KokoEatingBananasVisualizer })));
const Search2DMatrixVisualizer = lazy(() => import("@/components/Search2DMatrixVisualizer").then(m => ({ default: m.Search2DMatrixVisualizer })));
const ArraysStringsConcept = lazy(() => import("@/components/ArraysStringsConcept").then(m => ({ default: m.ArraysStringsConcept })));
const StacksQueuesConcept = lazy(() => import("@/components/StacksQueuesConcept").then(m => ({ default: m.StacksQueuesConcept })));
const BinarySearchConcept = lazy(() => import("@/components/BinarySearchConcept").then(m => ({ default: m.BinarySearchConcept })));
const LinkedListsConcept = lazy(() => import("@/components/LinkedListsConcept").then(m => ({ default: m.LinkedListsConcept })));
const TreesConcept = lazy(() => import("@/components/TreesConcept").then(m => ({ default: m.TreesConcept })));
const SlidingWindowConcept = lazy(() => import("@/components/SlidingWindowConcept").then(m => ({ default: m.SlidingWindowConcept })));
const BacktrackingConcept = lazy(() => import("@/components/BacktrackingConcept").then(m => ({ default: m.BacktrackingConcept })));
const DPConcept = lazy(() => import("@/components/DPConcept").then(m => ({ default: m.DPConcept })));
const MathConcept = lazy(() => import("@/components/MathConcept").then(m => ({ default: m.MathConcept })));

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="ch6/two-sum" element={
            <Suspense fallback={<PageLoader />}><TwoSumHashMap /></Suspense>
          } />
          <Route path="ch6/concept" element={
            <Suspense fallback={<PageLoader />}><ArraysStringsConcept /></Suspense>
          } />
          <Route path="ch6/best-time" element={
            <Suspense fallback={<PageLoader />}><StockProfitVisualizer /></Suspense>
          } />
          <Route path="ch6/product-except-self" element={
            <Suspense fallback={<PageLoader />}><ProductExceptSelfVisualizer /></Suspense>
          } />
          <Route path="ch6/maximum-subarray" element={
            <Suspense fallback={<PageLoader />}><MaximumSubarrayVisualizer /></Suspense>
          } />
          <Route path="ch6/contains-duplicate" element={
            <Suspense fallback={<PageLoader />}><ContainsDuplicateVisualizer /></Suspense>
          } />
          <Route path="ch6/next-permutation" element={
            <Suspense fallback={<PageLoader />}><NextPermutationVisualizer /></Suspense>
          } />
          <Route path="ch7/concept" element={
            <Suspense fallback={<PageLoader />}><LinkedListsConcept /></Suspense>
          } />
          <Route path="ch10/concept" element={
            <Suspense fallback={<PageLoader />}><TreesConcept /></Suspense>
          } />
          <Route path="ch14/concept" element={
            <Suspense fallback={<PageLoader />}><SlidingWindowConcept /></Suspense>
          } />
          <Route path="ch15/concept" element={
            <Suspense fallback={<PageLoader />}><BacktrackingConcept /></Suspense>
          } />
          <Route path="ch17/concept" element={
            <Suspense fallback={<PageLoader />}><DPConcept /></Suspense>
          } />
          <Route path="ch20/concept" element={
            <Suspense fallback={<PageLoader />}><MathConcept /></Suspense>
          } />
          <Route path="sliding-window" element={
            <Suspense fallback={<PageLoader />}><SlidingWindowVisualizer /></Suspense>
          } />
          <Route path="arrays-strings" element={
            <Suspense fallback={<PageLoader />}><TwoSumVisualizer /></Suspense>
          } />
          <Route path="prefix-sums" element={
            <Suspense fallback={<PageLoader />}><PrefixSumVisualizer /></Suspense>
          } />
          <Route path="linked-lists" element={
            <Suspense fallback={<PageLoader />}><LinkedListVisualizer /></Suspense>
          } />
          <Route path="ch8/valid-parentheses" element={
            <Suspense fallback={<PageLoader />}><StackQueueVisualizer /></Suspense>
          } />
          <Route path="ch8/concept" element={
            <Suspense fallback={<PageLoader />}><StacksQueuesConcept /></Suspense>
          } />
          <Route path="ch8/min-stack" element={
            <Suspense fallback={<PageLoader />}><MinStackVisualizer /></Suspense>
          } />
          <Route path="ch8/daily-temperatures" element={
            <Suspense fallback={<PageLoader />}><DailyTemperaturesVisualizer /></Suspense>
          } />
          <Route path="ch8/evaluate-rpn" element={
            <Suspense fallback={<PageLoader />}><EvaluateRPNVisualizer /></Suspense>
          } />
          <Route path="ch8/queue-using-stacks" element={
            <Suspense fallback={<PageLoader />}><QueueUsingStacksVisualizer /></Suspense>
          } />
          <Route path="trees" element={
            <Suspense fallback={<PageLoader />}><TreeVisualizer /></Suspense>
          } />
          <Route path="ch13/concept" element={
            <Suspense fallback={<PageLoader />}><BinarySearchConcept /></Suspense>
          } />
          <Route path="binary-search" element={
            <Suspense fallback={<PageLoader />}><BinarySearchVisualizer /></Suspense>
          } />
          <Route path="ch13/search-rotated" element={
            <Suspense fallback={<PageLoader />}><SearchRotatedArrayVisualizer /></Suspense>
          } />
          <Route path="ch13/first-last-position" element={
            <Suspense fallback={<PageLoader />}><FirstLastPositionVisualizer /></Suspense>
          } />
          <Route path="ch13/koko-eating-bananas" element={
            <Suspense fallback={<PageLoader />}><KokoEatingBananasVisualizer /></Suspense>
          } />
          <Route path="ch13/search-2d-matrix" element={
            <Suspense fallback={<PageLoader />}><Search2DMatrixVisualizer /></Suspense>
          } />
          <Route path="backtracking" element={
            <Suspense fallback={<PageLoader />}><BacktrackingVisualizer /></Suspense>
          } />
          <Route path="reverse-integer" element={
            <Suspense fallback={<PageLoader />}><ReverseIntegerVisualizer /></Suspense>
          } />
          <Route path="patterns-mistakes" element={<PatternsMistakes />} />
          <Route path="interview-workflow" element={<InterviewGuide />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

function PageLoader() {
  return (
    <Flex justify="center" align="center" minH="calc(100vh - 64px)" bg="#f5f0eb">
      <Spinner color="#c9952e" size="xl" borderWidth="3px" />
    </Flex>
  );
}

export default App;

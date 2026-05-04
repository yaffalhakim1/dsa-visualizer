import { Mafs, Coordinates, useMovablePoint, Text, Polygon, Theme } from "mafs";
import { useMemo } from "react";

// Chapter 14: Sliding Window Mental Model
// Logic: A window keeps a contiguous segment in focus. 
// Instead of recomputing from scratch, you update the running state as the window moves.

const DATA = [1, 2, 3, 4, 5];

export function SlidingWindowVisualizer() {
  // Map Array Index i to x = i, y = 0
  const left = useMovablePoint([0, 0], {
    constrain: ([x]) => [Math.max(0, Math.min(Math.round(x), right.x)), 0],
    color: Theme.blue,
  });

  const right = useMovablePoint([2, 0], {
    constrain: ([x]) => [Math.max(left.x, Math.min(Math.round(x), DATA.length - 1)), 0],
    color: Theme.red,
  });

  const windowIndices = useMemo(() => {
    const start = Math.round(left.x);
    const end = Math.round(right.x);
    return { start, end };
  }, [left.x, right.x]);

  const currentSum = useMemo(() => {
    return DATA.slice(windowIndices.start, windowIndices.end + 1).reduce((a, b) => a + b, 0);
  }, [windowIndices]);

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-xl bg-white/5 shadow-sm">
      <h2 className="text-xl font-bold">Sliding Window (Chapter 14)</h2>
      
      <Mafs height={300} width={600} viewBox={{ x: [-1, 5], y: [-1, 1] }}>
        <Coordinates.Cartesian subdivisions={false} />
        
        {/* Array Visualization */}
        {DATA.map((val, i) => (
          <Text key={i} x={i} y={0.3} attach="n">
            {val}
          </Text>
        ))}

        {/* Window Frame */}
        <Polygon
          points={[
            [left.x - 0.5, -0.5],
            [right.x + 0.5, -0.5],
            [right.x + 0.5, 0.5],
            [left.x - 0.5, 0.5],
          ]}
          color={Theme.violet}
          fillOpacity={0.2}
        />

        {/* Pointers */}
        {left.element}
        {right.element}

        <Text x={left.x} y={-0.6} attach="s" color={Theme.blue}>
          Left
        </Text>
        <Text x={right.x} y={-0.6} attach="s" color={Theme.red}>
          Right
        </Text>
      </Mafs>

      <div className="text-lg font-mono p-4 bg-black/10 rounded-lg">
        Window: <span className="text-blue-400">[{windowIndices.start}</span>...
        <span className="text-red-400">{windowIndices.end}]</span> | 
        Sum: <span className="text-violet-400">{currentSum}</span>
      </div>
      
      <p className="text-sm text-gray-500 max-w-md text-center italic">
        "Drag the Blue (Left) and Red (Right) handles to adjust the window bounds. 
        The Purple area represents the contiguous segment currently being summed."
      </p>
    </div>
  );
}

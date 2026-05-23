import React, { useState, useMemo, useCallback, useRef } from 'react';

const revenueData = [
  { day: 'Mon', revenue: 1400, orders: 4 },
  { day: 'Tue', revenue: 2100, orders: 6 },
  { day: 'Wed', revenue: 1800, orders: 5 },
  { day: 'Thu', revenue: 2800, orders: 8 },
  { day: 'Fri', revenue: 3500, orders: 10 },
  { day: 'Sat', revenue: 4200, orders: 12 },
  { day: 'Sun', revenue: 3100, orders: 9 },
];

const MARGIN = { top: 10, right: 20, bottom: 30, left: 60 };
const W = 800;
const H = 280;
const CHART_W = W - MARGIN.left - MARGIN.right;
const CHART_H = H - MARGIN.top - MARGIN.bottom;

const RevenueChart = () => {
  const totalRevenue = useMemo(() => revenueData.reduce((s, d) => s + d.revenue, 0), []);
  const totalOrders = useMemo(() => revenueData.reduce((s, d) => s + d.orders, 0), []);
  const bestDay = useMemo(() => revenueData.reduce((mx, d) => d.revenue > mx.revenue ? d : mx, revenueData[0]), []);

  const yMax = Math.ceil(Math.max(...revenueData.map(d => d.revenue)) / 1000) * 1000;
  const tickStep = yMax / 4;

  const xScale = useCallback((i: number) => MARGIN.left + (i / (revenueData.length - 1)) * CHART_W, []);
  const yScale = useCallback((v: number) => MARGIN.top + CHART_H - (v / yMax) * CHART_H, [yMax]);

  const linePath = revenueData.map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(i)},${yScale(d.revenue)}`).join(' ');
  const areaPath = `${linePath} L${xScale(revenueData.length - 1)},${MARGIN.top + CHART_H} L${xScale(0)},${MARGIN.top + CHART_H} Z`;

  const yTicks = useMemo(() =>
    Array.from({ length: 5 }, (_, i) => tickStep * i),
  [tickStep]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGRectElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const vbX = ((e.clientX - rect.left) / rect.width) * W;

    let nearest = 0;
    let minDist = Infinity;
    revenueData.forEach((_, i) => {
      const dist = Math.abs(xScale(i) - vbX);
      if (dist < minDist) { minDist = dist; nearest = i; }
    });
    setActiveIndex(nearest);
  }, [xScale]);

  const handleMouseLeave = useCallback(() => setActiveIndex(null), []);

  return (
    <div className="backdrop-blur-sm border rounded-xl p-6" style={{
      background: 'hsl(var(--card))',
      borderColor: 'hsl(var(--border))'
    }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
            Revenue This Week
          </h3>
          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Mon - Sun overview
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold" style={{ color: 'hsl(var(--primary))' }}>
            Ksh {totalRevenue.toLocaleString()}
          </p>
          <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {totalOrders} orders • Best: {bestDay.day} (Ksh {bestDay.revenue.toLocaleString()})
          </p>
        </div>
      </div>

      <div ref={containerRef} className="relative w-full" style={{ height: '280px' }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="svgRevenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(330 80% 60%)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="hsl(330 80% 60%)" stopOpacity={0} />
            </linearGradient>
          </defs>

          {yTicks.map(v => (
            <line
              key={v}
              x1={MARGIN.left} y1={yScale(v)}
              x2={MARGIN.left + CHART_W} y2={yScale(v)}
              stroke="hsl(var(--border) / 0.5)" strokeDasharray="3 3"
            />
          ))}

          <path d={areaPath} fill="url(#svgRevenueGradient)" />
          <path d={linePath} fill="none" stroke="hsl(var(--primary))" strokeWidth={2} />

          {revenueData.map((d, i) => (
            <circle
              key={d.day}
              cx={xScale(i)} cy={yScale(d.revenue)}
              r={activeIndex === i ? 6 : 3}
              fill={activeIndex === i ? 'hsl(var(--primary))' : 'hsl(var(--card))'}
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              style={{ transition: 'r 0.15s, fill 0.15s' }}
            />
          ))}

          {revenueData.map((d, i) => (
            <text
              key={d.day}
              x={xScale(i)} y={MARGIN.top + CHART_H + 20}
              textAnchor="middle"
              fill={activeIndex === i ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))'}
              fontSize={12}
              fontWeight={activeIndex === i ? '600' : '400'}
            >
              {d.day}
            </text>
          ))}

          {yTicks.map(v => (
            <text
              key={v}
              x={MARGIN.left - 8} y={yScale(v) + 4}
              textAnchor="end"
              fill="hsl(var(--muted-foreground))"
              fontSize={11}
            >
              Ksh {v.toLocaleString()}
            </text>
          ))}

          <line x1={MARGIN.left} y1={MARGIN.top + CHART_H} x2={MARGIN.left + CHART_W} y2={MARGIN.top + CHART_H} stroke="hsl(var(--border))" />
          <line x1={MARGIN.left} y1={MARGIN.top} x2={MARGIN.left} y2={MARGIN.top + CHART_H} stroke="hsl(var(--border))" />

          <rect
            x={MARGIN.left} y={MARGIN.top}
            width={CHART_W} height={CHART_H}
            fill="transparent"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
        </svg>

        {activeIndex !== null && (
          <div
            className="p-3 rounded-lg border shadow-lg whitespace-nowrap z-10"
            style={{
              position: 'absolute',
              left: `${(xScale(activeIndex) / W) * 100}%`,
              top: `${(yScale(revenueData[activeIndex].revenue) / H) * 100}%`,
              transform: 'translate(-50%, calc(-100% - 8px))',
              pointerEvents: 'none',
              background: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))',
            }}
          >
            <p className="font-semibold text-sm" style={{ color: 'hsl(var(--foreground))' }}>
              {revenueData[activeIndex].day}
            </p>
            <p className="text-sm" style={{ color: 'hsl(var(--primary))' }}>
              Revenue: Ksh {revenueData[activeIndex].revenue.toLocaleString()}
            </p>
            <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Orders: {revenueData[activeIndex].orders}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueChart;

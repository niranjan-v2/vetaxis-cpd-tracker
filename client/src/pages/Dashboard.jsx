import { useMemo } from "react";
import { useSelector } from "react-redux";
import GreetingCard from "../components/GreetingCard";

function ProgressRing({ earned, required }) {
  const size = 180;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = required > 0 ? Math.min(earned / required, 1) : 0;
  const offset = circumference - percent * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth={strokeWidth}
      />
      {/* Progress */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#2e8e61"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 0.8s ease" }}
      />
      {/* Center text */}
      <text
        x={size / 2}
        y={size / 2 - 10}
        textAnchor="middle"
        fill="#010143"
        fontSize="28"
        fontWeight="700"
        fontFamily="'Cormorant Garamond', Georgia, serif"
      >
        {earned}
      </text>
      <text
        x={size / 2}
        y={size / 2 + 14}
        textAnchor="middle"
        fill="#9ca3af"
        fontSize="13"
        fontWeight="400"
        fontFamily="'DM Sans', sans-serif"
      >
        / {required} pts
      </text>
    </svg>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const cpd = currentUser?.cpd;

  const earned = cpd?.earnedPoints ?? 0;
  const required = cpd?.requiredPoints ?? 0;
  const remaining = Math.max(required - earned, 0);
  const percent = required > 0 ? Math.round((earned / required) * 100) : 0;

  const periodStart = formatDate(cpd?.periodStart);
  const periodEnd = formatDate(cpd?.periodEnd);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .dashboard-root {
          min-height: 100vh;
          background: #f5f4f1;
          font-family: 'DM Sans', sans-serif;
          padding: 2.5rem 2rem;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
          align-items: start;
        }

        .progress-card {
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid #e5e7eb;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .progress-card-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #010143;
          text-align: center;
          margin: 0;
        }

        .progress-card-period {
          font-size: 0.78rem;
          color: #9ca3af;
          text-align: center;
          margin: 0;
          font-weight: 400;
        }

        .progress-legend {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
          width: 100%;
          border-top: 1px solid #f3f4f6;
          padding-top: 1.25rem;
        }

        .legend-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
        }

        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .legend-label {
          font-size: 0.72rem;
          color: #9ca3af;
          font-weight: 400;
        }

        .legend-value {
          font-size: 1rem;
          font-weight: 700;
          color: #010143;
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        @media (max-width: 768px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="dashboard-root">
        <div className="dashboard-grid">

          {/* Left — Greeting card */}
          <GreetingCard />

          {/* Right — CPD Progress */}
          <div className="progress-card">
            <div>
              <p className="progress-card-title">CPD Progress {new Date().getFullYear()}</p>
              <p className="progress-card-period">{periodStart} — {periodEnd}</p>
            </div>

            <ProgressRing earned={earned} required={required} />

            <div className="progress-legend">
              <div className="legend-item">
                <div className="legend-dot" style={{ background: "#2e8e61" }} />
                <span className="legend-label">Earned</span>
                <span className="legend-value">{earned}</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{ background: "#9ca3af" }} />
                <span className="legend-label">Remaining</span>
                <span className="legend-value">{remaining}</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{ background: "#010143" }} />
                <span className="legend-label">Required</span>
                <span className="legend-value">{required}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
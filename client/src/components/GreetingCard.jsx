import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CpdShield } from "./CpdBadge";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function getProgressMessage(percent) {
  if (percent === 0) return "Let's get started on your CPD requirements.";
  if (percent < 25) return "You've made a start. Keep building momentum.";
  if (percent < 50) return "You're making progress. Keep up the good work.";
  if (percent < 75)
    return "You're over halfway through your annual requirement. Keep up the momentum.";
  if (percent < 100)
    return "Almost there! You're close to completing your requirement.";
  return "You've completed your CPD requirement for this period. Well done!";
}

function getMonthsRemaining(periodEnd) {
  if (!periodEnd) return null;
  const now = new Date();
  const end = new Date(periodEnd);
  const months = Math.max(
    0,
    (end.getFullYear() - now.getFullYear()) * 12 +
      (end.getMonth() - now.getMonth())
  );
  return months;
}

export default function GreetingCard() {
  const { currentUser } = useSelector((state) => state.user);

  const greeting = useMemo(() => getGreeting(), []);

  const title = currentUser?.profile?.title ?? "";
  const firstName = currentUser?.profile?.fullName?.trim().split(" ")[0] ?? "";
  const board = currentUser?.profile?.registration?.board ?? null;
  const cpd = currentUser?.cpd;

  const earnedPoints = cpd?.earnedPoints ?? 0;
  const requiredPoints = cpd?.requiredPoints ?? 0;
  const percent =
    requiredPoints > 0
      ? Math.round((earnedPoints / requiredPoints) * 100)
      : 0;
  const monthsRemaining = getMonthsRemaining(cpd?.periodEnd);
  const progressMessage = getProgressMessage(percent);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        .greeting-card {
          background: #010143;
          border-radius: 20px;
          padding: 36px 40px 32px;
          color: #fff;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 240px;
          width: 100%;
        }

        .greeting-card::before {
          content: '';
          position: absolute;
          top: -80px;
          right: -60px;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: rgba(46, 142, 97, 0.12);
          pointer-events: none;
        }

        .greeting-card::after {
          content: '';
          position: absolute;
          bottom: -50px;
          left: 40%;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: rgba(46, 142, 97, 0.06);
          pointer-events: none;
        }

        .greeting-heading {
          font-family: 'Newsreader', Georgia, serif;
          font-size: 28px;
          font-weight: 500;
          line-height: 1.3;
          letter-spacing: -0.5px;
          position: relative;
          z-index: 1;
          margin: 0;
          color: #ffffff;
        }

        .greeting-heading-muted {
          color: rgba(255, 255, 255, 0.5);
        }

        .greeting-subtitle {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.55);
          margin-top: 8px;
          line-height: 1.5;
          position: relative;
          z-index: 1;
        }

        .greeting-board {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 12px 16px;
          position: relative;
          z-index: 1;
          margin-top: 20px;
        }

        .greeting-board-icon {
          flex-shrink: 0;
          opacity: 0.9;
          display: flex;
          align-items: center;
        }

        .greeting-board-text {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.4;
        }

        .greeting-board-text strong {
          color: rgba(255, 255, 255, 0.95);
          font-weight: 600;
        }
      `}</style>

      <div className="greeting-card">
        <div>
          <h1 className="greeting-heading">
            {greeting}, {title === 'Dr' ? title+'. ' : ''} {firstName}{" "}
            <span className="greeting-heading-muted">
              — here's your CPD snapshot
            </span>
          </h1>

          <p className="greeting-subtitle">
            You're {percent}% through your annual requirement.{" "}
            {progressMessage}
          </p>
        </div>

        {board && (
          <div className="greeting-board">
            <span className="greeting-board-icon">
              <CpdShield size="sm" />
            </span>
            <div className="greeting-board-text">
              Registered with <strong>{board}</strong>
              {monthsRemaining !== null && (
                <>
                  {" "}
                  &middot; Renewal in{" "}
                  <strong>{monthsRemaining} months</strong>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
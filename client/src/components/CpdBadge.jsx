export const CpdShield = ({ size = "md" }) => {
  const dimensions = {
    sm: { width: 16, height: 19 },
    md: { width: 22, height: 26 },
    lg: { width: 32, height: 38 },
    xl: { width: 48, height: 57 },
  };

  const d = dimensions[size];

  return (
    <svg
      width={d.width}
      height={d.height}
      viewBox="0 0 22 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 3C0 1.34315 1.34315 0 3 0H19C20.6569 0 22 1.34315 22 3V17L11 26L0 17V3Z"
        fill="rgb(5,38,125)"
      />
      <text
        x="11"
        y="14"
        textAnchor="middle"
        fill="white"
        fontSize="7"
        fontWeight="800"
        fontFamily="'DM Sans', sans-serif"
        letterSpacing="0.5"
      >
        CPD
      </text>
    </svg>
  );
};

export default function CpdBadge({ points, size = "md", showLabel = true }) {
  const textSize = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  const subTextSize = {
    sm: "text-xs",
    md: "text-xs",
    lg: "text-sm",
    xl: "text-sm",
  };

  return (
    <div className="flex items-center gap-1.5">
      <CpdShield size={size} />
      {showLabel && (
        <span className={`${textSize[size]} font-semibold text-[#010143]`}>
          {points ?? 0}
          <span className={`${subTextSize[size]} font-normal text-gray-400 ml-1`}>
            pts
          </span>
        </span>
      )}
    </div>
  );
}
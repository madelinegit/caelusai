export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Caelus AI logo"
    >
      <text
        x="52"
        y="83"
        fontFamily="Arial Black, Helvetica Neue, sans-serif"
        fontWeight="900"
        fontSize="92"
        fill="#c8ff3e"
        stroke="#000000"
        strokeWidth="3"
        strokeLinejoin="round"
        textAnchor="middle"
        paintOrder="stroke fill"
      >C</text>
    </svg>
  );
}

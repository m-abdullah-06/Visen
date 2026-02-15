import { cn } from "~/lib/utils";

const ATS = ({
  score,
  suggestions,
}: {
  score: number;
  suggestions: { type: "good" | "improve"; tip: string }[];
}) => {
  const gradientClass =
    score > 69
      ? "from-green-500/20 to-green-500/5"
      : score > 49
        ? "from-yellow-500/20 to-yellow-500/5"
        : "from-red-500/20 to-red-500/5";

  const borderClass =
    score > 69
      ? "border-green-400/30"
      : score > 49
        ? "border-yellow-400/30"
        : "border-red-400/30";

  return (
    <div
      className={cn(
        "rounded-2xl w-full p-8 flex flex-col gap-4 border",
        "bg-gradient-to-b",
        gradientClass,
        borderClass,
      )}
      style={{
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="flex flex-row gap-4 items-center">
        <img
          src={
            score > 69
              ? "/icons/ats-good.svg"
              : score > 49
                ? "/icons/ats-warning.svg"
                : "/icons/ats-bad.svg"
          }
          alt="ATS"
          className="w-10 h-10"
        />
        <p className="text-2xl font-semibold text-white">
          ATS Score - {score}/100
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-medium text-xl text-white">
          How well does your resume pass through Applicant Tracking Systems?
        </p>
        <p className="text-lg text-gray-300">
          Your resume was scanned like an employer would. Here's how it
          performed:
        </p>
        {suggestions.map((suggestion, index) => (
          <div className="flex flex-row gap-2 items-center" key={index}>
            <img
              src={
                suggestion.type === "good"
                  ? "/icons/check.svg"
                  : "/icons/warning.svg"
              }
              alt="ATS"
              className="w-4 h-4"
            />
            <p className="text-lg text-gray-300">{suggestion.tip}</p>
          </div>
        ))}
        <p className="text-lg text-gray-300">
          Want a better score? Improve your resume by applying the suggestions
          listed below.
        </p>
      </div>
    </div>
  );
};

export default ATS;

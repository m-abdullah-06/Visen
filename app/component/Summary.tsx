import ScoreGauge from "~/component/ScoreGuage";

const ScoreBadge = ({ score }: { score: number }) => {
  const badgeText =
    score > 69 ? "Strong" : score > 49 ? "Good Start" : "Needs Work";

  const badgeStyle =
    score > 69
      ? {
          background: "rgba(34, 197, 94, 0.2)",
          border: "1px solid rgba(34, 197, 94, 0.4)",
          color: "#4ade80",
        }
      : score > 49
        ? {
            background: "rgba(234, 179, 8, 0.2)",
            border: "1px solid rgba(234, 179, 8, 0.4)",
            color: "#facc15",
          }
        : {
            background: "rgba(239, 68, 68, 0.2)",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            color: "#f87171",
          };

  return (
    <div className="score-badge px-3 py-1 rounded-full" style={badgeStyle}>
      <p className="text-xs font-semibold">{badgeText}</p>
    </div>
  );
};

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score > 69
      ? "text-green-400"
      : score > 49
        ? "text-yellow-400"
        : "text-red-400";

  return (
    <div className="resume-summary">
      <div className="category">
        <div className="flex flex-row gap-2 items-center justify-center">
          <p className="text-2xl text-white">{title}</p>
          <ScoreBadge score={score} />
        </div>
        <p className="text-2xl text-white">
          <span className={textColor}>{score}</span>/100
        </p>
      </div>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="glass-card rounded-2xl w-full">
      <div className="flex flex-row max-sm:flex-col items-center p-4 gap-8">
        <ScoreGauge score={feedback.overallScore} />
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-white">Your Resume Score</h2>
          <p className="text-sm text-gray-400">
            This score is calculated based on the variables listed below.
          </p>
        </div>
      </div>
      <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
      <Category title="Content" score={feedback.content.score} />
      <Category title="Structure" score={feedback.structure.score} />
      <Category title="Skills" score={feedback.skills.score} />
    </div>
  );
};

export default Summary;

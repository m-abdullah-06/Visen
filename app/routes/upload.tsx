import React, { type FormEvent, useState } from "react";
import Navbar from "~/component/Navbar";
import FileUploader from "~/component/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import path from "node:path";
import { prepareInstructions } from "../../constants";

export const meta = () => [
  { title: "Visen | Upload Resume" },
  { name: "description", content: "AI-driven review of your resume" },
];

const Upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);
    setStatusText("Uploading File...");
    const uploadedFile = await fs.upload([file]);

    if (!uploadedFile) return setStatusText("Error: Failed to upload file");

    setStatusText("Initializing conversion from pdf to image...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file) return setStatusText("Error: Failed to convert image");

    setStatusText("Uploading the image...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setStatusText("Error: Failed to upload image");

    setStatusText("Gathering insights...");

    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText("Get Ready...");

    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription }),
    );
    if (!feedback) return setStatusText("Error: Failed to analyze");
    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;
    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText("Analysis complete, redirecting...");
    console.log(data);
    navigate(`/resume/${uuid}`);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!file) return;
    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-indigo-950 text-white">
      <style>{`
                @keyframes float {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-20px); }
                }
                
                .animate-float {
                  animation: float 6s ease-in-out infinite;
                }
                
                .gradient-text {
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                }
            `}</style>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-64 h-64 bg-indigo-600 rounded-full opacity-20 blur-3xl animate-float"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600 rounded-full opacity-20 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-600 rounded-full opacity-10 blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        <section className="main-section px-6 md:px-12">
          <div className="page-heading py-16 text-center max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              AI-Powered Insights to Make Your Resume{" "}
              <span className="gradient-text">Shine</span>
            </h1>
            {isProcessing ? (
              <div className="flex flex-col items-center gap-6">
                <h2 className="text-xl md:text-2xl text-gray-300">
                  {statusText}
                </h2>
                <div className="glass-card p-8 rounded-3xl">
                  <img
                    src="/images/resume-scan.gif"
                    className="w-full max-w-md"
                    alt="Processing"
                  />
                </div>
              </div>
            ) : (
              <h2 className="text-xl md:text-2xl text-gray-300">
                Drop your Resume for an ATS score and improvement tips
              </h2>
            )}

            {!isProcessing && (
              <form
                id="upload-form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 mt-12 max-w-2xl mx-auto"
              >
                <div className="form-div text-left">
                  <label
                    htmlFor="company-name"
                    className="text-gray-300 mb-2 block"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company-name"
                    placeholder="Company Name"
                    id="company-name"
                  />
                </div>
                <div className="form-div text-left">
                  <label
                    htmlFor="job-title"
                    className="text-gray-300 mb-2 block"
                  >
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="job-title"
                    placeholder="Job Title"
                    id="job-title"
                  />
                </div>
                <div className="form-div text-left">
                  <label
                    htmlFor="job-description"
                    className="text-gray-300 mb-2 block"
                  >
                    Job Description
                  </label>
                  <textarea
                    rows={5}
                    name="job-description"
                    placeholder="Job Description"
                    id="job-description"
                  />
                </div>
                <div className="form-div text-center">
                  <label
                    htmlFor="uploader"
                    className="text-gray-300 mb-2 block"
                  >
                    Upload Resume
                  </label>
                  <FileUploader onFileSelect={handleFileSelect} />
                </div>
                <button
                  className="primary-button mt-4 py-4 text-lg font-semibold"
                  type="submit"
                >
                  Get Started
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Upload;

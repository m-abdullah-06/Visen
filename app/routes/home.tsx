import type { Route } from "./+types/home";
import Navbar from "~/component/Navbar";
import {resumes} from "../../constants";
import {resume} from "react-dom/server";
import Resumecards from "~/component/resumecards";
import {usePuterStore} from "~/lib/puter";
import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Visen" },
    { name: "description", content: "Hire smarter, faster, better." },
  ];
}

export default function Home() {
    const { auth } = usePuterStore();
    const navigate = useNavigate();
    useEffect(() => {
        if (!auth.isAuthenticated) navigate('/auth?next=/');
    }, [auth.isAuthenticated])

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar/>

      <section className="main-section">
        <div className="page-heading py-16">
            <h1>Empowering Careers with AI-Driven Resume Insights</h1>
            <h2>Precision Feedback for Better Career Moves</h2>
        </div>
          {resumes.length > 0 && (
          <div className="resumes-section">
              {resumes.map((resume) => (
                  <Resumecards key={resume.id} resume={resume}/>
              ))}
          </div>

      )}
    </section>




  </main>;
}

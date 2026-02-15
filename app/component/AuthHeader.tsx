import { Link } from "react-router";

const AuthHeader = () => {
  return (
    <header className="relative z-10 py-6">
      <div className="flex items-center justify-center">
        <Link to="/" className="flex items-center space-x-3">
          <h1 className="text-3xl font-black tracking-wider text-white">
            VISEN
          </h1>
        </Link>
      </div>
    </header>
  );
};

export default AuthHeader;

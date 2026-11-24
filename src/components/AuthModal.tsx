import { LockIcon, MailIcon, UserIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { DUMMY_USER } from "../assets/assets";

const AuthModal = () => {
  const [user, setUser] = useState<typeof DUMMY_USER | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "instructor">("student");
  const [authModalMode, setAuthModalMode] = useState<"login" | "register">(
    "login",
  );
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setUser(DUMMY_USER);
  };

  if (user) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <img src="/logo.svg" alt="Logo" className="h-8 w-full mb-10 mt-6" />
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-md"
        >
          <XIcon className="size-4" />
        </button>

        {/* Tabs */}
        <div className="grid grid-cols-2 gap-1 p-1 mb-5">
          <button
            onClick={() => setAuthModalMode("login")}
            type="button"
            className={`py-1.5 text-xs font-medium rounded-md transition ${authModalMode === "login" ? "bg-white border border-zinc-200" : "text-secondary/65 hover:text-secondary"}`}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthModalMode("register")}
            type="button"
            className={`py-1.5 text-xs font-medium rounded-md transition ${authModalMode === "register" ? "bg-white border border-zinc-200" : "text-secondary/65 hover:text-secondary"}`}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {authModalMode === "register" && (
            <div>
              <label className="block text-xs font-medium mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-2.5 size-4 text-secondary/45" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ahmad Khan"
                  className="input-icon"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium mb-1">
              Email Address
            </label>
            <div className="relative">
              <MailIcon className="absolute left-3 top-2.5 size-4 text-secondary/45" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="input-icon"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">Password</label>
            <div className="relative">
              <LockIcon className="absolute left-3 top-2.5 size-4 text-secondary/45" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-icon"
              />
            </div>
          </div>

          {authModalMode === "register" && (
            <div>
              <label className="block text-xs font-medium mb-1.5">
                I want to:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`py-1.5 px-2 text-xs font-medium rounded-lg border text-center transition ${role === "student" ? "border-primary bg-indigo-50 text-primary" : "border-zinc-200 bg-zinc-50 text-secondary/80 hover:text-secondary"}`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setRole("instructor")}
                  className={`py-1.5 px-2 text-xs font-medium rounded-lg border text-center transition ${role === "instructor" ? "border-primary bg-indigo-50 text-primary" : "border-zinc-200 bg-zinc-50 text-secondary/80 hover:text-secondary"}`}
                >
                  Instructor
                </button>
              </div>
            </div>
          )}

          <button type="submit" className="btn-primary">
            {authModalMode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;

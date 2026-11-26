import { ClockIcon, LockIcon, PlayIcon } from "lucide-react";
import type { Lecture } from "./CourseEnrollCard";
import { Link } from "react-router-dom";

interface CourseCurriculumListProps {
  courseId: string;
  lectures: Lecture[];
  isEnrolled: boolean;
  onPreview: (video: { title: string; url: string }) => void;
}

const CourseCurriculumList = ({
  courseId,
  lectures,
  isEnrolled,
  onPreview,
}: CourseCurriculumListProps) => {
  return (
    <div className="space-y-2">
      {lectures && lectures.length > 0 ? (
        lectures.map((lecture, index) => (
          <div key={lecture._id || index} className="lecture-row">
            <div className="flex items-center gap-3">
              <div className="size-6 rounded-full bg-secondary/5 flex items-center justify-center text-xs font-medium">
                {index + 1}{" "}
              </div>
              <div>
                <p>{lecture.title}</p>
                <div className="flex items-center gap-1.5 text-xs text-secondary/45 mt-1">
                  <ClockIcon className="size-3" />
                  <span>{lecture.duration || "5 mins"}</span>
                </div>
              </div>
            </div>
            <div>
              {lecture.freePreview ? (
                <button
                  className="btn-preview"
                  onClick={() =>
                    onPreview({ title: lecture.title, url: lecture.videoUrl })
                  }
                >
                  <PlayIcon strokeWidth={2.5} className="size-2.5" />
                  Preview
                </button>
              ) : isEnrolled ? (
                <Link
                  to={`/learn/${courseId}?lecture=${lecture._id}`}
                  className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
                >
                  <PlayIcon strokeWidth={2.5} className="size-2.5" />
                  Play
                </Link>
              ) : (
                <div className="flex items-center gap-1 text-secondary/45 text-xs">
                  <LockIcon className="size-3" />
                  Locked
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-xs text-secondary/45">No lectures uploaded yet.</p>
      )}
    </div>
  );
};

export default CourseCurriculumList;

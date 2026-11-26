import { CheckIcon, PlayIcon } from "lucide-react";
import { DUMMY_FEATURES } from "../../assets/assets";

export interface Lecture {
  _id: string;
  title: string;
  videoUrl: string;
  duration?: string;
  freePreview?: boolean;
}

export interface CourseDetailsData {
  _id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  price: number;
  thumbnail: string;
  instructorName: string;
  lectures: Lecture[];
  enrolledStudents: string[];
}

interface CourseEnrollProps {
  course: CourseDetailsData;
  isEnrolled: boolean;
  enrolling: boolean;
  onEnroll: () => void;
  onPreview: (video: { title: string; url: string }) => void;
}

const CourseEnrollCard = ({
  course,
  isEnrolled,
  enrolling,
  onEnroll,
  onPreview,
}: CourseEnrollProps) => {
  const hasFreePreview = course.lectures?.some((l) => l.freePreview);

  return (
    <div className="bg-white rounded-xl border border-zinc-200">
      <div className="relative aspect-video rounded-t-lg overflow-hidden bg-secondary/5 group">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
        />

        {hasFreePreview && (
          <button
            className="video-overlay-btn"
            title="Watch Free Preview"
            onClick={() => {
              const firstPreview = course.lectures.find((l) => l.freePreview);

              if (firstPreview) {
                onPreview({
                  title: firstPreview.title,
                  url: firstPreview.videoUrl,
                });
              }
            }}
          >
            <div className="play-circle">
              <PlayIcon className="size-4 fill-primary text-primary" />
            </div>
          </button>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-baseline justify-between">
          <span className="text-xl font-medium">
            {course.price === 0 ? "Free" : `$${course.price}`}
          </span>
        </div>

        <button onClick={onEnroll} disabled={enrolling} className="btn-enroll">
          {enrolling
            ? "Processing..."
            : isEnrolled
              ? "Go to Classroom"
              : course.price === 0
                ? "Enroll for Free"
                : "Enroll Now"}
        </button>

        <ul className="mt-4 space-y-2 text-xs text-secondary/80">
          {DUMMY_FEATURES.map((text, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckIcon className="w-3.5 h-3.5 text-primary" />
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseEnrollCard;

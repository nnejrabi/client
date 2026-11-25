import { BookOpenIcon } from "lucide-react";
import { Link } from "react-router-dom";

export interface CourseData {
  _id: string;
  title: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  thumbnail: string;
  instructorName: string;
  lectures?: Array<{
    _id: string;
    title: string;
    duration?: string;
  }>;
  enrolledStudents?: string[];
  progressPercentage?: number;
  completedLecturesCount?: number;
}

interface CourseCardProps {
  course: CourseData;
  isEnrolled: boolean;
}

const CourseCard = ({ course, isEnrolled }: CourseCardProps) => {
  const lectureCount = course.lectures?.length || 0;
  const isFree = course.price === 0;
  return (
    <Link
      to={isEnrolled ? `/learn/${course._id}` : `/courses/${course._id}`}
      className="group course-card"
    >
      <div>
        {/* Thumbnail Header */}
        <div className="relative aspect-video w-full overflow-hidden bg-secondary/5">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-300"
            loading="lazy"
          />

          {/* Category & Level Badges */}
          <div className="absolute top-3 right-3">
            <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-zinc-50 text-secondary/80 border border-r-zinc-100">
              {course.category}
            </span>
          </div>

          {isEnrolled && typeof course.progressPercentage === "number" && (
            <div className="absolute bottom-2 left-3 right-3 bg-white p-2 rounded-lg border border-zinc-200">
              <div className="flex justify-between text-[10px] font-semibold mb-1">
                <span>Progress</span>
                <span className="text-primary tabular-nums">
                  {course.progressPercentage}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-secondary/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${course.progressPercentage}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-xs font-medium text-secondary/65 mb-1.5">
            {course.instructorName}
          </p>
          <h3 className="course-card-title">{course.title}</h3>
          <p className="text-xs text-secondary/65 line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        </div>
      </div>

      <div className="p-5 border border-zinc-100 mt-auto flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-secondary/65">
          <BookOpenIcon className="w-3.5 h-3.5 text-primary" />
          <span>
            {lectureCount} {lectureCount === 1 ? "lesson" : "lessons"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div>
            {isFree ? (
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Free
              </span>
            ) : (
              <span className="text-sm font-medium tabular-nums">
                ${course.price}
              </span>
            )}
          </div>
          <span className="btn-pill-primary">
            {isEnrolled
              ? course.progressPercentage === 100
                ? "Completed"
                : "Continue"
              : "Details"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;

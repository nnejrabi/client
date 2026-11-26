import { Link, useNavigate, useParams } from "react-router-dom";
import { DUMMY_COURSES, DUMMY_USER } from "../assets/assets";
import { useEffect, useState } from "react";
import type { CourseDetailsData } from "../components/course/CourseEnrollCard";
import { ArrowLeftIcon, BookOpenIcon, UserIcon } from "lucide-react";
import CourseCurriculumList from "../components/course/CourseCurriculumList";
import CourseEnrollCard from "../components/course/CourseEnrollCard";
import CoursePreviewModal from "../components/course/CoursePreviewModal";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = { user: DUMMY_USER };
  const [course, setCourse] = useState<CourseDetailsData | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [previewVideo, setPreviewVideo] = useState<{
    title: string;
    url: string;
  } | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      setCourse(DUMMY_COURSES.filter((c) => c._id === id)[0]);
      setLoading(false);
    };

    if (id) fetchCourse();
  }, [id, user]);

  const handleEnroll = async () => {
    if (!user) {
      return;
    }
    if (isEnrolled) {
      navigate(`/learn/${id}`);
      return;
    }
    setEnrolling(true);
    setTimeout(() => {
      setIsEnrolled(true);
      setEnrolling(false);
      navigate(`/learn/${id}`);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3">
          <p className="text-secondary/45 text-xs">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-lg font-semibold mb-2">Couese not found</h2>
        <Link
          to="/"
          className="text-xs font-medium text-primary hover:underline"
        >
          Back to catalog
        </Link>
      </div>
    );
  }

  const totalLectures = course.lectures?.length || 0;

  return (
    <div className="min-h-screen bg-white text-secondary">
      {/* Top Navigation Bar */}
      <div className="border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-secondary/65 hover:text-secondary transition"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            Back to Courses
          </Link>
        </div>
      </div>
      {/* Course Banner */}
      <div className="border-b border-zinc-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Course Info */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="badge-category">{course.category}</span>

                <span className="badge-level">{course.level}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-medium tracking-tight leading-tight font-urbanist">
                {course.title}
              </h1>
              <p className="text-xs sm:text-sm text-secondary/80 leading-relaxed max-w-2xl">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-3 text-sm text-secondary/80">
                <div className="">
                  Instructor:{" "}
                  <span className="text-secondary">
                    {course.instructorName}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpenIcon className="w-3.5 h-3.5 text-primary" />
                  <span>{totalLectures} lessons</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <UserIcon className="w-3.5 h-3.5 text-secondary/80" />
                  <span>{course.enrolledStudents?.length || 0} lessons</span>
                </div>
              </div>
              <div className="max-w-3xl pt-15 pb-40">
                <h2 className="text-xl font-medium mb-1">
                  Curriculum & Syllabus
                </h2>
                <p className="text-xs text-secondary/65 mb-6">
                  {totalLectures} lectures
                </p>

                <CourseCurriculumList
                  courseId={course._id}
                  lectures={course.lectures}
                  isEnrolled={isEnrolled}
                  onPreview={setPreviewVideo}
                />
              </div>
            </div>

            {/* Action Card */}
            <CourseEnrollCard
              course={course}
              isEnrolled={isEnrolled}
              enrolling={enrolling}
              onEnroll={handleEnroll}
              onPreview={setPreviewVideo}
            />
          </div>
        </div>
      </div>

      {/* Video Preview Modal */}
      <CoursePreviewModal
        previewVideo={previewVideo}
        onClose={() => setPreviewVideo(null)}
      />
    </div>
  );
};

export default CourseDetails;

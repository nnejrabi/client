import { useSearchParams } from "react-router-dom";
import { DUMMY_COURSES, DUMMY_USER } from "../assets/assets";
import { useEffect, useMemo, useState } from "react";
import type { CourseData } from "../components/CourseCard";
import { BookOpenIcon, SearchIcon } from "lucide-react";
import CourseCard from "../components/CourseCard";

const ALL_COURSES = DUMMY_COURSES as CourseData[];

const Courses = () => {
  const { user } = { user: DUMMY_USER };
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [allCourses] = useState<CourseData[]>(ALL_COURSES);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState<string>(
    searchParams.get("category") || "All",
  );

  const categories = useMemo(() => {
    const set = new Set<string>();
    allCourses.forEach((c) => {
      if (c.category?.trim()) set.add(c.category.trim());
    });
    return ["All", ...Array.from(set)];
  }, [allCourses]);

  useEffect(() => {
    const fetchCourses = async () => {
      setTimeout(() => {
        setCourses(ALL_COURSES);
        setLoading(false);
      }, 500);
    };

    fetchCourses();
  }, [search, category]);

  const handleReset = () => {
    setSearch("");
    setCategory("All");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-white mb-20">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <h1 className="text-2xl font-medium tracking-tight text-secondary">
          All Courses & Curriculums
        </h1>
        <p className="mt-1.5 text-sm text-secondary/65">
          Explore our catalog of courses and curriculums.
        </p>
      </div>

      {/* Filter, courses */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Search */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between mb-5 max-w-md">
          <SearchIcon className="absolute left-3 top-2.5 size-4 text-secondary/45" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses, instrutors, topics..."
            className="search-input"
          />
        </div>

        {/* Category list */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? allCourses.length
                : allCourses.filter((c) => c.category === cat).length;
            const isSelected = category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${isSelected ? "bg-primary text-white" : "bg-zinc-50 text-secondary/80 hover:bg-secondary/5 hover:text-secondary border border-zinc-200"}`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full tabular-nums ${isSelected ? "bg-white/20 text-white" : "bg-secondary/15/70 text-secondary/80"}`}
                ></span>
                {count}
              </button>
            );
          })}
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-72 rounded-xl bg-zinc-50 animate-pulse border border-zinc-200"
              />
            ))}
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                isEnrolled={Boolean(
                  user && course.enrolledStudents?.includes(user._id),
                )}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-xl bg-[#f8fafc] border border-dashed border-zinc-200">
            <BookOpenIcon className="w-10 h-10 text-secondary/45 mx-auto mb-2" />
            <h3>No courses match your filters</h3>
            <p>
              Try adjusting your search query, or reset the filters to see all
              available curricula.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="btn-reset-filters"
            >
              Reset all filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Courses;

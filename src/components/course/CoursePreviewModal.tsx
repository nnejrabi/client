import { XIcon } from "lucide-react";

interface CoursePreviewModalProps {
  previewVideo: { title: string; url: string } | null;
  onClose: () => void;
}

const CoursePreviewModal = ({
  previewVideo,
  onClose,
}: CoursePreviewModalProps) => {
  if (!previewVideo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary/60">
      <div className="relative w-full max-w-3xl rounded-xl bg-white overflow-hidden border border-zinc-200">
        <div className="flex items-center justify-between p-3.5 border-b border-zinc-100 bg-[#f8fafc]">
          <span className="text-xs font-semibold text-secondary">
            {previewVideo.title}
          </span>

          <button onClick={onClose} className="btn-icon-subtle">
            <XIcon className="size-4" />
          </button>
        </div>

        <div className="aspect-video bg-black">
          <video
            src={previewVideo.url}
            controls
            autoPlay
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default CoursePreviewModal;

import { VideoIcon } from "lucide-react";
import Button from "./ui/Button";

function CallButton({ handleVideoCall }) {
  return (
    <div className="absolute top-0 left-0 right-0 p-4 backdrop-blur-xl bg-white/10 dark:bg-white/5 border-b border-white/20 dark:border-white/10 z-10">
      <div className="max-w-7xl mx-auto flex justify-end">
        <Button 
          variant="accent" 
          size="sm" 
          onClick={handleVideoCall}
          className="shadow-lg"
        >
          <VideoIcon className="w-4 h-4 mr-2" />
          Start Video Call
        </Button>
      </div>
    </div>
  );
}

export default CallButton;
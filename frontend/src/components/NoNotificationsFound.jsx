import { BellIcon } from "lucide-react";
import GlassCard from "./ui/GlassCard";

function NoNotificationsFound() {
  return (
    <GlassCard className="p-12 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center mx-auto mb-4">
        <BellIcon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-white">
        No notifications yet
      </h3>
      <p className="text-neutral-600 dark:text-neutral-300 max-w-md mx-auto">
        When you receive friend requests or messages, they'll appear here.
      </p>
    </GlassCard>
  );
}

export default NoNotificationsFound;
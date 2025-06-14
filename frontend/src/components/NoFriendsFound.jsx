import GlassCard from "./ui/GlassCard";

const NoFriendsFound = () => {
  return (
    <GlassCard className="p-8 text-center animate-fade-in">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
        <span className="text-2xl">👥</span>
      </div>
      <h3 className="font-semibold text-lg mb-2 text-neutral-900 dark:text-white">
        No friends yet
      </h3>
      <p className="text-neutral-600 dark:text-neutral-300">
        Connect with language partners below to start practicing together!
      </p>
    </GlassCard>
  );
};

export default NoFriendsFound;
import LoadingSpinner from "./ui/LoadingSpinner";

function ChatLoader() {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-4">
      <LoadingSpinner size="xl" className="text-primary-500 mb-4" />
      <p className="text-center text-lg font-medium text-neutral-900 dark:text-white">
        Connecting to chat...
      </p>
    </div>
  );
}

export default ChatLoader;
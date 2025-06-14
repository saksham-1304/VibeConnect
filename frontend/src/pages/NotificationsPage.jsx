import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
          Notifications
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300">
          Stay updated with friend requests and connections
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" className="text-primary-500" />
        </div>
      ) : (
        <>
          {/* Friend Requests */}
          {incomingRequests.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <UserCheckIcon className="w-6 h-6 text-primary-500" />
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                  Friend Requests
                </h2>
                <Badge variant="primary" size="sm">
                  {incomingRequests.length}
                </Badge>
              </div>

              <div className="space-y-3">
                {incomingRequests.map((request) => (
                  <GlassCard key={request._id} className="p-6 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary-500/20">
                          <img 
                            src={request.sender.profilePic} 
                            alt={request.sender.fullName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900 dark:text-white">
                            {request.sender.fullName}
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="primary" size="sm">
                              Native: {request.sender.nativeLanguage}
                            </Badge>
                            <Badge variant="secondary" size="sm">
                              Learning: {request.sender.learningLanguage}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => acceptRequestMutation(request._id)}
                        loading={isPending}
                        disabled={isPending}
                      >
                        Accept
                      </Button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </section>
          )}

          {/* New Connections */}
          {acceptedRequests.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <BellIcon className="w-6 h-6 text-accent-500" />
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                  New Connections
                </h2>
              </div>

              <div className="space-y-3">
                {acceptedRequests.map((notification) => (
                  <GlassCard key={notification._id} className="p-6 animate-fade-in">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-accent-500/20">
                        <img
                          src={notification.recipient.profilePic}
                          alt={notification.recipient.fullName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-neutral-900 dark:text-white">
                          {notification.recipient.fullName}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300 my-1">
                          {notification.recipient.fullName} accepted your friend request
                        </p>
                        <div className="flex items-center text-xs text-neutral-500 dark:text-neutral-400">
                          <ClockIcon className="w-3 h-3 mr-1" />
                          Recently
                        </div>
                      </div>
                      <Badge variant="success" size="sm">
                        <MessageSquareIcon className="w-3 h-3 mr-1" />
                        New Friend
                      </Badge>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </section>
          )}

          {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
            <NoNotificationsFound />
          )}
        </>
      )}
    </div>
  );
};

export default NotificationsPage;
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";

import { capitialize } from "../lib/utils";

import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Friends Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">
              Your Friends
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 mt-1">
              Connect and practice with your language partners
            </p>
          </div>
          <Link to="/notifications">
            <Button variant="outline" size="sm">
              <UsersIcon className="w-4 h-4 mr-2" />
              Friend Requests
            </Button>
          </Link>
        </div>

        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" className="text-primary-500" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}
      </section>

      {/* Recommended Users Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">
            Meet New Learners
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 mt-1">
            Discover perfect language exchange partners based on your profile
          </p>
        </div>

        {loadingUsers ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" className="text-primary-500" />
          </div>
        ) : recommendedUsers.length === 0 ? (
          <GlassCard className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-neutral-900 dark:text-white">
              No recommendations available
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Check back later for new language partners!
            </p>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedUsers.map((user) => {
              const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

              return (
                <GlassCard key={user._id} className="p-6 animate-fade-in">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary-500/20">
                      <img 
                        src={user.profilePic} 
                        alt={user.fullName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-neutral-900 dark:text-white">
                        {user.fullName}
                      </h3>
                      {user.location && (
                        <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                          <MapPinIcon className="w-3 h-3 mr-1" />
                          {user.location}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="primary" size="sm">
                      {getLanguageFlag(user.nativeLanguage)}
                      Native: {capitialize(user.nativeLanguage)}
                    </Badge>
                    <Badge variant="secondary" size="sm">
                      {getLanguageFlag(user.learningLanguage)}
                      Learning: {capitialize(user.learningLanguage)}
                    </Badge>
                  </div>

                  {user.bio && (
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4 line-clamp-2">
                      {user.bio}
                    </p>
                  )}

                  {/* Action button */}
                  <Button
                    variant={hasRequestBeenSent ? "ghost" : "primary"}
                    className="w-full"
                    onClick={() => sendRequestMutation(user._id)}
                    disabled={hasRequestBeenSent || isPending}
                    loading={isPending}
                  >
                    {hasRequestBeenSent ? (
                      <>
                        <CheckCircleIcon className="w-4 h-4 mr-2" />
                        Request Sent
                      </>
                    ) : (
                      <>
                        <UserPlusIcon className="w-4 h-4 mr-2" />
                        Send Friend Request
                      </>
                    )}
                  </Button>
                </GlassCard>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
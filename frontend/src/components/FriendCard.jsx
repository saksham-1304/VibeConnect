import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";
import GlassCard from "./ui/GlassCard";
import Button from "./ui/Button";
import Badge from "./ui/Badge";

const FriendCard = ({ friend }) => {
  return (
    <GlassCard className="p-6 animate-fade-in">
      {/* USER INFO */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary-500/20">
          <img 
            src={friend.profilePic} 
            alt={friend.fullName}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-semibold text-neutral-900 dark:text-white truncate">
          {friend.fullName}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="primary" size="sm">
          {getLanguageFlag(friend.nativeLanguage)}
          Native: {friend.nativeLanguage}
        </Badge>
        <Badge variant="secondary" size="sm">
          {getLanguageFlag(friend.learningLanguage)}
          Learning: {friend.learningLanguage}
        </Badge>
      </div>

      <Link to={`/chat/${friend._id}`}>
        <Button variant="outline" className="w-full">
          Message
        </Button>
      </Link>
    </GlassCard>
  );
};

export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}
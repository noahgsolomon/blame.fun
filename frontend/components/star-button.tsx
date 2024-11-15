import { useMutation } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { STAR_REPOSITORY, UNSTAR_REPOSITORY } from "@/lib/mutations";

interface StarButtonProps {
  repositoryId: string;
  starsCount: number;
  isStarred: boolean;
  size?: "sm" | "default";
  showCount?: boolean;
}

export function StarButton({
  repositoryId,
  starsCount,
  isStarred,
  size = "default",
  showCount = true,
}: StarButtonProps) {
  const [starRepository] = useMutation(STAR_REPOSITORY);
  const [unstarRepository] = useMutation(UNSTAR_REPOSITORY);

  const handleStarClick = async () => {
    try {
      if (isStarred) {
        await unstarRepository({
          variables: { repositoryId },
          optimisticResponse: {
            unstarRepository: {
              id: repositoryId,
              starsCount: starsCount - 1,
              isStarredByMe: false,
              __typename: "Repository",
            },
          },
        });
      } else {
        await starRepository({
          variables: { repositoryId },
          optimisticResponse: {
            starRepository: {
              id: repositoryId,
              starsCount: starsCount + 1,
              isStarredByMe: true,
              __typename: "Repository",
            },
          },
        });
      }
    } catch (error) {
      console.error("Failed to star/unstar repository:", error);
    }
  };

  return (
    <Button
      variant="outline"
      size={size}
      onClick={handleStarClick}
      className="space-x-2"
    >
      <Star className={`h-4 w-4 ${isStarred ? "fill-current" : ""}`} />
      <span>{isStarred ? "Unstar" : "Star"}</span>
      {showCount && (
        <span className="px-2 py-0.5 rounded-full bg-muted text-xs">
          {starsCount}
        </span>
      )}
    </Button>
  );
}

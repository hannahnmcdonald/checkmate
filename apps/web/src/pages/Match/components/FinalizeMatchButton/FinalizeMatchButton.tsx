import React from "react";
import { Text } from "tamagui";
import { PrimaryButton } from "../../../../components/Styled";

type FinalizeMatchButtonProps = {
  onFinalize: () => void;
  finalizeLoading: boolean;
  results: Record<string, "win" | "tie" | "loss">;
  participantsCount: number;
};

export default function FinalizeMatchButton({
  onFinalize,
  finalizeLoading,
  results,
  participantsCount,
}: FinalizeMatchButtonProps) {
  const disabled =
    finalizeLoading ||
    Object.keys(results).length !== participantsCount ||
    Object.values(results).some((r) => !r);

  return (
    <>
      <Text fontSize="$2" color="$color2">
        Select results for each player before finalizing.
      </Text>
      <PrimaryButton onPress={onFinalize} disabled={disabled} theme="active">
        {finalizeLoading ? "Finalizing..." : "Finalize Match"}
      </PrimaryButton>
    </>
  );
}

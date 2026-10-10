import { useActionState, startTransition, useOptimistic } from "react";
import { Toaster } from "@/components/ui/toast";
import { magicReducer, type MagicState } from "@/lib/reducers";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export const Magic = () => {
  const [{ addedMagic }, dispatchAction, isPending] = useActionState<
    MagicState,
    { type: string }
  >(magicReducer, { addedMagic: 0 });
  const [optimisticCount, setOptimisticCount] = useOptimistic(addedMagic);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-1 lg:grid-cols-2 place-items-center items-start">
          <span>Magic that you added: {optimisticCount}</span>
          <Button
            variant="default"
            onClick={() =>
              startTransition(() => {
                setOptimisticCount(optimisticCount + 1);
                dispatchAction({ type: "add" });
              })
            }
          >
            Add magic {isPending && <Spinner />}
          </Button>
        </div>
      </main>
      <Toaster />
    </div>
  );
};

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useGetAppPrice() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<bigint | null>({
    queryKey: ['appPrice'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPrice();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useSetAppPrice() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPrice: bigint) => {
      if (!actor) throw new Error('Actor not available');
      await actor.setPrice(newPrice);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appPrice'] });
    },
  });
}

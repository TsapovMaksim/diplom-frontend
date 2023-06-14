import { GetReviewsParams, reviewsApi } from '@/api/reviews';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useReviews = (params: GetReviewsParams) => {
  const res = useQuery({
    queryKey: ['review', params.productId],
    queryFn: () => reviewsApi.getReviews(params),
  });
  return res;
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ['create-review'],
    mutationFn: reviewsApi.createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review'] });
    },
  });
  return res;
};

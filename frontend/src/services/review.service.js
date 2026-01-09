export const addReview = (id, data) =>
  api.post(`/reviews/${id}`, data);

export const deleteReview = (id) =>
  api.delete(`/reviews/${id}`);

export const getReviews = (id) =>
  api.get(`/reviews/${id}`);

export const getOptimizedImage = (url) => {
  if (!url) return "";
  return url.replace(
    "/upload/",
    "/upload/w_600,h_400,c_fill,q_auto:eco,f_auto,dpr_auto/"
  );
};

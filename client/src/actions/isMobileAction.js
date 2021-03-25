export const setIsMobile = (useIsMobileResult) => {
  return {
    type: 'isMobile/setIsMobile',
    payload: useIsMobileResult,
  };
};

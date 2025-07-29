
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // or 'auto' if you don't want smooth scroll
  });
};
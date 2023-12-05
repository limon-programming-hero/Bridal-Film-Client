const rowAnimation = {
  initial: { opacity: 0, scale: 0.3, filter: "blur(20px)" },
  animate: (index) => {
    return {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        delay: 0.2 * index,
      },
    };
  },
};
export default rowAnimation;

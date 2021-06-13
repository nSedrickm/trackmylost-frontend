import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import pattern from "images/patternpad2.svg"

/* framer-motion and useInView here are used to animate the sections in when we reach them in the viewport
 */
import { motion } from "framer-motion";
import useInView from "@owaiswiz/use-in-view";

const StyledDiv = styled.div`
  ${tw`font-display min-h-screen text-secondary-500 px-10 pt-24 overflow-hidden`}
  background-image: url(${pattern});
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
`;

function AnimationReveal({ disabled, children }) {
  if (disabled) {
    return <>{children}</>;
  }

  if (!Array.isArray(children)) children = [children];

  const directions = ["left", "right"];
  const childrenWithAnimation = children.map((child, i) => {
    return (
      <AnimatedSlideInComponent key={i} direction={directions[i % directions.length]}>
        {child}
      </AnimatedSlideInComponent>
    );
  });
  return <>{childrenWithAnimation}</>;
}

function AnimatedSlideInComponent({ direction = "left", offset = 10, children }) {
  const [ref, inView] = useInView(10);

  const x = { target: "0%" };

  if (direction === "left") x.initial = "-100%";
  else x.initial = "100%";

  return (
    <motion.section
      initial={{ x: x.initial }}
      animate={{
        x: inView && x.target,
        transitionEnd: {
          x: inView && 0
        }
      }}
      transition={{ type: "spring", damping: 100 }}
      ref={ref}
    >
      {children}
    </motion.section>
  );
}

const AnimationRevealPage = (props) => (
  <StyledDiv className="AnimationRevealPage">
    <AnimationReveal {...props} />
  </StyledDiv>
);

export default AnimationRevealPage;
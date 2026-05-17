"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cloneElement, isValidElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
};

const wordVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Wraps a single word in an animated mask. The outer span clips the
 * translated child so the word appears to rise from below.
 */
function Word({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-flex overflow-hidden whitespace-pre align-baseline leading-[1.05]">
      <motion.span variants={wordVariants} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Recursively splits a node tree into animatable word tokens.
 * - Strings: split by whitespace; each word becomes a <Word>
 * - JSX elements (<em>, <span>): preserved as wrappers; their text content
 *   is split inside, so emphasis classes still apply
 * - Whitespace is preserved between words
 */
function splitNode(node: ReactNode, keyPrefix = ""): ReactNode {
  if (typeof node === "string") {
    return node.split(/(\s+)/).map((segment, i) => {
      if (segment === "") return null;
      if (/^\s+$/.test(segment)) return <span key={`${keyPrefix}s${i}`}>{segment}</span>;
      return <Word key={`${keyPrefix}w${i}`}>{segment}</Word>;
    });
  }

  if (Array.isArray(node)) {
    return node.map((child, i) => (
      <span key={`${keyPrefix}arr${i}`} style={{ display: "contents" }}>
        {splitNode(child, `${keyPrefix}arr${i}-`)}
      </span>
    ));
  }

  if (isValidElement(node)) {
    const el = node as React.ReactElement<{ children?: ReactNode }>;
    const inner = el.props?.children;
    return cloneElement(
      el,
      { ...el.props, key: el.key ?? `${keyPrefix}el` },
      splitNode(inner, `${keyPrefix}el-`),
    );
  }

  return node;
}

/**
 * RevealText — word-by-word viewport-entry reveal.
 *
 *   <RevealText as="h1" className="display-stage">
 *     Trois générations,
 *     <span className="block italic text-bronze">un seul ciel.</span>
 *   </RevealText>
 *
 * Words rise from a mask in sequence. JSX elements are preserved so
 * emphasis classes still apply. Respects prefers-reduced-motion.
 */
export function RevealText({
  children,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.05,
  once = true,
}: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Static = Tag as any;
    return <Static className={className}>{children}</Static>;
  }

  const tokens = splitNode(children);
  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10%" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {tokens}
    </MotionTag>
  );
}

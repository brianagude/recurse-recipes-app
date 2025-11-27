const headingBase = "font-bold leading-tight";
const paragraphBase = "leading-snug";
const kickerBase = "font-extrabold leading-snug";
const buttonBase = `
  font-semibold leading-tight capitalize tracking-wide
  transition-colors cursor-pointer w-fit
`.trim();

export const typography = {
  h1: `${headingBase} text-4xl md:text-5xl`,
  h2: `${headingBase} text-3xl md:text-4xl`,
  h3: `${headingBase} text-2xl md:text-3xl`,
  h4: `${headingBase} text-xl md:text-2xl`,
  h5: `${headingBase} text-xl`,
  h6: `${headingBase} text-lg`,

  p1: `${paragraphBase} text-lg sm:text-xl`,
  p2: `${paragraphBase} text-base sm:text-lg`,
  p3: `${paragraphBase} text-sm sm:text-base`,
  p4: `${paragraphBase} text-xs sm:text-sm`,

  k1: `${kickerBase} text-xl`,
  k2: `${kickerBase} text-lg`,
  k3: `${kickerBase} text-base`,

  b1: `${buttonBase} text-xl sm:text-2xl`,
  b2: `${buttonBase} text-lg`,
};

export const buttons = {
  text: `${typography.b2} `,
  textIcon: `${typography.b2} flex items-center gap-2`,
  tag: `${typography.b2} px-6 py-2 rounded-full border-2 border-black hover:bg-gray-light`,
  tagIcon: `${typography.b2} flex items-center gap-3 px-4 pl-3 py-2 gap-2 rounded-full border-2 border-black hover:bg-gray-light`,
  tagSmall: `${typography.p3} px-4 py-1 rounded-full bg-black text-white w-fit`,
  tagIconSmall: `${typography.p3} flex items-center gap-3 px-4 pl-3 py-1 gap-2 rounded-full bg-black text-white w-fit`,
  primary: `${typography.b1} px-5 py-3 gap-3 rounded-md border-2 border-black`,
  primaryIcon: `${typography.b1} flex items-center gap-3 px-5 py-3 gap-3 rounded-md border-2 border-black`,
};

export default (element: HTMLElement, style: Partial<CSSStyleDeclaration>) => {
  for (let cssProp in style) {
    element.style[cssProp] = style[cssProp] || '';
  }
};

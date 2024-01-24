"use strict";
import {} from "astro";
export default {
  id: "astro-devtoolbar-tailwind",
  name: "Astro Devtoolbar Tailwind",
  icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 54 33"><g clip-path="url(#prefix__clip0)"><path fill="#38bdf8" fill-rule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" clip-rule="evenodd"/></g><defs><clipPath id="prefix__clip0"><path fill="#fff" d="M0 0h54v32.4H0z"/></clipPath></defs></svg>`,
  init(canvas, eventTarget) {
    let enabled = true;
    const elementClassCache = /* @__PURE__ */ new Map();
    const myWindow = document.createElement("astro-dev-toolbar-window");
    myWindow.innerHTML = `<p>Choose an element</p>`;
    canvas.appendChild(myWindow);
    const addHoverStyles = () => {
      const styles = `
                body *[class]:hover:not(:has(> *:hover)) {
                    outline: 2px solid skyblue;
                    cursor: pointer;
                    background: linear-gradient(to top right, lavender, lightcyan);
                }
            `;
      const stylesheet = document.createElement("style");
      stylesheet.id = "hover-styles";
      stylesheet.innerText = styles;
      document.head.insertAdjacentElement("beforeend", stylesheet);
    };
    const removeHoverStyles = () => {
      document.getElementById("hover-styles")?.remove();
    };
    const createClassToggle = (className, element) => {
      const row = document.createElement("div");
      row.classList.add("flex", "items-center", "p-4");
      row.innerHTML = `
                <span>${className}</span>
            `;
      const toggle = document.createElement("astro-dev-overlay-toggle");
      if (element.classList.contains(className)) {
        toggle.input.checked = true;
      }
      toggle.input.addEventListener("change", (event) => {
        if (!elementClassCache.has(element)) {
          elementClassCache.set(element, [...element.classList.values()]);
        }
        element.classList.toggle(className);
      });
      row.insertAdjacentElement("beforeend", toggle);
      return row;
    };
    const renderClassToggles = (element) => {
      const classes = elementClassCache.get(element) || [...element.classList.values()];
      const holder = document.createElement("div");
      classes.forEach((className) => {
        holder.insertAdjacentElement("beforeend", createClassToggle(className, element));
      });
      return holder;
    };
    const elementIsPartOfTheDevToolbarWindow = (element) => {
      if (element.tagName.toLowerCase() === "astro-dev-toolbar") {
        return true;
      }
      if (!element.parentElement) {
        return false;
      }
      if (element.parentElement.tagName.toLowerCase() !== "astro-dev-toolbar-app-canvas") {
        return elementIsPartOfTheDevToolbarWindow(element.parentElement);
      }
      return true;
    };
    function listenForPageClicks(event) {
      if (!enabled) {
        return;
      }
      if (elementIsPartOfTheDevToolbarWindow(event.target)) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      const element = event.target;
      const checkForClasses = (target) => {
        if (target.classList.length > 0) {
          return true;
        }
        if (target.parentElement) {
          checkForClasses(target.parentElement);
        }
        return false;
      };
      let elementHasClass = checkForClasses(element) || elementClassCache.has(element);
      if (!elementHasClass) {
        return;
      }
      while (myWindow.firstChild) {
        myWindow.firstChild.remove();
      }
      myWindow.insertAdjacentElement("beforeend", renderClassToggles(element));
    }
    eventTarget.addEventListener("app-toggled", (event) => {
      if (event.detail.state === true) {
        enabled = true;
        document.addEventListener("click", listenForPageClicks);
        addHoverStyles();
      } else {
        enabled = false;
        document.removeEventListener("click", listenForPageClicks);
        removeHoverStyles();
        myWindow.innerHTML = `<p>Choose an element</p>`;
      }
    });
  }
};

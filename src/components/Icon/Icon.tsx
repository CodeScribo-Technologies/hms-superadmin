/**
 * Component - Icon
 * Component to display bx icon
 * @param {name} name of the icon to display.
 * @param {size} size of the icon to display.
 * @param {border} border display the icon with border.
 * @param {radiusCircle} radiusCircle enable radius as circle.
 * @param {tailwindClass} tailwindClass to add custom class.
 * @returns <i> tag with bx icon
 */

const Icon = ({
    name,
    size = "md",
    border = false,
    radiusCircle = false,
    tailwindClass = "",
    type = "regular",
  }: {
    name: string;
    size?: string;
    border?: boolean;
    radiusCircle?: boolean;
    tailwindClass?: string;
    type?: "regular" | "solid";
  }) => {
    // Map the size prop to Icons size classes
    const sizeClass = {
      sm: "bx-sm",
      md: "", // Default size, so no class needed
      lg: "bx-lg",
      xl: "bx-xl",
    }[size];
  
    return (
      <i
        className={`bx ${type === "solid" ? "bxs" : "bx"}-${name} ${sizeClass ?? ""} ${border ? "bx-border" : ""} ${radiusCircle ? "bx-border-circle" : ""} ${tailwindClass}`}
      />
    );
  };
  
  export default Icon;
  
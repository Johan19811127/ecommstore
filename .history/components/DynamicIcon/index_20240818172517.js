import * as Icons from "react-icons/gi";

function DynamicIcon({ iconName }) {
  const IconComponent = Icons[iconName];
  
  // If the icon doesn't exist, you can render a default icon or null
  if (!IconComponent) {
    return null; // or return a default icon like <Icons.FaQuestion />;
  }

  return <IconComponent className="h-8 w-12" />;
}

export default DynamicIcon;
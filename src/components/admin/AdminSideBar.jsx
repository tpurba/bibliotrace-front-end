import BarButton from "../BarButtons";
export default function Sidebar({buttons}) {
    return (
      <div className="ml-auto flex flex-col">
        {buttons.map((button, index) => (
          <BarButton
            key={index}
            text={button.text}
            textColor={button.textColor} 
            onClick={button.onClick} 
            borderColor={button.borderColor} 
            bgColor={button.bgColor} 
            buttonBgColor = {button.buttonBgColor}
            className={button.className}
            width = {button.width}
            height = {button.height}
          />
        ))}
      </div>
    );
  }
  
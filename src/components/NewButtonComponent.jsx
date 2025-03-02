function CustomButton({ 
  imageSrc,
  text,
  onClick,
  borderColor,
  bgColor,
  buttonLayout,
  imgClassName,
  textClassName,
}) {
    return (
      <button
        className={`flex ${buttonLayout}
                    items-center justify-center  
                    transition-transform duration-200 hover:scale-105`}
        onClick={onClick}
        style={{ background: bgColor }}
      > 
        <img src={imageSrc} alt={text} className={` ${imgClassName}`} />
        <p className={`${textClassName}`}>{text}</p>
        
      </button>
    );
  }
  
  export default CustomButton;
  
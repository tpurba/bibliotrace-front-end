function NewBarButton({
  text, 
  onClick, 
  className, 
  buttonBgColor, 
  width,
  height,
}) {
    return (
      <button
        className={`flex w-full px-2 py-1 items-center justify-center 
                    transition-transform duration-200 hover:scale-105 rounded-3xl ${className}`}
        onClick={onClick}
        style={{ 
          background: buttonBgColor ,
          width: width, 
          height: height, 
          textAlign: 'center',
        }}
      >
        {text}
      </button>
    );
  }
   
  export default NewBarButton;
  
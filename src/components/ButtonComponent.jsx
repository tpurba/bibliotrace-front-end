function CustomButton({ 
  imageSrc, 
  text, 
  textColor, 
  onClick, 
  borderColor, 
  bgColor, 
  className, 
  layout = 'col', 
  imageWidth = '6rem', 
  imageHeight = '6rem', 
  textWidth = '7rem', 
  textHeight = '3rem' 
}) {
    return (
      <button
        className={`flex ${layout === 'col' ? 'flex-col' : 'flex-row'}
                    items-center justify-center  
                    shadow-lg transition-transform duration-200 hover:scale-105 ${className}`}
        onClick={onClick}
        style={{ background: bgColor }}
      >
        
        {/* Container for image */}
        <div 
          className={`flex-shrink-0 ${layout === 'col' ? 'mb-4' : 'mr-4'}`}
          style={{ width: imageWidth, height: imageHeight }}
        >
          <img src={imageSrc} alt={text} className="w-full h-full object-cover" />
        </div>
        
        {/* Container for text */}
        <div
          className="border-2 rounded-lg flex items-center justify-center font-bold"
          style={{ 
            borderColor: borderColor, 
            background: bgColor, 
            color: textColor, 
            whiteSpace: 'pre-wrap',
            width: textWidth, 
            height: textHeight
          }}
        >
          {text}
        </div>

      </button>
    );
  }
  
  export default CustomButton;
  
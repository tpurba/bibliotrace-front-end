function CustomButton({ imageSrc, text, textColor, onClick, borderColor, bgColor, className}) {
    return (
      <button
        className={`flex flex-row 
                    items-center justify-center 
                    p-2 sm:p-4 md:p-6 
                    w-auto h-24 
                    shadow-lg transition-transform duration-200 hover:scale-105 ${className}`}
        onClick={onClick}
        style={{ background: bgColor }}
      >
        
        {/* Container for image */}
        <div className="flex-shrink-0 w-24 h-24 m-4">
          <img src={imageSrc} alt={text} className="w-full h-full object-cover" />
        </div>
        
        {/* Container for text */}
        <div
          className="w-44 h-12 mb-2 border-2 rounded-lg flex items-center justify-center font-bold"
          style={{ borderColor: borderColor, 
            background: bgColor, 
            color: textColor, 
            whiteSpace: 'pre-wrap',  
          }}
        >
          {text}
        </div>

      </button>
    );
  }
  
  export default CustomButton;
  
function CustomButton({ imageSrc, text, textColor, onClick, borderColor, bgColor, className }) {
    return (
      <button
        className={`flex flex-col items-center justify-center 
                    p-2 sm:p-4 md:p-6 
                    w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 
                    shadow-lg transition-transform duration-200 hover:scale-105 ${className}`}
        onClick={onClick}
        style={{ background: bgColor }}
      >
        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-2">
          <img src={imageSrc} alt={text} className="w-full h-full object-cover" />
        </div>
        <div
          className="w-20 h-12 sm:w-24 sm:h-14 md:w-28 md:h-16 mb-2 border-2 rounded-lg flex items-center justify-center font-bold"
          style={{ borderColor: borderColor, background: bgColor, color: textColor, whiteSpace: 'pre-wrap' }}
        >
          {text}
        </div>
      </button>
    );
  }
  
  export default CustomButton;
  
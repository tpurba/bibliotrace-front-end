function BarButton({text, textColor, onClick, borderColor, bgColor, className }) {
    return (
      <button
        className={`flex flex-col w-full px-2 py-1 items-center justify-center 
                    transition-transform duration-200 hover:scale-105 rounded-3xl ${className}`}
        onClick={onClick}
        style={{ background: bgColor }}
      >
        <div
          className="w-full border-4 rounded-lg flex items-center justify-center font-bold p-4 text-l"
          style={{ borderColor: borderColor, background: bgColor, color: textColor, whiteSpace: 'pre-wrap' }}
        >
          {text}
        </div>
      </button>
    );
  }
  
  export default BarButton;
  
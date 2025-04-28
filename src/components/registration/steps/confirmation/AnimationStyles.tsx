
export const AnimationStyles = () => {
  return (
    <style>{`
      .animate-fade-in {
        animation: fadeInUp 0.7s cubic-bezier(.23,1.01,.32,1) both;
      }
      @keyframes fadeInUp {
        0% { opacity: 0; transform: translateY(32px); }
        100% { opacity: 1; transform: none; }
      }
    `}</style>
  );
};

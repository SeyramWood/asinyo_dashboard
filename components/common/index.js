
export function Card ({ label = "", children }){
  if (label) {
    return (
      <div className="s__card">
        <h3 className="s__card__title">{label}</h3>
        {children}
      </div>
    );
  }
  return <div className="s__card">{children}</div>;
};

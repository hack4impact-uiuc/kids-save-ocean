import "../public/styles/stage-component.scss";

export default function Tips(props) {
  const { title, tips } = props;
  return (
    <div className="stage-content">
      <h2 className="stage-title">{title}</h2>
      {tips.map(tip => (
        <>
          <h3>{tip.name}</h3>
          <p>{tip.description}</p>
        </>
      ))}
    </div>
  );
}

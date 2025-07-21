import ReactDom from "react-dom";

export default function Modal(props) {
  const { showWritingPromptsDetails, handleCloseModal } = props;
  const { title, hint, example, tone } = showWritingPromptsDetails || {};
  return ReactDom.createPortal(
    <div className="modal-container">
      <button className="modal-underlay" onClick={handleCloseModal} />
      <div className="modal-content">
        <div>
          <h2 className="title-name">{title}</h2>
        </div>
        <div className="hint-content">
          <p>
            <strong>Hint:</strong> {hint}
          </p>
          <p>
            <strong>Example:</strong> {example}
          </p>
          <p>
            <strong>Tone:</strong> {tone}
          </p>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

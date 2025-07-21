export default function Layout(props) {
  const { children } = props;

  const header = (
    <header>
      <h1 className="text-gradient">🐬 Clear Mode</h1>
      <p>Small essays, big breakthroughs. ✨</p>
    </header>
  );

  const footer = (
    <footer>
      <p>
        Built by{" "}
        <a href="/" target="_blank">
          Shrey
        </a>
      </p>
    </footer>
  );

  //https://www,YOUR_USERNAME.netlify.app

  return (
    <>
      {header}
      {children}
      {footer}
    </>
  );
}

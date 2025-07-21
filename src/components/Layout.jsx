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
        <a href="https://github.com/Z-243" target="_blank">
          Shrey
        </a>
      </p>
    </footer>
  );

  return (
    <>
      {header}
      {children}
      {footer}
    </>
  );
}

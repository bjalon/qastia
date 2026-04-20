import './styles.css';

globalThis.global ??= globalThis;

async function bootstrap() {
  const [{ default: React }, { default: ReactDOM }, { default: App }] = await Promise.all([
    import('react'),
    import('react-dom/client'),
    import('./App'),
  ]);

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

bootstrap();

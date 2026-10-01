import './styles.css';
import { createApp } from './app.js';

const root = document.getElementById('app');
const app = createApp(root);
// After a Google or email sign-in the URL carries ?code=. The client has exchanged it by the time start() resolves.
app.start().then(() => { if (location.search.includes('code=')) history.replaceState({}, '', location.pathname + location.hash); });
window.__app = app; // handy for debugging in the browser console

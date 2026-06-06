import { Buffer } from 'buffer'

// gray-matter expects a Node Buffer global. This lives in its own module and is
// imported before any code that uses gray-matter, because ES module imports run
// before the importing module's body — so setting the global inline in main.jsx
// would happen too late (projects.js parses markdown at import time).
globalThis.Buffer = globalThis.Buffer || Buffer

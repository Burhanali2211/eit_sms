
/**
 * Browser polyfills for PostgreSQL connections
 * 
 * These are needed because the pg library attempts to use Node.js-specific
 * modules that aren't available in the browser environment.
 */

// Create a comprehensive mock for browser environments
export const createPgPolyfills = () => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    // Add polyfills for various Node.js modules used by pg
    console.log('PostgreSQL browser polyfills loaded');
    
    // Mock net module
    (window as any).net = {
      Socket: class MockSocket {
        on() { return this; }
        once() { return this; }
        emit() { return this; }
        end() {}
        destroy() {}
        connect() { return this; }
      }
    };
    
    // Mock tls module
    (window as any).tls = {
      connect: () => new (window as any).net.Socket(),
    };
    
    // Mock the Cloudflare sockets module
    // This prevents the "Failed to resolve import 'cloudflare:sockets'" error
    (window as any).cloudflareSocketsModule = {
      connect: () => ({
        readable: new ReadableStream(),
        writable: new WritableStream(),
        closed: Promise.resolve()
      })
    };
    
    // Monkey patch dynamic imports for 'cloudflare:sockets'
    const originalImport = (window as any).import || Function.prototype;
    (window as any).import = function(specifier: string) {
      if (specifier === 'cloudflare:sockets') {
        console.log('Providing mock for cloudflare:sockets');
        return Promise.resolve((window as any).cloudflareSocketsModule);
      }
      return originalImport.apply(this, arguments);
    };
  }
};

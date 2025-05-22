
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
    console.log('Setting up PostgreSQL browser polyfills');
    
    // Create a global process object if it doesn't exist
    if (typeof window.process === 'undefined') {
      (window as any).process = {
        env: {},
        nextTick: (fn: Function) => setTimeout(fn, 0),
        platform: 'browser',
        version: ''
      };
    }
    
    // Mock require function
    if (typeof window.require === 'undefined') {
      (window as any).require = function mockRequire(module: string) {
        console.warn(`Mock require called for module: ${module}`);
        
        // Return empty mock objects for common Node.js modules
        switch (module) {
          case 'net':
            return {
              Socket: class MockSocket {
                on() { return this; }
                once() { return this; }
                emit() { return this; }
                end() {}
                destroy() {}
                connect() { return this; }
                setTimeout() { return this; }
              }
            };
          case 'tls':
            return {
              connect: () => new (window as any).require('net').Socket(),
            };
          case 'events':
            return {
              EventEmitter: class MockEventEmitter {
                on() { return this; }
                once() { return this; }
                emit() { return this; }
                removeListener() { return this; }
              }
            };
          case 'crypto':
            return {
              randomBytes: () => new Uint8Array(16),
            };
          case 'buffer':
            return {
              Buffer: {
                from: (data: any) => new Uint8Array(typeof data === 'string' ? new TextEncoder().encode(data) : data),
                isBuffer: () => false,
                concat: (arrays: any[]) => {
                  const totalLength = arrays.reduce((acc, value) => acc + value.length, 0);
                  const result = new Uint8Array(totalLength);
                  let offset = 0;
                  for (const array of arrays) {
                    result.set(array, offset);
                    offset += array.length;
                  }
                  return result;
                }
              }
            };
          default:
            console.error(`Unsupported module requested: ${module}`);
            return {};
        }
      };
    }
    
    // Mock the Cloudflare sockets module
    (window as any).cloudflareSocketsModule = {
      connect: () => ({
        readable: new ReadableStream(),
        writable: new WritableStream(),
        closed: Promise.resolve()
      })
    };
    
    // Monkey patch dynamic imports for 'cloudflare:sockets'
    const originalDynamicImport = (window as any).import || Function.prototype;
    (window as any).import = function(specifier: string) {
      if (specifier === 'cloudflare:sockets') {
        console.log('Providing mock for cloudflare:sockets');
        return Promise.resolve((window as any).cloudflareSocketsModule);
      }
      return originalDynamicImport.apply(this, arguments);
    };
  }
};

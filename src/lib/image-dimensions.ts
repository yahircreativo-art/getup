import { readFileSync } from 'node:fs';
import path from 'node:path';

const cache = new Map<string, { width: number; height: number } | null>();

/**
 * Lee las dimensiones REALES de una imagen en public/ parseando la cabecera
 * del archivo (JPEG, PNG y WebP) — sin dependencias.
 *
 * Devuelve null si el archivo no existe o el formato no está soportado,
 * para que el llamador haga fallback a los valores declarados.
 */
export function getImageDimensions(publicPath: string): { width: number; height: number } | null {
  if (cache.has(publicPath)) return cache.get(publicPath)!;

  const result = ((): { width: number; height: number } | null => {
    try {
      // En el build de Astro este módulo se agrupa en dist/chunks/, así que
      // import.meta.url no sirve para resolver la raíz: usamos process.cwd().
      const filePath = path.join(process.cwd(), 'public', publicPath.replace(/^\//, ''));
      const buf = readFileSync(filePath);

      // ── JPEG: escanear marcadores SOF (Start Of Frame) ──
      if (buf[0] === 0xff && buf[1] === 0xd8) {
        let offset = 2;
        while (offset + 9 < buf.length) {
          if (buf[offset] !== 0xff) {
            offset++;
            continue;
          }
          const marker = buf[offset + 1];
          if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
            return {
              height: buf.readUInt16BE(offset + 5),
              width: buf.readUInt16BE(offset + 7),
            };
          }
          offset += 2 + buf.readUInt16BE(offset + 2);
        }
        return null;
      }

      // ── PNG: dimensiones en el chunk IHDR (offset fijo) ──
      if (buf.length > 24 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
        return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
      }

      // ── WebP: VP8 (lossy), VP8L (lossless) o VP8X (extended) ──
      if (buf.length > 30 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
        const format = buf.toString('ascii', 12, 16);

        if (format === 'VP8 ') {
          // Frame tag de 3 bytes en 20; start code 0x9d 0x01 0x2a en 23;
          // width/height como UInt16LE en 26 y 28 (14 bits bajos)
          if (buf[23] === 0x9d && buf[24] === 0x01 && buf[25] === 0x2a) {
            return {
              width: buf.readUInt16LE(26) & 0x3fff,
              height: buf.readUInt16LE(28) & 0x3fff,
            };
          }
          return null;
        }

        if (format === 'VP8L') {
          // Payload en 20 (firma 0x2f); 32 bits LE en 21:
          // bits 0-13 = width-1, bits 14-27 = height-1
          if (buf[20] !== 0x2f) return null;
          const b = buf.readUInt32LE(21);
          return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
        }

        if (format === 'VP8X') {
          // Canvas: width-1 como 24-bit LE en 24, height-1 en 27
          const w = 1 + buf[24] + (buf[25] << 8) + (buf[26] << 16);
          const h = 1 + buf[27] + (buf[28] << 8) + (buf[29] << 16);
          return { width: w, height: h };
        }
      }

      return null;
    } catch {
      return null;
    }
  })();

  cache.set(publicPath, result);
  return result;
}

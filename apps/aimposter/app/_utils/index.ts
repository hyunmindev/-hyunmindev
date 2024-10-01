export const base64ToBlob = (base64: string, mimeType = 'image/png') => {
  const [, base64Data] = base64.split(',');
  const byteCharacters = atob(base64Data ?? '');
  const byteNumbers: number[] = Array.from({ length: byteCharacters.length });
  for (let index = 0; index < byteCharacters.length; index += 1) {
    byteNumbers[index] = byteCharacters.codePointAt(index) ?? 0;
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

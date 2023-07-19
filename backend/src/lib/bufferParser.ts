export const BufferParser = (buffer: Buffer) => {
  const base64Image = Buffer.from(buffer).toString('base64');
  const dataURL = `data:image/jpeg;base64,${base64Image}`;
  return dataURL;
};

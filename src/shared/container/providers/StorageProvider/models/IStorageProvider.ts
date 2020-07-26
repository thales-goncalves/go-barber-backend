export default interface IStorageProvider {
  saveFile(fileUrl: string): Promise<string>;
  deleteFile(fileUrl: string): Promise<void>;
}

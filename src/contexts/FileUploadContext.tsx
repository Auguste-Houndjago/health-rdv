// "use client";

// import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
// import { FileWithPreview } from "@/components/file-upload/types";

// interface FileUploadContextValue {
//   files: FileWithPreview[];
//   setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
//   addFiles: (newFiles: FileWithPreview[]) => void;
//   removeFile: (id: string) => void;
// }

// const FileUploadContext = createContext<FileUploadContextValue | undefined>(undefined);

// export function useFileUploadContext() {
//   const context = useContext(FileUploadContext);
//   if (!context) {
//     throw new Error("useFileUploadContext must be used within a FileUploadProvider");
//   }
//   return context;
// }

// interface FileUploadProviderProps {
//   children: ReactNode;
// }

// export function FileUploadProvider({ children }: FileUploadProviderProps) {
//   const [files, setFiles] = useState<FileWithPreview[]>([]);

//   const addFiles = useCallback((newFiles: FileWithPreview[]) => {
//     setFiles((prev) => [...prev, ...newFiles]);
//   }, []);

//   const removeFile = useCallback((id: string) => {
//     setFiles((prev) => prev.filter((file) => file.id !== id));
//   }, []);

//   return (
//     <FileUploadContext.Provider value={{ files, setFiles, addFiles, removeFile }}>
//       {children}
//     </FileUploadContext.Provider>
//   );
// }

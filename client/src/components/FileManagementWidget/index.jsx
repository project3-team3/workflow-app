// File Management Widget component
import { useState } from "react";
import { Uppy } from "@uppy/core";
import { Dashboard } from "@uppy/react";
import Transloadit from "@uppy/transloadit";
import AuthService from "../../utils/auth.js";

import "@uppy/core/dist/style.min.css";
import '@uppy/dashboard/dist/style.min.css';

const FileManagementWidget = () => {
  const userProfile = AuthService.getProfile();

  const [uppy] = useState(
    new Uppy({
      restrictions: {
        maxFileSize: 5000000,
        maxTotalFileSize: 20000000,
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1,
        allowedFileTypes: [
          "image/*",
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-powerpoint",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          "text/plain",
          "application/rtf",
        ],
      },
      meta: { username: userProfile?.username || userProfile?.user?.username },
    })
      .use(Transloadit, {
        id: "Transloadit",
        assemblyOptions: {
          params: {
            auth: {
              key: "55b7b7bf8b474873a15cae1a2badf647", // Public key, no need to hide
            },
            template_id: "2f153913334741b69bac839c857baf5b", // Public template, no need to hide
            fields: {
              username: userProfile?.username || userProfile?.user?.username,
            },
          },
        },
      })
      .on('upload-success', (file, response) => {
        console.log('File uploaded successfully:', file);
        console.log('Transloadit response:', response);
      })
  );

  return (
    <div className="file-management-widget widget-content-wf">
      <h2>File Manager</h2>
      <div className="drag-drop-wf widget-prevent-drag-wf">
        {uppy && (
          <>
            <Dashboard id="Dashboard" target="drag-drop-wf" uppy={uppy} height="100%" />
          </>
        )}
      </div>
    </div>
  );
};

export default FileManagementWidget;

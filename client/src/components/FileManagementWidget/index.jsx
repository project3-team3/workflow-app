// File Management Widget component
import { useEffect, useState } from "react";
import { Uppy, debugLogger } from "@uppy/core";
import { DragDrop, ProgressBar, StatusBar } from "@uppy/react";
import Transloadit from "@uppy/transloadit";
import { COMPANION_URL, COMPANION_ALLOWED_HOSTS } from "@uppy/transloadit";
import AwsS3 from "@uppy/aws-s3";
import AuthService from "../../utils/auth.js";

import "@uppy/core/dist/style.min.css";
import "@uppy/drag-drop/dist/style.min.css";

const FileManagementWidget = () => {
  const userProfile = AuthService.getProfile();

  const [uppy] = useState(
    new Uppy({
      autoProceed: true, // TODO: Disable this after testing is done and interface is built
      debug: true,
      // logger: debugLogger,
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
      meta: {
        workflowUsername: userProfile?.username || userProfile?.user?.username, // So AWS S3 can create/use folder for the user
      },
    })
      .use(Transloadit, {
        id: "Transloadit",
        assemblyOptions: {
          params: {
            auth: {
              key: "55b7b7bf8b474873a15cae1a2badf647", // Public key, no need to hide
            },
            template_id: "2f153913334741b69bac839c857baf5b", // Public template, no need to hide
          },
        },
      })
      .use(AwsS3, {
        shouldUseMultipart: (file) => file.size > 100 * 2 ** 20,
        getTemporarySecurityCredentials: true, // Necessary to use Transloadit Companion
        companionUrl: COMPANION_URL,
        companionAllowedHosts: COMPANION_ALLOWED_HOSTS,
        companionKeysParams: {
          key: "55b7b7bf8b474873a15cae1a2badf647", // Public key, no need to hide
          credentialsName: "workflow-app-bucket",
        },
      })
      .on("upload", (file) => {
        console.log("[UPPY] File upload started:", file); // TODO: Use this event to disable the upload button
      })
      .on("transloadit:upload", (file, assembly) => {
        console.log("[TRANSLOADIT] File upload started:", file, assembly); // TODO: Use this event to disable the upload button
      })
      .on("progress", (progress) => {
        console.log("[UPPY] Progress:", progress);
      })
      .on("complete", (result) => {
        console.log("[UPPY] Upload Complete. Result:", result); // TODO: Use this event to re-enable the upload button
      })
      .on("transloadit:complete", (assembly) => {
        console.log("[TRANSLOADIT] Assembly Complete:", assembly); // TODO: Use this event to re-enable the upload button
      })
      .on("error", (error) => {
        console.log("[UPPY] Error:", error);
      })
  );

  return (
    <div className="file-management-widget widget-content-wf">
      <h2>File Manager</h2>
      <div className="drag-drop-wf widget-prevent-drag-wf">
        {uppy && (
          <>
            <DragDrop id="DragDrop" target=".drag-drop-wf" uppy={uppy} />
            <ProgressBar uppy={uppy} hideAfterFinish={false} />
          </>
        )}
      </div>
    </div>
  );
};

export default FileManagementWidget;

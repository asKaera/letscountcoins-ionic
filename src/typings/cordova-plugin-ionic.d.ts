// Type definitions for cordova-plugin-ionic
// This file provides type definitions to resolve TypeScript compilation errors

declare global {
  interface IDeployPluginAPI {
    checkForUpdate: () => Promise<any>;
  }

  interface ISnapshotInfo {
    versionId: string;
    channel: string;
    binaryVersion: string;
  }

  interface IDeployConfig {
    appId?: string;
    channel?: string;
    debug?: boolean;
  }

  interface CheckDeviceResponse {
    available: boolean;
    compatible: boolean;
    partial: boolean;
    snapshot?: ISnapshotInfo;
  }

  type CallbackFunction<T> = (result: T) => void;

  interface ISyncOptions {
    updateMethod?: 'auto' | 'background';
  }
}

export {};

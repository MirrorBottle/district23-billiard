import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  studioHost: 'district23',
  api: {
    projectId: 'nf3blrlv',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})

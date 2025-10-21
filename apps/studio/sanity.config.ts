import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Turbo Start Sanity',

  projectId: 's6kuy1ts',
  dataset: 'react-router',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})

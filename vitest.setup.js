import { config } from '@vue/test-utils'
import { defaults } from './src/config.js'

config.global.mocks.$t = (tKey) => tKey
config.global.provide.config = defaults
config.global.stubs['i18n-t'] = true
